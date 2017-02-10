<template>
  <div class="renter-home-vue">
    <group>
      <cell title="我的租房需求" link="/renter-publish">
      </cell>
      <cell link="/setting" title="个人资料">
      </cell>
     <cell link="/renter-myOrder" title="我的租约">
      </cell>
     <cell link="/wallet" title="我的钱包">
      </cell>
    </group>
    <group title="通知中心">
      <ul class="notices">
        <!-- <li class="vux-1px-b" v-for="notice in notices" @click="gotoNoticeList(notice.messageType, notice.messageTypeId)">
          <p class="notice-title">{{notice.messageType}}<span class="right">{{notice.messageDate}}</span></p>
          <p class="notice-summary">{{notice.message}}</p>
        </li> -->
        <li class="vux-1px-b">
            <span class="notice-title">新房源提醒</span>
            <span class="right">2017年1月1日 11:10</span>
            <span class="left ">您关注的房源上新3套</span>
        </li>
        <li class="vux-1px-b">
          <span class="notice-title">投诉公告</span>
          <span class="right">2017年1月1日 11:10</span>
          <span class="left ">您关注的房源上新3套</span>
        </li>
      </ul>
    </group>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</template>

<script>
import Group from 'vux-components/group'
import Request from '../../js/request'
import Utils from '../../js/utils'
import Loading from 'vux-components/loading'
import Cell from 'vux-components/cell'
export default {
  data() {
    return {
      notices: [],
      loading: false,
      loadingText: '加载中...',
    }
  },
  init () {
    const query = this.$route.query;
    if(query && query.token && query.userType){
      sessionStorage.setItem("userInfo",
        JSON.stringify({
          "id": query.userId || "",
          "token": query.token,
          "type": query.userType
        })
      );
    }else{
      this.$router.go('./bind');
    }
  },
  methods: {

  },
  ready() {
    const that = this;
    Utils.changePageTitle.call(this);
  },
  components: {
    Group,
    Loading,
    Cell,
    Utils
  }
}
</script>
<style lang="less">
.renter-home-vue{
  .vux-tap-active{
    float: left;
    width: 90%;
    margin: 7px 2%;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 7px;
    background: #fff;
    &:before {
      display: none;
    }
  }
  .notices {
    li {
      padding: 10px 15px;
      .notice-title {
        span {
          color: #999;
        }
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
