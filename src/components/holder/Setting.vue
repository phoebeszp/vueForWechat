<template>
  <div>
    <!-- <x-header :left-options="{showBack: true,backText: '返回'}">房东设置</x-header> -->
     <group title="基本信息（必填）">
      <x-input title="姓名" type="text" is-type="china-name" placeholder="请输入完整姓名" :value.sync="holder.name"></x-input>
      <x-input title="身份证" type="text" :value.sync="holder.cardNum"></x-input>
    </group>
    <group >
      <uploader text="身份证正面照" :file-url.sync="holder.cardFrontUrl"></uploader>
      <uploader text="身份证反面照" :file-url.sync="holder.cardBackUrl"></uploader>
      <uploader text="手持身份证照" :file-url.sync="holder.cardHandUrl"></uploader>
    </group>
    <group title="房东自述">
      <x-textarea placeholder="房东吹牛皮" :value.sync="holder.introduction"></x-textarea>
    </group>
    <group title="更多">
      <cell title="设置交易密码" link="/set-trade-password"></cell>
      <!-- <cell title="修改手机" link="/"></cell> -->
    </group>
    <box gap="50px 20px">
      <label for="weuiAgree" class="weui-agree">
         <input type="checkbox" class="weui-agree__checkbox" v-model="agreeRule" checked>
        <span class="weui-agree__text">
          已阅读并同意<a href="javascript:void(0);">《委托代理协议》</a><br />和<a href="javascript:void(0);">《甲方处理规则》</a>
        </span>
      </label>
      <button v-if="agreeRule" class="weui_btn weui_btn_primary" @click="onSubmit">完成设置</button>
    </box>
    <loading :show="loading" :text="loadingText"></loading>
    <toast :show.sync="showToast" :type="toastType" :time="2000">{{toastText}}</toast>
  </div>
</template>

<script>
import XHeader from 'vux-components/x-header'
import Group from 'vux-components/group'
import Box from 'vux-components/box'
import Cell from 'vux-components/cell'
import XInput from 'vux-components/x-input'
import XTextarea from 'vux-components/x-textarea'
import XButton from 'vux-components/x-button'
import Toast from 'vux-components/toast'
import Selector from 'vux-components/selector'
import Loading from 'vux-components/loading'
import Uploader from '.././fix/Uploader'
import Request from '../../js/request'
import Holder from '../../js/model/Holder'
import Utils from '../../js/utils'

export default {
  components: {
    XHeader,
    Group,
    Box,
    Cell,
    XInput,
    XTextarea,
    XButton,
    Toast,
    Selector,
    Uploader,
    Loading
  },
  data() {
    return {
      holder: Holder.parse({}),
      showToast: false,
      toastType: '',
      toastText: '保存成功',
      loading: false,
      loadingText: '加载中...',
      agreeRule: true
    }
  },
  computed: {
    gender() {
      if (this.holder.cardNum) {
        let index = -2;
        if (this.holder.cardNum.length == 15) index = -1;
        const g = (parseInt(this.holder.cardNum.substr(index, 1)) % 2 == 0 ? '2' : '1');
        this.holder.gender = g;
        return g;
      }
      return '';
    }
  },
  created() {
      let userInfo = Utils.getUserInfo(), that = this;
      that.loading = true;
      Request.Holder.getInfo(userInfo.id).then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          that.loading = false;
          this.holder = resp.body._body;
        }
      });
  },
  ready() {
    Utils.changePageTitle.call(this);
  },
  methods: {
    onSubmit: function(event){
      const that = this;
      this.holder.gender = this.gender;
      const holderInfo = Holder.dispose(this.holder);
      let userInfo = Utils.getUserInfo();
      //that.loading = true;
      that.loadingText = "保存中...";
      that.loading = true;
      Request.Holder.save(userInfo.id, holderInfo).then((resp) => {
        if (resp.body._status == 'SUCCESS') {
          that.loading = false;
          that.$router.replace('/holder-home');
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
<style lang="less" scoped>

</style>
