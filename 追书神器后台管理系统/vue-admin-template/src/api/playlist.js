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