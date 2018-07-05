import Constant from '../Constant';
import axios from 'axios'

export default {
    state: {
        contacts : []
    },
    mutations: {
        [Constant.SEARCH_CONTACT] : (state, payload) => {
            state.contacts = payload.contacts;
        }
    },
    actions : {
        [Constant.SEARCH_CONTACT] : (store, payload)=> {
            axios.get(Constant.BASE_URL + payload.name)
            .then((response)=> {
                store.commit(Constant.SEARCH_CONTACT, { contacts: response.data })
                if (response.data.length > 0)
                    store.dispatch(Constant.ADD_KEYWORD, payload);
            })
        }
    }
}