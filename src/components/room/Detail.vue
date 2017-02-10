<style lang="less" scoped>
.room-detail-vue {
  
}
</style>

<template>
<div class="room-detail-vue">
  <room-new v-if="roomId" :room-id="roomId" :edit="true"></room-new>
</div>
</template>

<script>
import RoomNew from './New';
import Request from '../../js/request'

export default {
  data() {
    return {
      roomId: null,
      roomData: {}
    }
  },
  methods: {

  },
  ready() {
    const that = this;
    const pathParam = this.$route.params;
    if (pathParam.id) {
      this.roomId = pathParam.id;
    }
  },
  components: {
    RoomNew
  }
}
</script>