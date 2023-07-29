import axios from 'axios'

export default {
    install: function(app, options){
        app.config.globalProperties.$axios = axios.create({
            baseURL: options.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}