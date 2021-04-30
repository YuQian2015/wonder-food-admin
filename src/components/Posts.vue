<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="发帖管理" name="post">
      <NewPost />
      <div v-if="posts && posts.length">
        <el-card class="box-card" v-for="item in posts" :key="item.id">
          <div>
            {{ item.content }}
          </div>
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="banner">
      <el-button>添加banner</el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { apiService } from "../services";
import NewPost from "./NewPost.vue";
export default {
  components: {
    NewPost,
  },
  data() {
    return {
      activeName: "post",
      posts: [],
    };
  },
  methods: {
    handleClick() {
      console.log(123123);
    },
  },
  async mounted() {
    const res = await apiService.getPosts();
    if (res && res.success) {
      this.posts = res.data;
    }
  },
};
</script>
<style>
.box-card {
  margin-bottom: 10px;
}
</style>