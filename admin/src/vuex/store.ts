import { ComponentCustomProperties } from 'vue'
import { Store, createStore } from 'vuex'

import Product from "@/utils/http";
const _product = new Product();
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
					_product.login({}).then((res: any) => {
						console.log(res);
					})
				},


			}
		}
	}
})

export default store