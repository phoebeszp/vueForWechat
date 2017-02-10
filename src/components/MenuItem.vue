<template>
  <div id="youzhu-menu">
    <div class="youzhuMenuBtn">
      <div class="sapMSB">
        <button class="sapMBtn sapMBtnBase sapMSBText">
          <span class="sapMBtnInner">{{selection}}</span>
        </button>
        <div class="options" v-show="showList">
          <ul class="optionList">
            <li v-for="one in options" >
              <a @click="select(one)" class="optionItem">
                {{one.value}}
              </a>
            </li>
          </ul>
        </div>
        <button class="sapMBtn sapMBtnBase sapMSBArrow" @click="showSelections">
          <span class="sapMBtnInner iconfont icon-ditu"></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import XButton from 'vux-components/x-button'
export default {
  data() {
    return {
      selection: 'File Menu',
      showList: false,
      options:[{
          key:'1',
          value: 'save'
        },{
        key:'1',
        value: 'edit'
      }

      ]
    }
  },
  methods: {
    showSelections(){
      if(!this.showList){
        this.showList = true;
      }
    },
    select(selected){
      this.selection = selected.value;
      this.showList = false;
    }
  },
  components: {
    XButton
  }
}
</script>
<style lang="less">
.youzhuMenuBtn {
}
.sapMSB{
  position: relative;
  display: inline-block;
  vertical-align: top;
  .sapMBtn {
    height: 3rem;
    margin:0 ;
    padding: 0.25rem 0;
    vertical-align: top;
    border: none;
    background-color: transparent;
  }
  .sapMSBText{
      span.sapMBtnInner{
        text-align: left;
        margin-right: 2.5rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        display: block;
        border-right-width: 0;
        border-top-right-radius:0;
        border-bottom-right-radius:0;
      }
  }
  span.sapMBtnInner{
    display: block;
    overflow: hidden;
    line-height: 2.375rem;
    vertical-align: top;
    background-clip: padding-box;
    box-sizing: border-box;
    background-color: #f7f7f7;
    border:1px solid #ababab;
    height: 2.5rem;
    text-align: center;
    vertical-align: top;
    white-space: nowrap;
    font-size: 0.875rem;
    border-radius: 0.2rem;
    color: #346187;
    margin: 0;
    padding: 0;
    position: relative;
    text-shadow: 0 0 0.125rem #ffffff;
    min-width: 2rem;
  }
  .sapMSBArrow{
    position: absolute;
    top: 0;
    right: 0;
    span.sapMBtnInner{
      border-top-left-radius: 0;
      border-bottom-left-radius:0;
      padding-right: 0.75rem;
      padding-left: 0.75rem;
      display: block;
      min-width:1.75rem;
    }
  }
  .options{
    position: relative;
    top: -4px;
    left: 0;
    border:1px solid #ababab;
    border-radius: 0.2rem;
    background-color: white;
    text-shadow: 0 0 0.125rem #ffffff;
    .optionList{
      li{
        .optionItem{
          height: 100%;
          width: 100%;
          display: block;
        }
        height: 2.5rem;
        border-bottom:1px solid #ababab;
        text-align: center;
        line-height: 2.5rem;
      }
    }
  }
}
</style>
