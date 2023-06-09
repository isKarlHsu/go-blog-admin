<template>
  <el-card>
    <el-tag class="article-tag" v-for="tag in tagData">
      <h4>{{ tag.name }}</h4>
    </el-tag>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getTagList} from "../../../api/article";

const tagData = ref([])

const getTags = async () => {
  let res = await getTagList()
  tagData.value = res.data
}

onMounted(()=>{
  getTags();
})
</script>

<style scoped>
.article-tag{
  margin: 5px;
}
</style>