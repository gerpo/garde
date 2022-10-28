import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { ActionTypes } from './store/actions';
import { AppointmentActionTypes } from './store/modules/appointments/actions';
import Appointments from '../components/Appointments/Appointments.vue';
import Auth from '../components/Auth/Auth.vue';
import Forbidden from '../components/Forbidden.vue'
import HelloWorld from '../components/HelloWorld.vue';
import Home from '../components/Home.vue';
import Navigation from '../components/Navigation.vue';
import NotFound from '../components/NotFound.vue'
import Profile from '../components/Profile.vue';
import RegisterCodes from '../components/RegisterCodes/RegisterCodes.vue'
import { RegisterCodesActionTypes } from './store/modules/register-codes/actions';
import { Rights } from '../models/Rights';
import Roles from '../components/Roles/Roles.vue';
import { store } from '../services/store/store';

export enum RouteNames {
    Home = 'Home',
    Login = 'Login',
    Logout = 'Logout',
    Profile = 'Profile',
    Appointments = 'Appointments',
    ShowAppointment = 'Appointments.show',
    Roles = 'Roles',
    RegisterCodes = 'RegisterCodes',
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
        path: "/profile",
        name: "Profile",
        component: Navigation,
        props: { currentComponent: Profile },
    },
    {
        path: "/appointments/:id",
        name: RouteNames.ShowAppointment,
        component: Navigation,
        props: { currentComponent: Appointments },
        meta: { permissions: [Rights.AppointmentsView, Rights.AppointmentsViewAny] },
        beforeEnter: () => {
            store.dispatch(AppointmentActionTypes.LoadAppointments)
        }
    },
    {
        path: "/appointments",
        name: RouteNames.Appointments,
        component: Navigation,
        props: { currentComponent: Appointments },
        meta: { permissions: [Rights.AppointmentsView, Rights.AppointmentsViewAny] },
        beforeEnter: () => {
            store.dispatch(AppointmentActionTypes.LoadAppointments)
        }
    },
    {
        path: "/roles",
        name: RouteNames.Roles,
        component: Navigation,
        props: { currentComponent: Roles },
        meta: { permissions: [Rights.RolesViewAny] },
    },
    {
        path: "/register-codes",
        name: RouteNames.RegisterCodes,
        component: Navigation,
        props: { currentComponent: RegisterCodes },
        meta: { permissions: [Rights.RegisterCodesViewAny] },
        beforeEnter: () => {
            store.dispatch(RegisterCodesActionTypes.LoadRegisterCodes)
        },
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