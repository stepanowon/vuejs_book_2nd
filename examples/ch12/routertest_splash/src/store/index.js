import Vue from 'vue'
import Vuex from 'vuex';
import Constant from '../Constant';

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        isloading:false
    },
    mutations : {
        [Constant.CHANGE_ISLOADING] : (state, payload)=> {
            state.isloading = payload.isloading;
        }
    },
    actions : {
        [Constant.CHANGE_ISLOADING] : (store, payload)=> {
            store.commit(Constant.CHANGE_ISLOADING, payload);
        }
    }
})

export default store;