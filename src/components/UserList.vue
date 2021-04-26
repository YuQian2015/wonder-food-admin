<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <div>
        <div>用户列表</div>
        <div v-if="users && users.length > 0">
          <el-table :data="users" style="width: 100%">
            <el-table-column prop="id" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="email" label="日期"></el-table-column>
            <el-table-column
              prop="created_at"
              label="创建日期"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { getUserList } from "../services/request";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUserList() {
      const res = await getUserList();
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