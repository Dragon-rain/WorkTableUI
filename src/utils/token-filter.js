import { AuthAPI } from "../api/api";
import AuthFilter from "./AuthFilter/AuthFilter";
import { cookiesRemove } from "./cookiesData/cookiesData";

const tokenFilter = async (e) => {
    if(e.response.status===403) {
        const response = await AuthAPI.refresh().catch( e => {
             if(e.response.status===401) {
                alert("Please login again");
                AuthAPI.logout()
                cookiesRemove();
                window.location = "/"
            }  
        });
        if(response !== undefined) {
            AuthFilter(response);
            alert("token refreshed")
            document.location.reload()
        }
    }
}
export default tokenFilter