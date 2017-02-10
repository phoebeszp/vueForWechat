<style lang="less" scoped>
.account-bind-vue {
  .account-types {
    ul {
      overflow: hidden;
      li {
        float: left;
        list-style: none;
        margin-right: 15px;
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
  .bind-btn {
    margin-top: 30px;
  }
}
</style>

<template>
  <div class="account-bind-vue">
    <!-- <x-header :left-options="{showBack: false}">账号绑定</x-header> -->
    <group title="我是(必填)">
      <div class="weui_cell account-types">
        <ul class="weui_cells_checkbox">
          <li v-for="(key,role) in types" >
            <input type="radio" class="weui_check" name="type" :id="'role_'+key" :value="key" v-model="type" disabled=true>
            <i class="weui_icon_checked"></i>
            <label :for="'role_'+key">{{role}}</label>
          </li>
        </ul>
      </div>
    </group>
    <group title="基本信息(必填)">
      <x-input title="手机号" type="text" name="phoneNo" is-type="china-mobile" :value.sync="phoneNo" :show-clear="false" :required="false" placeholder="请输入手机号">
        <button v-if="!phoneNo" disabled slot="right" class="weui_btn weui_btn_mini weui_btn_default weui_btn_disabled" @click="sendCode">发送验证码</button>
        <button v-if="!countingDown&&phoneNo" slot="right" class="weui_btn weui_btn_mini weui_btn_primary" @click="sendCode">发送验证码</button>
        <span class="mini" v-if="countingDown" slot="right">{{time}}s后可重新发送</span>
      </x-input>
      <x-input title="验证码" name="verifyCode" keyboard="number" :value.sync="verifyCode" :show-clear="false" :required="false"></x-input>
    </group>
    <group title="邀请人">
      <x-input title="手机号" type="text" name="agentPhoneNo" is-type="china-mobile" :value.sync="agentPhoneNo" placeholder="请输入手机号"></x-input>
    </group>
    <box gap="50px 20px">
      <label for="weuiAgree" class="weui-agree">
        <input type="checkbox" class="weui-agree__checkbox">
        <span class="weui-agree__text">
          已阅读并同意<a href="javascript:void(0);">《平台服务公约》</a>
        </span>
      </label>
      <button class="bind-btn weui_btn weui_btn_primary" @click="onRegist">一键绑定</button>
    </box>
    <toast :show.sync="showToast" :type="toastType" :time="2000">{{toastText}}</toast>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>
<router-view transition="cover" ></router-view>
<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Box from 'vux-components/box'
import Toast from 'vux-components/toast'
import XInput from 'vux-components/x-input'
import XButton from 'vux-components/x-button'
import Loading from 'vux-components/loading'
import Request from '../../js/request'
import Utils from '../../js/utils'

export default {
  data() {
    return {
      phoneNo: '',
      verifyCode: '',
      agentPhoneNo: '',
      token: '',
      countingDown: false,
      time: 60,
      startCounting: false,
      types: {
        1: '租客',
        2: '房东',
        3: '经纪人',
      },
      type: 2,
      showToast: false,
      toastType: '',
      toastText: '发送成功',
      loading: false,
      loadingText: '保存中...'
    }
  },
  components: {
    XHeader,
    Group,
    Box,
    Toast,
    XInput,
    XButton,
    Loading
  },
  watch: {
    startCounting(newVal) {
      if (newVal) {
        this.tick();
      }
    }
  },
  init () {
    const query = this.$route.query;
    if(query && query.userType){
      if(query.token){
        sessionStorage.setItem("userInfo",
          JSON.stringify({
            "id": query.userId || "",
            "token": query.token,
            "type": query.userType
          })
        );
        if(query.userId){
          switch(query.userType){
            case '1':
              this.$router.go('/renter-home');
              break;
            case '2':
              this.$router.go('/holder-home');
              break;
            case '3':
              this.$router.go('/agent-home');
              break;
          }
        }
      }
    }
  },
  ready (){
    const query = this.$route.query;
    if(query && query.userType){
      this.type = parseInt(query.userType);
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
    toggleType(key) {
      this.type = key;
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
    finishCount() {
      this.countingDown = false;
      this.startCounting = false;
      this.time = 60;
    },
    onRegist() {
      const that = this;
      let param = {
        phoneNo: this.phoneNo,
        verifyCode: this.verifyCode,
        type: this.type
      };
      if (this.agentPhoneNo) {
        param.invitedBy = this.agentPhoneBy;
      }
      this.loading = true;
      Request.Holder.bindAccount(param).then((resp) => {
         that.loading = false;
        if (resp.body._status == 'SUCCESS') {
          let userInfo = Utils.getUserInfo();
          userInfo.id = resp.body._body.userId + '';
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          that.$router.replace('/bind-success');
        } else {
          that.toastType = 'warn';
          that.toastText = resp.body._msg;
          that.showToast = true;
        }
      });
    }
  }
}
</script>
