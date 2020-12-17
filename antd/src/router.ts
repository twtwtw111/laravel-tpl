import { createRouter, createWebHistory, useRoute } from 'vue-router';
import Login from './components/Login.vue'
import Admin from './components/Admin.vue'
import User from './components/admin/User.vue'
const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,  // history
    routes: [
        { path: '/', redirect: 'admin' },
        { path: '/login', name: 'login', component: Login },
        {
            path: '/admin', component: Admin, children: [
                {
                    path: '/admin/user', component: User
                }
            ]
        },
    ]
});
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('Authorization');
    if (to.name !== 'login' && !token) {
        next({ name: 'login' })
    }
    else next()
})

export default router;
