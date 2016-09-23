const domainUrl = 'http://m.oversealive.com';
const staticUrl = '//s.oversealive.com';

export default {
  domainUrl,
  staticUrl,
  apiUrl: `${domainUrl}/cis/open/api/v1`,
  authApiUrl: `${domainUrl}/cis/inner/api/v1`,
  authUrl: `${domainUrl}/cis/inner/web/redirect/weixin_redirect?redirectUrl=${location.href}&deviceId=${getDeviceId()}`,
  whiteListUrls: [
    /^http:\/\/m.oversealive.com/
  ],
  loginConfig: {
    needImage: {
      url: '/account/check_need_image_code',
      params: {
        action: 'verify_code_login'
      }
    },
    imageCode: {
      url: '/user/igr/intent/get_image_code',
      params: {
        action: 'verify_code_login'
      }
    },
    messageCode: {
      url: '/account/send_verify_code',
      params: {
        action: 'verify_code_login'
      }
    },
  },
  quizConfig: {
    needImage: {
      url: '/user/igr/intent/check_need_image_code'
    },
    imageCode: {
      url: '/user/igr/intent/get_image_code'
    },
    messageCode: {
      url: '/user/igr/intent/send_verify_code'
    }
  }
};