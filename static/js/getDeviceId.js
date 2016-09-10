function uuid() {
  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getDeviceId() {
  var deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = uuid();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}