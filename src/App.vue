<template>
  <div id="app">
    <router-view transition="fade" transition-mode="out-in"></router-view>
    <agent-menu v-if="showAgentMenu"></agent-menu>
  </div>
</template>

<script>
import AgentMenu from 'components/common/AgentMenu'
import Utils from './js/utils'

export default {
  name: 'app',
  components: {
    AgentMenu,
    Utils
  },
  data(){
    return {
      showAgentMenu: true
    }
  },
  beforeCompile(){
    let user = Utils.getUserInfo();
    if(user.type !== "3"){
      this.showAgentMenu = false;
    }
  },
  ready(){
  }
}
</script>

<style>
@import '~vux/dist/vux.css';
.fade-transition { transition: opacity .3s ease; }
.fade-enter, .fade-leave { opacity: 0; }
</style>
