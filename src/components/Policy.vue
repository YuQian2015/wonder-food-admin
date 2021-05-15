<template>
  <div>
    <el-button v-if="!showAdd" @click="showAdd = true" type="primary"
      >新增协议</el-button
    >
    <div v-if="showAdd">
      <el-input type="text" placeholder="协议名称" v-model="data.name">
      </el-input>
      <br />
      <br />
      <el-input type="text" placeholder="协议API" v-model="data.api">
      </el-input>
      <br />
      <br />
      <el-checkbox-group v-model="checkedMethods" @change="handleCheckedChange">
        <el-checkbox
          v-for="method in methods"
          :label="method.key"
          :key="method.key"
          >{{ method.name }}</el-checkbox
        >
      </el-checkbox-group>
      <br />
      <br />
      <el-button @click="hide">取消</el-button>
      <el-button @click="savePolicy" type="success">保存</el-button>
    </div>
    <div v-if="policies && policies.length">
      <el-table :data="policies">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="api" label="API"></el-table-column>
        <el-table-column prop="methods" label="Method"></el-table-column>
        <el-table-column width="160" label="操作">
          <template slot-scope="scope">
            <el-button disabled size="mini">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
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
      policies: null,
      checkedMethods: ["GET"],
      methods: [
        {
          name: "查询",
          key: "GET",
        },
        {
          name: "新增",
          key: "POST",
        },
        {
          name: "修改",
          key: "PUT",
        },
        {
          name: "删除",
          key: "DELETE",
        },
      ],
      showAdd: false,
    };
  },
  methods: {
    savePolicy() {
      if (this.checkedMethods.length === 0) {
        this.$message({
          message: "请选择协议内容",
        });
        return;
      }
      const dataMap = {
        GET: 1,
        POST: 2,
        PUT: 4,
        DELETE: 8,
      };
      let methods = 0;
      this.checkedMethods.forEach((element) => {
        methods = methods ^ dataMap[element];
      });
      const res = apiService.createPolicy({ methods, ...this.data });
      if (res && res.success) {
        this.showAdd = false;
        this.data = {};
        this.checkedMethods = ["GET"];
      }
    },
    hide() {
      this.showAdd = false;
      this.data = {};
    },
    handleCheckedChange(data) {
      console.log(data);
    },
    async handleDelete(index, data) {
      const res = await apiService.deletePolicy(data.id);
      if (res && res.success) {
        this.policies.splice(index, 1);
      }
    },
  },
  async mounted() {
    const res = await apiService.getPolicies();
    if (res && res.success) {
      this.policies = res.data;
    }
  },
};
</script>