<template>
  <el-container>
    <el-form inline>
      <el-form-item label="请求地址">
        <el-input v-model="requestUrl"></el-input>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      requestUrl: ''
    }
  }
}
</script>