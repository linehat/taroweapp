import Taro from '@tarojs/taro'

export function decodeResponse(res) {
  if (res.status !== 200) {
    throw '系统异常'
  }
  // 业务错误
  if (res.data.state !== 1) {
    throw res.data
  }
  return res.data
}

export function ajax(url, params, data, method, token) {
  let rebuildUrl = url
  if ('GET' === method) {
    rebuildUrl = Object.keys(params).reduce((acc, key) => {
      acc = acc + `${key}=${params[key]}`
      return acc
    }, rebuildUrl + '?')
  }
  return Taro.request({
    url: rebuildUrl,
    data,
    header: {
      'content-type': 'application/json',
      'x-auth-token': token
    },
    method,
    dataType: 'json',
    responseType: 'text'
  })
}
