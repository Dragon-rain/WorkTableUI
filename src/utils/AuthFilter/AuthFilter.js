import { cookiesRemove, cookiesSetData } from "../cookiesData/cookiesData"

const AuthFilter = (response) => {
    cookiesRemove()
    cookiesSetData(response.data.token, response.data.username, response.data.refreshToken)
}

export default AuthFilter