import platform from '../../utils/platform';

function setupAndroidWebViewJavascriptBridge(fakeBridgeFunc) {
  let bridge = {};
  bridge.callHandler = (messageName, callback) => {
    const message = JSON.parse(Android[messageName]());
    if (callback) {
      callback(message);
    }
    bridge = null;
  };
  fakeBridgeFunc(bridge);
}

function setupIOSWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }

  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }

  window.WVJBCallbacks = [callback];

  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);

  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

function getSetupWebViewJavascriptBridge(cb) {
  if (platform.isOverseaAndroid) {
    return setupAndroidWebViewJavascriptBridge(cb);
  } else if (platform.isOverseaIOS) {
    return setupIOSWebViewJavascriptBridge(cb);
  }
  return null;
}

export default getSetupWebViewJavascriptBridge;
