import request from './request';

class Login {
	login (params: any) {
		return request({
			url: '/admin/login', //请求的路由
			method: 'post', //请求的方法，默认为get
			data: params //发送请求所需的参数
		})
	}
}
export default Login;