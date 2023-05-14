<template>
  <div class="header">
    <el-row>
      <el-col :span="4">111</el-col>
      <el-col :span="14">
        <div class="user-info">
          karlxu
        </div>
      </el-col>
    </el-row>
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