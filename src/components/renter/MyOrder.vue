<template>
  <div class="renter-myorder">
    <panel :list="orderDetail" :type="panelType"></panel>
    <group>
      <cell title="实际租金"><p>2800元</p></cell>
      <cell title="付款方式">付三押一</cell>
      <cell title="起租日">2016-12-03</cell>
      <cell title="租约期限"></cell>
      <cell title="经纪人">李师师</cell>
      <cell title="租约订单">QYD123456</cell>
    </group>
  </div>
</template>
<script >
import Panel from 'vux-components/panel'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
export default {
  data(){
    return{

    }
  },
  computed: {
    orderDetail() {
      return [{
        src: '',
        title: '房源编号FDX123322',
        desc: '松江区九亭镇 |整套整组 | 20平米',
        url: '/'
      }];
    }
  },
  components: {
    Panel,
    Group,
    Cell
  }
}
</script>
<style >

</style>
