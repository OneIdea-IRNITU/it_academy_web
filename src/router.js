import Vue from 'vue'
import VueRouter from 'vue-router'
import ContestCard from "@/views/EventCard";
import EventList from "@/views/EventList";
import {publicPath} from "../vue.config";

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: publicPath,
            component: EventList
        },
        {
            path: publicPath + 'contest/:id',
            component: ContestCard,
        },
        {
            path: publicPath + 'page-not-found',
            alias: '*',
            component: {render: (h) => h("div", ["404! Page Not Found!"])},
        },
    ]
})

export default router