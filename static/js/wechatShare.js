var wechat;
(function (wechat) {
  wechat.share = {
    init: function (cb) {
      var ua = navigator.userAgent;
      if (ua.toLowerCase().indexOf('micromessenger') !== -1) {
        function createScript(url, cb) {
          var script = document.createElement('script');
          script.src = url;
          script.onload = cb;
          document.getElementsByTagName('head')[0].appendChild(script);
        }

        createScript('//res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
          createScript('//m.lvbaoyou.com/static/js/wx_jssdk.js', function () {
            cb();
          });
        });
      }
    }
  };
})(wechat || (wechat = {}));
