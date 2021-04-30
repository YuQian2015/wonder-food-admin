<template>
  <div id="app">
    <el-container>
      <el-header class="top-nav">
        <div class="logo">
          <img alt="Vue logo" style="float: left" src="./assets/logo.png" />
        </div>
        <div class="sys-title">搵食后台管理系统</div>
        <div class="user-info">用户信息</div>
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
.top-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px #CCCCCC;
}
.logo {
  padding: 10px;
}
.sys-title {
  flex: 1;
  line-height: 60px;
}
.logo img {
  width: 40px;
  height: 40px;
}
.logo .user-info {
  line-height: 60px;
}
</style>
