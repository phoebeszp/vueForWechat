<style lang="less" scoped>
.sale-management-vue {
  .search-area {
    overflow: hidden;
    .vux-search-box {
      float: left;
      width: 85%;
    }
    > span {
      width: 15%;
      text-align: center;
      color: #1FB922;
      line-height: 44px;
    }
  }
  .tab-navs {
    .vux-tab {
      height: 36px;
      .vux-tab-item {
        line-height: 36px;
      }
      .badge {
        margin-left: 4px;
      }
    }
  }
  .room-item {
    padding: 10px;
    font-size: 14px;
    em {
      color: #E44545;
      font-style: normal;
      margin: 0 2px;
    }
    .item-title {
      span {
        color: #1FB922;
      }
    }
    .item-order{
      color: #bbb;
      padding-bottom: 4px;
      span{
        color: #1FB922;
      }
    }
    .item-orderDetail{
      color: #bbb;
      span{
        color: #1FB922;
      }
    }
    .item-price {
      color: #bbb;
      padding-bottom: 4px;
    }
    .item-lost {
      padding-top: 4px;
      color: #a3a3a3;
      span {
        margin-left: 10px;
      }
    }
    .item-agent, .item-customer, .item-order, .item-orderDetail{
      padding: 8px 0;
      line-height: 28px;
      a {
        padding: 0 30px;
      }
    }
    .item-time {
      color: #bbb;
      padding: 4px 0;
      span {
        color: #1FB922;
      }
    }
    .item-detail {
      padding-top: 4px;
      .item-line {
        margin-bottom: 4px;
        span {
          color: #bbb;
        }
      }
      .item-mini {
        color: #bbb;
      }
    }
    .item-btns {
      overflow: hidden;
      .item-btn {
        font-size: 14px;
        margin-top: 6px;
        &.width60 {
          width: 60%;
        }
        &.width30 {
          width: 30%;
        }
      }
    }
  }
  .empty-tips {
    text-align: center;
    margin-top: 30px;
  }
}
</style>

<template>
  <div class="sale-management-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">{{orderMap[orderState]}}管理</x-header> -->
    <div class="vux-1px-b search-area">
      <search @on-submit="search" :auto-fixed="autoFixed" :value.sync="keyword"></search>
      <span class="right" @click="cancelSearch">取消</span>
    </div>
    <div class="tab-navs">
      <tab class="vux-1px-r" :line-width=1>
        <tab-item v-for="tab in tabs" :selected="tab.orderState==orderState" @click="changeTab(tab.orderState)">
          {{tab.orderStateName}}
        </tab-item>
      </tab>
      <tab class="vux-1px-r" :line-width=1>
        <tab-item :selected="!historyMode" @click="changeMode(false)">
          待处理
          <badge class="badge" :text="curTab.noDealCount+''"></badge>
        </tab-item>
        <tab-item :selected="historyMode" @click="changeMode(true)">{{historyModeText}}
          <badge class="badge" :text="curTab.dealCount+''"></badge>
        </tab-item>
      </tab>
    </div>
    <card v-for="(key, room) in rooms" >
      <div slot="content" class="room-item">
        <p class="item-title">{{room.roomName}}<span class="link right" @click="gotoDetail(room.roomId)">详情</span></p>
        <p class="item-price vux-1px-b">合租单间 · {{room.roomPrice}}元/月 · 预定金{{room.pre}}元</p>
        <template v-if="orderState == 1">
          <p class="item-order vux-1px-b">{{room.total}}条预约看房待处理
          <span class="link right" @click="expandOrcollapse(room)">{{room.orderShow}}</span></p>
          <ul v-show="room.show">
          <li v-for="order in room.list">
            <p class="item-agent vux-1px-b"><label>经纪人：</label>
            <span>{{room.agentName}}</span>
            <a class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:{{room.agentPhone}}">致电</a></p>
            <p class="item-customer vux-1px-b"><label>看房租客：</label>
            <span>{{order.bookedName}}</span></p>
            <p class="item-orderDetail vux-1px-b">{{order.orderTitle}}<span class="right" @click="gotoOrderDetail(order.orderId)">{{orderMap[orderState]}}单详情</span></p>
          </li>
          </ul>
        </template>
        <template v-if="orderState==2">
          <p class="item-time">{{room.orderTitle}}</p>
          <div class="item-btns">
            <ul >
             <li v-for="order in room.list">
              <p class="item-agent vux-1px-b" v-if="historyMode"><label>经纪人：</label>
                <span>{{room.agentName}}</span>
                <a class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:{{room.agentPhone}}">致电</a></p>
                 <p class="item-agent vux-1px-b" v-if="historyMode"><label>租客:</label>
                <span>{{order.bookedName}}</span></p>
              <p class="item-orderDetail vux-1px-b">{{order.orderTitle}}<span class="right" @click="gotoOrderDetail(order.orderId)">{{orderMap[orderState]}}单详情</span></p>
               <div v-if="!historyMode">
              <x-button class="item-btn weui_btn weui_btn_mini weui_btn_plain_primary left width60" @click="agreeSign(room.roomId, order.orderId, 1)">同意预定，收取定金</x-button>
              <x-button class="item-btn right width30" @click="agreeSign(room.roomId, order.orderId, 2)">拒绝</x-button>
              </div>
             </li>
             </ul>
            
          </div>
        </template>
        <template v-if="orderState==3">
          <p class="item-time">{{room.orderTitle}}</p>
           <ul >
             <li v-for="order in room.list">
               <p class="item-agent vux-1px-b" v-if="historyMode"><label>经纪人：</label>
                <span>{{room.agentName}}</span>
                <a class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:{{room.agentPhone}}">致电</a></p>
                 <p class="item-agent vux-1px-b" v-if="historyMode"><label>租客:</label>
                <span>{{order.bookedName}}</span>
                <a class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:{{room.agentPhone}}">致电</a></p>
              <p class="item-orderDetail vux-1px-b">{{order.orderTitle}}<span class="right" @click="gotoOrderDetail(order.orderId)">{{orderMap[orderState]}}单详情</span>
              </p>
              <div class="item-btns" v-if="!historyMode">
              <x-button class="item-btn weui_btn weui_btn_mini weui_btn_plain_primary left width60" @click="agreeSign(room.roomId, order.orderId, 1)">同意签约</x-button>
              <x-button class="item-btn right width30" @click="agreeSign(room.roomId, order.orderId, 2)">拒绝</x-button>
            </div>
             </li>
            </ul>
        </template>
      </div>
    </card>
    <p v-if="!rooms.length" class="empty-tips">暂无</p>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Search from 'vux-components/search'
import Tab from 'vux-components/tab'
import TabItem from 'vux-components/tab-item'
import Card from 'vux-components/card'
import Loading from 'vux-components/loading'
import Badge from 'vux-components/badge'
import XButton from 'vux-components/x-button'
import Request from '../../js/request'
import Manba from 'manba'
import Utils from '../../js/utils'

export default {
  data() {
    return {
      historyMode: false,
      orderState: 1,
      orderMap: {
        1: '预约',
        2: '预定',
        3: '签约',
      },
      historyOrderMode: {
        1: '预约已结束',
        2: '已预定',
        3: '已签约',
      },
      keyword: '',
      autoFixed: false,
      tabs: [],
      curTab: {
        dealCount: 0,
        noDealCount: 0
      },
      rooms: [{
        'list':[{
          'bookedName': 'test'
        }],
        'orderShow':'展开'
      }],
      loading: false,
      loadingText: '加载中...',
      historyModeText: '已预约'
    }
  },
  components: {
    XHeader,
    Group,
    Search,
    Tab,
    TabItem,
    Card,
    Loading,
    Badge,
    XButton
  },
  methods: {
    expandOrcollapse(room){
      room.show = !room.show;
      room.orderShow = room.orderShow==='收起'?'展开':'收起';
    },
    changeMode(historyMode) {
      if (this.historyMode == historyMode) return false;
      this.historyMode = historyMode;
      this.getListByState(this.orderState);
    },
    changeTab(tab) {
      let historyModeDict = {
        1: '已完成',
        2: '已预定', 
        3: '已签约'
      };
      const that = this;
      if (tab == this.orderState) {
        return false;
      }
      this.historyMode = false;
      this.orderState = tab;
      this.curTab = this.getTabInfo(tab);
      this.getListByState(tab);
      this.historyModeText = historyModeDict[tab];
    },
    getTabs() {
      let userInfo = Utils.getUserInfo();
      Request.Sale.getList(userInfo.id).then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          this.tabs = resp.body._body;
          this.curTab = this.getTabInfo(this.orderState);
          this.getListByState(this.orderState);
        }
      })
    },
    getTabInfo(orderState) {
      for (let tab of this.tabs) {
        if (tab.orderState == orderState) {
          return tab;
        }
      }
      return {};
    },
    getListByState(orderState) {
      const that = this;
      this.loading = true;
      this.rooms = [];
      let userInfo = Utils.getUserInfo();
      Request.Sale.getListByState(userInfo.id, this.historyMode, this.keyword, {
        orderType: orderState,
        dealState: this.historyMode?1:2
      }).then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          let rooms = resp.body._body;
          for(let index in rooms){
            rooms[index].show = false;
            rooms[index].orderShow = '展开';
          }
          that.rooms = rooms;
        }
        that.loading = false;
      })
    },
    gotoDetail(id) {
      this.$router.go(`/room-detail/${id}`);
    },
    gotoOrderDetail(id) {
      this.$router.go(`/order-detail/${this.orderState}/${id}/${this.historyMode}`);
    },
    agreeSign(roomId, id, type) {
      let user = Utils.getUserInfo(), that = this;
      Request.Sales.updateOrder(user.id, id, {
        orderId: id,
        orderType: this.orderState,
        type: type,
        userId: user.id,
        roomId: roomId
      }).then((resp)=>{
        that.getTabs();
      });
    },
    search() {
      if(this.keyword){
        this.getTabs();
      }
    },
    cancelSearch() {
      this.keyword = '';
      this.getTabs();
    }
  },
  ready() {
    Utils.changePageTitle(this.orderMap[this.orderState]);
    this.getTabs();
  }
}
</script>
