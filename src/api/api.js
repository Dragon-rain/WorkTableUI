import axios from 'axios'
import Cookies from 'js-cookie'

const x_token = Cookies.get("token")
const x_refresh_token = Cookies.get("refreshToken")
const username = Cookies.get('username')

axios.interceptors.request.use(request=> {
    console.log(request)
})

const mainInstance = axios.create({
    baseURL: 'http://localhost:8080/main/'
})

const authInstance = axios.create({
    baseURL: 'http://localhost:8080/auth/'
})

const authInstanceRefresh = axios.create({
    baseURL: 'http://localhost:8080/auth/',
    headers: {
        RefreshToken: 'Bearer '+ x_refresh_token
    }
})

const userInstance = axios.create({
    baseURL: 'http://localhost:8080/user/',
    headers: {
        Authorization: 'Bearer '+ x_token
    }
    
})

const adminInstance = axios.create({
    baseURL: 'https://localhost:8080/admin/',
    headers: {
        Authorization: 'Bearer '+ x_token
    }
    
})

export const AuthAPI = {

    login(username, password, captcha=null) {
        return authInstance.post(`login`, {username, password, captcha});
    },

    registration(username, password, firstName, lastName, age, gender) {
        return authInstance.post(`registration`, {username, password, firstName, lastName, age, gender});
    },

    getUser(username) {
        return authInstance.post(`authme`, {username});
    }, 

    refresh(username) {
        return authInstanceRefresh.post(`refresh`, {username})
    },

    logout() {
        return authInstance.post(`logout`, {username})
    }

}

export const MainAPI = {

    getAllPosts(currentPage = 1, pageSize = 10) {
        return mainInstance.get(`posts?currentPage=${currentPage}&pageSize=${pageSize}`);
    },

    getPictures(name) {
        return mainInstance.get(`pictures?name=${name}`)
    }

}

export const UserApi = {

    postPost(type, title, description, userId) {
        console.log(Cookies.get("token"))
        return userInstance.put(`addpost`, {type, title, description, userId})
    },

    postPicture(newfiles) {
        const files = new FormData();

        for(let i = 0; i < newfiles.length; i++) {
            files.append("files", newfiles[i], newfiles[i].name)
        }
        console.log("pictures")
        return userInstance.put(`addpicture`, files)
    }

}