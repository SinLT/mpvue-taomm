import request from './request'

const api = {
  getPetals: (r, num) => request.get('https://route.showapi.com/819-1', {
    showapi_timestamp: r,
    showapi_appid: '34789',
    showapi_sign: '2518b9fc87394416a406c63d26925cd2',
    type: '37',
    num: '10',
    page: num
  }),
  getTaommNav: (r) => request.get('http://route.showapi.com/126-1', {
    showapi_timestamp: r,
    showapi_appid: '34789',
    showapi_sign: '2518b9fc87394416a406c63d26925cd2'
  }),
  getTaommList: (r, type, num) => request.get('http://route.showapi.com/126-2', {
    showapi_timestamp: r,
    showapi_appid: '34789',
    showapi_sign: '2518b9fc87394416a406c63d26925cd2',
    type: type,
    order: 1,
    page: num
  })
}

export default api
