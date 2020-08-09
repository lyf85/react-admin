import service from "../../src/utils/request";

/*
登录接口
*/
export function Login(data){
    return service.request({
        url: '/login/ ',
        method: 'post',
        data: data //请求为post
        // params: data 请求为get 
    })
}

/*
获取验证码接口
*/
export function GetCode(data){
    return service.request({
        url: '/getSms/ ',
        method: 'post',
        data: data//请求为post 
    })
}