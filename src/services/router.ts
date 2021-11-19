import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { ActionTypes } from './store/actions';
import Administration from '../components/Roles/Roles.vue';
import Appointments from '../components/Appointments/Appointments.vue';
import Auth from '../components/Auth/Auth.vue';
import Forbidden from '../components/Forbidden.vue'
import HelloWorld from '../components/HelloWorld.vue';
import Home from '../components/Home.vue';
import Navigation from '../components/Navigation.vue';
import NotFound from '../components/NotFound.vue'
import { Rights } from '../models/Rights';
import { store } from '../services/store/store';

declare module 'vue-router' {
    interface RouteMeta {
        // is optional
        permissions?: Rights[]
    }
}

export enum RouteNames {
    Home = 'Home',
    Login = 'Login',
    Logout = 'Logout',
    Appointments = 'Appointments',
    ShowAppointment = 'Appointments.show',
    Roles = 'Roles',
    NotFound = 'NotFound',
    Forbidden = 'Forbidden',
}

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: { name: RouteNames.Home } },
    {
        path: "/home",
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
            store.dispatch(ActionTypes.Logout);
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
        meta: { permissions: [Rights.AppointmentsView, Rights.AppointmentsViewAny] }
    },
    {
        path: "/appointments",
        name: RouteNames.Appointments,
        component: Navigation,
        props: { currentComponent: Appointments },
        meta: { permissions: [Rights.AppointmentsView, Rights.AppointmentsViewAny] }
    },
    {
        path: "/roles",
        name: RouteNames.Roles,
        component: Navigation,
        props: { currentComponent: Administration },
        meta: { permissions: [Rights.RolesView] }
    },
    {
        path: "/:catchAll(.*)",
        name: RouteNames.NotFound,
        component: NotFound,
    },
    {
        path: "/forbidden",
        name: RouteNames.Forbidden,
        component: Forbidden,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, _) => {
    const loggedIn = store.state.loggedIn;
    if (to.name === RouteNames.Login && !loggedIn) return;
    if (!loggedIn) return router.replace({ name: RouteNames.Login, query: { redirect: to.fullPath } });
    if (to.name === RouteNames.Login && loggedIn) return router.replace({ name: RouteNames.Home });
});

router.beforeEach(async (to, from) => {
    if (!to.meta.permissions || to.meta.permissions.length === 0) return;

    if (!store.state.user) {
        await store.dispatch(ActionTypes.LoadUser)
    }
    if (!store.getters.userCanAny(to.meta.permissions)) {
        return { name: RouteNames.Forbidden }
    }
})

export default router;