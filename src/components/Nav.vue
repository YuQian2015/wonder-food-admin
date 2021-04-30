<template>
  <el-menu
    :default-active="page"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="index">
      <i class="el-icon-star-off"></i>
      <span slot="title">社区管理</span>
    </el-menu-item>
    <el-menu-item index="store">
      <i class="el-icon-position"></i>
      <span slot="title">商家列表</span>
    </el-menu-item>
    <el-menu-item index="dish">
      <i class="el-icon-dish"></i>
      <span slot="title">菜肴管理</span>
    </el-menu-item>
    <el-menu-item index="users">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
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
