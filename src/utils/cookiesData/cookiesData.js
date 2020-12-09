import Cookies from 'js-cookie'

export const cookiesSetTokenAndUsername = (token, usernsme) => {
    Cookies.set("token", token);
    Cookies.set("username", usernsme);
}

export const cookiesRemoveTokenAndUsername = (token, usernsme) => {
    Cookies.remove(token);
    Cookies.remove(usernsme);
}
