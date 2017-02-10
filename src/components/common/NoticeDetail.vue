<style lang="less" scoped>
.notice-detail-vue {
  background: #fff;
  .notices {
    li {
      padding: 10px 15px;
      .notice-date {
        color: #999;
      }
      .notice-summary {
        font-size: 14px;
        margin-top: 5px;
        color: #888;
      }
    }
  }
}
</style>

<template>
<div class="notice-detail-vue">
  <x-header :left-options="{showBack: true,backText: '返回'}">通知</x-header>
  <ul class="notices">
    <li class="vux-1px-b" v-for="notice in notices" data-type="{{notice.messageTypeId}}">
      <p class="notice-title">{{notice.messageTitle}}</p>
      <p class="notice-date">{{notice.messageDate}}</p>
      <p class="notice-summary">{{notice.message}}</p>
    </li>
  </ul>
  <loading :show="loading" :text="loadingText"></loading>
</div>
</template>

<script>
import XHeader from 'vux-components/x-header'
import Loading from 'vux-components/loading'
import Request from '../../js/request'
import Manba from 'manba'
import Utils from '../../js/utils'

export default {
  data() {
    return {
      notices: [],
      loading: false,
      loadingText: '加载中...'
    }
  },
  components: {
    XHeader,
    Loading,
    Utils
  },
  methods: {},
  ready() {
    const that = this;
    const pathParam = this.$route.params;
    const messageType = pathParam.type;
    if (pathParam.id) {
      this.loading = true;
      let userInfo = Utils.getUserInfo();
      Request.Holder.getNoticeDetail(userInfo.id, messageType, pathParam.id).then((resp) => {
        if (resp.body._status === 'SUCCESS') {
          this.loading = false;
          this.notices = resp.body._body;
        }
      })
    }
  }
}
</script>