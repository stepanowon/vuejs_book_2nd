import Constant from '../Constant';

export default {
    [Constant.ADD_TODO] : (state, payload) => {
        if (payload.todo !== "") {
            state.todolist.push(
                { id:new Date().getTime(), todo: payload.todo, done:false });
        }
    },
    [Constant.DONE_TOGGLE] : (state, payload) => {
        var index = state.todolist.findIndex((item)=>item.id === payload.id);
        state.todolist[index].done = !state.todolist[index].done;
    },
    [Constant.DELETE_TODO] : (state, payload) => {
        var index = state.todolist.findIndex((item)=>item.id === payload.id);
        state.todolist.splice(index,1);
    }
}