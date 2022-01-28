$(function(){
  getUserInfo()

  $('#btnLogout').on('click',function() {
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      window.localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })

})

//获取用户的基本信息
function getUserInfo(){
  $.ajax({
    method: 'GET',
    url:'/my/userinfo',
    success:function(res){
      if(res.status !== 0) return layer.msg(res.msg);
      //渲染用户头像
      renderAvatar(res.data)
      resultData = res.data
    }
  })
}
//渲染用户头像
function renderAvatar(user) {
  let name = user.nickname || user.username
  $('.welcome').html('欢迎,'+ name)
  if(user.user_pic){
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avater').hide()
  }else{
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avater').html(first).show()
  }
}
