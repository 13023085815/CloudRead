<template>
  <div>
    <el-table :data="playlist"  stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="author" label="作者" ></el-table-column>
      <el-table-column prop="category" label="类别"></el-table-column>
      <el-table-column prop="update_time" label="上传时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delate(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request.js";
const baseURL = "http://localhost:3000";
import { fetchList } from "@/api/playlist.js";
export default {
  data: function() {
    return {
      playlist: [],
      arr: [],
      count: 50,
      text: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // 通过发http请求 中控服务器 获取歌单列表
      fetchList({
        start: this.playlist.length,
        count: this.count
      })
        .then(res => {
          console.log();
          this.playlist = JSON.parse(res.data.resp_data).data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    delate(id) {
  
        var that=this
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: `${baseURL}/playlist/getById`,
            params: {
              id: id
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
  },
  props: ["add"],
  watch: {
    add(newVal, oldVal) {
      this.text = newVal;
    }
  },
  computed: {
    // Newitems() {
    //   var _this = this;
    //   var Newitems = [];
    //   _this.playlist.map(function(item) {
    //     if (
    //       item.author.search(_this.text) != -1 ||
    //       item.name.search(_this.text) != -1
    //     ) {
    //       Newitems.push(item);
    //     }
    //   });
    //   return Newitems;
    // }
  }
};
</script>
<style lang="" scoped>
</style>