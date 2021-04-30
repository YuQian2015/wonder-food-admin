<template>
  <div>
    <div>
      <el-button v-if="!showAdd" type="primary" @click="newStore"
        >新增商家</el-button
      >
      <div v-if="showAdd">
        <el-input v-model="data.name" placeholder="商家名称"></el-input>
        <br />
        <br />
        <el-input v-model="data.description" placeholder="简介"></el-input>
        <br />
        <br />
        <el-input v-model="data.address" placeholder="地址"></el-input>
        <br />
        <br />
        <el-input v-model="data.tel" placeholder="电话"></el-input>
        <br />
        <br />
        <el-upload
          :limit="2"
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
        <el-button @click="cancelAdd">取消</el-button>
        <el-button type="primary" @click="doAdd">提交</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <div v-if="storeList && storeList.length">
      <el-table :data="storeList">
        <el-table-column prop="id" label="商家ID"> </el-table-column>
        <el-table-column width="100" prop="images" label="封面">
          <template slot-scope="scope">
            <img style="width: 70px; height: 70px" :src="scope.row.images" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="tel" label="联系电话"> </el-table-column>
        <el-table-column prop="created_at" label="日期">
          <template slot-scope="scope">
            {{ format(scope.created_at) }}
          </template>
        </el-table-column>
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
import { format } from "../utils";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      data: {},
      showAdd: false,
      storeList: [],
      cover: null,
      uploadedCover: "",
    };
  },
  methods: {
    format,
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
    async handleDelete(index, data) {
      await apiService.deleteStore(data.id);
      this.storeList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    newStore() {
      this.showAdd = true;
    },
    cancelAdd() {
      this.showAdd = false;
    },
    async doAdd() {
      await this.doUpload();
      const res = await apiService.createStore({
        images: this.uploadedCover,
        ...this.data,
      });
      if (res && res.success) {
        this.data = {};
        this.storeList.unshift(res.data);
      }
      this.showAdd = false;
      this.cover = null;
      this.uploadedCover = "";
    },

    async doUpload() {
      const file = this.cover.raw;
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
  async mounted() {
    const res = await apiService.getStore();
    if (res && res.success) {
      this.storeList = res.data;
    }
  },
};
</script>