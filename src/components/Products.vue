<template>
  <div>
    <NewProduct :onSave="handleSaveComplete" />
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
import NewProduct from "./NewProduct";
import { apiService } from "../services";
import { format } from "../utils";
export default {
  data() {
    return {
      disabled: false,
      productList: [],
    };
  },
  components: {
    Empty,
    NewProduct,
  },
  methods: {
    format,
    async handleDelete(index, data) {
      await apiService.deleteProduct(data.id);
      this.productList.splice(index, 1);
    },
    handleSaveComplete(data) {
      this.productList.unshift(data);
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