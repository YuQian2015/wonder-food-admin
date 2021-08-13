<template>
  <div>
    <el-upload action="#" :before-upload="handleResize">
      <el-button size="small" type="primary">添加轮播图</el-button>
      <div slot="tip" class="el-upload__tip">
        只支持上传jpg/jpeg文件，建议尺寸640*320
      </div>
    </el-upload>
    <h3>图片裁剪</h3>
    <div class="image-container">
      <vueCropper
        ref="cropper"
        :autoCrop="true"
        :fixedBox="true"
        :img="option.img"
        :fixed="true"
        :fixedNumber="option.fixedNumber"
        :outputSize="option.size"
        :outputType="option.outputType"
        :autoCropWidth="640"
        :autoCropHeight="320"
      ></vueCropper>
    </div>
    <br />
    <el-button size="small" @click="startCrop">保存</el-button>
    <div v-if="data && data.length">
      <h3>已设置图片</h3>
      <div>
        <div v-for="item in data" :key="item.url" class="image-item">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.url"
            :fit="'fill'"
          ></el-image>
          <div class="image-item-cover">
            <i @click="removeBanner(item)" class="remove el-icon-delete"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="banners && banners.length">
      <h3>效果预览</h3>
      <div class="image-container2">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in banners" :key="item.url">
            <el-image :src="item.url" :fit="'scale-down'"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { apiService } from "../services";
export default {
  data() {
    return {
      data: [],
      banners: [],
      previewData: {},
      cropFile: null,
      option: {
        img: null,
        outputType: "jpeg",
        fixedNumber: [2, 1],
      },
    };
  },
  async mounted() {
    const res = await apiService.getSettings({
      type: "banner",
    });
    if (res && res.success && res.data) {
      this.banners = JSON.parse(res.data[0].data);
      this.data = this.banners;
    }
  },
  methods: {
    handleResize(file) {
      const url = URL.createObjectURL(file);
      // 将图片转换成blobUrl给裁剪元素
      this.option.img = url;
      return false;
    },

    startCrop() {
      this.$refs.cropper.getCropBlob((data) => {
        this.cropFile = data;
        this.doUpload();
      });
    },

    removeBanner(data) {
      const index = this.data.findIndex((item) => item.url === data.url);
      if (index > -1) {
        this.data.splice(index, 1);
        this.banners.splice(index, 1);
      }
    },

    async doUpload() {
      this.uploadedCover = "";
      if (this.cropFile) {
        const form = new FormData();
        form.append(
          "file",
          this.cropFile,
          new Date().getTime() + "." + this.cropFile.type.split("/")[1]
        );
        const res = await apiService.uploadImage(form);
        if (res && res.success) {
          this.data.push({
            url: res.data.url,
            link: "",
          });
          await apiService.createSetting({
            type: "banner",
            data: JSON.stringify(this.data),
          });
          this.clearData();
        }
      }
    },

    clearData() {},
  },
};
</script>
<style scoped>
.image-container {
  width: 700px;
  height: 380px;
}
.image-container2 {
  width: 640px;
  height: 320px;
}
.image-item {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin-right: 10px;
  margin-bottom: 10px;
}
.image-item-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.image-item .remove {
  color: white;
  cursor: pointer;
}
</style>