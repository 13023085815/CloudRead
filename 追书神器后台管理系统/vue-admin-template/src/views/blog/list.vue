<template>
  <div>
    <el-table :data="say" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="用户头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.url" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户"></el-table-column>
      <el-table-column prop="text" label="评论"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="eq(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
import { fetchList } from "@/api/say.js";
import request from "@/utils/request.js";
const baseURL = "http://localhost:3000";
export default {
  data: function() {
    return {
      say: [],
      count: 50
    };
  },
  created() {
    this.getsay();
  },
  methods: {
    getsay() {
      // 通过发http请求 中控服务器 获取歌单列表
      fetchList()
        .then(res => {
          console.log(JSON.parse(res.data.res.resp_data).data);
          this.say = JSON.parse(res.data.res.resp_data).data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    eq(a) {
                var that=this
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        request({
            url: `${baseURL}/blog/del`,
            params: {
              id: a
            },
            method: "GET"
          }).then(res => {
            if (res.code == 20000) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
           location.reload()
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });


   

















    }
  }
};
</script>
<style lang="" scoped>
</style>