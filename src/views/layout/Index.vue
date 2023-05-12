<template>
  <div class="menu">
    <Menu />
  </div>
  <div class="content">
    <Content />
  </div>
</template>

<script>
import Menu from "./menu/Menu.vue";
import Content from "./content/Content.vue";

export default {
  name: "Index",
  components: {Content, Menu}
}
</script>

<style scoped>
.menu{
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #337ecc;
}
.content{
  margin-left: 200px;
}
</style>