import axios from 'axios'
import store from '@/store/store'

const apiService = {
    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, PUT, OPTIONS, DELETE';
        axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type';
        axios.defaults.headers.common['Content-Type'] = 'application/json';       
        axios.defaults.headers.common['Accept'] = 'application/json';

        axios.interceptors.request.use(
            (config) => {
        
                let token = localStorage.getItem('token')
        
                if (token) {
                    config.headers.common['Authorization'] = token
                }
                
                return config
            },
        
            (error) => Promise.reject(error)
        );
        
        axios.interceptors.response.use(
            res => {
                if (res.status == 401){
                  store.dispatch('auth/logout');
                }
        
                if (res.headers.hasOwnProperty('Authorization')){
                    localStorage.setItem('token', res.headers['Authorization']);
                }
                
                return res
            },
            error => {
              if (error.response.status == 401){
                store.dispatch('auth/logout');
              }

              return Promise.reject(error)
            }
        );
    },

    addHeader(key, header) {
        axios.defaults.headers.common[key] = header
    },

    removeHeaders() {
        axios.defaults.headers.common = {}
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    customRequest(data) {
        return axios(data)
    }
}

export default apiService