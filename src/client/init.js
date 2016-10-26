import platform from '../utils/platform';
import webViewClient from './lib/webViewClient';

function initPageEvent() {
  let isTouchMove = false;
  document.body.addEventListener('touchmove', () => {
    isTouchMove = true;
  }, false);

  document.body.addEventListener('touchend', (event) => {
    if (!isTouchMove) {
      let target = event.target;
      let clientMethodName = target.getAttribute('data-client-method-name');
      if (!clientMethodName) {
        target = target.parentNode;
        clientMethodName = target.getAttribute('data-client-method-name');
      }
      const url = target.getAttribute('data-client-url');
      if (clientMethodName) {
        event.preventDefault();
        event.stopPropagation();
        switch (clientMethodName) {
          case 'login':
            webViewClient.dispatch('isLogin', (data) => {
              if (data.status === 1) {
                location.href = url;
              }
            });
            break;
          case 'toProject':
            webViewClient.dispatch('toProject');
            break;
          case 'contact':
            webViewClient.dispatch('openKefu');
            break;
          default:
            break;
        }
      }
    }
    isTouchMove = false;
  }, false);
}

window.addEventListener('load', () => {
  try {
    if (platform.isOverseaApp) {
      initPageEvent();
      const shareData = window.jsConfig && window.jsConfig.shareData;
      if (shareData) {
        webViewClient.dispatch('canShare', shareData);
      }
    }
  } catch (e) {
    console.log('error: ', e);
  }
}, false);
