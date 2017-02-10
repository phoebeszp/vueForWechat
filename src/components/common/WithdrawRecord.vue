<style lang="less" scoped>
.withdraw-record-vue {
  ul {
    background: #fff;
    .trade-item {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 10px 15px;
      .title {
        margin-bottom: 4px;
        &.processing {
          color: #999;
        }
        &.failed {
          color: #E44545;
        }
      }
      .detail {
        color: #999;
        font-size: 13px;
      }
    }
  }
}
</style>

<template>
  <div class="withdraw-record-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">提现记录</x-header> -->
    <scroller lock-x scrollbar-y use-pullup use-pulldown @pullup:loading="loadMore" @pulldown:loading="refresh" :height="scrollHeight + 'px'" :pullup-status.sync="pullupStatus" v-ref:scroller>
    <ul>
      <li class="trade-item vux-1px-b" v-for="re in records">
        <p class="title processing">{{re.memo}}<span class="right">{{re.amount}}元</span></p>
        <p class="detail">{{re.cashTime}}</p>
      </li>
    </ul>
    </scroller>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Loading from 'vux-components/loading'
import Request from '../../js/request'
import Manba from 'manba'
import Scroller from 'vux-components/scroller'
import Utils from '../../js/utils'
export default {
  data() {
    return {
      loading: false,
      loadingText: '加载中...',
      records:[],
      pageIndex: 1,
      totalCount: 0,
      pullupStatus: 'default'
    }
  },
  components: {
    XHeader,
    Loading,
    Scroller
  },
  methods: {
    getWithdrawRecords(callback) {
      let that = this;
      that.loading = true;
      Request.User.withdrawRecord(that.pageIndex, 15).then(
        (resp)=>{
          that.loading = false;
          let body = resp.body._body;
          that.totalCount = resp.body._page.totalResult;
          that.records = that.records.concat(body);
          if(callback){
            callback();
          }
      });
    },
    loadMore(uuid) {
      this.pageIndex++;
      let that = this;
      let callback = function(){
        that.$broadcast('pullup:reset', uuid);
        that.$nextTick(() => {
        that.$refs.scroller.reset();
        if (that.records.length >= that.totalCount) {
            that.$broadcast('pullup:disable', uuid)
            console.log('No more data, Pullup disabled!')
          }
        });
      }
      this.getWithdrawRecords(callback);
    },
    refresh(uuid){
      this.pageIndex = 1;
      this.records = [];
      let that = this;
      let callback = function(){
        that.$broadcast('pulldown:reset', uuid);
        that.$nextTick(() => {
          that.$refs.scroller.reset()
        });
      }
      this.getWithdrawRecords(callback);
    }
  },
  ready() {
     Utils.changePageTitle.call(this);
    const that = this;
    this.getWithdrawRecords();
  }
}
</script>
