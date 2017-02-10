<style lang="less">
.list{
  .vux-no-group-title{
    width: 25%;
    float: left;
  }

  .weui_cell_select{
    padding: 0;
    float: left;
    font-size: 12px;
    .weui_cell_primary{
        padding-left: 10px;
        &:after{
        right: 19px;
        margin-top: -6px;
        -webkit-transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        -o-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        transform: rotate(135deg);
        }
     }
   }
}
</style>
<template>
    <group class="list">
        <selector value="all" :options="regionList" @on-change="onChangeRegion"></selector>
    </group>
    <group class="list">
        <selector value="all" :options="rentList" @on-change="onChangeRent"></selector>
    </group>
    <group class="list">
        <selector value="all" :options="typeList" @on-change="onChangeType"></selector>
    </group>
    <group class="list">
        <selector value="all" :options="stateList" @on-change="onChangeState"></selector>
    </group>
    <x-button @click="ok">Click Me</x-button>
</template>
<script>
import Selector from 'vux-components/selector'
import XButton from 'vux-components/x-button'
import Group from 'vux-components/group'
import $ from 'jquery'

export default {
  data() {
    return {
      regionList: [
          {key: 'all', value: '全部区域'},
          {key: 'pd', value: '浦东新区'},
          {key: 'hp', value: '黄埔区'},
          {key: 'cn', value: '张宁区'},
          {key: 'sj', value: '松江区'},
          {key: 'ja', value: '静安区'}
      ],
      rentList:[
          {key: 'all', value: '所有租金'},
          {key: 'lt1500', value: '1500以下'},
          {key: '1500to2000', value: '1500-2000元'},
          {key: '2000to3000', value: '2000-3000元'},
          {key: 'I_am_rich', value: '1000000000以上'}
      ],
      typeList:[
          {key: 'all', value: '所有类型'},
          {key: 'hz', value: '合租单间'},
          {key: 'zz', value: '整租整套'}
      ],
      stateList:[
          {key: 'all', value: '全部状态'},
          {key: '1', value: '已接单'},
          {key: '2', value: '未接单'},
          {key: '3', value: '已成交'},
          {key: '4', value: '已预定'}
      ],
      res:{
          region: 'all',
          rent: 'all',
          type: 'all',
          state: 'all'
      }
    }
  },
  components: {
    Selector,
    XButton,
    Group
  },
  computed: {
    screenHeight: function(){
      return window.innerHeight;
    }
  },
  methods: {
    onChangeRegion(val){
        this.onChange('region', val);
    },
    onChangeRent(val){
        this.onChange('rent', val);
    },
    onChangeType(val){
        this.onChange('type', val);
    },
    onChangeState(val){
        this.onChange('state', val);
    },
    onChange(type, val) {
      this.res[type] = val;
      console.log(val);
    },
    ok(){
        alert(JSON.stringify(this.res));
    }
  },
  ready() {
    
  }
}
</script>
