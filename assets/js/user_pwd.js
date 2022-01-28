$(function () {
  let form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd:function(value){
      let pwd = $('.layui-form [name=newpwd]').val()
      if(value !== pwd){
        return '两次密码不一致'
      }
    }
  })

  $('#btnUserpwd').click(function (e) { 
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:'/my/updatepwd',
      data:form.val('userinfoForm'),
      success:function (res) {
        console.log(res);
        if(res.status !== 0) return layer.msg(res.msg);
        layer.msg('密码重置成功，请重新登录');
        window.localStorage.removeItem('token')
        window.parent.location.href = '/login.html'
      }
    })
  });
})