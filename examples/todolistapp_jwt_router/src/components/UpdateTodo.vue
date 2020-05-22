<template>
<div class="centered-modal fade in" tabindex="1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancel"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">할일 편집, 수정</h4>
      </div>
      <div class="modal-body">
        번호 : 
        <input id="id" type="text" class="form-control" name="id" disabled v-model="todoitemlocal.id"><br/>
        할일 : 
        <input id="todo" type="text" class="form-control" name="msg" 
            placeholder="할일을 여기에 입력!" v-model="todoitemlocal.todo"><br/>
        설명 : 
        <textarea class="form-control" rows="3" v-model="todoitemlocal.desc"></textarea><br/>
        완료 여부 : <input type="checkbox" v-model="todoitemlocal.done" />          
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" @click="updateTodo">수 정</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="cancel">취 소</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Constant from '../Constant';
import { mapState } from 'vuex';

export default {
    name : "updateTodo",
    data() {
      return { todoitemlocal : {} }
    },
    computed : mapState(['todoitem']),
    created() {
      this.todoitemlocal = { ...this.todoitem };
    },
    methods : {
        updateTodo() {
            //console.log("### update")
            this.$router.push({ name:"todoList" });
            this.$store.dispatch(Constant.UPDATE_TODO, { todoitem: this.todoitemlocal });
        },
        cancel() {
            this.$router.push({ name:"todoList"});
        }
    }
}
</script>

<style>
.in {
    display: flex !important;
}
.centered-modal .modal-dialog {
    margin: auto;
}
</style>