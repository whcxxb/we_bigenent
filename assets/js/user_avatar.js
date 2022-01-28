$(function () {
  var $image = $('#image');
  const options = {
    aspectRatio: 1,
    preview: '.img-preview'
  }
  $image.cropper(options)

  $('#btnImageFile').click(function (e) {
    $('#file').click()
  });
  //上传头像
  $('#file').on('change', function (e) {
    let file = e.target.files[0]
    let newimgurl = URL.createObjectURL(file)
    $image.cropper('destroy').attr('src', newimgurl).cropper(options)
  })

  $('#addavatar').click(function () {
    let dataURL = $image.cropper('getCroppedCanvas', {
      width: 100,
      height: 100
    }).toDataURL('image/png')
    $.ajax({
      method:'POST',
      url:'/my/avatar',
      data:{
        avatar:dataURL
      },
      success:function (res) {
        if(res.status !== 0) return layer.msg(res.msg);
        layer.msg(res.msg);
         //调用父页面的方法，渲染主页
         window.parent.getUserInfo()
      }
    })
  });
})