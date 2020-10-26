export function setCommonHeaders() {
    axios.interceptors.request.use(function (config) {
        config.headers['Accept'] = 'application/json'

        if (localStorage.getItem('user')) {
            config.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }

        return config
    });
}
