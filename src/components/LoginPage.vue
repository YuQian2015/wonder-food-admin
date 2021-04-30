<template>
  <div>
    <el-dialog
      title="登录/注册"
      :close-on-click-modal="false"
      :show-close="false"
      :visible.sync="dialogTableVisible"
    >
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="Email">
          <el-input placeholder="输入email" v-model="data.email"></el-input>
        </el-form-item>
        <el-form-item v-if="showCreateForm" label="用户名">
          <el-input placeholder="输入用户名" v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="输入密码" v-model="data.password"></el-input>
        </el-form-item>
        <el-form-item v-if="showCreateForm" label="重复密码">
          <el-input
            placeholder="输入密码"
            v-model="data.repeatPassword"
          ></el-input>
        </el-form-item>
        <el-button v-if="!showCreateForm" type="primary" @click="onSubmit"
          >登录</el-button
        >
        <el-button v-if="showCreateForm" type="primary" @click="onSubmit"
          >立即注册</el-button
        >
        <br />
        <el-button v-if="!showCreateForm" type="text" @click="showCreate"
          >创建用户</el-button
        >
        <el-button v-if="showCreateForm" type="text" @click="returnLogin"
          >返回登录</el-button
        >
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
      dialogTableVisible: true,
      showCreateForm: false,
      data: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const { name, email, password, repeatPassword } = this.data;
      if (!this.showCreateForm && (!email || !password)) {
        this.$message({
          showClose: true,
          message: "请填入必填信息！",
          type: "error",
        });
        return;
      }
      if (
        this.showCreateForm &&
        (!name || !email || !password || !repeatPassword)
      ) {
        this.$message({
          showClose: true,
          message: "请填入必填信息！",
          type: "error",
        });
        return;
      }
      let res = this.showCreateForm
        ? await apiService.register(this.data)
        : await apiService.login(this.data);
      if (res && res.success && res.data) {
        console.log(res.data.token);
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
};
</script>
