<style lang="less" scoped>
</style>

<template>
<div class="uploader-demo-vue">
  <group>
    <uploader :file-url.sync="fileUrl" text="照片" :multiple="true"></uploader>
  </group>
</div>
</template>

<script>
import Group from 'vux-components/group'
import Uploader from '.././fix/Uploader'
import Request from '../../js/request'

export default {
  components: {
    Group,
    Uploader
  },
  watch: {
    fileUrl(newVal) {
      console.log(newVal);
    }
  },
  data() {
    return {
      fileUrl: ['https://placekitten.com/1200/900']
    }
  },
  methods: {
  }
}

</script>
