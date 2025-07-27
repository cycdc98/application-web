<template>
  <el-container direction="vertical">
    <el-header>
      监控
    </el-header>
    <el-main>
      <el-card>
        <template #header>
          请求测试
        </template>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button @click="reqByFetch">fetch请求</el-button>
            <el-input type="textarea" :rows="2" :value="fetchRes">
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-button @click="reqByAxios">xhr请求</el-button>
            <el-input type="textarea" :rows="2" :value="axiosRes">
            </el-input>
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { axios } from './utils'
export default {
  data() {
    return {
      fetchRes: '',
      axiosRes: '',
    }
  },
  methods: {
    async reqByFetch() {
      const response = await fetch('/api/hello', { method: 'POST' })
      this.fetchRes = JSON.stringify(await response.json())
    },
    async reqByAxios() {
      const res = await axios.post('/api/hello')
      this.axiosRes = JSON.stringify(res.data)
    }
  },
}
</script>