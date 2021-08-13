<template>
  <div>
    <el-button size="small" type="primary" @click="showAdd = true"
      >新增商家</el-button
    >
    <el-dialog title="新增商家" :visible.sync="showAdd" width="500px">
      <el-input v-model="data.name" placeholder="商家名称"></el-input>
      <br />
      <br />
      <el-input v-model="data.description" placeholder="简介"></el-input>
      <br />
      <br />
      <el-input v-model="data.tel" placeholder="电话"></el-input>
      <br />
      <br />
      <el-autocomplete
        style="width: 100%"
        v-model="data.address"
        :fetch-suggestions="querySearch"
        placeholder="地址"
        :trigger-on-focus="false"
        @select="handleSelect"
        value-key="name"
        :debounce="500"
        :highlight-first-item="true"
      >
      </el-autocomplete>
      <br />
      <br />
      <div style="width: 100%; height: 100px">
        <amap cache-key="home-map" ref="myMap" :zoom="12" :center="position">
          <amap-marker :position="position" />
        </amap>
      </div>
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
import { loadPlugins } from "@amap/amap-vue";
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
      position: [116.397755, 39.903179],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      this.ac.search(queryString, (status, result) => {
        console.log(result);
        if (status === "complete" && result.info === "OK" && result.tips) {
          cb(result.tips);
        } else {
          cb([]);
        }
      });
    },
    handleSelect(item) {
      if (item.location) {
        this.position = [item.location.lng, item.location.lat];
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
  async mounted() {
    await loadPlugins(["AMap.AutoComplete"]);
    const AMap = window["AMap"];
    this.ac = new AMap.AutoComplete();
  },
};
</script>
