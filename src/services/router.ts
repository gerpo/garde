import { RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router';

import Appointments from '../components/Appointments/Appointments.vue';
import Auth from '../components/Auth/Auth.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Home from '../components/Home.vue';
import Navigation from '../components/Navigation.vue';
import NotFound from '../components/NotFound.vue'
import axios from '../utils/axios'
import { useAuthState } from './isLoggedIn';
import { useUser } from './useUser';

const loggedInState = useAuthState()
const user = useUser();

export enum RouteNames {
    Home = 'Home',
    Login = 'Login',
    Logout = 'Logout',
    Appointments = 'Appointments',
    ShowAppointment = 'Appointments.show',
    NotFound = 'NotFound',
}

const routes = [
    {
        path: "/",
        name: RouteNames.Home,
        component: Navigation,
        props: { currentComponent: Home },
    },
    {
        path: "/auth/login",
        name: RouteNames.Login,
        component: Auth,
    },
    {
        path: "/auth/logout",
        name: RouteNames.Logout,
        component: Auth,
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
            axios.post('/api/logout').then(() => {
                loggedInState.value = false
                return router.replace({ name: RouteNames.Login });
            })
        }
    },
    {
        path: "/about",
        name: "About",
        component: Navigation,
        props: { currentComponent: HelloWorld },
    },
    {
        path: "/appointments/:id",
        name: RouteNames.ShowAppointment,
        component: Navigation,
        props: { currentComponent: Appointments },
    },
    {
        path: "/appointments",
        name: RouteNames.Appointments,
        component: Navigation,
        props: { currentComponent: Appointments },
    },
    {
        path: "/:catchAll(.*)",
        name: RouteNames.NotFound,
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, _) => {
    const loggedIn = loggedInState.value;
    if (to.name === RouteNames.Login && !loggedIn) return;
    if (!loggedIn) return router.replace({ name: RouteNames.Login, query: { redirect: to.fullPath } });
    if (to.name === RouteNames.Login && loggedIn) return router.replace({ name: RouteNames.Home });
});

export default router;