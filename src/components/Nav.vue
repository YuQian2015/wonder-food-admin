<template>
  <el-menu
    :default-active="page"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="index">社区帖子</el-menu-item>
    <el-menu-item index="users">用户列表</el-menu-item>
    <el-menu-item index="bus">商家列表</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      page: "index",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.replace(`/${key}`);
    },
  },

  mounted() {
    const { name } = this.$route;
    switch (name) {
      case "user-list":
        this.page = "users";
        return;
      case "index":
        this.page = "index";
        return;
    }
  },
};
</script>
