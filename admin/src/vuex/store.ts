import { ComponentCustomProperties } from 'vue'
import { Store, createStore } from 'vuex'
import request from '@/utils/request'
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

			},
			mutations: {

			},
			actions: {
				login ({ commit }, credentials) {
					request({
						url: '/test',
						method: 'get'
					}).then((res) => {
						console.log(res)
					})
				},


			}
		}
	}
})

export default store