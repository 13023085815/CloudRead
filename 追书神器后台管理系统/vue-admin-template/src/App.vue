<template>
  <div id="app">
    <!-- <button @click="add">提交</button> -->
    <router-view />
  </div>
</template>

<script>
import request from '@/utils/request.js'
const baseURL="http://localhost:3000"

// 请求中控服务器 获取歌单列表
export function fetchList(parms) {
   return request({
        url:`${baseURL}/playlist/list`,
        ...parms,
        method:"GET"
    })
}

export default {
  name: 'App',
  dataA() {
    return {
      isRouterAlive:true
    }
  },
  methods:{
    add() {
      request({
         url:`${baseURL}/playlist/add`,
         params:{
           name:"伏天氏"
         },
           method:"GET"
      })
    },

  }
}
</script>
