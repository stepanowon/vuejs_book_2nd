<template>
<div class="container">
    <AppHeader />
    <button class="btn btn-info" @click="goAddTodo">연락처 추가</button> &nbsp;&nbsp;
    <button class="btn btn-info" @click="reload">새로 고침</button>
    <div class="panel panel-default panel-borderless">
    <div class="panel-body">
        <div class="row">
            <ul class="list-group">
                <TodoItem v-for="todoitem in todolist" :key="todoitem.id" :todoitem="todoitem" />
            </ul>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import Constant from '../Constant';
import TodoItem from './TodoItem';

export default {
    name:"todoList",
    components : { TodoItem },
    //props : ['todolist'],
    mounted() {
        if (!this.$store.state.todolist || this.$store.state.todolist.length === 0) {
            this.$store.dispatch(Constant.LOAD_TODOLIST, { token: this.$route.token });
        }
    },
    computed : {
        todolist() {
            return this.$store.state.todolist;
        }
    },
    methods : {
        goAddTodo() {
            this.$store.dispatch(Constant.INITIALIZE_TODOITEM);
            this.$router.push({ name:"addTodo" });
        },
        reload() {
            this.$store.dispatch(Constant.LOAD_TODOLIST, { token: this.$route.token });
        }
    }
}
</script>

<style>

</style>