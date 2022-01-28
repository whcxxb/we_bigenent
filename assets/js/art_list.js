$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage;
  //格式化时间
  template.defaults.imports.dateFormat = function (date) {
    const dt = new Date(date)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = dt.getDate()

    var hh = dt.getHours()
    var mm = dt.getMinutes()
    var ss = dt.getSeconds()

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  //定义补零
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
  var query = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  //获取所有文章
  getArtIcleList()
  function getArtIcleList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: query,
      success: function (res) {
        if (res.status !== 0) return layer.msg('获取文章失败');
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      }
    })
  }
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

  $('#form-art').submit(function (e) {
    e.preventDefault();
    query.cate_id = $('[name=cate_id]').val()
    query.state = $('[name=state]').val()
    getArtIcleList()
  });

  //分页方法
  function renderPage(total) {
    //执行一个laypage实例
    laypage.render({
      elem: 'test1',
      count: total,
      limit: query.pagesize,
      limits: [2, 4, 6, 8, 10],
      curr: query.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      //切换分页时触发
      jump: function (obj, first) {
        query.pagenum = obj.curr
        query.pagesize = obj.limit
        if (!first) {
          getArtIcleList()
        }
      }
    })
  }

  //删除文章
  $('body').on('click', '.btnDele', function () {
    var len = $('.btnDele').length;
    var id = $(this).attr('data_id')
    layer.confirm('是否删除', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg(res.msg);
          layer.msg(res.msg);
          if (len === 1) {
            query.pagenum = query.pagenum === 1 ? 1 : query.pagenum - 1
          }
          getArtIcleList()
        }
      })
      layer.close(index);
    });
  })

  $('body').on('click','.btnedit',function () {
    layer.msg('还没实现呢,傻呗');
  })
})