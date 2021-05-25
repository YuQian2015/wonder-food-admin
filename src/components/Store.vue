<template>
  <div>
    <div>
      <NewStore :onSave="handleSaveComplete" />
    </div>
    <Empty
      v-if="storeList && storeList.length === 0"
      text="没有商铺信息，点击新增创建吧~"
    />
    <div v-if="storeList && storeList.length">
      <el-table :data="storeList">
        <el-table-column prop="id" width="100" label="ID"> </el-table-column>
        <el-table-column width="100" prop="images" label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 70px"
              :src="scope.row.images"
              :fit="'fill'"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="tel" label="联系电话"> </el-table-column>
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
import NewStore from "./NewStore";
export default {
  data() {
    return {
      disabled: false,
      storeList: [],
    };
  },
  components: {
    Empty,
    NewStore,
  },
  methods: {
    format,
    async handleDelete(index, data) {
      await apiService.deleteStore(data.id);
      this.storeList.splice(index, 1);
    },
    handleSaveComplete(data) {
      this.storeList.unshift(data);
    },
  },
  async mounted() {
    const res = await apiService.getStore();
    if (res && res.success) {
      this.storeList = res.data;
    }
  },
};
</script>