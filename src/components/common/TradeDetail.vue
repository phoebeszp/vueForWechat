<style lang="less" scoped>
.room-management-vue {
  .weui_panel {
    margin-top: 0;
  }
  .room-item {
    padding: 0 10px;
    font-size: 14px;
    .item-agent, .item-customer {
      padding: 8px 0;
      line-height: 28px;
      a {
        padding: 0 30px;
      }
    }
  }
  .weui-form-preview {
    position: relative;
    background-color: #FFFFFF;
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
    }
    .weui-form-preview__hd {
      position: relative;
      padding: 10px 15px;
      text-align: right;
      line-height: 2.5em;
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 15px;
      }
      .weui-form-preview__value {
        font-style: normal;
        font-size: 1.3em;
      }
    }
    .weui-form-preview__bd {
      padding: 10px 15px;
      font-size: .9em;
      text-align: right;
      color: #999999;
      line-height: 2;
    }
    .weui-form-preview__item {
      overflow: hidden;
      .weui-form-preview__label {
        float: left;
        margin-right: 1em;
        min-width: 4em;
        color: #999999;
        text-align: justify;
        text-align-last: justify;
      }
    }
    .weui-form-preview__value {
      display: block;
      overflow: hidden;
      word-break: normal;
      word-wrap: break-word;
    }
  }
}
</style>

<template>
  <div class="room-management-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">明细</x-header> -->
    <panel :list="roomDetail" :type="panelType"></panel>
    <group>
      <div class="room-item">
        <p class="item-agent vux-1px-b"><label>经纪人：</label><span>{{bill.agentName}}</span><a class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:{{bill.agentPhone}}">致电</a></p>
        <p class="item-customer"><label>租客：</label><span>{{bill.renterName}}</span></p>
      </div>
    </group>
    <group>
      <div v-if="billType=='1'" class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">实际到账</label>
            <em class="weui-form-preview__value">{{bill.amount}}</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">租客实付</label>
            <span class="weui-form-preview__value">{{bill.amountActualIncome}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">佣金扣除</label>
            <span class="weui-form-preview__value">{{bill.amountAgent}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">账单编号</label>
            <span class="weui-form-preview__value">{{bill.billNo}}</span>
          </div>
           <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">收款时间</label>
            <span class="weui-form-preview__value">{{bill.payDate}}</span>
          </div>
           <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">支付通道</label>
            <span class="weui-form-preview__value">{{bill.payTypeName}}</span>
          </div>
           <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">备注说明</label>
            <span class="weui-form-preview__value">{{bill.billMemo}}</span>
          </div>
        </div>
      </div>
      <div v-if="billType=='2'" class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">支出金额</label>
            <em class="weui-form-preview__value">{{bill.amount}}元</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">类型</label>
            <span class="weui-form-preview__value">{{bill.busiTypeName}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">账单编号</label>
            <span class="weui-form-preview__value">{{bill.billNo}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">支付方式</label>
            <span class="weui-form-preview__value">{{bill.payTypeName}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">支出时间</label>
            <span class="weui-form-preview__value">{{bill.payDate}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">支付通道</label>
            <span class="weui-form-preview__value">{{bill.payTypeName}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">备注说明</label>
            <span class="weui-form-preview__value">{{bill.billMemo}}</span>
          </div>
        </div>
      </div>
    </group>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Box from 'vux-components/box'
import Panel from 'vux-components/panel'
import Card from 'vux-components/card'
import Loading from 'vux-components/loading'
import XButton from 'vux-components/x-button'
import Request from '../../js/request'
import Manba from 'manba'
import Utils from '../../js/utils'
import BillDetail from '../../js/model/BillDetail'

export default {
  data() {
    return {
      panelType: '1',
      orderMap: {
        1: '收入',
        2: '支出'
      },
      loading: false,
      loadingText: '加载中...',
      bill:{},
      billType: '1'
    }
  },
  components: {
    XHeader,
    Group,
    Box,
    Panel,
    Card,
    Loading,
    XButton,
    Utils,
    BillDetail
  },
  methods: {
    setBill(bill) {
      this.bill = BillDetail.parse(bill);
    }
  },
  computed: {
    roomDetail() {
      return [{src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: this.bill.roomName,
        desc: '',
        url: '/'
      }];
    }
  },
  beforeCompile() {
    this.setBill({});
  },
  ready() {
    Utils.changePageTitle.call(this);
    const that = this;
    const pathParam = this.$route.params;
    this.billType = pathParam.billType;
    if (pathParam) {
      let userInfo = Utils.getUserInfo();
      this.loading = true;
      Request.Holder.getBillDetail(pathParam.billId, {userId: userInfo.id}).then(
        (resp) => {
          that.loading = false;
          let body = resp.body._body;
          that.setBill(body);
        });
    }
  }
}
</script>
