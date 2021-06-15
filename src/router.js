import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCard from "@/views/EventCard";
import EventList from "@/views/EventList";
// import {publicPath} from "../vue.config";

Vue.use(VueRouter)


const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '',
            component: EventList,
            name: 'EventList',
        },
        {
            path: '/event/:id',
            component: EventCard,
        },

        {
            path: '/404',
            name: '404',
            component: {render: (h) => h("div", ["404! Page Not Found!"])},
        },
        {
            path: '*',
            redirect: {name: 'EventList'},
        },
    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})

export default router