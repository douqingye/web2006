import jwt from 'jwt-decode'
import i18n from '../plugins/i18n'
import store from '../store'

export function initProject(){
    //用户进来先读取用户保存的语言,如果这个语言定制过，我们就通过i18n设置好这个语言环境
if(localStorage.getItem('lang')){
    i18n.locale=(localStorage.getItem('lang'))
  }
  
  //一进来页面先读取本地数据，判断数据是否存在，如果存在就写入到store中
  if(localStorage.getItem('ego')){
    store.commit('loginModule/setUser',{
      username:jwt(localStorage.getItem('ego')).username,
      token:localStorage.getItem('ego')
    })
  
  }
}