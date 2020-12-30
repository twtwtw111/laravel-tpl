import { ComponentCustomProperties } from 'vue'
import { Store, createStore } from 'vuex'
import router from "../router"
import { Login } from "@/utils/http";
import { message } from "ant-design-vue"
const _login = new Login();
// import user from './user'
// vuex 在typescript 中的使用
declare module '@vue/runtime-core' {
	// declare your own store states
	interface State {
		count: number
	}

	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<State>
	}
}
const store = createStore({

	state: {
		count: 0
	},

	mutations: {
		increment (state: any) {
			state.count++
		}
	},
	actions: {
		increment (context: any) {
			context.commit('increment')
		},

	},
	modules: {
		user: {
			namespaced: true,
			state: {
				user: {}
			},
			mutations: {
				setUserData (state, userData) {
					state.user = userData
					// console.log(state.user)
					localStorage.setItem('user', JSON.stringify(userData))
					localStorage.setItem('Authorization', userData.token)
					// axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
				},

				clearUserData () {
					localStorage.removeItem('user')
					localStorage.removeItem('Authorization')
					location.reload()
				}
			},
			actions: {
				login ({ commit }, credentials) {
					_login.login(credentials).then((res: any) => {
						// console.log(res.data)
						if (res.data.code == 200) {
							commit('setUserData', res.data.data)
							router.push('/admin')
						} else {
							(message as any).error({
								content: res.data.message || 'Error',
								duration: 5,
								background: true
							})
						}
					})
				},
				logout ({ commit }) {
					commit('clearUserData')

				}

			}
		}
	}
})

export default store