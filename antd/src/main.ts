import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "./router"
import axios, { AxiosInstance } from 'axios'
const app = createApp(App);

//全局配置axios
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$axios: AxiosInstance
	}
}

app.use(Antd)
app.use(router)
app.config.globalProperties.$axios = axios
app.mount("#app")

