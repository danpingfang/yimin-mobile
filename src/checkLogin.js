import config from './config';
const url = `${config.domainUrl}/cis/inner/api/account/has_login`;

export default function() {
  return $.ajax({
    type: 'get',
    url: url,
    dataType: 'json'
  });
};