import request from "./index"
//根据订单状态请求订单数据
export function getOrders(completeState) {
  return request({
    url:"/api/display/goodOrder",
    method:"post",
    data:{
      completeState
    }
  })
}

//请求司机信息
export function getDriver(driverId) {
  return request({
    method:"post",
    url:"/api/display/driver",
    // params:""
    data:{
      driverId
    }
  })
}
//根据订单id请求单个订单数据

// export function getOrderData(orderId) {
//   return request({
//     url:"",
//     method:"",
//     params:{
//       orderId
//     }
//   })
// }
//请求车辆全程所有状态
export function getCarState(orderId) {
  return request({
    url:"/api/display/allCarState",
    method:"post",
    data:{
      "id":orderId
    }
  })
}

//请求车辆当前状态
export function getLatestCarState(orderId) {
  return request({
    url:"/api/send/carState",
    method:"post",
    data:{
      orderId
    }
  })
}

//请求所有异常订单信息
export function getErrorOrders() {
  return request({
    url:"api/errorOrder/showAll",
    method:"post",
  })
}


//请求单个异常订单信息
export function getErrorOrderData(orderId) {
  return request({
    url:"api/errorOrder/anOrder",
    method:"post",
    data:{
      orderId
    }
  })
}

//首页用到的函数
export function errData(query) {
  return request({
    url: '/api/errorOrder/showAll',
    method: 'post',
    params: query
  });
};
