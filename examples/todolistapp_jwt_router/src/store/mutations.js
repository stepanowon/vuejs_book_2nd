import Vue from 'vue';
import Constant from '../Constant';

export default {
    [Constant.ADD_TODO] :(state,payload)=> {
        state.todolist.push({ ...payload.todoitem });
        state.todoitem = { id:"", todo:"", desc:"", done:false };
    },
    [Constant.DELETE_TODO] :(state,payload)=> {
        let index = state.todolist.findIndex((item)=>item.id === payload.id);
        state.todolist.splice(index,1);
    },
    [Constant.TOGGLE_DONE] :(state,payload)=> {
        let index = state.todolist.findIndex((item)=>item.id === payload.id);
        state.todolist[index].done= !state.todolist[index].done;
    },
    [Constant.UPDATE_TODO] :(state,payload)=> {
        let index = state.todolist.findIndex((item)=>item.id === payload.todoitem.id);
        Vue.set(state.todolist, index, payload.todoitem);
    },
    [Constant.INITIALIZE_TODOITEM] :(state,payload)=> {
        if (payload && payload.todoitem) {
            state.todoitem = payload.todoitem;
        } else {
            state.todoitem = { id:"", todo:"", desc:"", done:false };
        }  
    },
    [Constant.LOAD_TODOLIST] : (state, payload)=> {
        state.todolist = payload.todolist;
    },
    [Constant.CHANG_ISLOADING] : (state, payload)=> {
        state.isloading = payload.isloading;
    },
    [Constant.SET_USER_INFO] : (state, payload)=> {
        state.userInfo = payload.userInfo;
        state.token = payload.token;
    }
}