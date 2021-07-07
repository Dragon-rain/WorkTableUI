import axios from 'axios'
import Cookies from 'js-cookie'
import tokenFilter from '../utils/token-filter'

const x_token = Cookies.get("token")
const x_refresh_token = Cookies.get("refreshToken")
const username = Cookies.get('username')

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


//inerseptor
userInstance.interceptors.response.use(response => {
    return response;
    },
    async (error) => {
        console.log(error)
       await tokenFilter(error)
    }
)

export const AuthAPI = {

    login(username, password, captcha=null) {
        return authInstance.post(`login`, {username, password, captcha});
    },

    registration(username, password, firstName, lastName, dob, gender, currentCity) {
        return authInstance.post(`registration`, {username, password, firstName, lastName, dob, gender, currentCity});
    },

    getUser(username) {
        return authInstance.post(`authme`, {username});
    }, 

    refresh() {
        return authInstanceRefresh.post(`refresh`, {username})
    },

    logout() {
        return authInstance.post(`logout`, {username})
    }

}

export const MainAPI = {

    getAllPosts(currentPage = 1, pageSize = 10, keyword = "null", type = "null", cityId = "null", districtId = "null") {
        return mainInstance.post(`posts`, {currentPage, pageSize, keyword, type, cityId ,districtId});
    },

    getPictures(name) {
        return mainInstance.get(`pictures?name=${name}`)
    },

    getCityList() {
        return mainInstance.get(`city/list`)
    },

    getDistrictsList() {
        return mainInstance.get(`district/list`)
    }


};

export const UserApi = {
    postPost(type, title, description, userId, cityId, districtId, newfiles) {
        console.log(Cookies.get("token"))
        let data = JSON.stringify({
            'type': type, 
            'title': title, 
            'description': description,
            'userId': userId,
            'cityId': cityId,
            'districtId': districtId
        });
        const files = new FormData();
        for(let i = 0; i < newfiles.length; i++) {
            files.append("files", newfiles[i], newfiles[i].name)
        }
        files.append("data", data)
        return userInstance.put(`addpost`, files, {
            headers: {
                'enctype' : 'multipart/form-data',
                'Content-Type' : false,
                'processData' : false
            }
        })
    },

    addProfilePicture(file) {
        const formData = new FormData();
        formData.append("file", file)

        return userInstance.put(`addProfilePicture`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                'username' : username
            }
        })
    }

}