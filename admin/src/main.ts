import { createApp } from 'vue'
import App from './App.vue'
// import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "./router"
import axios, { AxiosInstance } from 'axios'
import store from './vuex/store'
import { Form, Input, Button } from 'ant-design-vue';

const app = createApp(App);

//全局配置axios
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$axios: AxiosInstance
	}
}

// app.use(Antd)
app.use(Button);
app.use(Input)
app.use(Form)
app.use(router)
app.use(store)
app.config.globalProperties.$axios = axios
app.mount("#app")

