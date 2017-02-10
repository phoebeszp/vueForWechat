<style lang="less">
.new-opportunity-vue{
  .budget{
    padding-left:17px;
  }
  .type-selector {
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 50%;
        padding: 5px 0;
        text-align: center;
        &.selected {
          background: #d5d5d5;
          box-shadow: 0 0 2px #999 inset;
        }
        span {
          display: inline-block;
          width: 28px;
          height: 28px;
          line-height: 28px;
          font-size: 20px;
          border-radius: 5px;
          margin-bottom: 8px;
        }
      }
    }
  }
  .lookTypeStyle{
    .vux-flexbox{
      height: 40px;
    }
  }
}
</style>
<template>
<div class="new-opportunity-vue">
  <div class="content">
    <group title="基本信息">
      <x-input title="租客姓名:" type="text" :value.sync="opp.renterName"></x-input>
      <div class="weui_cell gendor-types">
          <flexbox class="radioList">
            <flexbox-item :span="1/3" class="radio">
            <span>租客性别:</span>
            </flexbox-item>
            <flexbox-item :span="1/3" class="radio">
              <input type="radio"  name="gendor" id="gendor_1" :value="1" v-model="opp.renterSex">
              <label for="gendor_1">先生</label>
            </flexbox-item>
            <flexbox-item :span="1/3" class="radio">
              <input type="radio"  name="gendor" id="gendor_2" :value="2" v-model="opp.renterSex">
              <label for="gendor_2">女士</label>
            </flexbox-item>
          </flexbox>
        </div>
    </group>
    <group title="联系信息:">
      <x-input title="租客电话:" is-type="china-mobile" type="text" :value.sync="opp.renterPhone" ></x-input>
      <x-input title="微信号:" type="text" :value.sync="opp.renterWechat"></x-input>
    </group>
    <group title="意向地区:">
      <address title="城市" :value.sync="district" :list="addressData" @click="changeCity"></address>
      <cell title="商圈">
        <selector :options='areas' :value.sync="busiAreaId"></selector>
      </cell>
    </group>
    <group title="出租类型：" class="type-selector">
      <ul>
        <li :class="{'selected':opp.rentType==2}" @click="selectRentType(2)"><span class="iconfont icon-fangwuzhengzu"></span><p>整套出租</p></li>
        <li :class="{'selected':opp.rentType==1}" @click="selectRentType(1)"><span class="iconfont icon-401"></span><p>合租单间</p></li>
      </ul>
    </group>
    <group >
      <div>
        <flexbox >
          <flexbox-item :span="2/16" class="budget">
              <span>预算</span>
          </flexbox-item>
          <flexbox-item :span="2/8">
              <x-input class="number"  type="number" :value.sync="opp.roomPriceMin"></x-input>
          </flexbox-item>
          <flexbox-item :span="1/16">
              <span>至</span>
          </flexbox-item>
          <flexbox-item :span="2/8">
              <x-input class="number"   type="number" :value.sync="opp.roomPriceMax"></x-input>
           </flexbox-item>
           <flexbox-item :span="1/8">
              <span>元/月</span>
          </flexbox-item>
        </flexbox>
     </div>
      <flexbox >
          <flexbox-item :span="2/3" >
              <x-input  title="租期:" type="number" :value.sync="opp.renterLong"></x-input>
          </flexbox-item>
           <flexbox-item :span="1/3" class="budget">
           <span>月</span>
          </flexbox-item>
      </flexbox>
      <calendar  title="期望入住日期:"  :value.sync="opp.checkInDate" ></calendar>
    </group>
    <group  title="看房时间:" >
      <div class="lookTypeStyle">
      <flexbox>
        <flexbox-item :span="1/2"  class="budget">
           <input type="radio"   id="look_type_1" value="1" v-model="opp.lookedType">
           <label for="look_type_1">工作日下班后</label>
        </flexbox-item>
         <flexbox-item :span="1/4">
           <input type="radio"   id="look_type_2" value="2" v-model="opp.lookedType">
           <label for="look_type_2">周末</label>
        </flexbox-item>
        <flexbox-item :span="1/4">
           <input type="radio"  id="look_type_3" value="3" v-model="opp.lookedType">
           <label for="look_type_3">随时</label>
        </flexbox-item>
      </flexbox>
      </div>
    </group>
    <group title="详细租房说明">
      <x-textarea  :value.sync="opp.orderMemo"></x-textarea>
    </group>
 <!--    <group>
      <cell  title="配盘" link="/room-list">
      </cell>
    </group> -->
    <group >
      <cell title="服务日志" link=""></cell>
    </group>
    <group title="">
      <button class="weui_btn weui_btn_primary left" @click="onSubmit(true)">配盘
      </button>
    </group>
    <loading :show="loading" :text="loadingText"></loading>
    <toast :type="toastType" :show.sync="showToast" :time="2000">{{toastText}}</toast>
  </div>
</div>
</template>

<script>
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
import Checklist from 'vux-components/checklist'
import Opportunity from '../../js/model/Opportunity'
import Picker from 'vux-components/picker'
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  props: ['edit', 'roomId', 'readonly'],
  data() {
    return {
      opp: Opportunity.parse({}),
      gendor: 1,
      rentType: 1,
      showConfirm: false,
      addressData: [],
      loading: false,
      loadingText: '加载中...',
      showToast: false,
      toastType: '',
      toastText: '发布成功',
      agreeRule: true,
      dateList: [{key:'1',value:'工作日下班后'},{key:'2',value:'周末'},{key:'3',value:'随时'}],
      areas: [],
      lookTime: '',
      roomStatus: 0,
      busiAreaId:''
    }
  },
  computed: {
    district: {
      set: function(newValue){
        if (newValue){
          this.opp.district = newValue;
          let districtId = newValue[1];
          let that = this;
          this.loading = true;
          Request.Common.getBusinessArea(districtId).then(
          (resp)=>{
            that.loading = false;
            let areas = [];
            resp.body._body.forEach(function(item){
              areas.push({
                'value': item.name,
                'key': item.id + ''
              });
              that.areas = areas;
            });
          });
        }
      }
    }
  },
  beforeCompile() {
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
  methods: {
    selectRentType(type) {
      this.opp.rentType = type;
    },
    onSubmit(isNew){
      if (this.opp.district){
        this.opp.cityId = this.opp.district[0];
        this.opp.districtId = this.opp.district[1];
        this.opp.busiAreaId = parseInt(this.busiAreaId);
      }
      let opp = Opportunity.dispose(this.opp);
      let validatedResult = this._validate(opp);
      if(!validatedResult.status){
        this.showToast = true;
        this.toastType = 'warn';
        this.toastText = validatedResult.text;
        return;
      }
      this.loading = true;
      Request.Agent.addOpportunity(opp).then(
        (resp) => {
          if (resp.body._status == 'SUCCESS') {
            this.showToast = true;
            this.$router.go('/room-list/'+resp.body._body.orderId);
          }else{
            this.toastText = resp.body._msg;
            this.toastType = 'warn';
            this.showToast = true;
          }
        }
      );
    },
    _validate(data){
      let required = {
         renterName: '',
          renterSex: '',
          renterPhone: '',
          renterWechat: '',
          cityId: '',
          districtId: '',
          busiAreaId: 0,
          rentType: 1,
          roomPriceMin: '',
          roomPriceMax: '',
          renterLong: '',
          checkInDate:'',
      }, result = {};

      Object.keys(required).forEach((key)=>{
        if(!data[key]){
            result.text = '请输入' + required[key];
            result.status = false;
            return result;
          }
      });
      return {status: true, text: ''};
    },
  },
  ready() {
    let userInfo = Utils.getUserInfo();
    this.opp.userId = userInfo.id;
    this.selectRentType(2);
  },
  components: {
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
    Confirm,
    Checklist,
    Opportunity,
    Utils,
    Picker
  }
}
</script>
