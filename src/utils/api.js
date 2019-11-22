const API = {
  adminLogin: "common/adminLogin",//管理员登录
  getUserList: "api/user/getUserList",//获取用户管理列表
  changeAdminStatus: "api/user/changeAdminStatus",//修改用户状态
  addGoodsType: "api/goodsType/addGoodsType",//添加商品类别
  getTypeList: "api/goodsType/getTypeList",//获取类别列表
  getTypeActiveList: "api/goodsType/getTypeActiveList",//获取启用的商品类别列表
  deleteType: "api/goodsType/deleteType",//删除类别
  updateGoodsType: "api/goodsType/updateGoodsType",//更新类别
  addGoods: "api/goods/addGoods",//添加商品
  getGoodsList: "api/goods/getGoodsList",//获取商品列表
  updateGoods: "api/goods/updateGoods",//修改商品信息
  getOrderListAdmin: "api/order/getOrderListAdmin",//获取订单记录
  deleteOrder: "api/order/deleteOrder",//删除订单
  getStatics: "api/order/getStatics",//获取统计数据
}

export { API }