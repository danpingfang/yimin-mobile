import config from './config';

export default function redirectUrl(url) {
  const isUrl = typeof url === 'string';
  const redirectUrl = decodeURIComponent(isUrl ? url : location.search.substring(13).split('&')[0]);
  const whiteListUrls = config.whiteListUrls;
  for (let i = 0; i < whiteListUrls.length; i++) {
    if (whiteListUrls[i].test(redirectUrl)) {
      if (isUrl) {
        location.href = redirectUrl;
      } else {
        location.replace(redirectUrl);
      }
      return;
    }
  }
  return false;
}