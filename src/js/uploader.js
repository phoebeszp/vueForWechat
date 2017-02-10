import $ from 'jquery'
import Qiniu from './vendor/qiniu'
import Request from './request'
import CONST from './const'

class Uploader {
  constructor(params) {
    this.$container = params.container;
    this.container = this.$container.get(0);
    this.browse_button = $('.weui-uploader__input-box', this.$container).get(0);
    this.multiple = params.multiple || false;
    this.callback = params.callback || function(){};
    this.files = [];
    this.beforeUpload = params.beforeUpload;
    this.init();
  }

  init() {
    const that = this;

    Request.Common.getQiniuToken().then((resp) => {
      const r = resp.body;
      if (r._status == 'SUCCESS') {
        Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: this.browse_button,
          container: this.container,
          max_file_size: '10mb',
          dragdrop: true,
          chunk_size: '4mb',
          multi_selection: this.multiple,
          uptoken: r._body.qiniuToken,
          domain: CONST.DOMAIN,
          unique_names: true,
          get_new_uptoken: false,
          auto_start: true,
          log_level: 0,
          resize: { //compression 
            crop: true,
            quality: 70, //set 70, 4.2MB => 709KB; set 90(default), 4.2MB => 1.4MB
            preserve_headers: false
          },
          init: {
            FilesAdded(up, files) {
              that.beforeUpload();
              // TODO
            },
            FileUploaded(up, file, info) {
              if (that.multiple) {
                that.files.push(info);
              } else {
                that.callback(info);
              }
            },
            UploadComplete() {
              if (that.multiple) {
                that.callback(that.files);
              }
            }
          }
        })
      }
    })
  }
}

const _Uploader = function (params) {
  return new Uploader(params);
}

export default _Uploader;
