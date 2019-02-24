import Constant from '../Constant';

//상태를 변경하는 기능만을 뽑아서...
export default {
    [Constant.CHANGE_IS_LOADING] : (state, payload) => {
        state.isloading = payload.isloading;
    },
    [Constant.FETCH_CONTACTS] : (state, payload) => {
        state.contactlist = payload.contactlist;
    },
    [Constant.FETCH_CONTACT_ONE] : (state, payload) => {
        state.contact = payload.contact;
    },
    [Constant.INITIALIZE_CONTACT_ONE] : (state) => {
        state.contact = { _id:'', name:'', tel:'', address:'', photo:'' };
    },
    [Constant.UPDATE_PHOTO] : (state, payload) => {
        let index = state.contactlist.contacts.findIndex((c)=>c._id === payload._id);
        console.log(state.contactlist.contacts[index])
        state.contactlist.contacts[index].photo = "";
    }
}