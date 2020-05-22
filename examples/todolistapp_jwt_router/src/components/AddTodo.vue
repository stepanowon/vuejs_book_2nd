<template>
<div class="centered-modal fade in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancel"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">할일 추가</h4>
      </div>
      <div class="modal-body">
        할일 : 
        <input id="msg" type="text" class="form-control" name="msg" 
            placeholder="할일을 여기에 입력!" v-model="todoitemlocal.todo"><br/>
        설명 : 
        <textarea class="form-control" rows="3" v-model="todoitemlocal.desc"></textarea>  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" @click="addTodo">추 가</button>
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
    name : "addTodo",
    data() {
      return { todoitemlocal : {} }
    },
    computed : mapState(['todoitem']),
    created() {
      this.todoitemlocal = { ...this.todoitem };
    },
    methods : {
        addTodo() {
            this.$store.dispatch(Constant.ADD_TODO, { todoitem : this.todoitemlocal })
            this.$router.push({ name:"todoList" });
        },
        cancel() {
            this.$router.push({ name:"todoList"});
        }
    }
}
</script>

<style>

</style>