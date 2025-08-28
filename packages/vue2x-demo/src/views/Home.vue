<template>
  <el-container direction="vertical">
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" router>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/configuration">配置中心</el-menu-item>
      </el-menu>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/home'
    }
  },
  beforeMount() {
    this.activeIndex = this.$route.path
  }
}
</script>