<style lang="less" scoped>
.finance-management-vue {
  .extra-info {
    color: #999;
    font-size: 12px;
    margin-top: 4px;
  }
  .box {
    color: #999;
    padding: 10px 15px;
    .title {
      margin-bottom: 4px;
      span {
        color: #333;
      }
    }
    .detail {
      color: #999;
      font-size: 14px;
      overflow: hidden;
      .link {
        color: #1FB922;
      }
    }
    .oper {
      margin-top: 10px;
      padding-top: 10px;
      overflow: hidden;
    }
    .width60 {
      width: 60%;
    }
  }
}
</style>

<template>
  <div class="finance-management-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">财务管理</x-header> -->
    <group title="钱包：">
      <div class="box" @click="toDetail('wallet')">
        <p class="title">账户余额：<span class="right">{{balance}}元</span></p>
        <p class="oper vux-1px-t">
          <button class="weui_btn weui_btn_mini weui_btn_plain_primary right width60" @click="withdraw">提现</button>
        </p>
      </div>
    </group>
    <group title="收入概况：">
      <div class="box" @click="toDetail('income')">
        <p class="title">累计收入：<span class="right">{{amountAllIncome}}元</p>
        <p class="detail">今日收入：<span class="right">{{amountDayIncome}}元</span></p>
        <p class="detail"><span class="right link">详情</span></p>
        <p class="oper vux-1px-t">
          <button class="weui_btn weui_btn_mini weui_btn_plain_primary right width60">历史收入</button>
        </p>
      </div>
    </group>
    <group title="支出概况：">
      <div class="box" @click="toDetail('cost')">
        <p class="title">累计支出：<span class="right">{{amountAllPay}}元</p>
        <p class="detail">今日支出：<span class="right">{{amountDayPay}}元</span></p>
        <p class="detail"><span class="right link">详情</span></p>
        <p class="oper vux-1px-t">
          <button class="weui_btn weui_btn_mini weui_btn_plain_primary right width60">历史支出</button>
        </p>
      </div>
    </group>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Loading from 'vux-components/loading'
import Request from '../../js/request'
import Utils from '../../js/utils'
export default {
  data() {
    return {
      balance: 0,
      amountDayIncome: 0,
      amountAllIncome: 0,
      amountAllPay: 0,
      amountDayPay: 0,
      loading: false,
      loadingText: '加载中...'
    }
  },
  methods: {
    toDetail(type) {
      if (type == 'wallet') {
        this.$router.go('/wallet');
      } else if (type == 'income') {
        this.$router.go('/income-management');
      } else if (type == 'cost') {
        this.$router.go('/cost-management');
      }
    },
    withdraw() {
      this.$router.go('/withdraw');
    }
  },
  ready() {
    Utils.changePageTitle.call(this);
    let userInfo = Utils.getUserInfo(), that = this;
    that.loading = true;
    Request.Holder.getFinanceTotal(userInfo.id, 1).then((resp) => {
      if (resp.body._status === 'SUCCESS') {
        that.loading = false;
        let result = resp.body._body;
          this.balance = result.balance;
          this.amountDayIncome = result.amountDayIncome;
          this.amountAllIncome = result.amountAllIncome;
          this.amountAllPay = result.amountAllPay;
          this.amountDayPay = result.amountDayPay;
      }
    })
  },
  components: {
    XHeader,
    Group,
    Cell,
    Loading
  }
}
</script>
