import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './js/routes'
import Utils from './js/utils'
import App from './App'

require('./css/common.less')

// Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);

// Vue.http.interceptors.push({
//   request: function(request) {
//     const userInfo = Utils.getUserInfo();
//     if (userInfo && userInfo.id && userInfo.type && userInfo.token) {
//       request.headers['userId'] = userInfo.id;
//       request.headers['userType'] = userInfo.type;
//       request.headers['token'] = userInfo.token;
//     }
//     return request;
//   },
//   response: function (response) {
//     return response;
//   }
// });

const FastClick = require('fastclick')
FastClick.attach(document.body)

const router = new VueRouter();
router.map(routes);
/* eslint-disable no-new */
// const app = new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app');
router.start(App, '#app')
