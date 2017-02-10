<style lang="less" scoped>
.bind-success-vue {
  text-align: center;
  i {
    display: block;
    margin-top: 60px;
    &:before {
      font-size: 104px;
    }
  }
  .success-info {
    font-size: 20px;
    font-weight: bold;
  }
  .success-desc {
    margin-top: 10px;
    color: #999;
    font-size: 14px;
  }
  .copyright {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    font-size: 13px;
    text-align: center;
    a {
      color: #6D7EA1;
    }
    p {
      font-size: 12px;
      color: #bbb;
    }
  }
}
</style>

<template>
  <div class="bind-success-vue">
    <x-header :left-options="{showBack: false}">账号绑定</x-header>
    <i class="weui_icon weui_icon_success icon_big"></i>
    <p class="success-info">绑定成功</p>
    <p class="success-desc">绑定账号后将可以享受美妙的平台服务。<br />Have a nice day!</p>
    <box gap="50px">
      <button class="weui_btn weui_btn_primary" @click="begin">开始</button>
    </box>
    <div class="copyright">
      <a src="http://youzhu.com">有住主页</a>
      <p>Copyright © 2008-2013 youzhu.com</p>
    </div>
  </div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Box from 'vux-components/box'

export default {
  data() {
    return {
    }
  },
  components: {
    XHeader,
    Box
  },
  methods: {
    begin() {
      this.$router.replace('/setting');
    }
  }
}
</script>
