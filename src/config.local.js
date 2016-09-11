// const domainUrl = 'http://192.168.1.129:2020';
const domainUrl = 'http://test.lvbaoyou.com';
const staticUrl = '//static-test.lvbaoyou.com';

export default {
  domainUrl,
  staticUrl,
  apiUrl: `${domainUrl}/cis/open/api/v1`,
  authApiUrl: `${domainUrl}/cis/inner/api/v1`,
  authUrl: `${domainUrl}/cis/inner/web/redirect/weixin_redirect?redirectUrl=${location.href}&deviceId=${getDeviceId()}`,
  whiteListUrls: [
    /^https:\/\/m.lvbaoyou.com/,
    /^http:\/\/m.qu93.com/,
    /^http:\/\/qu93.com/,
    /^http:\/\/115\.159\.71\.249/,
    /^http:\/\/test\.lvbaoyou\.com/,
    /^http:\/\/wx\.lvbaoyou\.com/
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