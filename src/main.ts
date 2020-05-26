import * as https from 'https'
import * as md5 from 'md5'
import * as querystring from 'querystring'
import privite from './privite'

export default (options) => {
  const url = getUrl(options)
  https.get(url, (res) => {
    let chunks: Buffer[] = []
    res.on('data', (chunk) => {
      chunks.push(chunk)
    })
    res.on('end', () => {
      const resultString = Buffer.concat(chunks).toString()
      const result = JSON.parse(resultString)
      if (!result.error_code) {
        const source = result.trans_result.map((item) => item.src).join(', ')
        const dest = result.trans_result.map((item) => item.dst).join(', ')
        console.info(`${source} => ${dest}`)
      } else {
        const { error_code, error_msg } = result;
        const error = `error => ${error_code}：${error_msg}`
        console.error(error)
      }
    })
  }).on('error', (e) => {
    console.error('error：', e);
  });
}

const getUrl = ({ args, dest }) => {
  const { appId, cipher } = privite
  const baseUrl = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
  const query = args.join(' ')
  const salt = Math.random()
  const sign = md5(`${appId}${query}${salt}${cipher}`)
  const search = querystring.stringify({
    q: query,
    from: 'auto',
    to: dest || 'en',
    appid: appId,
    salt,
    sign
  })
  return `${baseUrl}?${search}`
}