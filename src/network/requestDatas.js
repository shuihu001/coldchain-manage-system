import request from "./index"

//登录接口
export function login (loginForm){
  return request({
    url:"/api/login/admin",
    method:"post",
    data:{
      ...loginForm
    }
  })
}
//首页获取统计数据接口
// 1、获取汇总数据，type为1时需要传入companyId，state为订单状态3或5，返回该公司的汇总数据；type为2时不需要传入companyId，返回所有公司的汇总数据。
export function getOrderSum(type, state, companyId) {
  return request({
    url: `api/display/getOrderSummaryByState/${type}/${state}`,
    method: "post",
    data: {
      companyId
    }
  })
}
// 2、按天数返回数据，type=1时分公司查询，传入：daysNumber(要查几天的数据)、companyId；type=2时返回总数据；传入：daysNumber(要查几天的数据)；
export function getOrderSumByDay(type, daysNumber, companyId) {
  return request({
    url: `/api/display/getOrderNumberByDays/${type}`,
    method: "post",
    data: {
      daysNumber,
      companyId
    }
  })
}
// 3、按月数返回数据，type=1时分公司查询，传入：months(6/12)、companyId；type=2时返回总数据；传入：months(6/12)；
export function getOrderSumByMonth(type, months, companyId) {
  return request({
    url: `api/display/getOrderSummaryByMonth/${type}/${months}`,
    method: "post",
    data: {
      companyId
    }
  })
}
// 4、按日期返回数据，type=1时分公司查询；传入：date(YYYY-MM-DD)、companyId；type=2时返回总数据；传入：date(YYYY-MM-DD)
export function getOrderSumByDate(type, date, companyId) {
  return request({
    url: `api/display/getOrderSummaryDataOneDay/${type}`,
    method: "post",
    data: {
      date,
      companyId
    }
  })
}
// 5、
export function getEveryCompanyData() {
  return request({
    url: "api/display/getListCountByDifferentCompanies",
    method: "post",
  })
}

//公司账号根据订单状态和公司ID请求订单数据
export function getOrders(companyId, completeState) {
  return request({
    // url:"/api/display/goodOrder",
    url:"/api/display/companyGoodOrderList",
    method:"post",
    data:{
      companyId,
      completeState
    }
  })
}

//农业局
//根据订单状态请求订单数据(包含司机姓名)
export function getOrdersIncludeDriverName(creatorId, completeState) {
  return request({
    url: "/api/display/goodOrderListWithDriver",
    method: "post",
    data: {
      completeState,
      creatorId
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

//根据订单id获取订单信息(包含司机信息)
export function getSingleOrderInfo (id) {
  return request({
    url: "/api/data/getOrderInfoWithDriver",
    method: "post",
    data: {
      id
    }
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
//添加公司账号
export function addCompanyAccount(companyData) {
  return request({
    url: "/api/login/companyAccountRegistration",
    method: "post",
    data: {
      ...companyData
    }
  })
}
//获取所有公司账号信息
export function getCompanyAccount () {
  return request({
    url: "/api/login/getAllCompaniesAccount",
    method: "post"
  })
}

// 添加订单员账号
export function addCreatorAccount (creatorData) {
  return request({
    url: "/api/login/adminRegistration",
    method: "post",
    data: {
      ...creatorData
    }
  })
}
//获取公司所有订单员信息
export function getCreatorAccount (companyId) {
  return request({
    url: "/api/login/getAllAdmins",
    method: "post",
    data: {
      companyId
    }
  })
}
// 公司账号修改密码
export function companyAccountChangePassword(companyId, companyPassword) {
  return request({
    url: "/api/login/changeCompanyAccountPassword",
    method: "post",
    data: {
      companyId,
      companyPassword
    }
  })
}
//农业局账号修改密码
export function adminChangePassword(creatorId, password) {
  return request({
    url: "/api/login/changePassword",
    method: "post",
    data: {
      creatorId,
      password
    }
  })
}
// 获取图片接口
export function getFile (path) {
  return request({
    url: '/api/data/downloadFile',
    method: 'get',
    params: {
      path
    },
    responseType: 'blob'
  })
}
