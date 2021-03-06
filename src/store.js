import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        dateFilters: [
            {text: 'Предстоит', value: 'upcoming'},
            {text: 'Прошло', value: 'past'}
        ],
        dateFilter: 'upcoming',
        searchText: '',

    },
    mutations: {
        setDateFilter(state, value) {
            state.dateFilter = value
        },
        setSearchText(state, value) {
            state.searchText = value
        },
    },


})