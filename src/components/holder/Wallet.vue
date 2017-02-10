<style lang="less" scoped>
.wallet-vue {
  .wallet-item {
    margin: 20px 15px 0;
    border-radius: 5px;
    color: #333;
    &.item-yellow {
      background: #FEC877;
    }
    &.item-default {
      background: #F8F8F8;
    }
    &.item-blue {
      background: #77D7C2;
    }
    .item-title {
      font-size: 12px;
      color: #777;
      padding: 6px 15px;
      border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .item-detail {
      font-size: 20px;
      padding: 20px 15px;
    }
  }
}
</style>

<template>
  <div class="wallet-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">房东钱包</x-header> -->
    <ul>
      <li class="wallet-item item-yellow">
        <p class="item-title">可提现</p>
        <p class="item-detail">{{availBalance}}元</p>
      </li>
      <li class="wallet-item item-default" @click="gotoRecords()">
        <p class="item-title">累计提现</p>
        <p class="item-detail">{{cashOutBalance}}元</p>
      </li>
      <li class="wallet-item item-blue">
        <p class="item-title">累计收入</p>
        <p class="item-detail">{{inBalance}}元</p>
      </li>
    </ul>
    <box gap="80px 20px 20px 20px">
      <button class="weui_btn weui_btn_primary" @click="withdraw">提现</button>
    </box>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Loading from 'vux-components/loading'
import Box from 'vux-components/box'
import Request from '../../js/request'
import Utils from '../../js/utils'

export default {
  data() {
    return {
      loading: false,
      loadingText: '加载中...',
      availBalance: 0,
      cashOutBalance: 0,
      inBalance: 0
    }
  },
  components: {
    XHeader,
    Group,
    Box,
    Loading,
    Utils
  },
  methods: {
    gotoRecords() {
      this.$router.go('/withdraw-record');
    },
    getWalletDetail(id) {
      let that = this;
      that.loading = true;
      Request.User.getWallet(id).then( (resp) =>{
          if (resp.body._status == 'SUCCESS') {
            that.loading = false;
            let result = resp.body._body;
            this.availBalance = result.availBalance||0;
            this.inBalance = result.inBalance||0;
            this.cashOutBalance = result.cashOutBalance||0;
          } else {

          }
        });
      },
    withdraw() {
      this.$router.go('/withdraw')
    }
  },
  ready() {
    const that = this;
    Utils.changePageTitle.call(this);
    let userInfo = Utils.getUserInfo();
    that.getWalletDetail(userInfo.id);
  }
}
</script>
