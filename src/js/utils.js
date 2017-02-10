import $ from 'jquery'

export default {
  isObject(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
  },
  isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  },
  isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  },
  isNumber(input) {
    return input instanceof Number || Object.prototype.toString.call(input) === '[object Number]';
  },
  isString(input) {
    return input instanceof String || Object.prototype.toString.call(input) === '[object String]';
  },
  isBoolean(input) {
    return typeof input == 'boolean';
  },
  isFunction(input) {
    return typeof input == 'function';
  },
  isNull(input) {
    return input === undefined || input === null;
  },
  deepCopy(data) {
    let copyOne = null;
    if (this.isObject(data)) {
      copyOne = {};
      for (const key in data) {
        copyOne[key] = this.deepCopy(data[key]);
      }
    } else if (this.isArray(data)) {
      copyOne = [];
      for (const index of data) {
        copyOne.push(this.deepCopy(index));
      }
    } else {
      copyOne = data;
    }
    return copyOne;
  },
  deepFreeze(obj){
    Object.freeze(obj);
    Object.keys(obj).forEach( (key, value) => {
      if ( typeof obj[key] === 'object' ) {
        constantize( obj[key] );
      }
    });
    return obj;
  },
  mergeArray(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          arr1.splice(i, 1);
        }
      }
    }
    for (var i = 0; i < arr2.length; i++) {
      arr1.push(arr2[i]);
    }
    return arr1;
  },
  getUserInfo() {
    let userInfo = sessionStorage.getItem("userInfo");
    if(userInfo){
      try{
        return JSON.parse(userInfo);
      }catch(e){
        return {};
      }
    }
    return {};
  },
  changePageTitle(pageTitle){
    var isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    let title = pageTitle||this.$route.name;
    if(isIOS){
        var $body = $('body');
        document.title = title;
        var $iframe = $('<iframe src="index.html"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    } else {
        document.title = title;
    }
  }
}

//租约状态（1预约待处理，2预约同意，3预约拒绝，4预定待处理，5预定同意，6预定拒绝，7签约待处理，8签约同意，9签约拒绝）
