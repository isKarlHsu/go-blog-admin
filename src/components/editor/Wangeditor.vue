<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="data.content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import {onBeforeUnmount, shallowRef} from "vue";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const data = defineProps({
  content:{
    type: String,
    default: ""
  }
})

const editorRef = shallowRef()

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
</script>

<style scoped>

</style>