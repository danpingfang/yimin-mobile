$.extend($.ajaxSettings, {
  beforeSend: function(xhr) {
    var deviceId = getDeviceId();
    xhr.setRequestHeader('deviceId', deviceId);
  }
});
