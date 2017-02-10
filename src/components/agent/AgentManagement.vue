<style lang="less">
.agent-management-vue {
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
  .bottom-menu{
    position: relative;
  }
  .tab-content {
    position: relative;
    .order-item {
      padding: 10px;
      font-size: 14px;
      em {
        color: #E44545;
        font-style: normal;
        margin: 0 2px;
      }
      .weui_panel {
        margin-top: 0;
      }
      .item-header{
        overflow: hidden;
        .header-orderId{
          width: 30%;
          float: left;
          font-weight: bolder;
          margin: 5px;
        }
        .header-state{
          float: left;
          margin: 5px;
        }
        .header-detail{
          float: right;
          color: #1FB922;
          margin: 5px;
        }
      }
      .icon-dianhua:before {
        font-size: 20px;
        margin:5px;
        color: green;
      }
      .item-customer{
        overflow: hidden;
        .customer-name{
          width: 30%;
          float: left;
          margin: 5px;
        }
        .customer-info{
          margin: 5px;
        }
      }
      .item-requirement{
        overflow: hidden;
        margin: 5px;
        > p{
          margin: 5px 0;
        }
        .requirement-description{
          width: 80%;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .requirement-phone{
          float: right;
          font-size: 20px;
        }
      }
      .line-item-btn{
        float: right;
        width: 48px;
        height: 22px;
        font-size: 10px;
        margin: 3px;
      }
      .resource-item{
        overflow: hidden;
        .resource-item-description{
          text-decoration:underline;
          color: blue;
          margin: 3px 0;
          float: left;
          width: 80%;
        }
      }
      .item-showMore{
        overflow: hidden;
        .showMore-description{
          text-decoration:underline;
          color: blue;
          margin: 3px 0;
          float: left;
        }
      }
      .item-following{
        overflow: hidden;
        margin: 5px;
        .following-description{
          margin: 3px 0;
          float: left;
        }
        .following-icon{
          float: right;
          font-size: 12px;
          margin: 3px;
        }
      }
      .item-time{
        .time-duration{
          margin: 3px 0;
        }
      }
    }
    .item-btns {
      overflow: hidden;
      .item-btn {
        width: 48%;
        font-size: 14px;
        margin-top: 6px;
        &.width60 {
          width: 60%;
        }
        &.width30 {
          width: 30%;
        }
      }
      .item-btn-left{
        float: left;
      }
      .item-btn-right{
        float: right;
      }
    }
  }
}
</style>
<template>
  <div class="agent-management-vue"
  v-bind:style="{ height: screenHeight + 'px' }">
    <div class="vux-1px-b search-area">
      <search @on-submit="search" :auto-fixed="autoFixed" :value.sync="keyword"></search>
      <span class="right" @click="cancelSearch" >取消</span>
    </div>
    <tab class="tabs" :line-width=1>
      <tab-item v-for="tab in tabs"
      >
        <selector value="all" :options="tab.options" @on-change=""></selector>
      </tab-item>
    </tab>
    <!-- --------------------content start-------------------- -->
  <div class="tab-content">
        <scroller lock-x scrollbar-y use-pullup use-pulldown
        :pulldown-config="pulldownConfig"
        :pullup-config="pullupConfig"
        @pullup:loading="loadMore"
        @pulldown:loading="refresh" :height="scrollHeight + 'px'" :pullup-status.sync="pullupStatus" v-ref:scroller>
          <div class="orders">
              <card v-for="order in orders">
                <div slot="content" class="order-item">
                  <card @click="gotoDetail(order.id)">
                    <div slot="content" class="item-header">
                        <span class="header-orderId">订单号 {{order.id}}</span>
                        <span class="header-state">订单状态: {{order.order_state_name}}</span>
                        <span class="header-detail" >详情</span>
                    </div>
                  </card>
                  <card>
                    <div slot="content" class="item-customer">
                      <span class="customer-name">{{order.renter_name}}{{order.renter_sex}}</span>
                      <span class="left customer-info">{{order.budget}}</span>
                      <span class="right customer-info" >{{order.rent_type===1?'整租':'合租单间'}}</span>
                    </div>
                  </card>
                  <card >
                    <div slot="content" >
                      <div class="item-requirement">
                        <p class="requirement-description icon iconfont icon-ditu">{{order.memo}}</p>
                        <a class="right icon iconfont icon-dianhua" href="tel:{{order.renter_phone}}"></a>
                      </div>
                    </div>
                  </card>
                  <div v-for="resource in order.roomlist" v-show="order.roomlist">
                    <div slot="content" >
                      <div class="resource-item">
                        <div class="resource-item-description" @click="viewResource(order.resourceId)">{{resource.resource}}</div>
                        <x-button v-show= "order.resourceId" class="line-item-btn" @click="sign(order.resourceId)">签约</x-button>
                      </div>
                    </div>
                  </div>
                  <div slot="content">
                    <div class="item-showMore">
                      <!-- <p class="showMore-description" @click="showMore()">显示更多...</p> -->
                      <x-button class="right weui_btn weui_btn_mini weui_btn_plain_primary"  @click="assign(order.id)">配盘</x-button>
                    </div>
                  </div>
                  <card>
                    <div slot="content">
                      <div class="item-following" @click="following(order.resourceId)">
                        <p class="following-description">订单跟进记录</p>
                        <div class="following-icon">></p>
                      </div>
                    </div>
                  </card>
                  <card>
                    <div slot="content">
                      <div class="item-following">
                        <p class="time-duration">接单时间: {{order.order_create_date}}</p>
                      </div>
                    </div>
                  </card>
                  <div class="item-btns">
                    <x-button class="item-btn item-btn-left" @click="share(order.orderId)">分享</x-button>
                    <x-button class="item-btn item-btn-right" @click="cancelOrder(order.orderId)">取消</x-button>
                  </div>
                </div>
              </card>

          </div>
        </scroller>
  </div>
    <!-- ----------------------content end--------------------- -->
  <div>
    <loading :show="loading" :text="loadingText"></loading>
    <toast :type="toastType" :show.sync="showToast" :time="2000">{{toastText}}</toast>
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
import XNumber from 'vux-components/x-number'
import Request from '../../js/request'
import Manba from 'manba'
import Utils from '../../js/utils'
import Toast from 'vux-components/toast'
import Scroller from 'vux-components/scroller'
import Spinner from 'vux-components/spinner'
import $ from 'jquery'
import Confirm from 'vux-components/confirm'
import Selector from 'vux-components/selector'

export default {
  data() {
    return {
      inProcessList: [{
        key: "",
        value: ""
      }],
      finishedList: [{
        key: "",
        value: ""
      }],
      canceledList: [{
        key: "",
        value: ""
      }],
      keyword: '',
      autoFixed: false,
      selectedTab: 0,
      tabs: [],
      orders: [],
      scrollHeight: 0,
      pageIndex: 1, //lazy loading
      totalCount: 0,
      pullupStatus: 'default',
      domReady: false,
      userInfo: {},
      loading: true,
      loadingText: '加载中...',
      toastText: "修改成功",
      showToast: false,
      pulldownConfig: {
        content:'下拉刷新',
        downContent:'下拉刷新',
        upContent:'释放刷新',
        loadingContent:'加载中'
      },
      pullupConfig:{
        content:'上拉刷新',
        downContent:'上拉刷新',
        upContent:'释放刷新',
        loadingContent:'加载中'
      }
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
    XButton,
    XNumber,
    Toast,
    Scroller,
    Spinner,
    Confirm,
    Selector
  },
  computed: {
    screenHeight: function(){
      return window.innerHeight;
    }
  },
  methods: {
    search() {
    },
    cancelSearch() {
    },
    updateTabs(data) {
      let keyword = this.keyword || '';
      this.tabs = [
        {
          options: [{
            key: "0",
            value: "服务中("+data.dealCount+")"
          },{
            key: "1",
            value: "洽谈中("+data.dealCount+")"
          },{
            key: "2",
            value: "待配盘("+data.dealCount+")"
          }]
        },
        {
          options: [{
            key: "5",
            value: "已签约("+data.unDealCount+")"
          }]
        },
        {
           options: [{
            key: "2",
            value: "已取消("+ data.cancelCount +")"
          }]
        }
      ];
      this.$nextTick(() => {
        this.setContentHeight();
      });
    },
    setContentHeight() {
      const top = $('.tab-content').offset().top;
      const windowHeight = $(window).height();
      const contentHeight = windowHeight - top ;
      this.scrollHeight = contentHeight;
      $('.tab-content').height(contentHeight);
    },
    changeTab(tab) {
      const that = this;
      if (tab == this.selectedTab) {
        return false;
      }
      this.orders = [];
      this.pageIndex = 1;
      this.selectedTab = tab;
      const uuid = this.$refs.scroller.uuid;
      this.$broadcast('pullup:enable', uuid);
      this.getListByState(tab, (orders) => {
        that.orders = orders;
        that.$refs.scroller.reset({
          top: 0
        });
      });
    },
    loadMore(uuid){
      this.pageIndex++;
      let that = this;
      let callback = function(orders){
        that.orders = that.orders.concat(orders);
        that.$broadcast('pullup:reset', uuid);
        that.$nextTick(() => {
          that.$refs.scroller.reset();
          if (that.orders.length >= that.totalCount) {
            that.$broadcast('pullup:disable', uuid);
            console.log('No more data, Pullup disabled!')
          }
        });
      }
      this.getListByState(this.selectedTab, callback);
    },
    refresh(uuid){
      this.pageIndex = 1;
      let that = this;
      let callback = function(orders){
        that.orders = orders;
        that.$broadcast('pullup:enable', uuid);
        that.$broadcast('pulldown:reset', uuid);
        that.$nextTick(() => {
          that.$refs.scroller.reset();
        });
      }
      this.getListByState(this.selectedTab, callback);
    },
    gotoDetail(orderId){
      this.$router.go('/view-order/'+ orderId);
    },
    viewResource(resourceId){
    },
    sign(){
    },
    showMore(){
    },
    assign(orderId){
      this.$router.go('/room-list/'+ orderId);
    },
    following(){
    },
    getListByState(orderState, callback) {
      const that = this;
      let keyword = this.keyword || '';
      this.loading = true;
      let userInfo = this.userInfo;
      let page = this.pageIndex;
      Request.Agent.getListByState(userInfo.id, keyword, {orderState, page}).then((res) => {
        if (res.body._status == 'SUCCESS') {
          that.updateTabs(res.body._body.data);
          that.totalCount = res.body._page.totalResult;
          res.body._body.list.forEach(function(order){
            order.budget = '预算：' + order.room_price_min
            + '-' + order.room_price_max + '元/月';
            order.renter_sex = order.renter_sex === 1 ? '先生': '女士';
          });
          let orders = res.body._body.list;
          if(callback){
            callback(orders);
          }else{
            that.orders = orders;
          }
        }
        that.domReady = true;
        that.loading = false;
      })
    }
  },
  ready() {
    Utils.changePageTitle.call(this);
    this.userInfo = Utils.getUserInfo();
    this.getListByState(0);
  }
}
</script>
