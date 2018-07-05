import Constant from '../Constant';

export default {
    [Constant.ADD_TODO] : (store, payload) => {
        //console.log("###addTodo!!!", payload);
        store.commit(Constant.ADD_TODO, payload);
    },
    [Constant.DELETE_TODO] : (store, payload) => {
        //console.log("###deleteTodo!!!", payload);
        store.commit(Constant.DELETE_TODO, payload);
    },
    [Constant.DONE_TOGGLE] : (store, payload) => {
        //console.log("###doneToggle!!!", payload);
        store.commit(Constant.DONE_TOGGLE, payload);
    }
}