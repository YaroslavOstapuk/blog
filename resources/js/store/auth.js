import { getLocalUser } from '../helpers/auth'

const user = getLocalUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        errors: {}
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        currentUser(state) {
            return state.currentUser
        },
        loginErrors(state) {
            return state.errors
        }
    },
    mutations: {
        loginSuccess(state, payload) {
            state.isLoggedIn = true
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token})
            state.errors = {}

            localStorage.setItem("user", JSON.stringify(state.currentUser))
        },
        loginFailed(state, payload) {
            state.isLoggedIn = false,
            state.errors = payload
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false
            state.currentUser = null
        }
    },
    actions: {
        async login({commit, dispatch}, credentials) {
            try {
                const user = await axios.post('/api/v1/auth/login', credentials)
                commit('loginSuccess', user.data)
                return true
            } catch (error) {
                if (error.response.status == 422) {
                    commit('loginFailed', error.response.data.errors)
                }
                if (error.response.status == 401) {
                    commit('loginFailed', {
                        message: error.response.data.message
                    })
                }
            }
        }
    }
}
