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
          <el-select v-model="articleData.cate" placeholder="全部" @change="selectChange" @clear="selectClear">
            <el-option v-for="item in cateData" :label="item.name" :value="item.cate_id" />
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
          <div style="border: 1px solid #ccc">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 500px; overflow-y: hidden;"
                v-model="articleData.content"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Update
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script setup>
import {onBeforeUnmount, onMounted, reactive, ref, shallowRef} from 'vue'
import router from "../../../router";
import {getArticleDetail, getCateList} from "../../../api/article";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()

// 内容 HTML
// const valueHtml = ref('<p>hello</p>')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...', MENU_CONF:{} }
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/admin/upload/image',
  fieldName: 'uploaded-image',
  // 上传之前触发
  onBeforeUpload(file) {    // JS 语法
    // file 选中的文件，格式如 { key: file }
    return file

    // 可以 return
    // 1. return file 或者 new 一个 file ，接下来将上传
    // 2. return false ，不上传这个 file
  },

  // 上传进度的回调函数
  onProgress(progress) {
    // progress 是 0-100 的数字
    console.log('progress', progress)
  },

  // 单个文件上传成功之后
  onSuccess(file, res) {
    console.log(`${file.name} 上传成功`, res)
  },

  // 单个文件上传失败
  onFailed(file, res) {
    console.log(`${file.name} 上传失败`, res)
  },

  // 上传错误，或者触发 timeout 超时
  onError(file, err, res) {
    console.log(`${file.name} 上传出错`, err, res)
  },
}

editorConfig.MENU_CONF['codeSelectLang'] = {
  // 代码语言
  codeLangs: [
    { text: 'CSS', value: 'css' },
    { text: 'HTML', value: 'html' },
    { text: 'XML', value: 'xml' },
    { text: 'PHP', value: 'php' },
    // 其他
  ]
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const article_id = parseInt(router.currentRoute.value.params.article_id)
const cateData = ref([])
const articleData = reactive({
  article_id: article_id,
  title: "",
  type: 0,
  author: "",
  sources: "",
  abstract: "",
  content: "",
  cate: "",
  cate_id: 0,
})

const getCates = async () => {
  let res = await getCateList()
  cateData.value = res.data
  console.log('分类列表', res.data)
}

const getArticle = async () => {
  let res = await getArticleDetail({article_id : article_id})
  articleData.title = res.data.title
  articleData.cate_id = res.data.cate_id
  articleData.cate = cateData.value[res.data.cate_id-1].name
  articleData.type = res.data.type
  articleData.author = res.data.author
  articleData.sources = res.data.sources
  articleData.abstract = res.data.abstract
  articleData.content = res.data.content
  console.log('文章内容', articleData)
}
const ruleFormRef = ref()
const rules = reactive({
  title: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
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

onMounted(()=>{
  getCates();
  getArticle()
})
</script>

<style scoped>
</style>