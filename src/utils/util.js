
export function getSessionStorage (name) {
  return JSON.parse(sessionStorage.getItem(name))
}

export function setSessionStorage(name,value) {
  sessionStorage.setItem(name ,JSON.stringify(value))
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