<template>
  <div>
    <el-drawer
      :visible.sync="showDrawer"
      :direction="direction"
      :before-close="handleClose"
      :show-close="false"
      size="100%"
    >
      <div style="text-align: center; width: 500px; margin: 200px auto">
        <el-button type="success" round @click="initSystem">立即创建</el-button>
        <br />
        <br />
        <el-alert
          center
          :closable="false"
          title="系统未设置初始账号，点击“立即创建”创建管理员和初始权限!"
          type="error"
        >
        </el-alert>
      </div>
    </el-drawer>
    <el-dialog
      title="登录/注册"
      :show-close="false"
      :visible="showCreateForm && !showDrawer"
    >
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="Email">
          <el-input placeholder="输入email" v-model="data.email"></el-input>
        </el-form-item>
        <el-form-item v-if="showCreateForm && !showLogin" label="用户名">
          <el-input placeholder="输入用户名" v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            placeholder="输入密码"
            type="password"
            v-model="data.password"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="showCreateForm && !showLogin" label="重复密码">
          <el-input
            placeholder="输入密码"
            type="password"
            v-model="data.repeatPassword"
          ></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button v-if="showLogin" type="primary" @click="onSubmit"
            >登录</el-button
          >
          <el-button
            v-if="showCreateForm && !showLogin"
            type="primary"
            @click="createAdmin"
            >创建超级管理员</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import localforage from "localforage";
import { apiService } from "../services";
export default {
  data() {
    return {
      showCreateForm: false,
      showLogin: false,
      showDrawer: false,
      direction: "ttb",
      data: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
    };
  },
  methods: {
    handleClose() {},
    initSystem() {
      this.showDrawer = false;
      this.showCreateForm = true;
    },
    async createAdmin() {
      const data = this.checkInput();
      if (!data) {
        return;
      }
      let res = await apiService.initSystem(data);
      if (res && res.success && res.data) {
        await localforage.setItem("token", res.data.token);
        this.$router.replace("/index");
      }
    },
    checkInput() {
      const { name, email, password, repeatPassword } = this.data;
      if (this.showLogin && (!email || !password)) {
        this.$message({
          showClose: true,
          message: "请填入必填信息！",
          type: "error",
        });
        return;
      }
      if (
        this.showCreateForm && !this.showLogin &&
        (!name || !email || !password || !repeatPassword)
      ) {
        this.$message({
          showClose: true,
          message: "请填入必填信息！",
          type: "error",
        });
        return;
      }
      return this.data;
    },
    async onSubmit() {
      const data = this.checkInput();
      if (!data) {
        return;
      }
      let res = await apiService.login(data);
      if (res && res.success && res.data) {
        await localforage.setItem("token", res.data.token);
        this.$router.replace("/index");
      }
    },
    showCreate() {
      this.showCreateForm = true;
    },
    returnLogin() {
      this.showCreateForm = false;
    },
  },
  async mounted() {
    const res = await apiService.system();
    if (res && res.success === false) {
      this.showDrawer = true;
      this.showCreateForm = false;
    } else {
      this.showCreateForm = true;
      this.showLogin = true;
    }
  },
};
</script>
