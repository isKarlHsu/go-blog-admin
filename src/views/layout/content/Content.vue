<template>
  <div class="header">
    <el-page-header :icon="null">
      <template #content>
        <div class="flex items-center">
          <el-avatar
              :size="32"
              class="mr-3"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="text-large font-600 mr-3"> Title </span>
          <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
          Sub title
        </span>
          <el-tag>Default</el-tag>
        </div>
      </template>
      </el-page-header>
  </div>
  <Breadcrumb/>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb.vue";
export default {
  name: "Content",
  components: {Breadcrumb}
}
</script>

<style scoped>
.header{
  height: 50px;
  line-height: 50px;
  background-color: #337ecc;
}
.wrapper{
  padding: 10px;
}
</style>