<template>
  <el-card class="breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <!--    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>-->
      <el-breadcrumb-item v-for="item in routers" :key="item.path" :to="{ path: item?.path }">
        {{item?.meta?.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import {computed, ref} from "vue";
import router from "../../router";

const routers = computed(()=>{
  // 过滤掉没有meta的
  return router.currentRoute.value.matched.filter(item=>item.meta.title)
})
</script>

<style scoped>

</style>