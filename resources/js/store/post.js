export default {
    state: {
        postError: {}
    },
    getters: {
        postError(state) {
          return state.postError
        }
    },
    mutations: {
        setPostError(state, payload) {
            state.postError = payload
        },
        clearError(state, payload) {
            state.postError = {}
        }
    },
    actions: {
        async fetchPosts({commit, dispatch}, per_page) {
            try {
                const post = await axios.get(`/api/v1/posts?per_page=${per_page}`)
                return post.data
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchPost({commit, dispatch}, slug) {
            try {
                const post = await axios.get(`/api/v1/posts/${slug}`)
                commit('clearError')
                return post.data
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getResults({commit, dispatch}, payload) {
            try {
                const posts = await axios.get('/api/v1/posts?per_page='+ payload.per_page +'&page=' + payload.page)
                return posts.data
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async storePost({commit, dispatch}, payload) {
            try {
                const post = await axios.post(`/api/v1/posts`, payload,   {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                commit('clearError')
                return post.data
            } catch (e) {
                if (e.response.status == 422) {
                    commit('setPostError', e.response.data.errors)
                } else {
                    commit('setError', e)
                    throw e
                }
            }
        },
        async destroyPost({commit, dispatch}, payload) {
            try {
                const result = await axios.delete(`/api/v1/posts/${payload}`)
                return result.data
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updatePost({commit, dispatch}, payload) {
            try {
                const result = await axios.post(`/api/v1/posts/${payload.slug}`, payload.data)
                return result.data
            } catch (e) {
                if (e.response.status == 422) {
                    commit('setPostError', e.response.data.errors)
                } else {
                    commit('setError', e)
                    throw e
                }
            }
        }
    }
}
