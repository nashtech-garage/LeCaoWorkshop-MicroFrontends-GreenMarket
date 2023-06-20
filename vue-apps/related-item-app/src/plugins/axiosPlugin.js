import axios from 'axios'

export default {
    install: function(app, options){
        app.config.globalProperties.$axios = axios.create({
            baseURL: options.baseUrl,
            headers: {
<<<<<<< HEAD
                //Authorization: options.token ? `Bearer ${options.token}` : '',
                'Content-Type': 'application/json',
=======
                Authorization: options.token ? `Bearer ${options.token}` : '',
>>>>>>> features/breadcrumb-app
            }
        })
    }
}