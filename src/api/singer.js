import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
export function singerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 722101446,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}