<style lang="less">
.room-list-vue {
  .room-list-selector{
    .vux-no-group-title{
      width: 25%;
      float: left;
    }
    .vux-no-group-title{
      margin: 0;
    }
    .weui_cell_select{
      height: 32px;
      padding: 0;
      font-size: 12px;
      .weui_cell_primary{
          padding-left: 10px;
          &:after{
          right: 19px;
          margin-top: -6px;
          -webkit-transform: rotate(135deg);
          -ms-transform: rotate(135deg);
          -o-transform: rotate(135deg);
          -moz-transform: rotate(135deg);
          transform: rotate(135deg);
          }
      }
    }
  }
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
  .weui_tabbar{
    .weui_tabbar_item{
      padding: 0;
      >.weui_tabbar_icon{
        display: none;
      }
      >.weui_tabbar_label{
        height: 28px;
        margin: 0;
        >span{
          line-height: 28px;
          height: 28px;
          font-size: 13px;
          &:before{
            margin-right: 3px;
          }
        }
      }
    }
  }
  .content-rooms{
    .roomList-item-main{
      font-size: 16px;
      margin: 7px;
      overflow: hidden;
      .roomList-main-left{
        float: left;
        width: 80%;
        .roomList-main-roomName,
        .roomList-main-price,
        .roomList-main-checkinTime{
          height: 26px;
          line-height: 26px;
        }
        .roomList-main-price{
          overflow: hidden;
          .roomList-main-agentPercent{
            float: left;
            padding-right: 20px;
          }
          .roomList-main-roomPrice{
            border-left: 1px solid black;
            padding-left: 20px;
            float: left;
          }
        }
      }
      .roomList-main-right{
        float: right;
        width: 20%;
        height: 100%;
        overflow: hidden;
        .iconfont{
          float: right;
          margin-right: 20px;
          font-size: 20px;

        }
        .icon-right:before, .icon-shoucang1:before, .icon-dianhua:before {
            color: green;
          }
        .icon-cancel:before{
            color: red;
          }
        .roomList-main-status{
          font-size: 12px;
          float: right;
          padding-right: 5px;
        }
      }
    }
    .roomList-item-footer{
      font-size: 12px;
      margin: 8px;
      color: grey;
      overflow: hidden;
      .roomList-item-type{
        float: left;
        padding-right: 10px;
      }
      .roomList-item-direction{
        float: left;
        padding-left: 10px;
        border-left: 1px solid grey;
      }
      .roomList-item-onlineTime{
        float: left;
        margin-left: 60px;
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
  <div class="room-list-vue"
  v-bind:style="{ height: screenHeight + 'px' }">
    <div class="vux-1px-b search-area">
      <search @on-submit="search" :auto-fixed="autoFixed" :value.sync="keyword"></search>
      <span class="right" @click="cancelSearch" >取消</span>
    </div>
    <group class="room-list-selector">
      <selector value="all" :options="regionList" @on-change="onChangeRegion"></selector>
    </group>
    <group class="room-list-selector">
      <selector value="all" :options="rentList" @on-change="onChangeRent"></selector>
    </group>
    <group class="room-list-selector">
      <selector value="all" :options="typeList" @on-change="onChangeType"></selector>
    </group>
    <group class="room-list-selector">
      <selector value="all" :options="stateList" @on-change="onChangeState"></selector>
    </group>
    <div style="clear: both;"></div>
    <!-- --------------------content start-------------------- -->
    <div class="tab-content">
       <scroller lock-x scrollbar-y use-pullup use-pulldown
        :pulldown-config="pulldownConfig"
        :pullup-config="pullupConfig"
        @pullup:loading="loadMore"
        @pulldown:loading="refresh" :height="scrollHeight + 'px'" :pullup-status.sync="pullupStatus" v-ref:scroller>
          <!-- ---------------content-rooms start-------------- -->
          <div class="content-rooms">
              <card v-for="room in rooms">
                <div slot="content" class="room-item">
                  <card @click="gotoDetail(room.roomId)">
                    <div slot="content" >
                      <div class="roomList-item-main">
                        <div class="roomList-main-left">
                          <p class="roomList-main-roomName">{{room.roomName}}</p>
                          <div class="roomList-main-price">
                            <p class="roomList-main-agentPercent">佣金: {{room.agentPercent}}%</p>
                            <p class="roomList-main-roomPrice">月租金: {{room.roomPrice}}元</p>
                          </div>
                          <p class="roomList-main-checkinTime">可入住时间: {{room.checkinTime}}</p>
                        </div>
                        <div class="roomList-main-right">
                          <a class="icon iconfont icon-dianhua" href="tel:{{room.agentPhone}}"></a>
                          <a v-if="room.showServe"  class="icon iconfont icon-shoucang1" ></a>
                          <a v-if="!room.showServe"  class="icon iconfont icon-shoucang3" ></a>
                        </div>
                        <div v-if="orderId" class="roomList-main-right" >
                          <a v-show="room.showConfig" @click="peipan(room.roomId)" class="icon iconfont icon-right"></a>
                          <a v-show="room.showCancel" @click="cancel(room.roomId)" class="icon iconfont icon-cancel"></a>
                        </div>
                      </div>
                      <div class="roomList-item-footer">
                        <div class="roomList-item-type">整套整租</div>
                        <div class="roomList-item-direction">朝向: 南</div>
                        <div class="roomList-item-onlineTime">{{room.onlineTime}} 上线</div>
                      </div>
                    </div>
                  </card>
                </div>
              </card>
          </div>
          <!-- ----------------content-rooms end--------------- -->
        </scroller>
    </div>
    <!-- ----------------------content end--------------------- -->
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
import ButtonTab from 'vux-components/button-tab'
import ButtonTabItem from 'vux-components/button-tab-item'
import Selector from 'vux-components/selector'

export default {
  data() {
    return {
      orderId: '',
      userInfo: {},
      keyword: '',
      autoFixed: false,
      selectedTab: '1',
      tabs: [],
      rooms: [],
      scrollHeight: 0,
      domReady: false,
      loading: false,
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
      },
      regionList: [
        {key: 'all', value: '全部区域'},
        {key: 'pd', value: '浦东新区'},
        {key: 'hp', value: '黄埔区'},
        {key: 'cn', value: '长宁区'},
        {key: 'sj', value: '松江区'},
        {key: 'ja', value: '静安区'}
      ],
      rentList:[
        {key: 'all', value: '所有租金'},
        {key: 'lt1500', value: '1500以下'},
        {key: '1500to2000', value: '1500-2000元'},
        {key: '2000to3000', value: '2000-3000元'},
        {key: 'I_am_rich', value: '1000000000以上'}
      ],
      typeList:[
        {key: 'all', value: '所有类型'},
        {key: 'hz', value: '合租单间'},
        {key: 'zz', value: '整租整套'}
      ],
      stateList:[
        {key: 'all', value: '全部状态'},
        {key: '1', value: '已接单'},
        {key: '2', value: '未接单'},
        {key: '3', value: '已成交'},
        {key: '4', value: '已预定'}
      ],
      listData:{
        region: 'all',
        rent: 'all',
        type: 'all',
        state: 'all'
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
    ButtonTab,
    ButtonTabItem,
    Selector,
    Group
  },
  computed: {
    screenHeight: function(){
      return window.innerHeight;
    }
  },
  methods: {
    peipan(roomId) {
      let that = this;
      let orderId = parseInt(this.orderId);
      let room = parseInt(roomId);
      that.loading = true;
      Request.Agent.peipan(this.userInfo.id, orderId, room).then(
        (resp)=>{
          that.loading = false;
          that.toastText = '配盘成功!';
          that.showToast = true;
          that.getList();
        });
    },
    cancel(roomId){
      let that = this;
      let orderId = parseInt(this.orderId);
      let room = parseInt(roomId);
      Request.Agent.cancel(this.userInfo.id, orderId, room).then(
        (resp)=>{
          that.toastText = '配盘成功!';
          that.showToast = true;
          that.getList();
        });
    },
    onChangeRegion(val){
      this.onChange('region', val);
    },
    onChangeRent(val){
      this.onChange('rent', val);
    },
    onChangeType(val){
      this.onChange('type', val);
    },
    onChangeState(val){
      this.onChange('state', val);
    },
    onChange(type, val) {
      this.listData[type] = val;
    },
    getList(callback) {
      const that = this;
      let keyword = this.keyword || '';
      this.loading = true;
      let userInfo = Utils.getUserInfo();
      let page = this.pageIndex;
      let orderId = this.orderId || 0;
      Request.Agent.getRooms(userInfo.id, keyword, {orderId, page}).then((resp) => {
        that.loading = false;
        if (resp.body._status == 'SUCCESS') {
          let rooms = resp.body._body;
          that.totalCount = resp.body._page.totalResult;
          rooms.forEach(
            (item)=>{
              item.showConfig =  item.isConfiged !== 'yes' && item.isServed === 'yes' ;
              item.showServe = item.isServed !== 'yes' ;
              item.showCancel = item.isConfiged === 'yes';
          });
          if(callback){
            callback(rooms);
          }else{
            that.rooms = rooms;
          }
          this.$nextTick(() => {
            this.setContentHeight();
          });
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
    search() {
      if (this.keyword) {
        this.getList();
      }
    },
    cancelSearch() {
      this.keyword = '';
      this.getList();
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
      this.getList(callback);
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
      this.getList(callback);
    },
    gotoDetail(roomId){
    }
  },
  ready() {
    Utils.changePageTitle.call(this);
    this.userInfo = Utils.getUserInfo();
    let params = this.$route.params;
    if(params.orderId){
      this.orderId = params.orderId;
    }
    this.getList();
  }
}
</script>
