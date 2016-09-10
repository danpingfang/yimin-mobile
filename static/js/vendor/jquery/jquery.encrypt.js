(function($) {
  $.extend($.ajaxSettings, {
    beforeSend: function(xhr) {
      var token = $.cookie('token');
      var deviceId = getDeviceId();
      if (token) {
        xhr.setRequestHeader('token', token);
      }
      xhr.setRequestHeader('deviceId', deviceId);
    }
  });
})(jQuery);