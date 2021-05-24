<template>
  <div>
    <div v-if="users && users.length > 0">
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="role.name" label="角色"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="created_at" label="创建日期">
          <template slot-scope="scope">
            {{ format(scope.created_at) }}
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑角色</el-button
            >
            <el-button disabled size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="用户角色"
      :visible.sync="dialogTableVisible"
      width="300px"
    >
      <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
      <h3>角色</h3>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveChange">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { apiService } from "../services";
import { format } from "../utils";
export default {
  data() {
    return {
      activeName: "users",
      dialogTableVisible: false,
      users: [],
      options: [],
      value: "",
    };
  },
  methods: {
    format,
    async saveChange() {
      console.log(this.index);
      console.log(this.value);
      const res = await apiService.updateUserInfo({
        role_id: this.value,
      });
      if (res && res.success) {
        this.dialogTableVisible = false;
        this.users[this.index].role = this.options.find(
          (item) => item.id === this.value
        );
      }
    },
    async handleEdit(index, data) {
      this.value = data.role ? data.role.id : "";
      this.index = index;
      const res = await apiService.getRoles();
      if (res && res.success) {
        this.options = res.data;
        this.dialogTableVisible = true;
      }
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