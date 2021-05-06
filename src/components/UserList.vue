<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="users">
      <div v-if="users && users.length > 0">
        <el-table :data="users" style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="created_at" label="创建日期">
            <template slot-scope="scope">
              {{ format(scope.created_at) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="role">
      <Role />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { apiService } from "../services";
import { format } from "../utils";
import Role from "./Role";
export default {
  data() {
    return {
      activeName: "users",
      users: [],
    };
  },
  components: {
    Role,
  },
  methods: {
    format,
    handleClick() {
      console.log(123123);
    },
    async getUserList() {
      const res = await apiService.getUserList();
      if (res && res.success) {
        this.users = res.data;
      }
    },
  },
  mounted() {
    this.getUserList();
  },
};
</script>
<style scoped>
</style>