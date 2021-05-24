<template>
  <div>
    <el-button
      size="small"
      v-if="!showAdd"
      type="primary"
      @click="showAdd = true"
      >新增商家</el-button
    >
    <el-dialog title="新增商家" :visible.sync="showAdd" width="500px">
      <div v-if="showAdd">
        <el-input v-model="data.name" placeholder="商家名称"></el-input>
        <br />
        <br />
        <el-input v-model="data.description" placeholder="简介"></el-input>
        <br />
        <br />
        <el-input v-model="data.tel" placeholder="电话"></el-input>
        <br />
        <br />
        <el-input v-model="data.address" placeholder="地址"></el-input>
        <br />
        <br />
        <el-upload
          :limit="1"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-exceed="showLimit"
          :on-change="handleFileChange"
          :on-remove="handleFileRemove"
          ref="upload"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <br />
        <el-button size="small" @click="showAdd = false">取消</el-button>
        <el-button size="small" type="primary" @click="doAdd">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
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
      dialogImageUrl: "",
      dialogVisible: false,
      showAdd: false,
      cover: null,
      uploadedCover: "",
      data: {},
    };
  },
  methods: {
    showLimit() {
      this.$message({
        showClose: true,
        message: "最多选择1张图片",
        type: "error",
      });
    },
    handleFileRemove() {
      this.cover = null;
    },
    handleFileChange(file) {
      this.cover = file;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async doAdd() {
      await this.doUpload();
      const res = await apiService.createStore({
        images: this.uploadedCover,
        ...this.data,
      });
      if (res && res.success) {
        this.data = {};
        this.onSave && this.onSave(res.data);
      }
      this.showAdd = false;
      this.cover = null;
      this.uploadedCover = "";
    },
    async doUpload() {
      const file = this.cover && this.cover.raw;
      this.uploadedCover = "";
      if (file) {
        const form = new FormData();
        form.append(
          "file",
          file,
          new Date().getTime() + "." + file.type.split("/")[1]
        );
        const res = await apiService.uploadImage(form);
        if (res && res.success) {
          this.uploadedCover = res.data.url;
        }
      }
    },
  },
};
</script>
