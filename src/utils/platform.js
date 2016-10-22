const ua = navigator.userAgent.toLowerCase();

export default {
  isOverseaApp: ua.indexOf('oversea') !== -1,
  isOverseaIOS: ua.indexOf('oversea_ios') !== -1,
  isOverseaAndroid: ua.indexOf('oversea_android') !== -1
};
