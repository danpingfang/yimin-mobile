import webViewClient from './lib/webViewClient';
import platform from '../utils/platform';

function initPageEvent() {
  document.addEventListener('touchend', (event) => {
    let target = event.target;
    if (target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }
    const clientMethodName = target.getAttribute('data-client-method-name');
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
      return false;
    }
  }, false);
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (platform.isOverseaApp) {
      initPageEvent();
    }
  } catch (e) {
    console.log('error: ', e);
  }
});
