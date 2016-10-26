import setupWebViewJavascriptBridge from './setupWebViewJavascriptBridge';

const webViewClient = {
  dispatch(name, params, cb) {
    setupWebViewJavascriptBridge((bridge) => {
      if (!params && !cb) {
        bridge.callHandler(name);
      } else if (params && !cb) {
        bridge.callHandler(name, params);
      } else if (params && cb) {
        bridge.callHandler(name, params, cb);
      }
    });
  }
};

export default webViewClient;
