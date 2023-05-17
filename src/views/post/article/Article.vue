<template>
  <el-card class="article-search">
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="文章标题">
        <el-input v-model="search.title" placeholder="文章标题" />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="search.cate" clearable placeholder="全部" @change="selectChange" @clear="selectClear">
          <el-option v-for="item in cateData" :label="item.name" :value="item.cate_id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div>
      <router-link to="/article-add">
        <el-button type="primary" :icon="Plus">添加文章</el-button>
      </router-link>
    </div>
  </el-card>
  <el-card class="article-data">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="article_id" label="Id" width="60"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="category.name" label="分类" />
      <el-table-column prop="created_at" label="创建时间"/>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="item">
          <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
          <el-button link type="primary" size="small" @click="articleEdit(item.row.article_id)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination small background
          :page-size="page.page_size"
          :page-count="page.pages"
          :total="page.total"
          layout="prev, pager, next"
          v-model:current-page="page.current_page"
          @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import router from "../../../router";
import { Plus } from '@element-plus/icons-vue'
import {getArticleList, getCateList} from "../../../api/article.js";


const search = reactive({
  page: 1,
  page_size: 10,
  title: '',
  cate: '',
  cate_id: 0
})
const tableData = ref([])
const cateData = ref([])
const page = reactive({
  current_page: 0,
  page_size: 0,
  pages: 0,
  total: 0,
})


const getCates = async () => {
  let res = await getCateList()
  cateData.value = res.data
  console.log('分类列表', res.data)
}

const getArticles = async () => {
  let res = await getArticleList(search)
  tableData.value = res.data.list
  page.current_page = res.data.current_page
  page.page_size = res.data.page_size
  page.pages = res.data.pages
  page.total = res.data.total
  console.log('文章列表', res.data)
}
const handleCurrentChange = (val) => {
  search.page = val
  getArticles()
}
const selectChange = (val) => {
  search.cate = val
  search.cate_id = val === "" ? 0 : val
  console.log('selectChange', search.cate_id)
}
const selectClear = () => {
  console.log('selectClear')
}

const onSubmit = () => {
  getArticles()
  console.log('onSubmit')
}
const handleClick = () => {
  console.log('handleClick')
}
const articleEdit = (val) => {
  router.push('./article-edit/' + val)
  console.log('articleEdit'+val)
}

onMounted(()=>{
  getCates()
  getArticles()
})
</script>

<style scoped>
.article-data{
  margin-top: 10px;
}
.example-pagination-block {
  margin-top: 30px;
}
</style>