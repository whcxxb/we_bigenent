$.ajaxPrefilter(function (options) {
  //定义默认的api接口地址
  // options.url = 'http://www.liulongbin.top:3007' + options.url
  options.url = 'http://localhost:3000' + options.url
  //添加token
  if (options.url.indexOf('/my') !== -1) {
    options.headers = {
      Authorization: window.localStorage.getItem('token') || ''
    }
  }
  options.complete = function (res) {
    if (res.responseJSON.msg === '身份验证失败' && res.responseJSON.status == 1) {
      //清空token
      window.localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})