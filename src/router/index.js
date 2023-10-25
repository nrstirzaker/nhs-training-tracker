import {createRouter,createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Staff from "../views/Staff.vue";
import Equipment from "../views/Equipment.vue";
import Training from "../views/Training.vue";
import Admin from "../views/Admin.vue";

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            name:'dashboard',
            component:Dashboard
        },
        {
            path: '/dashboard',
            name:'dashboard',
            component:Dashboard
        },
        {
            path: '/staff',
            name:'staff',
            component:Staff
        },
        {
            path: '/equipment',
            name:'equipment',
            component:Equipment
        },
        {
            path: '/training',
            name:'training',
            component:Training
        },
        {
            path: '/admin',
            name:'admin',
            component:Admin
        }



    ]
})

export default router;