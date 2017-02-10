<style lang="less" scoped>
.order-detail-vue {
  .weui_panel {
    margin-top: 0;
  }
  .order-item {
    padding: 0 10px;
    font-size: 14px;
    .item-agent, .item-customer {
      padding: 8px 0;
      line-height: 28px;
      a {
        padding: 0 30px;
      }
    }
  }
}
</style>

<template>
  <div class="order-detail-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">{{orderMap[orderType]}}详情</x-header> -->
    <panel :list="roomDetail" :type="panelType"></panel>
    <group>
      <div class="order-item">
        <p class="item-agent vux-1px-b"><label>经纪人：</label><span>{{order.agentName}}</span><a class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:{{order.agentPhone}}">致电</a></p>
        <p class="item-customer"><label>租客：</label><span>{{order.renterName}}</span>
        <a v-show="orderType==3" class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:{{order.renterPhone}}">致电</a>
        </p>
      </div>
    </group>
    <group>
      <div v-if="orderType==1" class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">看房时间</label>
            <em class="weui-form-preview__value">{{order.lookDate}}</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">创建时间</label>
            <span class="weui-form-preview__value">{{order.createTime}}</span>
          </div>
         <!--  <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">看房人数</label>
            <span class="weui-form-preview__value">1人</span>
          </div> -->
        </div>
      </div>
      <div v-if="orderType==2" class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">预定金</label>
            <em class="weui-form-preview__value">{{order.amountBook}}元</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">创建时间</label>
            <span class="weui-form-preview__value">2016-11-10 10:00</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">租客是否支付</label>
            <span class="weui-form-preview__value">{{order.hasPay}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">支付方式</label>
            <span class="weui-form-preview__value">{{order.payTypeName}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">月租金</label>
            <span class="weui-form-preview__value">{{order.amount}}元</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">押金</label>
            <span class="weui-form-preview__value">{{order.mountYa}}元</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">付款方式</label>
            <span class="weui-form-preview__value">{{order.payTypeName}}</span>
          </div>
         <!--  <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">合同起租日</label>
            <span class="weui-form-preview__value">{{order.contractStartDate}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">合同结束日</label>
            <span class="weui-form-preview__value">{{order.contractEndDate}}</span>
          </div> -->
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">最晚签约日</label>
            <span class="weui-form-preview__value">{{order.endSignDate}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">备注</label>
            <span class="weui-form-preview__value">{{order.orderMemo}}</span>
          </div>
        </div>
      </div>
      <div v-if="orderType==3" class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">租客首付款</label>
            <em class="weui-form-preview__value">{{order.amountFirst}}元</em>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">佣金支出</label>
            <em class="weui-form-preview__value">{{order.amountAgent}}元</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">创建时间</label>
            <span class="weui-form-preview__value">{{order.createDate}}</span>
          </div>
           <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">同意时间</label>
            <span class="weui-form-preview__value">{{order.orderLapsedTime}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">租客电话</label>
            <span class="weui-form-preview__value">{{order.renterPhone}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">实际租金</label>
            <span class="weui-form-preview__value">{{order.amount}}月</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">付款方式</label>
            <span class="weui-form-preview__value">{{order.payRentTyper}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">起租日</label>
            <span class="weui-form-preview__value">{{order.contractStartDate}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">到期日</label>
            <span class="weui-form-preview__value">{{order.contractEndDate}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">租约期限</label>
            <span class="weui-form-preview__value">{{order.contractLong}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">备注</label>
            <span class="weui-form-preview__value">{{order.orderMemo}}</span>
          </div>
        </div>
      </div>
    </group>
    <box v-if="orderType==1" gap="20px">
      <button v-show="!historyMode" class="weui_btn weui_btn_default" @click="agreeSign(2)">拒绝看房</button>
    </box>
    <box v-if="orderType==2" gap="20px">
      <button v-show="!historyMode" class="weui_btn weui_btn_primary" @click="agreeSign(1)">同意</button>
      <button v-show="!historyMode" class="weui_btn weui_btn_default" @click="agreeSign(2)">拒绝</button>
      <button v-show="historyMode" class="weui_btn weui_btn_warn" @click="cancelSign">撤销预定</button>
    </box>
    <box v-if="orderType==3" gap="20px">
      <button v-show="!historyMode" class="weui_btn weui_btn_primary" @click="agreeSign(1)">同意</button>
      <button v-show="!historyMode" class="weui_btn weui_btn_default" @click="agreeSign(2)">拒绝</button>
    </box>
    <loading :show="loading" :text="loadingText"></loading>
    <toast :type="toastType" :show.sync="showToast" :time="2000">{{toastText}}</toast>
    <confirm :show.sync="showConfirm" title="删除房源" @on-cancel="onCancel" @on-confirm="onConfirm">
    <p style="text-align:center;">确定删除房源吗?</p>
    </confirm>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Box from 'vux-components/box'
import Panel from 'vux-components/panel'
import Card from 'vux-components/card'
import Loading from 'vux-components/loading'
import XButton from 'vux-components/x-button'
import Toast from 'vux-components/toast'
import Request from '../../js/request'
import BookOrder from '../../js/model/BookOrder'
import ReserveOrder from '../../js/model/ReserveOrder'
import SignOrder from '../../js/model/SignOrder'
import Manba from 'manba'
import Utils from '../../js/utils'
import Confirm from 'vux-components/confirm'

export default {
  data() {
    return {
      panelType: '1',
      orderId: '',
      orderType: '3',
      orderMap: {
        1: '预约',
        2: '预定',
        3: '签约'
      },
      order: {},
      keyword: '',
      loading: false,
      loadingText: '加载中...',
      roomTitle: '',
      showToast: false,
      toastType: '',
      toastText: '',
      historyMode: false,
      roomId: '',
      showConfirm: false
    }
  },
  computed: {
    roomDetail() {
      return [{
        src: '',
        title: this.order.roomTitle,
        desc: '',
        url: '/'
      }];
    }
  },
  beforeCompile() {
    this.setOrder({});
  },
  components: {
    XHeader,
    Group,
    Box,
    Panel,
    Card,
    Loading,
    XButton,
    Toast,
    Confirm
  },
  methods: {
    setOrder(order) {
      if (this.orderType == '1') {
        this.order = BookOrder.parse(order);
      } else if (this.orderType == '2') {
        this.order = ReserveOrder.parse(order);
      } else if (this.orderType == '3') {
        this.order = SignOrder.parse(order);
      }
    },
    onConfirm (){
      this.agreeSign(3);
    },
    onCancel(){

    },
    cancelSign(){
      this.showConfirm = true;
    },
    agreeSign(type) {
      let user = Utils.getUserInfo(), that = this;
      Request.Sale.updateOrder(user.id, this.orderId, {
        orderId: this.orderId,
        orderType: this.orderType,
        type: type,
        userId: user.id,
        roomId: this.roomId
      }).then((resp)=>{
        that.showToast = true;
        that.toastText = "操作成功！";
        setTimeout(function(){
          that.$router.go("/orderList");
          },1000);
      });
    }
  },
  ready() {
    Utils.changePageTitle(this.orderMap[this.orderType]);
    const that = this;
    const pathParam = this.$route.params;
    let requestFunc = Request.Sale.getBookOrderDetail;
    this.orderType = pathParam.type;
    if (this.orderType == '2') {
      requestFunc = Request.Sale.getReserveOrderDetail;
    } else if (this.orderType == '3') {
      requestFunc = Request.Sale.getSignOrderDetail;
    }
    if (pathParam.id) {
      this.roomId = pathParam.roomId;
      this.orderId = pathParam.id;
      this.historyMode = pathParam.historyMode=='false'?false:true;
      this.loading = true;
      let userInfo = Utils.getUserInfo();
      requestFunc(userInfo.id, this.orderId).then((resp) => {
        this.loading = false;
        if (resp.body._status === 'SUCCESS') {
          let order = resp.body._body;
          this.setOrder(order);
        }else{
          this.showToast = true;
          this.toastType = 'warn';
          this.toastText = resp.body._message;
        }
      })
    }
  }
}
</script>
