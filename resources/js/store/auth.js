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
            state.isLoggedIn = false
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
                let user = await axios.post('/api/v1/auth/login', credentials)
                commit('loginSuccess', user.data)
                return user.data
            } catch (e) {
                if (e.response.status == 422) {
                    commit('loginFailed', e.response.data.errors)
                } else if (e.response.status == 401) {
                    commit('loginFailed', {
                        message: e.response.data.message
                    })
                } else {
                    commit('setError', e)
                    throw e
                }
            }
        },
        async logout({commit, dispatch}) {
            try {
                let logout = await axios.post('/api/v1/auth/logout')
                commit('logout')
                return logout.data
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
