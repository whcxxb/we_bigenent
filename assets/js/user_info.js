$(function() {
  let form = layui.form
  form.verify({
    nickname:function(value) {
      if(value.length>6){
        return '长度不能大于6'
      }
    }
  })
  getUserInfo()
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url:'/my/userinfo',
      success:function(res){
        form.val('userinfoForm', res.data);
      }
    })
  }
  //表单提交
  $('#btnUsrinfo').click(function (e) { 
    e.preventDefault();
    console.log(form.val('userinfoForm'));
    $.ajax({
      method: 'POST',
      url:'/my/userinfo',
      data:form.val('userinfoForm'),
      success:function(res){
        if(res.status !== 0) return layer.msg(res.msg);
        layer.msg('更新成功');
        //调用父页面的方法，渲染主页
        window.parent.getUserInfo()
      }
    })
  });

  $('#btnreset').click(function (e) { 
    e.preventDefault();
    getUserInfo()
  });
})
