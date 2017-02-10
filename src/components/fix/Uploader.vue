<template>
<div class="uploder-vue">
  <div class="weui-uploader">
    <p class="weui-uploader__title">{{text}}</p>
    <div v-if="showBtn" class="weui-uploader__input-box"></div>
    <div v-else class="weui-uploader__input-box has-img" style="background-image:url({{fileUrl}}?imageView/2/w/150/h/150)"></div>
    <template v-if="multiple">
     <!--  <div v-for="image in fileUrl" class="weui-uploader__img" style="background-image:url({{image}}?imageView/2/w/150/h/150)">
      </div> -->
        <img  class="previewer-show-img" v-for="(index, item) in fileList" :src="item.src" width="100" @click="$refs.previewer.show(index)">
        <previewer :list="fileList" v-ref:previewer :options="options"></previewer>
    </template>
    <loading :show="loading" :text="loadingText"></loading>
  </div>
</div>
</template>
<script>
import Uploader from '../../js/uploader'
import CONST from '../../js/const'
import $ from 'jquery'
import Loading from 'vux-components/loading'
import Previewer from 'vux-components/previewer'

export default{
  props: ['text', 'fileUrl', 'multiple'],
  components: {
    Previewer,
    Loading
  },
  data() {
    return {
        options: {
            getThumbBoundsFn (index) {
              // find thumbnail element
              let thumbnail = document.querySelectorAll('.previewer-show-img')[index];
              // get window scroll Y
              let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
              // optionally get horizontal scroll
              // get position of element relative to viewport
              let rect = thumbnail.getBoundingClientRect();
              // w = width
              return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
              // Good guide on how to get element coordinates:
              // http://javascript.info/tutorial/coordinates
            }
        },
        loading: false,
        loadingText: "上传中..."
    }
  },
  computed: {
    showBtn() {
      return this.multiple || !this.fileUrl;
    },
    fileList() {
      let that = this, files=[];
      this.fileUrl.forEach(function(item){
        files.push({
          src: item,
          w: 1200,
          h: 900
        });
      });
      return files;
    }
  },
  methods: {
    beforeUpload() {
      this.loading = true;
    },
    parseImg(info) {
      this.loading = false;
      if (this.multiple) {
        for (let f of info) {
          console.log('file:' + f);
          const file = JSON.parse(f);
          const imgUrl = CONST.DOMAIN + file.key;
          if ($.inArray(imgUrl, this.fileUrl) < 0) {
            this.fileUrl.push(imgUrl);
            // $('.weui-uploader', this.$el).append(`<div class="weui-uploader__img" style="background-image:url(${imgUrl})"></div>`);
          }
        }
      } else {
        info = JSON.parse(info);
        const imgUrl = CONST.DOMAIN + info.key;
        this.fileUrl = imgUrl;
        // $('.weui-uploader__input-box', this.$el).addClass('has-img').css({
        //   'background-image': `url(${imgUrl})`
        // })
      }
    }
  },
  ready() {
    this.uploader = Uploader({
      container: $(this.$el),
      multiple: this.multiple,
      callback: this.parseImg,
      beforeUpload: this.beforeUpload
    })
  }
}
</script>
<style lang="less">
.weui-uploader{
  width: 100%;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  .weui-uploader__title {
    display: inline-block;
    vertical-align: top;
  }
  .weui-uploader__img,
  .weui-uploader__input-box {
    display: inline-block;
    position: relative;
    margin: 0 0 0 10px;
    width: 50px;
    height: 50px;
    border: 1px solid #D9D9D9;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .weui-uploader__input-box:before,
  .weui-uploader__input-box:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background-color: #D9D9D9;
  }
  .weui-uploader__input-box.has-img:before,
  .weui-uploader__input-box.has-img:after {
    display: none;
  }
  .weui-uploader__input-box:before {
    width: 1px;
    height: 20px;
  }
  .weui-uploader__input-box:after {
    width: 20px;
    height: 1px;
  }
  .weui-uploader__input{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .previewer-show-img{
    width: 50px;
    height: 50px;
    padding-left: 5px;
  }
}
</style>
