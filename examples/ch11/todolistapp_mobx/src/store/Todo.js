import { observable } from "mobx";

export default class Todo {
    @observable id;
    @observable todo;
    @observable done;

    constructor(id, todo, done) {
        this.id = id;
        this.todo = todo;
        this.done = done;
    }
}