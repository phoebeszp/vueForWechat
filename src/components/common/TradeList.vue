<style lang="less" scoped>
.trade-list-vue {
  .summary {
    font-size: 12px;
    color: #999;
    padding: 7px 15px;
  }
  ul {
    background: #fff;
    .trade-item {
      padding: 10px 15px;
      .title {
        margin-bottom: 4px;
      }
      .detail {
        color: #999;
        font-size: 13px;
        .link {
          color: #1FB922;
        }
      }
    }
  }
}
</style>

<template>
  <div class="trade-list-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">{{title}}</x-header> -->
    <p class="summary vux-1px-b">收到{{totalCount}}笔款项，总计{{totalValue}}元</p>
    <ul>
      <li class="trade-item vux-1px-b" v-for="result in results">
        <p class="title">{{result.businessType}}<span class="right">{{result.roomPrice}}元</span></p>
        <p class="detail">{{result.create_time}}<span class="link right" @click="gotoTradeDetail(result.accountDetailId)">详情</span></p>
        <p class="detail">{{result.rommName}}</p>
      </li>
    </ul>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Loading from 'vux-components/loading'
import Request from '../../js/request'
import Manba from 'manba'
import Utils from '../../js/utils'

export default {
  data() {
    return {
      selectedTab: 1,
      loading: false,
      loadingText: '加载中...',
      results: [],
      title: '',
      totalCount: 0,
      totalValue: 0,
      accountType: 0
    }
  },
  components: {
    XHeader,
    Loading,
    Utils
  },
  methods: {
    getTradeList(startDate, endDate, accountType) {
      let userInfo = Utils.getUserInfo();
      let params = {
        accountType: accountType,
        startDate: startDate,
        endDate: endDate
      };
      let that = this;
      that.loading = true;
      Request.Holder.getFinanceList(userInfo.id, params).then( (resp) => {
        if(resp.body._status === 'SUCCESS'){
            that.loading = false;
            that.results = resp.body._body;
            that.totalCount = that.results.length;
            that.results.forEach(function(item){
              that.totalValue += item.roomPrice + 0;
            });
        }
      });
    },
    gotoTradeDetail(billId) {
      this.$router.go('/trade-detail/'+ billId+'/'+this.accountType);
    }
  },
  ready() {
    const that = this;
    const pathParam = this.$route.params;
    if (pathParam) {
      let title = pathParam.accountType === '1' ? '收入明细' : '支出明细';
      Utils.changePageTitle(title);
      this.accountType = pathParam.accountType;
      this.getTradeList(pathParam.startDate, pathParam.endDate, pathParam.accountType);
    }
  }
}
</script>
