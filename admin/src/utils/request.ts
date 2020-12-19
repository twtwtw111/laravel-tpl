import axios from "axios";
// import store from '../store/index';
// import { getSessionId } from '@/utils/auth';

import router from '../router'
import { message, Modal } from 'ant-design-vue' // UI组件库
/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken: any = axios.CancelToken;

// const removePending: any = (config: any, f: any) => {
// 	// 获取请求的url
// 	const flagUrl = config.url;
// 	// 判断该请求是否在请求队列中
// 	if (pending.indexOf(flagUrl) !== -1) {
// 		// 如果在请求中，并存在f,f即axios提供的取消函数
// 		if (f) {
// 			f("取消重复请求"); // 执行取消操作
// 		} else {
// 			pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
// 		}
// 	} else {
// 		// 如果不存在在请求队列中，加入队列
// 		if (f) {
// 			pending.push(flagUrl);
// 		}
// 	}
// };

/* 创建axios实例 */
const service = axios.create({
	baseURL: "http://laravel-tpl:8888/api", //** 基础地址 要请求的url前缀  
	timeout: 5000 // 请求超时时间
});

/* request拦截器 */
service.interceptors.request.use(
	(config: any) => {
		//neverCancel 配置项，允许多个请求
		// if (!config.neverCancel) {
		// 	// 生成cancelToken
		// 	config.cancelToken = new CancelToken((c: any) => {
		// 		removePending(config, c);
		// 	});
		// }
		// 在这里可以统一修改请求头，例如 加入 用户 token 等操作
		//   if (store.getters.sessionId) {
		//     config.headers['X-SessionId'] = getSessionId(); // 让每个请求携带token--['X-Token']为自定义key
		//   }
		return config;
	},
	(error: any) => {
		Promise.reject(error);
	}
);


/* respone拦截器 */
service.interceptors.response.use(
	(response: any) => {
		// 移除队列中的该请求，注意这时候没有传第二个参数f
		//removePending(response.config);
		// 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
		if (response.status !== 200) {

			(message as any).error({
				content: response.info || 'Error',
				duration: 5,
				background: true
			})
			if (response.status === 401 || response.status === 403 || response.status === 408) {
				// 警告提示窗
				(Modal as any).warning({
					// Modal.confirm({
					title: '提示',
					content: `你已被登出，可以取消继续留在该页面，或者重新登录`,
					okText: '确定',
					cancalText: '取消',
					width: 300,
					onOk: () => {
						setTimeout(() => {
							(Modal as any).remove();
							(Modal as any).info('退出成功');
							// 可在此处清空token等操作
							router.push('/') // 跳转到登录页，具体根据项目路由修改
						}, 2000)
					}
				})
			}
			// console.log(response.info)
			// 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
			return Promise.reject(new Error(response.info || 'Error'))

		} else {
			return response;
		}
	},
	(error: any) => {

		if (error && error.response) {
			switch (error.response.status) {
				case 412: {
					error.message = `${error.response.data.message}`; break;

				}
				case 400: error.message = '请求错误(400)'; break;
				case 401: error.message = '未授权,请登录(401)'; break;
				case 403: error.message = '拒绝访问(403)'; break;
				case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
				case 405: error.message = '请求方法未允许(405)'; break;
				case 408: error.message = '请求超时(408)'; break;
				case 500: error.message = '服务器内部错误(500)'; break;
				case 501: error.message = '服务未实现(501)'; break;
				case 502: error.message = '网络错误(502)'; break;
				case 503: error.message = '服务不可用(503)'; break;
				case 504: error.message = '网络超时(504)'; break;
				case 505: error.message = 'HTTP版本不受支持(505)'; break;
				case 422: {
					error.message = `参数错误:${Object.values(error.response.data.errors).join('')}`; break;
				}


				default: error.message = `连接错误: ${error.message}`;
			}
		} else {
			error.message = '连接到服务器失败，请联系管理员'
		}
		(message as any).error({
			content: error.info || error.message || 'Error',
			duration: 5,
			background: true
		})
		return Promise.reject(error)
	}

);

export default service;