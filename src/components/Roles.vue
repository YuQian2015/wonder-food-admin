<template>
  <div>
    <NewRole :onSave="handleSaveComplete" />
    <div v-if="roleList && roleList.length">
      <el-table :data="roleList">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="key" label="角色标识"></el-table-column>
        <el-table-column prop="system" label="类型">
          <template slot-scope="scope">
            <div v-if="scope.row.system">系统预设</div>
            <div v-if="!scope.row.system">后台创建</div>
          </template>
        </el-table-column>
        <el-table-column width="160" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.system"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { apiService } from "../services";
import NewRole from "./NewRole";
export default {
  data() {
    return {
      roleList: [],
    };
  },
  components: {
    NewRole,
  },
  methods: {
    async getRoles() {
      const res = await apiService.getRoles();
      if (res && res.success) {
        this.roleList = res.data;
      }
    },
    async handleDelete(index, data) {
      const res = await apiService.deleteRole(data.id);
      if (res && res.success) {
        this.roleList.splice(index, 1);
      }
    },
    handleSaveComplete(data) {
      this.roleList.unshift(data);
    },
  },
  mounted() {
    this.getRoles();
  },
};
</script>
