<template>
  <el-card class="article-edit">
      <el-form
          ref="ruleFormRef"
          :model="articleData"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleData.title" />
        </el-form-item>
        <el-form-item label="分类" prop="cate">
          <el-select v-model="articleData.cate" placeholder="分类" @change="changeCate">
            <el-option v-for="item in cateData" :label="item.name" :value="item.cate_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select
              v-model="tagValue"
              value-key="tag_id"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="标签"
          >
            <el-option
                v-for="item in tagOptions"
                :key="item.tag_id"
                :label="item.name"
                :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否原创" prop="type">
          <el-radio-group v-model="articleData.type">
            <el-radio :label="0">原创</el-radio>
            <el-radio :label="1">转载</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="articleData.author" />
        </el-form-item>
        <el-form-item label="来源" prop="sources">
          <el-input v-model="articleData.sources" />
        </el-form-item>
        <el-form-item label="摘要" prop="abstract">
          <el-input v-model="articleData.abstract" type="textarea"  :rows="10"/>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <Wangeditor :content="articleData.content"></Wangeditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">
            提交
          </el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getCateList, ArticleAdd, getTagList} from "../../../api/article";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ElMessage} from "element-plus";
import Wangeditor from "../../../components/editor/Wangeditor.vue";


const cateData = ref([])
const articleData = reactive({
  title: "",
  type: 0,
  author: "",
  sources: "",
  abstract: "",
  content: "",
  cate: "",
  cate_id: 0,
  tags: [],
})

const getCates = async () => {
  await getCateList().then(res => {
    cateData.value = res.data
    getTags()
  })
}

const getTags = async () => {
  let res = await getTagList()
  tagOptions.value = res.data
}

const rules = reactive({
  title: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 100, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  cate_id: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})


const tagValue = ref([])
const tagOptions = ref([
  {
    tag_id: 'HTML',
    name: 'HTML',
  },
  {
    tag_id: 'CSS',
    name: 'CSS',
  },
  {
    tag_id: 'JavaScript',
    name: 'JavaScript',
  },
])


const changeCate = (val) => {
  articleData.cate_id = val === "" ? 0 : val
  console.log('selectChange', articleData.cate_id)
}

const submitForm = async () => {
  for (const resKey in tagValue.value) {
    // 如果是新增内容，修改数据格式 tag_id 为 0
    if (typeof tagValue.value[resKey] === "string") {
      tagValue.value[resKey] = {tag_id: 0, name: tagValue.value[resKey]}
    }
  }
  articleData.tags = tagValue.value
  let res = await ArticleAdd(articleData)
  ElMessage({
    message: res.message,
    type: 'success',
  })
}

onMounted(()=>{
  getCates();
})
</script>

<style scoped>
</style>