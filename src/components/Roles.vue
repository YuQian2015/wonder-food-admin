<template>
  <div>
    <el-button v-if="!showAdd" @click="addRole" type="primary" size="small"
      >新增角色</el-button
    >
    <div v-if="showAdd">
      <el-input type="text" placeholder="角色名称" v-model="data.name">
      </el-input>
      <br />
      <br />
      <el-input type="text" placeholder="角色标识(英文字母)" v-model="data.key">
      </el-input>
      <br />
      <br />
      <el-button @click="hide">取消</el-button>
      <el-button @click="saveRole" type="success">保存</el-button>
    </div>
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
export default {
  data() {
    return {
      data: {},
      showAdd: false,
      roleList: [],
    };
  },
  methods: {
    addRole() {
      this.showAdd = true;
    },
    hide() {
      this.showAdd = false;
    },
    async saveRole() {
      const res = await apiService.createRole(this.data);
      if (res && res.success) {
        this.data = {};
        this.roleList.unshift(res.data);
        this.showAdd = false;
      }
    },
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
  },
  mounted() {
    this.getRoles();
  },
};
</script>
