<template>
  <div class="face-attendance-container">
    <h2>人脸识别打卡</h2>

    <!-- 视频预览 -->
    <div class="video-container">
      <video id="video" width="640" height="480" autoplay muted></video>
      <canvas id="overlay" width="640" height="480" style="position: absolute; top: 0; left: 0;"></canvas>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button id="start-camera">开始摄像头</button>
      <button id="capture" disabled>拍照打卡</button>
      <button id="stop-camera" disabled>停止摄像头</button>
    </div>

    <!-- 状态提示 -->
    <div id="status-message" class="status"></div>

    <img id="pic" alt="截取图片" />
  </div>
</template>

<script setup>
import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api';
import { onMounted } from 'vue';

class FaceAttendance {
  constructor() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('overlay');
    this.ctx = this.canvas.getContext('2d');
    this.statusEl = document.getElementById('status-message');
    
    this.stream = null;
    this.isModelLoaded = false;
    this.userId = 'user_123'; // 假设从登录态获取用户ID
    this.knownFaceDescriptor = null; // 存储该用户的已知人脸特征向量 (需从后端获取或首次录入)
  }

  // 初始化：加载人脸识别模型
  async initModels() {
    try {
      // 让 tfjs 自动选择最佳可用 backend（顺序：webgl → wasm → cpu）
      await tf.ready()
      console.log(tf.getBackend());
      this.setStatus('正在加载人脸识别模型...', 'info');
      // 加载模型 (face-api.js 提供的预训练模型)
      await faceapi.nets.tinyFaceDetector.loadFromUri('/model'); // 需下载模型文件到本地或使用CDN
      this.isModelLoaded = true;
      this.setStatus('模型加载完成，可以开始打卡。', 'success');
    } catch (error) {
      this.setStatus(`模型加载失败: ${error.message}`, 'error');
      console.error('模型加载失败:', error);
    }
  }

  // 请求摄像头权限并启动视频流
  async startCamera() {
    if (!this.isModelLoaded) {
      this.setStatus('请先等待模型加载完成。', 'warning');
      return;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      });
      this.video.srcObject = this.stream;

      // 绑定事件：视频准备就绪后开始人脸检测
      this.video.addEventListener('play', () => {
        this.startFaceDetection();
      });

      document.getElementById('capture').disabled = false;
      document.getElementById('stop-camera').disabled = false;
      document.getElementById('start-camera').disabled = true;
      this.setStatus('摄像头已启动，请正对镜头。', 'info');
    } catch (error) {
      this.setStatus(`无法访问摄像头: ${error.message}`, 'error');
      console.error('摄像头访问失败:', error);
    }
  }

  // 开始实时人脸检测 (可选：用于引导用户)
  startFaceDetection() {
    const runFaceDetection = async () => {
      if (this.video.paused || this.video.ended) return;

      // 检测人脸 (使用轻量级检测器)
      const detections = await faceapi.detectAllFaces(
        this.video,
        new faceapi.TinyFaceDetectorOptions()
      );
      // 清除画布
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (detections.length > 0) {
        // 绘制检测框
        faceapi.draw.drawDetections(this.canvas, detections);
        // 可以添加人脸关键点 (需要加载对应模型)
        // const landmarks = await faceapi.detectFaceLandmarks(this.video);
        // faceapi.draw.drawFaceLandmarks(this.canvas, landmarks);
      }

      // 继续下一帧
      requestAnimationFrame(runFaceDetection);
    };

    runFaceDetection();
  }

  // 捕获当前帧并进行人脸识别
  async captureAndVerify() {
    if (!this.stream) {
      this.setStatus('请先启动摄像头。', 'warning');
      return;
    }

    this.setStatus('正在识别...', 'info');
    document.getElementById('capture').disabled = true;

    try {
      // 1. 从视频流捕获图像
      const image = this.captureImageFromVideo();

      document.getElementById('pic').src = image.toDataURL();

    } catch (error) {
      this.setStatus(`识别过程出错: ${error.message}`, 'error');
      console.error('识别错误:', error);
    } finally {
      document.getElementById('capture').disabled = false;
    }
  }

  // 提交最终打卡请求 (结合定位、时间等)
  async submitAttendance(faceId) {
    try {
      // 这里需要结合之前的定位功能
      const position = await getCurrentPosition(); // 假设你有定位函数
      const { inRange, distance } = isInAttendanceRange(position, COMPANY_LOCATION, 100);

      if (!inRange) {
        this.setStatus(`不在考勤范围内 (距离: ${distance.toFixed(1)}米)，无法打卡。`, 'error');
        return;
      }

      const attendanceData = {
        userId: this.userId,
        faceId: faceId, // 来自人脸识别验证
        latitude: position.latitude,
        longitude: position.longitude,
        timestamp: new Date().toISOString(),
        type: 'check_in' // 或 check_out
      };

      const response = await fetch('/api/attendance/punch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendanceData)
      });

      const result = await response.json();
      if (result.success) {
        this.setStatus('✅ 打卡成功！', 'success');
      } else {
        this.setStatus(`打卡失败: ${result.message}`, 'error');
      }
    } catch (error) {
      this.setStatus(`提交打卡数据失败: ${error.message}`, 'error');
    }
  }

  // 辅助函数：从video元素捕获图像
  captureImageFromVideo() {
    const canvas = document.createElement('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.video, 0, 0);
    return canvas;
  }

  // 辅助函数：dataURL 转 File 对象 (用于上传)
  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // 设置状态信息
  setStatus(message, type) {
    this.statusEl.textContent = message;
    this.statusEl.className = `status ${type}`;
  }

  // 停止摄像头
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.video.srcObject = null;
      this.stream = null;
    }
    document.getElementById('capture').disabled = true;
    document.getElementById('stop-camera').disabled = true;
    document.getElementById('start-camera').disabled = false;
    this.setStatus('摄像头已停止。', 'info');
  }

  // 初始化事件绑定
  bindEvents() {
    document.getElementById('start-camera').addEventListener('click', () => this.startCamera());
    document.getElementById('capture').addEventListener('click', () => this.captureAndVerify());
    document.getElementById('stop-camera').addEventListener('click', () => this.stopCamera());
  }

  // 启动应用
  async start() {
    await this.initModels();
    this.bindEvents();
  }
}

// 启动
onMounted(() => {
  const faceAttendance = new FaceAttendance();
  faceAttendance.start();
})
</script>