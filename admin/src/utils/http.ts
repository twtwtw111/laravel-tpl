import request from './request';

class Product {
	login (params: any) {
		return request({
			url: '/api/test', //请求的路由
			method: 'get', //请求的方法，默认为get
			data: params //发送请求所需的参数
		})
	}
}
export default Product;