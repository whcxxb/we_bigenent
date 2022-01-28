$(function () {
  var form = layui.form

  getCate()
  //获取分章分类
  function getCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) return layer.msg(err)
        var htmlstr = template('tpl-catelist', res)
        $('[name=cate_id]').html(htmlstr)
        //让layui 重新渲染页面
        form.render()
      }
    })
  }

  //富文本编辑器
  initEditor()


  //封面选择
  var $image = $('#image')
  var options = {
    aspectRatio: 1,
    preview: '.img-preview'
  }
  $image.cropper(options)
  $('#btnImageFile').on('click', function () {
    $('#coverfile').click()
  })

  $('#coverfile').on('change', function (e) {
    let file = e.target.files
    if (file.length === 0) {
      return
    }
    let newimgurl = URL.createObjectURL(file[0])
    $image.cropper('destroy').attr('src', newimgurl).cropper(options)
  })

  //发布文章
  var art_state = '已发布'
  $('#btnSave2').click(function () {
    art_state = '草稿'
  })
  $('#form-pub').submit(function (e) {
    e.preventDefault();
    var fd = new FormData($(this)[0])
    fd.append('state', art_state)

    $image.cropper('getCroppedCanvas', {
      width: 400,
      height: 280
    }).toBlob(function (blob) {
      fd.append('cover_img', blob)
      publishArticle(fd)
    })
  });

  //
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url:'/my/article/add',
      data:fd,
      contentType:false,
      processData:false,
      success: function (res) {
        if (res.status !== 0) return layer.msg('发布失败')
        layer.msg('发布成功')
        location.href = '/article/art_list.html'
      }
    })
  }

})