import { Base64 } from 'js-base64'
import Vue from 'vue';

const getUserInfoFromToken = () => {
    let token = window.localStorage.getItem("token");
    try {
        //토큰이 존재하는지...
        if (token && token !== "") {
            //존재한다면 jwt 형식으로 . 으로 구분한 영역이 3영역인지..
            let arr = token.split('.');
            if (arr && arr.length === 3) {
                //두번째 영역을 base64 디코딩했을 올바른 json 형식인지...
                let payload = JSON.parse(Base64.decode(arr[1]));
                if (payload) {
                    //expiration 되지 않았는지...
                    if (payload.exp * 1000 > new Date().getTime()) {
                        return payload;
                    }
                }
            }    
        }
        return null;
    } catch (e) {
        return null;
    }
}

const getToken = () => {
    let userInfo = getUserInfoFromToken();
    if (!userInfo || !userInfo.users_id) {
        return "";
    } else {
        return window.localStorage.getItem("token");
    }
}

const logoutProcess = () => {
    window.localStorage.removeItem("token");
}

const init = () => {
    Vue.prototype.$getToken = getToken;
    Vue.prototype.$getUserInfoFromToken = getUserInfoFromToken;
    Vue.prototype.$logoutProcess = logoutProcess;
}

export default init;
export { logoutProcess, getToken, getUserInfoFromToken };


