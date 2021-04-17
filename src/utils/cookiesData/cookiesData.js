import Cookies from 'js-cookie'

export const cookiesSetData = (token, username, refreshToken) => {
    Cookies.set("token", token);
    Cookies.set("username", username);
    Cookies.set("refreshToken", refreshToken);
}

export const cookiesRemove =  () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("refreshToken");
}
