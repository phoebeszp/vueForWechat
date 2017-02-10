<style lang="less">
.withdraw-vue {
  .pay-types {
    ul {
      overflow: hidden;
      li {
        float: left;
        list-style: none;
        margin-right: 30px;
        input[type='radio'] {
          position: absolute;
          left: -9999em;
        }
        .weui_icon_checked {
          float: left;
          margin-right: 4px;
        }
        .weui_check:checked + .weui_icon_checked:before {
          content: '\EA06';
          color: #09bb07;
        }
      }
    }
  }
  .input-right {
    .weui_input {
      padding-right: 10px;
      text-align: right;
      box-sizing: border-box;
    }
  }
  .hint {
    font-size: 12px;
    color: #999;
    margin-top: 20px;
    padding: 0 15px;
  }
}
</style>

<template>
  <div class="withdraw-vue">
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">提现</x-header> -->
    <group title="支付通道">
      <div class="weui_cell pay-types">
        <ul class="weui_cells_checkbox">
          <li v-for="(key,paytype) in types" @click="toggleType(key)">
            <input type="radio" class="weui_check" name="type" :id="'paytype_'+key" :value="key" v-model="type">
            <i class="weui_icon_checked"></i>
            <label :for="'paytype_'+key">{{paytype}}</label>
          </li>
        </ul>
      </div>
    </group>
    <group title="账户信息">
      <x-input title="账户" type="text" name="username" :value.sync="username" placeholder="XXX@XXX.com" :required="true"></x-input>
    </group>
    <group title="金额">
      <x-input class="input-right" title="人民币" :required="true" type="text" keyboard="number" name="amount" :value.sync="amount" placeholder="****" :show-clear="false">
        <span>元</span>
      </x-input>
    </group>
    <group title="提现密码">
      <x-input title="密码" type="password" name="password" :value.sync="password" placeholder="******"></x-input>
    </group>
    <p class="hint">友情提醒：</p>
    <p class="hint">每天上午10点到下午5点，余额超过5元即可提现，每笔提现银行会收取1元手续费</p>
    <p class="hint">提现后预计1-2个工作日汇入您的银行卡</p>
    <p class="hint">若卡片信息有误，请及时与我们客服联系</p>
    <box gap="20px">
      <button class="weui_btn weui_btn_primary" @click="apply">申请提现</button>
    </box>
    <loading :show="loading" :text="loadingText"></loading>
    <toast :type="toastType" :show.sync="showToast" :time="2000">{{toastText}}</toast>
    <alert :show.sync="showAlert"  @on-hide="onHide" >去设置体现密码</alert>
  </div>
</template>
<router-view transition="cover" ></router-view>
<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Box from 'vux-components/box'
import XInput from 'vux-components/x-input'
import XButton from 'vux-components/x-button'
import Request from '../../js/request'
import Utils from '../../js/utils'
import Toast from 'vux-components/toast'
import Loading from 'vux-components/loading'
import Alert from 'vux-components/alert'

export default {
  data() {
    return {
      username: '',
      amount: '',
      password: '',
      token: '',
      loadingText: '处理中',
      loading: false,
      types: {
        1: '微信',
        2: '支付宝',
      },
      type: 1,
      toastText: "处理成功",
      showToast: false,
      showAlert: false
    }
  },
  components: {
    XHeader,
    Group,
    Box,
    XInput,
    XButton,
    Utils,
    Toast,
    Loading,
    Alert
  },
  methods: {
    toggleType(key) {
      this.type = key;
    },

    onCancel(){

    },
    onHide(){
      this.$router.go('/set-trade-password');
    },
    apply() {
      const that = this;
      let userInfo = Utils.getUserInfo();
      let param = {
        account: this.username,
        amount: this.amount,
        payType: this.type,
        password: this.password
      };
      this.loading = true;
      Request.User.withdraw(userInfo.id, param).then( (resp) => {
        that.loading = false;
        if (resp.body._status === 'SUCCESS') {
          that.showToast = true;
          that.$router.go('/wallet');
        }else{
          that.toastText = resp.body._msg;
          that.toastType = 'warn';
          that.showToast = true;
        }
      });
    }
  },
  ready() {
    Utils.changePageTitle.call(this);
    const userInfo = Utils.getUserInfo();
    let that = this;
    this.loading = true;
    Request.User.getwithDrawInfo(userInfo.id, userInfo.type).then((resp)=>{
      that.loading = false;
      if(resp.body._body.isPasswdExist){
        let result = resp.body._body;
        that.username = result.account;
        that.type = result.accountType;
      }else{
        that.showAlert = true;
      }
    });
  }
}
</script>
