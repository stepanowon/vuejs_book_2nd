<template>
<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 well well-sm">
            <legend><i class="glyphicon glyphicon-globe"></i> 사용자 계정 등록</legend>
            <br />
            <input class="form-control" name="userid" placeholder="id로 사용할 email 주소" type="email" v-model="userid" />
            <br />
            <input class="form-control" name="username" placeholder="사용자 이름" type="text" v-model="username"/>
            <br />
            <input class="form-control" name="password" placeholder="암호" type="password" minlength="8" v-model="password"/>
            <br />
            <input class="form-control" name="password" placeholder="암호 한번 더" type="password" minlength="8" v-model="password2"/>
            <br />
            <br />
            <button class="btn btn-primary" type="submit" @click="createUser">계정 등록</button>&nbsp;
            <button class="btn btn-primary" type="cancel" @click="goToHome">취소</button>
        </div>
    </div>
</div>
</template>

<script>
import Constant from '../Constant';

export default {
    data() {
        return {
            userid : "", 
            password : "",
            password2 : "",
            username : "",
        }
    },
    methods: {
        goToHome() {
            this.$router.push({name:'home'});
        },
        createUser() {
            const callback = (result) => {
                window.alert(result.message);
                if (result.status === "success") {
                    this.$router.push({ name:'login' });
                } 
            }
            if (this.password.trim().length < 8) {
              window.alert("암호가 너무 짧습니다. 8글자 이상을 입력하세요.");
              return;
            }
            if (this.password.trim() !== this.password2.trim()) {
              window.alert("암호가 일치하지 않습니다.")
              return;
            }
            this.$store.dispatch(Constant.CREATE_USER, { id: this.userid, password:this.password.trim(), username:this.username, callback })
        }
    },
}
</script>

<style>
.form-control { margin-bottom: 10px; }
.link
{
    display: block;
    margin-top: 10px;
}
</style>