<template>
  <i v-bind:class="className"></i>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    className () {
      return `weui_icon weui_icon_${this.type}`
    }
  }
}
</script>

<style lang="less">
@import 'css/weui_icon_font';

.icon_big:before {
  font-size: 104px;
}

.icon_small:before {
  font-size: 12px;
}
</style>
