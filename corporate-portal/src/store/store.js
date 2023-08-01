import { createStore } from 'vuex'

export const store = createStore({
    state () {
        return {
            users: [],
        }
    },
    mutations: {
        savaUsersData (state, data) {
            state.users = data
        },
        async getUsersFromServer(state) {
            const API_URL = 'https://jsonplaceholder.typicode.com/users'
            fetch(API_URL).then((res) => {
                if (res.ok) {
                    return res.json().then(json => {
                        state.users = json
                    });
                } else {
                    return res.json().then((error) => {
                        Promise.reject(error)
                    });
                }
            });
        }
    },
    actions: {
        async getUsersFromServer (context) {
            context.commit('getUsersFromServer')
        }
    },
    getters: {
        getUserData: (state) => (userId) => {
            return state.users.find((user) => user.id === userId)
        },
        getUsers (state) {
            return state.users
        },
    }
})