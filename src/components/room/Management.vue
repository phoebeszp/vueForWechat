<style lang="less">
.room-management-vue {
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
  .tabs {
    .badge {
      margin-left: 4px;
    }
  }
  .tab-content {
    position: relative;
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
      .item-agent, .item-customer {
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
      .item-line {
        overflow: hidden;
        .weui_cell {
          padding: 0;
          .vux-number-input {
            font-size: 14px;
          }
        }
        &.with-number {
          margin-top: 5px;
        }
      }
    }
  }
  .weui_btn_plain_warn {
    background-color: transparent;
    border: 1px solid #ef4f4f;
    color: #ef4f4f;
    &:after {
      border-width: 0;
    }
  }
  .scrollerStyle {
    overflow: scroll !important;
    height: 504px !important;
  }
  .rotate {
    display: inline-block;
    transform: rotate(-180deg);
  }
  .pullup-arrow {
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
}
</style>

<template>
  <div class="room-management-vue"
  v-bind:style="{ height: screenHeight + 'px' }">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">房源管理</x-header> -->
    <div class="vux-1px-b search-area">
      <search @on-submit="search" :auto-fixed="autoFixed" :value.sync="keyword"></search>
      <span class="right" @click="cancelSearch" >取消</span>
    </div>
    <tab class="tabs" :line-width=1>
      <tab-item v-for="tab in tabs" :selected="tab.roomState==selectedTab" @click="changeTab(tab.roomState)">{{tab.roomStateName}}<badge class="badge" :text="tab.count+''"></badge></tab-item>
    </tab>
    <div class="tab-content">
      <template v-if="domReady">
        <scroller lock-x scrollbar-y use-pullup use-pulldown
        :pulldown-config="pulldownConfig"
        :pullup-config="pullupConfig"
        @pullup:loading="loadMore"
        @pulldown:loading="refresh" :height="scrollHeight + 'px'" :pullup-status.sync="pullupStatus" v-ref:scroller>
          <div class="rooms">
            <template v-if="selectedTab==1">
              <card v-for="room in rooms">
                <div slot="content" class="room-item">
                  <card @click="gotoDetail(room.roomId)">
                    <div slot="content" >
                      <p class="item-title">{{room.roomTitle}}
                        <span class="link right" >详情</span>
                      </p>
                      <p class="item-price vux-1px-b">{{room.price}} 元/月</p>
                      <p class="item-lost">已空置<em>{{room.emptyDay}}</em>天<span>累计损失<em>{{room.emptyPrice}}</em>元</span>
                      <span class="right"></span></p>
                    </div>
                  </card>
                  <p class="item-line with-number">租金：
                    <x-number class="right" :step="100" :value.sync="room.price" :min="0"  ></x-number>
                  </p>
                  <p class="item-line with-number">佣金（{{room.agentType==1?'%':'元'}}）：
                    <template v-if="room.agentType==1">
                      <x-number class="right" :value.sync="room.agentPercent" :min="0" ></x-number>
                    </template>
                    <template v-if="room.agentType==2">
                      <x-number class="right" :value.sync="room.agentPrice" :step="100" :min="0" ></x-number>
                    </template>
                  </p>
                  <div class="item-btns">
                    <x-button class="item-btn item-btn-left" @click="roomOff(room.roomId)">下线</x-button>
                    <x-button class="item-btn item-btn-right" @click="updateRoomPrice(room.roomId, room.price , room.agentPrice, room.agentPercent)">保存更改</x-button>
                  </div>
                </div>
              </card>
            </template>
            <template v-if="selectedTab==2">
              <card v-for="room in rooms">
                <div slot="content" class="room-item">
                  <card  @click="gotoDetail(room.roomId)">
                    <div slot="content">
                      <p class="item-title">{{room.roomTitle}}<span class="link right">详情</span></p>
                      <p class="item-price vux-1px-b">{{room.price}} 元/月</p>
                      <div class="item-detail">
                        <p class="item-line">入住时间：<span>{{room.checkinActionTime}}</span></p>
                        <p class="item-line">合同到期：<span>{{room.contractEndTime}}</span></p>
                        <p class="item-mini">距离合同到期还剩<em>{{room.contractEmptyDay}}</em></p>
                      </div>
                    </div>
                  </card>
                  <div class="item-btns">
                    <x-button class="item-btn weui_btn weui_btn_mini weui_btn_plain_primary left width60" @click="roomOn(room.roomId)">已退房 - 寻找新租客</x-button>
                    <x-button class="item-btn right width30" @click="roomOff(room.roomId)">下线</x-button>
                  </div>
                </div>
              </card>
            </template>
            <template v-if="selectedTab==3">
              <card v-for="room in rooms" >
                <div slot="content" class="room-item">
                  <card @click="gotoDetail(room.roomId)">
                    <div slot="content">
                      <p class="item-title">{{room.roomTitle}}
                      <span class="link right" >详情</span></p>
                      <p class="item-price vux-1px-b">{{room.price}} 元/月</p>
                      <div class="item-detail">
                        <p class="item-line">下线时间：<span>{{room.downTime}}</span></p>
                        <p v-if="room.downReason" class="item-line"><em>{{room.downReason}}</em></p>
                      </div>
                    </div>
                  </card>
                  <div class="item-btns">
                    <x-button mini plain type="primary" class="item-btn left width60" @click="roomOn(room.roomId)">立刻上线销售</x-button>
                    <x-button mini plain type="warn" class="item-btn right width30" @click="remove(room.roomId)">删除</x-button>
                  </div>
                </div>
              </card>
            </template>
          </div>
        </scroller>
      </template>
    </div>
     <confirm :show.sync="showConfirm" title="删除房源" @on-cancel="onCancel" @on-confirm="onConfirm">
      <p style="text-align:center;">确定删除房源吗?</p>
    </confirm>
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

export default {
  data() {
    return {
      keyword: '',
      autoFixed: false,
      selectedTab: '1',
      tabs: [],
      rooms: [],
      scrollHeight: 0,
      domReady: false,
      loading: true,
      loadingText: '加载中...',
      toastText: "修改成功",
      showToast: false,
      toastType: '',
      pullupStatus: 'default',
      pageIndex: 1,
      totalCount: 0,
      showConfirm: false,
      pulldownConfig: {
        content:'下拉刷新',
        downContent:'下拉刷新',
        upContent:'释放刷新',
        loadingContent:'加载中'
      },
      pullupConfig:{
        content:'下拉刷新',
        downContent:'下拉刷新',
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
    Confirm
  },
  computed: {
    screenHeight: function(){
      return window.innerHeight;
    }
  },
  methods: {
    changeTab(tab) {
      const that = this;
      if (tab == this.selectedTab) {
        return false;
      }
      this.rooms = [];
      this.pageIndex = 1;
      this.selectedTab = tab;
      const uuid = this.$refs.scroller.uuid;
      this.$broadcast('pullup:enable', uuid);
      this.getListByState(tab, (rooms) => {
        that.rooms = rooms;
        that.$refs.scroller.reset({
          top: 0
        });
      });
    },
    getListByState(state, callback) {
      const that = this;
      let keyword = this.keyword || '';
      this.loading = true;
      let userInfo = Utils.getUserInfo();
      let page = this.pageIndex;
      Request.Room.getListByState(userInfo.id, keyword, {state, page}).then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          that.totalCount = resp.body._page.totalResult;
          let rooms = resp.body._body;
          for (let room of rooms) {
            if (room.reverseTime) room.reverseTime = Manba(room.reverseTime).format('ll');
            if (room.checkinActionTime) room.checkinActionTime = Manba(room.checkinActionTime).format('ll');
            if (room.contractEndTime) room.contractEndTime = Manba(room.contractEndTime).format('ll');
            if (room.downTime) room.downTime = Manba(room.downTime).format('ll');
          }
          //that.rooms = that.rooms.concat(rooms);
          if(callback){
            callback(rooms);
          }else{
            that.rooms = rooms;
          }
        }
        that.domReady = true;
        that.loading = false;
      })
    },
    updateRoomState(id, state){
      let that = this;
      that.loading = true;
      Request.Room.updateRoomState(id, {
        state: state
      }).then((resp) => {
        that.loading = false;
        if (resp.body._status === 'SUCCESS') {
          that.toastText = '保存成功';
          that.toastType = '';
          that.showToast = true;
          that.updateTabs(function () {
            that.getListByState(that.selectedTab);
          });
        }else{
          this.toastText = resp.body._msg;
          this.toastType = 'warn';
          this.showToast = true;
        }
      })
    },
    setContentHeight() {
      const top = $('.tab-content').offset().top;
      const windowHeight = $(window).height();
      const contentHeight = windowHeight - top;
      this.scrollHeight = contentHeight;
      $('.tab-content').height(contentHeight);
    },
    gotoDetail(id) {
      this.$router.go(`/room-detail/${id}`);
    },
    roomOn(id) {
      this.updateRoomState(id, 1);
    },
    roomOff(id) {
      this.updateRoomState(id, 3);
    },
    updateRoomPrice(roomId, roomPrice, agentPrice, agentPersent) {
      let userInfo = Utils.getUserInfo();
      let params = {
        userId: userInfo.id || "",
        roomPrice: roomPrice,
        agentAmount: agentPrice,
        agentPersent: agentPersent
      };
      this.loading = true;
      Request.Room.setPrice(roomId, params).then( (resp) => {
        this.loading = false;
        if (resp.body._status == 'SUCCESS') {
          this.toastText = '保存成功';
          this.toastType = '';
          this.showToast = true;
        }else{
          this.toastText = resp.body._msg;
          this.toastType = 'warn';
          this.showToast = true;
        }
      });
    },
    remove (roomId) {
      this.selectedId = roomId;
      this.showConfirm = true;
    },
    onCancel (){

    },
    onConfirm() {
      let roomId = this.selectedId;
      let that = this;
      let userInfo = Utils.getUserInfo();
      that.loading = true;

      Request.Room.deleteRoom(roomId, {
        userId: userInfo.id || ""
      }).then( (resp) => {
        that.loading = false;
        if (resp.body._status == 'SUCCESS') {
          that.toastText = '删除成功';
          that.toastType = '';
          that.showToast = true;
          that.updateTabs(function () {
           that.getListByState(3);
          });
        } else{
          this.toastText = resp.body._msg;
          this.toastType = 'warn';
          this.showToast = true;
        }
      })
    },
    search() {
      if (this.keyword) {
        this.rooms = [];
        let that = this;
        this.updateTabs(function(){
          that.getListByState(that.selectedTab);
        });
      }
    },
    cancelSearch() {
      this.keyword = '';
      let that = this;
      this.updateTabs(function(){
        that.getListByState(that.selectedTab);
      });
    },
    updateTabs(callback) {
      let userInfo = Utils.getUserInfo();
      let keyword = this.keyword || '';
      Request.Room.getList(userInfo.id, keyword).then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          this.tabs = resp.body._body;
          this.$nextTick(() => {
            this.setContentHeight();
          })
          if(callback){
            callback();
          }
        }
      })
    },
    loadMore(uuid){
      this.pageIndex++;
      let that = this;
      let callback = function(rooms){
        that.rooms = that.rooms.concat(rooms);
        that.$broadcast('pullup:reset', uuid);
        that.$nextTick(() => {
          that.$refs.scroller.reset();
          if (that.rooms.length >= that.totalCount) {
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
      let callback = function(rooms){
        that.rooms = rooms;
        that.$broadcast('pullup:enable', uuid);
        that.$broadcast('pulldown:reset', uuid);
        that.$nextTick(() => {
          that.$refs.scroller.reset();
        });
      }
      this.getListByState(this.selectedTab, callback);
    }
  },
  ready() {
    console.log("document.title" + document.title);
    Utils.changePageTitle.call(this);
    let that = this;
    this.updateTabs(function(){
      that.getListByState(1);
    });
  }
}
</script>
