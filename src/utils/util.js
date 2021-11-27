
export function getSessionStorage (name) {
  return JSON.parse(sessionStorage.getItem(name))
}

export function setSessionStorage(name,value) {
  sessionStorage.setItem(name ,JSON.stringify(value))
}
