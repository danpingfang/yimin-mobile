import setupWebViewJavascriptBridge from './setupWebViewJavascriptBridge';

const webViewClient = {
  dispatch(name, cb) {
    setupWebViewJavascriptBridge((bridge) => {
      if (cb) {
        bridge.callHandler(name, cb);
      } else {
        bridge.callHandler(name);
      }
    });
  }
};

export default webViewClient;
