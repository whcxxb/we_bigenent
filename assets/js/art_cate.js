$(function () {
  var form = layui.form
  var layer = layui.layer
  getArtCate()
  //获取文章分类
  function getArtCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.msg);
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }
  //添加分类
  let indexadd = null
  $('#btnAddCate').click(function () {
    indexadd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加分类',
      content: $('#dialog-add').html()
    });
  });

  //提交添加的分类 通过代理
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.msg);
        getArtCate()
        layer.msg(res.msg);
        layer.close(indexadd)
      }
    })
  });
  //删除分类
  $('body').on('click', '#deleteCate', function () {
    let id = $(this).attr('data_id')
    layer.confirm('是否删除', { icon: 3,title:'提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg(res.msg);
          getArtCate()
          layer.msg(res.msg);
        }
      })
      layer.close(index);
    });
  });


  //编辑分类
  let indexedit = null
  $('body').on('click', '#editCate', function () {
    indexedit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '编辑分类',
      content: $('#dialog-edit').html()
    });
    let id = $(this).attr('data_id')
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data);
      }
    })
  });
  //提交修改的分类
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.msg);
        layer.msg(res.msg);
        layer.close(indexedit)
        getArtCate()
      }
    })
  })
})