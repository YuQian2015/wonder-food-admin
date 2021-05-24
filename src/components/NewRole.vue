<template>
  <div>
    <el-button type="primary" size="small" @click="showAdd = true"
      >新增角色</el-button
    >
    <el-dialog title="新增角色" :visible.sync="showAdd" width="500px">
      <el-input type="text" placeholder="角色名称" v-model="data.name">
      </el-input>
      <br />
      <br />
      <el-input type="text" placeholder="角色标识(英文字母)" v-model="data.key">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false" size="small">取消</el-button>
        <el-button type="success" @click="saveRole" size="small"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { apiService } from "../services";
export default {
  props: {
    onSave: Function,
  },
  data() {
    return {
      data: {},
      showAdd: false,
    };
  },
  methods: {
    async saveRole() {
      if (!this.data.name) {
        this.$message({
          showClose: true,
          message: "请输入角色名称",
          type: "error",
        });
        return;
      }
      if (!this.data.key) {
        this.$message({
          showClose: true,
          message: "请输入角色标识",
          type: "error",
        });
        return;
      }
      const res = await apiService.createRole(this.data);
      if (res && res.success) {
        this.data = {};
        this.onSave && this.onSave(res.data);
        this.showAdd = false;
      }
    },
  },
};
</script>