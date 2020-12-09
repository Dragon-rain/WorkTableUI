import * as axios from 'axios'
import Cookies from 'js-cookie'

const mainInstance = axios.create({
    baseURL: 'http://localhost:8080/main/'
})

const authInstance = axios.create({
    baseURL: 'http://localhost:8080/auth/'
})

const userInstance = axios.create({
    headers: {
        Authorization: 'Bearer '+ Cookies.get("token")
    },
    baseURL: 'http://localhost:8080/user/'
})

const adminInstance = axios.create({
    headers: {
        Authorization: 'Bearer '+ Cookies.get("token")
    },
    baseURL: 'https://localhost:8080/admin/'
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
    }

}

export const SecurityAPI = {
    
}

export const MainAPI = {

    getAllPosts(currentPage = 1, pageSize = 10) {
        return mainInstance.get(`posts?currentPage=${currentPage}&pageSize=${pageSize}`);
    }
    
}