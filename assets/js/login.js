$(function () {
  //点击去注册账号的链接
  $('#link-reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  //点击去的链接
  $('#link-login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show();
  })
  //表单验证
  let form = layui.form
  form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd:function(value){
      let pwd = $('.reg-box [name=password]').val()
      if(value !== pwd){
        return '两次密码不一致'
      }
    }
  });
 
  //监听注册事件
  $('#form-reg').on('submit', function(e){
    e.preventDefault()
    $.post('/api/reguser',
    {username:$('#form-reg [name=username]').val(),password:$('#form-reg [name=password]').val()},
    function(res){
      if(res.status !== 0)return layer.msg(res.msg);
      layer.msg('注册成功,请登录');
      //注册完后跳转登录界面
     setTimeout(() => {
      $('#link-login').click()
     }, 1000);
    })
  })
  
  //监听登录事件
  $('#form-login').on('submit', function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url:'/api/login',
      data:$(this).serialize(),
      success: function(res) {
        if(res.status !== 0)return layer.msg(res.msg);
        layer.msg('登录成功');
        //保存token
        localStorage.setItem('token',res.token);
        setTimeout(() => {
          location.href = '/index.html'
        }, 500);
      }
    })
  })



})