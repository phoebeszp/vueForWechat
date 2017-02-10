<style lang="less" scoped>
.income-management-vue {
  .extra-info {
    color: #999;
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>

<template>
  <div class="income-management-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">支出管理</x-header> -->
    <tab class="tabs" :line-width=1 >
      <tab-item :selected="selectedTab==1" @click="changeTab(1)">日支出</tab-item>
      <tab-item :selected="selectedTab==3" @click="changeTab(3)">周支出</tab-item>
      <tab-item :selected="selectedTab==2" @click="changeTab(2)">月支出</tab-item>
    </tab>
    <group>
      <card v-for="bill in bills">
        <cell @click="goToDetail(bill.startDate, bill.endDate)" is-link>
          <p slot="after-title">{{bill.date}}</p>
          <p class="extra-info" slot="after-title">
            本{{type}}支出：{{bill.count}}笔 / 共计：{{bill.roomPrice}}元
          </p>
        </cell>
      </card>
    </group>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Loading from 'vux-components/loading'
import Tab from 'vux-components/tab'
import TabItem from 'vux-components/tab-item'
import Cell from 'vux-components/cell'
import Request from '../../js/request'
import Manba from 'manba'
import Utils from '../../js/utils'

export default {
  data() {
    return {
      selectedTab: 1,
      loading: false,
      loadingText: '加载中...',
      bills: []
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    Tab,
    TabItem,
    Loading,
    Utils
  },
  computed: {
    type: function(){
      switch(this.selectedTab) {
        case (1) :
          return '日';
          break;
        case (2) :
          return '月';
          break;
        case (3) :
          return '周';
          break;
      }
    }
  },
  methods: {
    goToDetail: function(startDate, endDate){
      this.$router.go(`/trade-list/${startDate}/${endDate}/2`);
    },
    getCostList(type) {
      let userInfo = Utils.getUserInfo(), that = this;
      let param = {
        accountType: 2,
        countType: this.selectedTab,
        startDate: Manba().add(-1, 7).format(),
        endDate: Manba().format()
      };
      that.loading = true;
      Request.Holder.getFinanceDetail(userInfo.id, param).then( (resp) =>{
        if (resp.body._status == 'SUCCESS') {
          that.loading = false;
          that.bills = resp.body._body;
        }else{

        }
      });
    },
    changeTab(tab) {
      if (this.selectedTab == tab) return false;
      this.selectedTab = tab;
      this.getCostList(tab);
    }
  },
  ready() {
    const that = this;
    Utils.changePageTitle.call(this);
    this.getCostList();
  }
}
</script>
