<style lang="less">
.opportunity-detail-vue{
 .vux-flexbox{
  padding: 8px;
 }
 .customer-info{
  margin-left: 20px
 }
}
</style>
<template>
<div class="opportunity-detail-vue">
  <div class="content">
  <group>
    <flexbox class="customer-info">
      <flexbox-item :span="1/3" >
      <span>{{opp.renterName}}{{opp.renterSex==1?'先生':'女士'}}</span>
      </flexbox-item>
      <flexbox-item :span="2/3" >
        <span>预算{{opp.budeget}}元/月</span>
      </flexbox-item>
    </flexbox>
   <flexbox class="radioList">
      <flexbox-item :span="3/4" class="radio">
        <address  title="意向区域" :value.sync="opp.district" :list="addressData"></address>
      <!-- <x-input  :value.sync="opp.community" :show-clear="false" :required="true"> -->
      </flexbox-item>
    </flexbox>
   <flexbox class="radioList">
      <flexbox-item :span="1/2" class="radio">
        <cell title="租约期限">{{opp.checkLong}}个月</cell>
      </flexbox-item>
      <flexbox-item :span="1/2" class="radio">
        <ul>
          <li v-show="opp.rentType=='2'" ><span class="iconfont icon-fangwuzhengzu"></span><p>整套出租</p></li>
          <li  v-show="opp.rentType=='1'" ><span class="iconfont icon-401"></span><p>合租单间</p></li>
      </ul>
      </flexbox-item>
    </flexbox>
    </group>
   <group>
      <cell title="期望入住时间">{{opp.checkInDate}}</cell>
      <cell title="期望看房时间">{{opp.lockedDate}}</cell>
      <cell title="匹配房源清单" link="/">
        <span>预约:{{opp.bookCount}}</span>
        <span>预订:{{opp.reverseCount}}</span>
      </cell>
      <cell title="感谢费">{{opp.amountThanks}}元</cell>
      <cell title="服务日志" link="/"></cell>
    </group>
   <group>
      <cell title="订单编号">{{opp.orderNum}}</cell>
      <cell title="创建日期">{{opp.createDate}}</cell>
      <cell title="抢单时间">{{opp.receiveOrderDate}}</cell>
   </group>
    <group>
      <cell title="订单状态">{{opp.state}}</cell>
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
      showConfirm: false,
      loading: false,
      loadingText: '加载中...',
      showToast: false,
      dateList: [{key:'1',value:'工作日下班后'},{key:'2',value:'周末'},{key:'3',value:'随时'}],
      areas: [],
      addressData: []
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
    let userInfo = Utils.getUserInfo(), that= this;
    this.opp.userId = userInfo.id;
    const params = this.$route.params;
    Request.Agent.getOpportunity(params.id).then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          that.loading = false;
          resp.body._body.district = [
            resp.body._body.cityId.toString(),
            resp.body._body.districtId.toString()
          ];
          that.opp = Opportunity.parse(resp.body._body);
          that.opp.budeget = that.opp.roomPriceMin + '-' + that.opp.roomPriceMax;
        } else {
          that.toastText = resp.body._msg;
          that.toastType = 'warn';
          that.showToast = true;
          setTimeout(() => {
            history.back();
          }, 2000);
        }
      })
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
