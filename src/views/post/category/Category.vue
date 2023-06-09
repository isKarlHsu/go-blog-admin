<template>
  <el-card>
    <div class="custom-tree-node" v-for="cate in cateData">
      <h2>{{ cate.name }}</h2>
      <el-button link type="primary" size="small" @click="cateEdit(cate)">Edit</el-button>
    </div>
  </el-card>

  <el-dialog v-model="dialogFormVisible" title="修改分类名">
    <el-form :model="cateFrom">
      <el-form-item label="分类名" :label-width="formLabelWidth">
        <el-input v-model="cateFrom.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click=submitForm>提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {CateEdit, getCateList} from "../../../api/article";
import {ElMessage} from "element-plus";

const cateData = ref([])

const getCates = async () => {
  await getCateList().then(res => {
    cateData.value = res.data
  })

}

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

onMounted(()=>{
  getCates();
})

const cateFrom = ref([])

const cateEdit = (cate) => {
  dialogFormVisible.value = true
  cateFrom.value = cate
}

const submitForm = async () => {
  let res = await CateEdit(cateFrom.value)
  ElMessage({
    message: res.message,
    type: 'success',
  })
  dialogFormVisible.value = false
}

</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>