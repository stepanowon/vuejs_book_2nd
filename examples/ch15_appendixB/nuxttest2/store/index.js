import Vuex from 'vuex';
import state from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';

//현재 이방법은 클래식모드이며 nuxt 2.x에서 deprecated 상태임
//모듈 모드를 사용할 것을 권장함. 모듈 모드에 대해서는 아래 문서를 참조..
//https://ko.nuxtjs.org/guide/vuex-store/#%EB%AA%A8%EB%93%88-%EB%AA%A8%EB%93%9C
const store = () => { 
    return new Vuex.Store({
        state, 
        getters,
        mutations
    })
}

export default store