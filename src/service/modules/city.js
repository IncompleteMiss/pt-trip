import hyRequest from '@/service/request'

export function getCityAll() {
  return hyRequest.get({
    url: '/city/all'
  })
}