function uuid() {
  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function getDeviceId() {
  var isOverseaApp = navigator.userAgent.toLowerCase().indexOf('oversea_') != -1;
  var deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    if (isOverseaApp) {
      deviceId = getParameterByName('deviceId');
    } else {
      deviceId = uuid();
    }
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}