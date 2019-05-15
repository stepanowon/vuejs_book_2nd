import { observable, action } from 'mobx';
import Todo from './Todo';
import shortid from 'shortid';

class TodoStore {
    @observable todolist = [
        new Todo(shortid.generate(), '영화보기', false),
        new Todo(shortid.generate(), '영화보기2', true),
        
        new Todo(shortid.generate(), '영화보기3', false)
    ];

    @action.bound
    addTodo(todo) {
        this.todolist.push(new Todo(shortid.generate(), todo, false));
    }

    @action.bound
    deleteTodo(id) {
        const index = this.todolist.findIndex((todo)=> todo.id === id);
        this.todolist.splice(index,1);
    }

    @action.bound
    toggleDone(id) {
        const index = this.todolist.findIndex((todo)=> todo.id === id);
        this.todolist[index].done = !this.todolist[index].done;
    }
}

const store = new TodoStore();
export default store;