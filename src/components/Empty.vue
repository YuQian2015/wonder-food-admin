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
  background: #f1f1f1;
  color: #969799;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>