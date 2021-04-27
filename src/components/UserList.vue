<template>
  <el-container>
    <!-- <el-aside width="200px">Aside</el-aside> -->
    <el-main>
      <div v-if="users && users.length > 0">
        <el-table :data="users" style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="created_at" label="创建日期"></el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { apiService } from "../services";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUserList() {
      const res = await apiService.getUserList();
      console.log(res.data);
      if (res && res.success) {
        this.users = res.data;
        console.log(this.users);
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