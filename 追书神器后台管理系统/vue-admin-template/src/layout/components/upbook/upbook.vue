<template>
  <div>
    <div class="top">
      <el-input placeholder="请输入要上传的小说名称" @change="submit"  v-model="input5">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-table :data="newList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="category" label="类别"></el-table-column>
      <el-table-column prop="update_time" label="上传时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>

      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Loading } from 'element-ui';
import request from '@/utils/request.js'
const baseURL="http://localhost:3000"
export default {
  data() {
    return {
        input5:"",
        newList:[]
    };
  },
  methods: {
       open1() {
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success'
        });
      },
       open4() {
        this.$notify.error({
          title: '失败',
          message: '未搜到该小说'
        });
      
    },
      submit() {
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
       request({
         url:`${baseURL}/playlist/add`,
         params:{
           name:this.input5
         },
           method:"GET"
      }).then((res)=>{
           loading.close();
          if(res.codes==200) {
              this.open1()
          }else {
               loading.close();
              this.open4()
          }
      })
      }
  },
  watch:{
      
  }
};
</script>

<style scoped>
.top {
  background-color: red;
  height: 100%;
  width: 25%;
  margin: 0 auto;
  margin-top: 5px;
}
</style>