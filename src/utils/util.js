
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import 'dayjs/locale/zh-cn' // import locale
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.extend(isLeapYear) // use plugin
dayjs.locale('zh-cn') // use locale

export const dayJs = dayjs

export function getSessionStorage (name) {
  return JSON.parse(sessionStorage.getItem(name))
}

export function setSessionStorage(name,value) {
  sessionStorage.setItem(name ,JSON.stringify(value))
}

export function getLocalStorage (name) {
  return JSON.parse(localStorage.getItem(name))
}

export function setLocalStorage(name,value) {
  localStorage.setItem(name ,JSON.stringify(value))
}

// 节流
export function throttle(fn, wait) {
  let timer = null;
  return function() {
    let context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        fn.apply(context, args);
        timer = null;
      }, wait)
    }
  }
}