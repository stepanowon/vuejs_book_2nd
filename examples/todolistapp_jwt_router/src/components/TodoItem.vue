<template>
    <li :class="checked(todoitem.done)" :title="'설명 : ' + todoitem.desc" @click="toggleDone(todoitem.id)">
        <span :class="{ pointer:true, 'todo-done':todoitem.done }">
            {{todoitem.todo}}
            {{todoitem.done ? " (완료)" : ""}}
        </span>
        <span class="pull-right badge pointer" @click.stop="deleteTodo(todoitem.id)">삭제</span>
        <span class="pull-right badge pointer" @click.stop="editTodo(todoitem.id)">편집</span>
    </li>
</template>

<script>
import Constant from '../Constant';

export default {
    name : "todoItem",
    props : ['todoitem'],
    methods : {
        checked(done) {
            return { "list-group-item":true, "list-group-item-success":done };
        },
        toggleDone(id) {
            this.$store.dispatch(Constant.TOGGLE_DONE, { id });
        },
        editTodo(id) {
            this.$store.dispatch(Constant.INITIALIZE_TODOITEM, { todoitem: { ...this.todoitem } });
            this.$router.push({ name: 'updateTodo', params: { id } })
        },
        deleteTodo(id) {
            this.$store.dispatch(Constant.DELETE_TODO, { id });
        }
    }
}
</script>

<style>

</style>