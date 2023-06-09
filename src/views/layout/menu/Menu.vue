<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#337ecc"
      class="el-menu-vertical-demo"
      :default-active="$route.path" router
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item>
      <span>KarlXu's Blog 后台管理</span>
    </el-menu-item>
    <el-menu-item index="/">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="/post">
      <template #title>
        <el-icon><location /></el-icon>
        <span>发布管理</span>
      </template>
      <el-menu-item index="/article">文章</el-menu-item>
      <el-menu-item index="/category">分类</el-menu-item>
      <el-menu-item index="/tag">标签</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><location /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/about">关于我</el-menu-item>
      <el-menu-item index="3-2">item two</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.menu{
  border-right: none;
}
.menu .is-active {
  color: #d9ecff;
  background-color: #79bbff;
}
</style>