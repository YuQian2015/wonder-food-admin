<template>
  <div class="empty">{{ text || "暂无数据" }}</div>
</template>
<script>
export default {
  props: {
    text: String,
  },
};
</script>
<style scoped>
.empty {
  padding: 50px;
  background: #f9f9f9;
  color: #848484;
  font-size: 14px;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>