import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login.vue")
    },
    {
        path: "/",
        name: "index",
        component: () => import("@/views/index")
    },
    {
        path: '/reg',
        name: 'register',
        component: () => import("@/views/register")
    },
    {
        path: '/add',
        name: 'add',
        component: () => import("@/views/add")
    },
    {
        path: "/user",
        name: 'user',
        component: () => import("@/views/user")
    }
]

const router = createRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/reg' || to.path === '/forget' || to.path === '/logout') {
        next();
    } else {
        // let stores = store;
        let token = localStorage.getItem('token')
        // console.log(store);
        // console.log(JSON.parse(localStorage.store).token);
        if (token == null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
})
export default router
