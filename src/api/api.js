import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
})

export const ProfileAPI = {

    login(username, password, captcha=null) {
        return instance.post(`main/login`, {username, password, captcha});
    },

    registration(username, password, firstName, lastName, age, gender) {
        return instance.post(`main/registration`, {username, password, firstName, lastName, age, gender});
    },

    getUser(username) {
        return instance.post(`main/auth`, {username});
    }

}

export const SecurityAPI = {
    
}

export const ContentAPI = {

    getAllPosts(currentPage = 1, pageSize = 10) {
        return instance.get(`main/posts?currentPage=${currentPage}&pageSize=${pageSize}`);
    }
    
}