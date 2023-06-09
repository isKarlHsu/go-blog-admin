<template>
  <Wangeditor :content.syc="about.content"  @editorData="editorData" v-if="getOk"></Wangeditor >
  <div class="sub-form">
    <el-button type="primary" @click="submitForm()">
      提交
    </el-button>
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import Wangeditor from "@/components/editor/Wangeditor.vue";
import {onMounted, reactive, ref} from "vue";
import {aboutEdit, getAbout} from "../../api/user";
import {ElMessage} from "element-plus";

const about = reactive({
  content: null
})
const getOk = ref(false)

const getAboutDetail = async () => {
  await getAbout().then(res => {
    about.content = res.data.value
    // 请求成功后再渲染子组件
    getOk.value = true
  })
}

const submitForm = async () => {
  console.log("提交", about)
  let res = await aboutEdit(about)
  ElMessage({
    message: res.message,
    type: 'success',
  })
}

const editorData = (val) => {
  about.content = val
}

onMounted(()=>{
  getAboutDetail();
})
</script>

<style>
.sub-form{
  margin: 10px;
}
</style>