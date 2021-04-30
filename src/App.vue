<template>
  <div id="app">
    <el-container>
      <el-header
        style="
          background-color: rgb(238, 241, 246);
          text-align: right;
          font-size: 12px;
        "
      >
        <span style="line-height: 60px;">用户信息</span>
      </el-header>
      <el-container style="height: calc(100vh - 60px)">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)"
          ><Nav
        /></el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
  mounted() {
    window.addEventListener("token_invalid", () => {
      this.$router.replace("/login");
    });
  },
};
</script>
<style>
body {
  margin: 0;
}
</style>
