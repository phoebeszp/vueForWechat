<style lang="less" scoped>
.trade-password-vue {

}
</style>

<template>
<div class="trade-password-vue">
  <!-- <x-header :left-options="{showBack: true, backText: '返回'}">设置交易密码</x-header> -->
  <group title="原密码：" v-show="isUpdate">
    <x-input title="输入原密码：" name="oldPassword" :value.sync="originPassword" type="password"></x-input>
  </group>
  <group title="新密码：" v-show="isUpdate">
    <x-input title="新密码：" name="password" :value.sync="password" type="password"></x-input>
    <x-input title="重复密码：" name="passwordRepeat" :value.sync="passwordRepeat"
    equal-with="password"
    type="password">
    </x-input>
    </x-input>
  </group>
  <group title="密码：" v-show="!isUpdate">
    <x-input title="输入密码：" name="password" :value.sync="password" type="password"></x-input>
    <x-input title="重复密码：" name="passwordRepeat" :value.sync="passwordRepeat"
    equal-with="password"
    type="password">
    </x-input>
  </group>
  <group title="手机验证：">
    <x-input title="手机号：" type="text" name="phoneNo" is-type="china-mobile"
    :value.sync="phoneNo" placeholder="请输入手机号">
      <button v-if="!countingDown" slot="right" class="weui_btn weui_btn_mini weui_btn_primary weui_btn_plain_primary" @click="sendCode">发送验证码</button>
      <span class="mini" v-else slot="right">{{time}}s后可重新发送</span>
    </x-input>
    <x-input title="验证码：" name="verifyCode" keyboard="number" :value.sync="verifyCode" ></x-input>
  </group>
  <box gap="50px">
    <button class="weui_btn weui_btn_primary" @click="setPassword">{{btnName}}</button>
  </box>
  <toast :show.sync="showToast" :type="toastType" :time="2000">{{toastText}}</toast>
</div>
</template>

<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Box from 'vux-components/box'
import XInput from 'vux-components/x-input'
import XButton from 'vux-components/x-button'
import Request from '../../js/request'
import Utils from '../../js/utils'
import Toast from 'vux-components/toast'

export default {
  data() {
    return {
      password: '',
      passwordRepeat: '',
      phoneNo: '',
      verifyCode: '',
      countingDown: false,
      time: 60,
      startCounting: false,
      isUpdate: false,
      originPassword: '',
      btnName: '保存',
      showToast: false,
      toastText: '',
      toastType: ''
    }
  },
  watch: {
    startCounting(newVal) {
      if (newVal) {
        this.tick();
      }
    }
  },
  methods: {
    tick() {
      const that = this;
      let countInterval = setInterval(() => {
        that.time--;
        if (that.time === 0) {
          clearInterval(countInterval);
          that.finishCount();
        }
      }, 1000);
    },
    finishCount() {
      this.countingDown = false;
      this.startCounting = false;
      this.time = 60;
    },
    sendCode() {
      if (this.phoneNo) {
        Request.Common.getVerifyCode(this.phoneNo).then((resp) => {
          if (resp.body._status === 'SUCCESS') {
            this.showToast = true;
            this.countingDown = true;
            this.startCounting = true;
          }
        })
      } else {

      }
    },
    setPassword() {
      const that = this;
      const userInfo = Utils.getUserInfo();
      let params = {
        userId: userInfo.id,
        userType: userInfo.type,
        newPassword: this.password,
        phoneNum: this.phoneNo,
        content: this.verifyCode
      };
      if(that.isUpdate){
        params.originPassword = this.originPassword;
      }
      Request.User.setTradePwd(params).then((resp) => {
          if (resp.body._status == 'SUCCESS') {
            if(userInfo.type === '2'){
              that.$router.replace('/setting');
            }
          }else{
            that.toastType = 'warn';
            that.toastText = resp.body._msg;
            that.showToast = true;
          }
      });
    }
  },
  ready() {
    const that = this;
    Utils.changePageTitle.call(this);
    const userInfo = Utils.getUserInfo();
    Request.User.queryTransPwd(userInfo.id, userInfo.type).then((resp)=>{
      if(resp.body._status == "SUCCESS"){
        that.isUpdate = true;
      }else{
        that.isUpdate = false;
        that.btnName = '一键绑定';
      }
    });
  },
  components: {
    XHeader,
    Group,
    Box,
    XInput,
    XButton,
    Toast
  }
}
</script>
