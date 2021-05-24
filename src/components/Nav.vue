<template>
  <el-menu
    :default-active="page"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <span>社区管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="index">
          <i class="el-icon-star-off"></i>
          <span>发帖管理</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <i class="el-icon-reading"></i>
          <span>配置管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>商家列表</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="store">
          <i class="el-icon-position"></i>
          <span>商家列表</span>
        </el-menu-item>
        <el-menu-item index="dish">
          <i class="el-icon-dish"></i>
          <span>菜肴管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="users">
          <i class="el-icon-user"></i>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="roles">
          <i class="el-icon-thumb"></i>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="polices">
          <i class="el-icon-open"></i>
          <span>协议管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
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
  methods: {},

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
