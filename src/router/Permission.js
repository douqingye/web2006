import router from './index'
import store from '../store/index'

//控制是否登录
router.beforeEach((to, form, next) => {
    if (to.meta.isLogin) {
        var token = store.state.loginModule.user.token;
        if (token) {
            next()    //结果为true进行下一步
        } else {
            next({
                path: '/login'    //结果为false跳转到注册页面
            })
        }
    } else {
        //不需要登录
        next()
    }
})