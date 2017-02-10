<template>
  <div class="agent-menu-bar">
    <tabbar >
      <tabbar-item selected link="/agent-home">
        <span slot="label" class="icon iconfont icon-fangyuanguanli01" selelcted >首页</span>
      </tabbar-item>
      <tabbar-item link="/agent-management">
        <span slot="label" class="icon iconfont icon-xiaoshouguanli" >订单管理</span>
      </tabbar-item>
      <tabbar-item  link="/room-list">
        <span slot="label" class="icon iconfont icon-fangyuanguanli01" >房源管理</span>
      </tabbar-item>
      <tabbar-item link="/finance-management">
        <span slot="label"  class="icon iconfont icon-caiwuguanli">财务管理</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>

import Tabbar from 'vux-components/tabbar'
import TabbarItem from 'vux-components/tabbar-item'


export default{
  components:{
    Tabbar,
    TabbarItem
  }
}
</script>
<style lang="less">
.agent-menu-bar
{
  .weui_tabbar_icon {
    display: none;
  }
  .iconfont {
    font-size:13px;
  }
}
</style>
