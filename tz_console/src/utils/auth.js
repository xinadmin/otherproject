import Cookies from 'js-cookie'

/**
 * Token
 */
const TokenKey = 'token'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.sessionStorage.removeItem(TokenKey)
}

/**
 * 权限列表 Permisssion
 */

 const Permisssion = 'permission'

 export function setPermission(permissionList){
   return window.sessionStorage.setItem(Permisssion,permissionList)
 }

 export function getPermission(){
   return window.sessionStorage.getItem(Permisssion)
 }

 export function removePermission(){
   return window.sessionStorage.removeItem(Permisssion)
 }
