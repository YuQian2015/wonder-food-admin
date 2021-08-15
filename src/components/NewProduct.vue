<template>
  <div>
    <el-button size="small" type="primary" @click="newDish">新增菜肴</el-button>
    <el-dialog title="新增菜肴" :visible.sync="showAdd" width="500px">
      <el-input v-model="data.name" placeholder="菜肴名称"></el-input>
      <br />
      <br />
      <el-input v-model="data.description" placeholder="简介"></el-input>
      <br />
      <br />
      <el-autocomplete
        style="width: 100%"
        v-model="state"
        value-key="name"
        :fetch-suggestions="querySearch"
        placeholder="选择商家"
        @select="handleSelect"
      ></el-autocomplete>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false" size="small">取消</el-button>
        <el-button type="success" @click="doAdd" size="small">保存</el-button>
      </span>
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
      data: {},
      showAdd: false,
      cover: null,
      uploadedCover: "",
      store: null,
      storeList: [],
      state: "",
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var storeList = this.storeList;
      var results = queryString
        ? storeList.filter(
            (store) =>
              store.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          )
        : storeList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      this.store = item;
    },
    async newDish() {
      this.showAdd = true;
      const res = await apiService.getStore();
      if (res && res.success) {
        this.storeList = res.data;
      }
    },
    showLimit() {
      this.$message({
        showClose: true,
        message: "最多选择1张图片",
        type: "error",
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleFileRemove() {
      this.cover = null;
    },
    handleFileChange(file) {
      this.cover = file;
    },
    async doAdd() {
      await this.doUpload();
      let data = {
        images: this.uploadedCover,
        ...this.data,
      };
      if (this.store) {
        data.store_id = this.store.id;
      }
      const res = await apiService.createProduct(data);
      if (res && res.success) {
        this.data = {};
        this.onSave && this.onSave(res.data);
      }
      this.showAdd = false;
      this.cover = null;
      this.store = null;
      this.state = null;
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