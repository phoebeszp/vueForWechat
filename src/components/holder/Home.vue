<template>
  <div class="holder-home-vue">
    <!-- <x-header :left-options="{showBack: false}">房东首页</x-header> -->
    <group class="combined-group" title="资产状况">
      <cell title="总收入：" link="/finance-management">
        <span slot="value">{{allIncome}}元</span>
      </cell>
      <cell title="今日收入：" link="/finance-management">
        <span slot="value">{{dayIncome}}元</span>
      </cell>
    </group>
    <group class="combined-group" title="待处理">
      <cell title="预约看房：" link="/sale-management/1">
        <span slot="value">{{reverseLookCount}}</span>
      </cell>
      <cell title="预定待确认：" link="/sale-management/2">
        <span slot="value">{{bookNodealCount}}</span>
      </cell>
      <cell title="预定待签约：" link="/sale-management/3">
        <span slot="value">{{bookdealCount}}</span>
      </cell>
      <cell title="签约待确认：" link="/sale-management/4">
        <span slot="value">{{signNodealCount}}</span>
      </cell>
    </group>
    <ul class="links">
      <li>
        <a href="javascript:void(0)" @click="gotoPage('setting')">
          <span class="icon iconfont icon-yonghuzhongxin"></span>
          <span class="link-text">用户中心</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0)" @click="gotoPage('room-management')">
          <span class="icon iconfont icon-fangyuanguanli01"></span>
          <span class="link-text">房源管理</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0)" @click="gotoPage('sale-management')">
          <span class="icon iconfont icon-xiaoshouguanli"></span>
          <span class="link-text">销售管理</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0)" @click="gotoPage('finance-management')">
          <span class="icon iconfont icon-caiwuguanli"></span>
          <span class="link-text">财务管理</span>
        </a>
      </li>
    </ul>
    <box gap="20px">
      <button class="weui_btn weui_btn_default" @click="addRoom">发布房源</button>
    </box>
    <group title="通知中心">
      <ul class="notices">
        <li class="vux-1px-b" v-for="notice in notices" @click="gotoNoticeList(notice.messageType, notice.messageTypeId)">
          <p class="notice-title">{{notice.messageType}}<span class="right">{{notice.messageDate}}</span></p>
          <p class="notice-summary">{{notice.message}}</p>
        </li>
      </ul>
    </group>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
  <!-- TODO: 通知中心 -->
</template>

<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Box from 'vux-components/box'
import Cell from 'vux-components/cell'
import Request from '../../js/request'
import Utils from '../../js/utils'
import Loading from 'vux-components/loading'

export default {
  data() {
    return {
      allIncome: '',
      dayIncome: '',
      reverseLookCount: '',
      bookNodealCount: '',
      bookdealCount: '',
      signNodealCount: '',
      notices: [],
      loading: false,
      loadingText: '加载中...',
    }
  },
  methods: {
    gotoPage(type) {
      this.$router.go(`/${type}`);
    },
    addRoom() {
      this.$router.go('/room-new');
    },
    gotoNoticeList(type, id) {
      this.$router.go(`/notice-detail/${type}/${id}`);
    }
  },
  ready() {
    const that = this;
    Utils.changePageTitle.call(this);
    let userInfo = Utils.getUserInfo();
    that.loading= true;
    Request.Holder.get(userInfo.id).then((resp) => {
      that.loading = false;
      if (resp.body._status == 'SUCCESS') {
        that.allIncome = resp.body._body.allIncome;
        that.dayIncome = resp.body._body.dayIncome;
        that.reverseLookCount = resp.body._body.reverseLookCount;
        that.bookNodealCount = resp.body._body.bookNodealCount;
        that.bookdealCount = resp.body._body.bookdealCount;
        that.signNodealCount = resp.body._body.signNodealCount;
      }
    });
    Request.Holder.getNotices(userInfo.id).then((resp) => {
      if (resp.body._status == 'SUCCESS') {
        this.notices = resp.body._body;
      }
    });
  },
  components: {
    XHeader,
    Group,
    Box,
    Cell,
    Loading
  }
}
</script>
<style lang="less">
.holder-home-vue {
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
  .links {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
    overflow: hidden;
    li {
      float: left;
      width: 50%;
      box-sizing: border-box;
      padding: 5px 10px;
      a {
        display: block;
        .icon {
          float: left;
          width: 40px;
          height: 40px;
          font-size: 24px;
          text-align: center;
          color: #35495e;
        }
        .link-text {
          float: left;
          margin-left: 15px;
          margin-top: 7px;
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
