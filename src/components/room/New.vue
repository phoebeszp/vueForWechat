<style lang="less">
.room-new-vue {
  .type-selector {
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 50%;
        padding: 15px 0;
        text-align: center;
        &.selected {
          background: #d5d5d5;
          box-shadow: 0 0 2px #999 inset;
        }
        span {
          display: inline-block;
          width: 48px;
          height: 48px;
          line-height: 48px;
          font-size: 30px;
          border-radius: 5px;
          margin-bottom: 8px;
        }
      }
    }
  }
  .weui_cell {
    .weui_input {
      text-align: right;
      box-sizing: border-box;
      padding-right: 10px;
    }
    &:before {
      left: 0;
    }
  }
  .flexbox {
    .flex-label {
      text-align: center;
    }
    .weui_cell {
      .weui_input {
        text-align: right;
        box-sizing: border-box;
        padding-right: 10px;
      }
      &:before {
        left: 0;
      }
    }
  }
  .room-info {
    .weui_cell {
      .weui_input {
        text-align: right;
        box-sizing: border-box;
        padding-right: 10px;
      }
      &:before {
        left: 0;
      }
      .weui_select {
        text-align-last: right;
      }
    }
  }
  .weui_cell .flexbox .weui_cell {
    padding: 0;
  }
  .weui_icon_checked {
    float: left;
    margin-right: 4px;
  }
  .weui_check:checked + .weui_icon_checked:before {
    content: '\EA06';
    color: #09bb07;
  }
  .weui-agree {
    text-align: center;
    font-size: 12px;
    span {
      vertical-align: 2px;
    }
    a {
      color: #687A9E;
    }
    &.margintop100 {
      margin-top: 20px;
    }
  }
  .weui_cell_ft {
    .cell-right {
      display: inline-block;
    }
  }
  .item-btns {
    .left {
      width: 45%;
      margin-bottom: 5px;
    }
    .right {
      width:45%;
      margin-top: 0px;
      margin-bottom: 5px;
    }
  }
}
</style>

<template>
<div class="room-new-vue">
  <!-- <x-header :left-options="{showBack: true,backText: '返回'}">{{headerTitle}}</x-header> -->
  <div class="content">
    <div v-bind:style="disabled"></div>
     <group title="房源编号:" v-if="edit">
      <x-input  type="text"  :value.sync="room.roomNumId" readonly></x-input>
    </group>
    <group title="房源标题:">
      <!-- <x-input v-if="edit" type="text" title="房源编号" :value.sync="room.roomNumId" readonly></x-input> -->
      <x-input type="text" placeholder="描述" :value.sync="room.roomTitle"></x-input>
    </group>
    <group title="出租类型：" class="type-selector">
      <ul>
        <li :class="{'selected':room.rentType==2}" @click="selectRentType(2)"><span class="iconfont icon-fangwuzhengzu"></span><p>整套出租</p></li>
        <li :class="{'selected':room.rentType==1}" @click="selectRentType(1)"><span class="iconfont icon-401"></span><p>合租单间</p></li>
      </ul>
    </group>
    <group title="地址：">
      <address title="国家/地区" :value.sync="room.district" :list="addressData"></address>
      <x-input title="小区" :value.sync="room.community" :show-clear="false" :required="true">
      </x-input>
      <flexbox class="vux-1px-t flexbox" :gutter="0">
        <flexbox-item class="flex-label" :span="1/5">地址:</flexbox-item>
        <flexbox-item class="vux-1px-l" :span="4/5">
          <x-input :value.sync="room.road" :show-clear="false" :required="false">
            <span>路</span>
          </x-input>
          <x-input :value.sync="room.nong" :show-clear="false" :required="false">
            <span>弄</span>
          </x-input>
        </flexbox-item>
      </flexbox>
      <flexbox class="vux-1px-t flexbox" :gutter="0">
        <flexbox-item class="flex-label" :span="1/5">房源:</flexbox-item>
        <flexbox-item class="vux-1px-l" :span="2/5">
          <x-input :value.sync="room.roadum" :show-clear="false" :required="false">
            <span>号</span>
          </x-input>
          <x-input :value.sync="room.floorNum" :show-clear="false" :required="false">
            <span>室</span>
          </x-input>
        </flexbox-item>
        <flexbox-item class="vux-1px-l" :span="2/5">
          <x-input :value.sync="room.building" :show-clear="false" :required="false">
            <span>栋</span>
          </x-input>
          <x-input :value.sync="room.roomNum" :show-clear="false" :required="false">
            <span>房间</span>
          </x-input>
        </flexbox-item>
      </flexbox>
    </group>
    <group class="room-info" title="房源信息：">
      <x-input title="面积：" :value.sync="room.area" :show-clear="false" :required="false">
        <span>平米</span>
      </x-input>
      <selector title="朝向：" :options="faceList" :value.sync="room.roomFace"></selector>
      <selector title="房源状态：" :options="statusList" :value.sync="room.rentStatus"></selector>
      <x-input title="每月租金：" :value.sync="room.roomPrice" :show-clear="false" :required="false">
        <span>元</span>
      </x-input>
      <div class="weui_cell">
        <flexbox :gutter="0">
          <flexbox-item :span="1/4">付款方式：</flexbox-item>
          <flexbox-item :span="3/8">
            <selector :options="payList" :value.sync="payCount"></selector>
          </flexbox-item>
          <flexbox-item :span="3/8">
            <selector :options="yaList" :value.sync="yaCount"></selector>
          </flexbox-item>
        </flexbox>
      </div>
      <x-input title="预定金：" :value.sync="room.bookingPrice" :show-clear="false" :required="false">
        <span>元</span>
      </x-input>
      <calendar  title= "可入住日期：" :value.sync="room.checkinTime" ></calendar>
    </group>
    <group class="weui_cells_checkbox" title="成交佣金：(佣金越高成交越快)">
      <div class="weui_cell">
        <flexbox class="flexbox" :gutter="0">
          <flexbox-item :span="1/4">
            <input type="radio"  name="payType" id="agent_type_1" value="1" v-model="room.agentType">
            <!-- <i class="weui_icon_checked"></i> -->
            <label for="agent_type_1">月租：</label>
          </flexbox-item>
          <flexbox-item :span="3/8">
            <x-input :value.sync="room.fixedPercent" :show-clear="false" :required="false">
              <span>%</span>
            </x-input>
          </flexbox-item>
          <flexbox-item :span="3/8">
            <span class="right">{{agentPrice}}元</span>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="weui_cell">
        <flexbox class="flexbox" :gutter="0">
          <flexbox-item :span="1/4">
            <input type="radio" name="payType" id="agent_type_2" value="2" v-model="room.agentType">
            <!-- <i class="weui_icon_checked"></i> -->
            <label for="agent_type_2">固定：</label>
          </flexbox-item>
          <flexbox-item :span="3/8">
            <x-input :value.sync="room.fixedPrice" :show-clear="false" :required="false">
              <span>元</span>
            </x-input>
          </flexbox-item>
          <flexbox-item :span="3/8">
            <span class="right">{{agentPercent}}%</span>
          </flexbox-item>
        </flexbox>
      </div>
    </group>
    <group title="房源照片：">
      <uploader :file-url="roomPic" :multiple="true" text="房源照片"></uploader>
    </group>
    <group title="房源描述：">
      <x-textarea placeholder="文字描述" :value.sync="room.roomMemo"></x-textarea>
    </group>
    <group v-if="edit" title="房源状态：">
      <selector title="房源状态：" :options="statusList" :value.sync="room.rentStatus"></selector>
      <cell title="销售状态：" link="/sale-management">
        <div class="cell-right">{{roomStatus}}</div>
      </cell>
    </group>
   <!--  <group v-if="edit" title="历史：">
      <cell title="历史签约记录：" link="/"></cell>
      <cell title="历史预定记录：" link="/"></cell>
      <cell title="历史看房记录：" link="/"></cell>
    </group> -->
    <div class="margintop100 weui-agree" v-show="!readonly">
      <input type="checkbox" class="weui-agree__checkbox" v-model="agreeRule" checked>
      <span class="weui-agree__text">
        已阅读并同意<a href="javascript:void(0);">《虚假房源处罚规则》</a>以及<a href="javascript:void(0);">《房屋出租代理协议》</a>
      </span>
    </div>
    <box gap="20px" v-show="!readonly">
      <div v-if="edit" >
        <div class="item-btns">
          <button class="weui_btn weui_btn_primary item-btn left" @click="onSubmit">保存</button>
          <button v-if="edit" class="weui_btn weui_btn_warn right" @click="deleteRoom">删除</button>
          <button v-else class="weui_btn weui_btn_default  right" @click="cancel">取消</button>
        </div>
        <button v-if="agreeRule" class="weui_btn weui_btn_primary" @click="onSubmit(true)">保存成新房源
        </button>
        <button v-else disabled class="weui_btn weui_btn_disabled">发布房源</button>
      </div>
      <div v-if="edit!==true" class="item-btns">
        <button v-if="agreeRule" class="weui_btn weui_btn_primary left" @click="onSubmit(true)">发布房源
        </button>
        <button v-else disabled class="weui_btn weui_btn_disabled left">发布房源</button>
        <button v-else class="weui_btn weui_btn_default  right" @click="cancel">取消</button>
      </div>
     
    </box>
     <confirm :show.sync="showConfirm" title="删除房源" @on-cancel="onCancel" @on-confirm="onConfirm">
      <p style="text-align:center;">确定删除房源吗?</p>
    </confirm>
    <loading :show="loading" :text="loadingText"></loading>
    <toast :type="toastType" :show.sync="showToast" :time="2000">{{toastText}}</toast>
  </div>

</div>
</template>

<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Selector from 'vux-components/selector'
import Box from 'vux-components/box'
import Cell from 'vux-components/cell'
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import Address from 'vux-components/address'
import Datetime from 'vux-components/datetime'
import Toast from 'vux-components/toast'
import XInput from 'vux-components/x-input'
import XButton from 'vux-components/x-button'
import XTextarea from 'vux-components/x-textarea'
import Loading from 'vux-components/loading'
import Uploader from '.././fix/Uploader'
import Request from '../../js/request'
import Room from '../../js/model/Room'
import Utils from '../../js/utils'
import Calendar from 'vux-components/calendar'
import Confirm from 'vux-components/confirm'

export default {
  props: ['edit', 'roomId', 'readonly'],
  data() {
    return {
      disabled: {
        'z-index': 9999,
        position: 'initial',
        top: '46px',
        right: 0,
        bottom: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.16)'
      },
      showConfirm: false,
      room: Room.parse({}),
      roomPic: [],
      addressData: [],
      loading: false,
      loadingText: '加载中...',
      showToast: false,
      toastType: '',
      toastText: '发布成功',
      agreeRule: true,
      statusList: [{
        key: '1', value: '待出租'
      }, {
        key: '2', value: '已出租'
      }, {
        key: '3', value: '待上线'
      }],
      payCount: '3',
      payList: [{
        key: '1', value: '付一'
      }, {
        key: '2', value: '付二'
      }, {
        key: '3', value: '付三'
      }, {
        key: '4', value: '付四'
      }, {
        key: '5', value: '付五'
      }, {
        key: '6', value: '付六'
      }, {
        key: '7', value: '付七'
      }, {
        key: '8', value: '付八'
      }, {
        key: '9', value: '付九'
      }, {
        key: '10', value: '付十'
      }, {
        key: '11', value: '付十一'
      }, {
        key: '12', value: '付十二'
      }],
      yaCount: '1',
      yaList: [{
        key: '1', value: '押一'
      }, {
        key: '2', value: '押二'
      }, {
        key: '3', value: '押三'
      }, {
        key: '4', value: '押四'
      }, {
        key: '5', value: '押五'
      }, {
        key: '6', value: '押六'
      }, {
        key: '7', value: '押七'
      }, {
        key: '8', value: '押八'
      }, {
        key: '9', value: '押九'
      }, {
        key: '10', value: '押十'
      }, {
        key: '11', value: '押十一'
      }, {
        key: '12', value: '押十二'
      }],
      roomStatus: 0,
      orderStatusList: {
        0: '初始化',
        1: '预约待处理',
        2: '预约取消',
        3: '预约同意',
        4: '预约拒绝',
        5: '预定待处理',
        6: '预定取消',
        7: '预定同意',
        8: '预定拒绝',
        9: '签约待处理',
        10: '签约取消',
        11: '签约同意',
        12: '签约拒绝'
      }
    }
  },
  beforeCompile() {
    if (this.edit) {
      this.room.editType = 2;
      this.toastText = '修改成功';
    }
    this.room.fixedPercent = '35';
    this.room.bookingPrice = '500';
    this.room.checkinTime = 'TODAY';
    // get districts
    if (sessionStorage.getItem('addressData')) {
      this.addressData = JSON.parse(sessionStorage.getItem('addressData'));
    } else {
      Request.Common.getCityDistrict().then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          const datas = resp.body._body;
          let ds = [];
          for (let c of datas) {
            ds.push({
              name: c.name,
              value: `${c.id}`
            });
            if (c.distrincts && c.distrincts.length) {
              for (let d of c.distrincts) {
                ds.push({
                  name: d.name,
                  value: `${d.id}`,
                  parent: `${d.cityId}`
                })
              }
            }
          }
          this.addressData = ds;
          sessionStorage.setItem('addressData', JSON.stringify(ds));
        }
      })
    }
  },
  computed: {
     agentPercent(){
      if (this.room.fixedPrice && this.room.roomPrice) {
        let fixedPrice = parseInt(this.room.fixedPrice);
        let roomPrice = parseInt(this.room.roomPrice);
        let rate = ((fixedPrice/roomPrice).toFixed(2))*100;
        return Math.round(rate*100)/100;
      }
      return '';
    },
    agentPrice() {
      if (this.room.fixedPercent && this.room.roomPrice) {
        return Math.round((parseInt(this.room.fixedPercent) * parseInt(this.room.roomPrice)) / 100);
      }
      return '';
    },
    rentStatus() {
      switch (this.room.rentStats) {
        case 1:
          return '待出租';
        case 2:
          return '已出租';
        case 3:
          return '待上线';
      }
      return '';
    },
    faceList() {
      if (this.room.rentType == 2) {
        return [{
          key: '1', value: '东'
        }, {
          key: '2', value: '南'
        }, {
          key: '3', value: '西'
        }, {
          key: '4', value: '北'
        }, {
          key: '5', value: '东南'
        }, {
          key: '6', value: '东北'
        }, {
          key: '7', value: '西南'
        }, {
          key: '8', value: '西北'
        }];
      }
      return [{
        key: '1', value: '主卧朝东'
      },{
        key: '2', value: '主卧朝南'
      }, {
        key: '3', value: '主卧朝西'
      }, {
        key: '4', value: '主卧朝北'
      }, {
        key: '5', value: '次卧朝东'
      }, {
        key: '6', value: '次卧朝南'
      }, {
        key: '7', value: '次卧朝西'
      }, {
        key: '8', value: '次卧朝北'
      }, {
        key: '9', value: '厅房朝东'
      }, {
        key: '10', value: '厅房朝南'
      }, {
        key: '11', value: '厅房朝西'
      }, {
        key: '12', value: '厅房朝北'
      }];
    }
  },
  methods: {
    selectRentType(type) {
      this.room.rentType = type;
    },
    onSubmit(isNew){
      const that = this;
      if (this.room.district){
        this.room.cityId = this.room.district[0];
        this.room.districtId = this.room.district[1];
      }
      this.room.payType = this.payCount + '/' + this.yaCount;
      if (this.room.agentType == '1') {
        this.room.agentPercent = this.room.fixedPercent;
        this.room.agentPrice = this.agentPrice;
      } else if (this.room.agentType == '2') {
        this.room.agentPrice = this.room.fixedPrice;
        this.room.agentPercent = this.agentPercent;
      }
      let roomInfo = Room.dispose(this.room);
      if(isNew !== true){
        roomInfo.roomId = this.roomId;
        roomInfo.editType = 2;
      }else{
        roomInfo.editType = 1;
      }
      if (this.roomPic) {
        roomInfo.picAddress = this.roomPic.map(function(item){
          return {url: item};
        });
        roomInfo.picAddress = JSON.stringify(roomInfo.picAddress);
      }
      let validatedResult = this._validate(roomInfo);
      if(!validatedResult.status){
        this.showToast = true;
        this.toastType = 'warn';
        this.toastText = validatedResult.text;
        return;
      }
      that.loading = true;
      that.loadingText = "保存中...";
      let userInfo = Utils.getUserInfo();
      Request.Room.upsert(userInfo.id, roomInfo).then((resp) => {
        this.loading = false;
        if (resp.body._status == 'SUCCESS') {
          this.showToast = true;
          this.$router.go('/room-management');
        }else{
          this.toastText = resp.body._msg;
          this.toastType = 'warn';
          this.showToast = true;
        }
      });
    },
    _validate(data){
      let required = {
        'roomTitle': '房源标题',
        'rentType': '出租类型',
        'cityId': '城市',
        'community':'小区',
        'districtId': '区',
        'road': '路',
        'roadum': '号',
        'roomFace': '朝向',
        'checkinTime': '可入住时间',
        'roomPrice': '租金',
        'payType': '付款类型',
        'area': '面积',
        'bookingPrice': '定金',
        'agentType': '佣金类型',
        'agentPercent': '佣金比例',
        'agentPrice': '佣金金额',
        'roomMemo': '房源描述',
        'rentStatus': '房源状态',
        'picAddress': '房源照片'
      }, result = {};
      for(let key in required){
        if(required.hasOwnProperty(key)){
          if(!data[key] || data[key] === "[]"){
            result.text = '请输入' + required[key];
            result.status = false;
            return result;
          }
        }
      }
      return {status: true, text: ''};
    },
    cancel() {
      this.$router.go('/room-management');
    },
    deleteRoom (roomId) {
      this.selectedId = roomId;
      this.showConfirm = true;
    },
    onCancel (){

    },
    onConfirm() {
      let that = this;
      let userInfo = Utils.getUserInfo();
      Request.Room.deleteRoom(this.roomId, {
        userId: userInfo.id || ""
      }).then(res => {
        this.$router.go('/room-management');
      })
    }
  },
  ready() {
    let headerTitle = '发布房源';
    if (this.readonly) {
      headerTitle = '房源详情';
    }else if (this.edit) {
      headerTitle = '编辑房源';
    }
    Utils.changePageTitle(headerTitle);
    function calcMaskHeight(){
      let contentHeight = document.getElementsByClassName("content")[0].clientHeight;
      let screenHeight = window.screen.height;
      let headerHeight = document.getElementsByClassName("vux-header-title")[0].clientHeight;
      return contentHeight - screenHeight - headerHeight + 150; //some margin here
    }
    if (this.edit) { //disable
      //this.disabled.position = "absolute";
      //this.disabled.bottom = `-${calcMaskHeight()}px`;
    }

    this.selectRentType(2);
    let userInfo = Utils.getUserInfo();
    if (this.edit || this.readonly) {
      let that = this;
      that.loading = true;
      Request.Room.get(userInfo.id, this.roomId).then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          that.loading = false;
          resp.body._body.district = [
            resp.body._body.cityId.toString(),
            resp.body._body.districtId.toString()
          ];
          that.room = Room.parse(resp.body._body);
          let pics = resp.body._body.picDetails;
          that.roomStatus = this.orderStatusList[that.room.orderStatus];
          that.roomPic = pics.map(function(item){
            return item.picAddress;
          });
          if (that.room.payType) {
            that.payCount = that.room.payType.split('/')[0];
            that.yaCount = that.room.payType.split('/')[1];
          }
          if (that.room.agentType == '1') {
            that.room.fixedPercent = that.room.agentPercent;
          } else if (that.room.agentType == '2') {
            that.room.fixedPrice = that.room.agentPrice;
          }
        } else {
          that.toastText = resp.body._msg;
          that.toastType = 'warn';
          that.showToast = true;
          setTimeout(() => {
            history.back();
          }, 2000);
        }
      })
    }
  },
  components: {
    XHeader,
    Group,
    Box,
    Cell,
    Flexbox,
    FlexboxItem,
    Address,
    Datetime,
    Toast,
    XInput,
    XButton,
    XTextarea,
    Uploader,
    Selector,
    Loading,
    Calendar,
    Confirm
  }
}
</script>
