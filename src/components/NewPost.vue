<template>
  <div v-bind:style="{ padding: '10px 0', width: '100%' }">
    <el-input
      type="textarea"
      placeholder="说点什么"
      :autosize="{ minRows: 2, maxRows: 10 }"
      v-model="content"
      maxlength="500"
      show-word-limit
    >
    </el-input>
    <div v-bind:style="{ textAlign: 'left', marginTop: '10px' }">
      <el-button size="small" icon="el-icon-picture-outline" circle></el-button>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-s-promotion"
        @click="submit"
        >发布</el-button
      >
    </div>
  </div>
</template>
<script>
import { apiService } from "../services";
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    submit() {
      apiService.createPost({
        content: this.content,
      });
    },
  },
};
</script>