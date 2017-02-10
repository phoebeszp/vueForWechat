import Vue from 'vue'
import manba from 'manba'
import Utils from './utils'

//const api = process.env.NODE_ENV === 'production'?"www.youzhu.com":"http://121.40.86.144:8082/api";
const api = "http://121.40.86.144:8082/api";
const buildUrlParam = (param) => {
  if (!param || !Object.keys(param).length) return '';
  let html = '';
  for (let key in param) {
    html += `${key}=${param[key]}&`;
  }
  return html;
}
const setHeaders = function(){
  const userInfo = Utils.getUserInfo();
  if (userInfo && userInfo.type && userInfo.token) {
    Vue.http.options.headers = {
      'userId': userInfo.id || "",
      'userType': userInfo.type,
      'token': userInfo.token
    };
  }
}
const ajaxGet = function(url) {
  setHeaders();
  return Vue.resource(url).get();
}
const ajaxPost = function(url, param) {
  setHeaders();
  return Vue.resource(url).save(param, {
    "Content-Type": "application/x-www-form-urlencoded"
  });
}

const Request = {
  Common: {
    getQiniuToken: function() {
      return ajaxGet(`${api}/common/getQiniuToken`);
    },
    getVerifyCode: function(phoneNo) {
      return ajaxPost(`${api}/message/verifycode`, {phoneNo});
    },
    getProvinces: function() {
      return ajaxGet(`${api}/common/province/provinces`);
    },
    getCities: function() {
      return ajaxGet(`${api}/common/city/citys`);
    },
    getCityDistrict: function() {
      return ajaxGet(`${api}/common/cityDistincts/`);
    },
    getBusinessArea: function(districtId){
      return ajaxGet(`${api}/common/city/businessAera/${districtId}`);
    }
  },
  User: {
    bind: function(param) {
      return ajaxPost(`${api}/user/account`, param);
    },
    searchAgent: function(phoneNo) {
      return ajaxGet(`${api}/user/searchAgent/${phoneNo}`);
    },
    setTradePwd: function(parms) {
      return ajaxPost(`${api}/user/setTransPwd/`, parms);
    },
    queryTransPwd: function(userId, userType){
      return ajaxGet(`${api}/user/isTransPwdExist/?userId=${userId}&userType=${userType}`);
    },
    withdraw: function(id, parms){
      return ajaxPost(`${api}/wallet/cashOut`, parms);
    },
    withdrawRecord: function(page, count){
       return ajaxGet(`${api}/wallet/cashOutHistory/${page}/${count}`);
    },
    getWallet: function(id){
      return ajaxGet(`${api}/wallet/walletData`);
    },
    getwithDrawInfo: function(){

    }
  },
  Holder: {
    get: function(id) {
      return ajaxGet(`${api}/user/holder/${id}`);
    },
    getInfo: function(id) {
      return ajaxGet(`${api}/user/holderInfo/${id}`);
    },
    save: function(id, param) {
      return ajaxPost(`${api}/user/holder/${id}`, param);
    },
    bindAccount: function(param) {
      return ajaxPost(`${api}/user/account`, param);
    },
    getFinanceTotal: function(id, type) {
      const startDate = manba().add(-1, 7).format();
      const endDate = manba().format();
      return ajaxGet(`${api}/account/account/${id}`);
    },
    getFinanceDetail: function(userId, params){
      let urlParam = buildUrlParam(params);
      return ajaxGet(`${api}/account/accountCountList/${userId}?${urlParam}`);
    },
    getFinanceList: function(userId, params){
      let urlParam = buildUrlParam(params);
      return ajaxGet(`${api}/account/accountDetail/${userId}?${urlParam}`);
    },
    getBillDetail: function(billId, params) {
      let urlParam = buildUrlParam(params);
      return ajaxGet(`${api}/account/billDetail/${billId}?${urlParam}`);
    },
    getNotices: function(id) {
      return ajaxGet(`${api}/user/message/notices/${id}`);
    },
    getNoticeDetail: function(id, type, messageId) {
      return ajaxGet(`${api}/user/message/notices/detail/type?userId=${id}&messageType=${type}&messageTypeId=${messageId}`);
    }
  },
  Room: {
    getList: function(holderId, keyword) {
      keyword = keyword || '';
      return ajaxGet(`${api}/room/list/${holderId}?wd=${keyword}`);
      //return ajaxGet(`${api}/agent/room/list/1?orderId=0&page=1&limit=10`);
    },
    getListByState: function(holderId, keyword, param) {
      keyword = keyword || '';
      let urlParam = buildUrlParam(param);
      return ajaxGet(`${api}/room/roomStateList/${holderId}?wd=${keyword}&${urlParam}`);
    },
    get: function(holderId, roomId) {
      return ajaxGet(`${api}/room/roomDetail/${roomId}?userId=${holderId}`);
    },
    upsert: function(holderId, param) {
      param.userId = holderId;
      return ajaxPost(`${api}/room/addRoomOrUpdate`, param);
    },
    addPic: function(roomId, param) {
      return ajaxPost(`${api}/room/addRoomPic/${roomId}`, param);
    },
    updateRoomState: function(roomId, param) {
      return ajaxPost(`${api}/room/updateRoom/${roomId}`, param);
    },
    deleteRoom: function(roomId, param) {
      return ajaxPost(`${api}/room/deleteRoom/${roomId}`, param);
    },
    setPrice: function(roomId, param) {
      return ajaxPost(`${api}/room/setAgentPrice/${roomId}`, param);
    }
  },
  Sale: {
    getList: function(holderId, keyword = '') {
      keyword = keyword || '';
      const startDate = manba().add(-1, 7).format();
      const endDate = manba().add(3, 6).format();
      return ajaxGet(`${api}/order/orderlist/${holderId}?wd=${keyword}&startDate=${startDate}&endDate=${endDate}`);
    },
    getListByState: function(holderId, isHistoryMode = false, keyword = '', param) {
      keyword = keyword || '';
      param = param || {};
      param.startDate = manba().format();
      param.endDate = manba().add(3, 6).format();
      if (isHistoryMode) {
        param.startDate = manba().add(-1, 7).format();
        param.endDate = manba().format();
      }
      let urlParam = buildUrlParam(param);
      return ajaxGet(`${api}/order/orderTypelist/${holderId}?wd=${keyword}&${urlParam}`);
    },
    getRoomOrderHistory: function(holderId, roomId) {
      // TODO
    },
    getRoomReserveHistory: function(holderId, roomId) {
      // TODO
    },
    getBookOrderDetail: function(holderId, orderId) {
      return ajaxGet(`${api}/order/bookOrder/${orderId}?userId=${holderId}`);
    },
    getReserveOrderDetail: function(holderId, orderId) {
      return ajaxGet(`${api}/order/reserseOrder/${orderId}?userId=${holderId}`);
    },
    getSignOrderDetail: function(holderId, orderId) {
      return ajaxGet(`${api}/order/signOrder/${orderId}?userId=${holderId}`);
    },
    updateOrder: function(holderId, orderId, param) {
      param.userId = holderId;
      return ajaxPost(`${api}/order/updateOrder/${orderId}`, param);
    }
  },
  Agent: {
    peipan: function(agentId, orderId, roomId){
      return ajaxGet(`${api}/agent/order/configRoom/${agentId}/
        ?orderId=${orderId}&roomId=${roomId}`);
    },
    cancel: function(agentId, orderId, roomId){
      return ajaxGet(`${api}/agent/order/cancelConfigRoom/${agentId}/
        ?orderId=${orderId}&roomId=${roomId}`);
    },
    getList: function(id, params){
      return ajaxGet(`${api}/agent/order/orderlist/${id}`);
    },
    getListByState: function(agentId, keyword, param) {
      keyword = keyword || '';
      param = param || {};
      param.startDate = '2016-12-01';
      param.endDate = '2017-12-01';
      let urlParam = buildUrlParam(param);
      return ajaxGet(`${api}/agent/order/orderlist/${agentId}?wd=${keyword}&${urlParam}`);
    },
    get: function(id) {
      return ajaxGet(`${api}/user/agentHome/${id}`);
    },
    addOpportunity: function(param){
      return ajaxPost(`${api}/agent/order/addUserOrder`, param);
    },
    getOpportunity:function(id){
      return ajaxGet(`${api}/agent/order/orderdetail/${id}`);
    },
    getRooms: function(agentId, keyword, param){
      keyword = keyword || '';
      param = param || {};
      let urlParam = buildUrlParam(param);
      return ajaxGet(`${api}/agent/room/list/${agentId}?wd=${keyword}&${urlParam}`);
    }
  }
}

export default Request;
