<template>
  <div class="agent-home-vue">
     <group class="combined-group" title="收入总览">
      <cell title="累计收入" link="/finance-management">
        <span slot="value">{{allIncome}}元</span>
      </cell>
      <cell title="今日收入：" link="/finance-management">
        <span slot="value">{{dayIncome}}元</span>
      </cell>
    </group>
    <group class="combined-group" title="房客接单">
      <cell title="我的订单" link="/agent-management">
        <span slot="value">{{orders}}</span>
      </cell>
      <cell title="新挂盘房源" link="/room-list">
        <span slot="value">{{newRooms}}</span>
      </cell>
    </group>
    <box gap="20px">
      <button class="weui_btn weui_btn_default" @click="addRoom">录入新订单</button>
    </box>
    <group title="通知中心">
      <ul class="notices">
        <li class="vux-1px-b" v-for="notice in notices" @click="gotoNoticeList(notice.messageType, notice.messageTypeId)">
          <p class="notice-title">{{notice.messageType}}<span class="right">{{notice.messageDate}}</span></p>
          <p class="notice-summary">{{notice.message}}</p>
        </li>
      </ul>
    </group>
   <!--  <group title="通知中心">
      <ul class="notices">
        <li class="vux-1px-b" >
          <p class="notice-title"><span>测试通知123</span></p>
          <p class="notice-summary">测试通知123</p>
        </li>
      </ul>
    </group> -->
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<script >
import Group from 'vux-components/group'
import Box from 'vux-components/box'
import Cell from 'vux-components/cell'
import Request from '../../js/request'
import Utils from '../../js/utils'
import Loading from 'vux-components/loading'
import Tabbar from 'vux-components/tabbar'
import TabbarItem from 'vux-components/tabbar-item'

export default{
  data(){
    return {
      "allIncome": '',
      "newRooms": '',
      "dayIncome": '',
      "orders": '',
      'notices': [],
    }
  },
  components: {
    Group,
    Box,
    Cell,
    Loading,
    Tabbar,
    TabbarItem,
    Request,
    Utils
  },
  methods: {
    addRoom() {
      this.$router.go('/opportunity');
    }
  },
  ready() {
    const that = this;
    Utils.changePageTitle.call(this);
    let userInfo = Utils.getUserInfo();
    that.loading= true;
    Request.Agent.get(userInfo.id).then((resp) => {
      that.loading = false;
      if (resp.body._status == 'SUCCESS') {
        that.allIncome = resp.body._body.allIncome;
        that.dayIncome = resp.body._body.dayIncome;
        that.newRooms = resp.body._body.newRooms;
        that.orders = resp.body._body.orders;
      }
    });
    Request.Holder.getNotices(userInfo.id).then((resp) => {
      if (resp.body._status == 'SUCCESS') {
        this.notices = resp.body._body;
      }
    });
  }
}
</script>
<style lang="less">
.agent-home-vue{
  .combined-group {
    .weui_cells {
      font-size: 13px;
      background: transparent;
      overflow: hidden;
      &:before, &:after {
        display: none;
      }
      .vux-tap-active {
        float: left;
        width: 46%;
        margin: 7px 2%;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 7px;
        background: #fff;
        &:before {
          display: none;
        }
      }
    }
  }
  .notices {
    li {
      padding: 10px 15px;
      .notice-title {
        span {
          color: #999;
        }
      }
      .notice-summary {
        font-size: 14px;
        margin-top: 5px;
        color: #888;
      }
    }
  }
}
</style>
