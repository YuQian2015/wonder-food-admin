<template>
  <div>
    <el-button size="small" v-if="!showAdd" type="primary" @click="newDish"
      >新增菜肴</el-button
    >
    <div v-if="showAdd">
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
      <el-button size="small" @click="cancelAdd">取消</el-button>
      <el-button size="small" type="primary" @click="doAdd">提交</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <Empty
      v-if="productList && productList.length === 0"
      text="没有菜肴信息，点击新增创建吧~"
    />
    <div v-if="productList && productList.length">
      <el-table :data="productList">
        <el-table-column prop="id" width="100" label="ID"> </el-table-column>
        <el-table-column width="100" prop="images" label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 70px"
              :src="scope.row.images"
              :fit="'fill'"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="store.name" label="商家"> </el-table-column>
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
import Empty from "./Empty";
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
      productList: [],
      cover: null,
      uploadedCover: "",
      store: null,
      storeList: [],
      state: "",
    };
  },
  components: {
    Empty,
  },
  methods: {
    format,
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
    handleFileRemove() {
      this.cover = null;
    },
    handleFileChange(file) {
      this.cover = file;
    },
    async handleDelete(index, data) {
      await apiService.deleteProduct(data.id);
      this.productList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    cancelAdd() {
      this.showAdd = false;
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
        this.productList.unshift(res.data);
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
  async mounted() {
    const res = await apiService.getProduct();
    if (res && res.success) {
      this.productList = res.data;
    }
  },
};
</script>