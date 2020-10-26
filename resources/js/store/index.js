import post from './post'
import auth from './auth'

export default {
    state: {
        error: null
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    getters: {
        error(state) {
            return state.error
        }
    },
    modules: {
        post,
        auth
    }
}
