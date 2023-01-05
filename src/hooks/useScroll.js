import {onMounted, onUnmounted, ref} from 'vue'
import { throttle } from 'underscore'

/*
export default function useScroll(reachBottomCB) {
  // 监听window窗口的滚动
  // 1.当我们离开页面时，应该移除监听
  // 2.如果别的页面也进行类似的监听，会编写重复代码
  const scrollListenerHandler = () => {
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    if (scrollHeight - 1 <= clientHeight + scrollTop ) {
      console.log(clientHeight, scrollTop, scrollHeight)
      if (reachBottomCB)
        reachBottomCB()
    }
  }

  // 挂载时，添加监听
  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })

  // 离开(卸载)页面的时候，移除监听页面滚动
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })
}
*/

export default function useScroll(reachBottomCB) {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  // 监听window窗口的滚动
  // 1.当我们离开页面时，应该移除监听
  // 2.如果别的页面也进行类似的监听，会编写重复代码
  // throttle: 节流
  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    if (scrollHeight.value - 3 <= clientHeight.value + scrollTop.value ) {
      console.log(clientHeight.value, scrollTop.value, scrollHeight.value)
      isReachBottom.value = true
      if (reachBottomCB)
        reachBottomCB()
    }
  }, 1000)

  // 挂载时，添加监听
  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })

  // 离开(卸载)页面的时候，移除监听页面滚动
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
