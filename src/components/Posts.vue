<template>
  <div>
    <NewPost />
    <div v-if="posts && posts.length">
      <el-card class="box-card" v-for="item in posts" :key="item.id">
        <div>
          {{ item.content }}
        </div>
      </el-card>
    </div>
  </div>
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
      posts: [],
    };
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