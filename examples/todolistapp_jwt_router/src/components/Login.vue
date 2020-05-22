<template>
<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 well well-sm">
            <legend><i class="glyphicon glyphicon-globe"></i> 로그인 </legend>
            <br />
            <input class="form-control" name="userid" placeholder="id로 사용할 email 주소" type="email" v-model="userid" />
            <br />
            <input class="form-control" name="password" placeholder="암호" type="password" v-model="password" />
            <br />
            <br />
            <button class="btn btn-primary" @click="login">로그인</button>&nbsp;
            <router-link to="/createuser" class="btn btn-primary">사용자 계정 등록</router-link>&nbsp;
            <router-link to="/" class="btn btn-primary">Go to Home</router-link>
        </div>
    </div>
</div>
</template>

<script>
import Constant from '../Constant'

export default {
    data() {
        return {
            userid : "", 
            password : ""
        }
    },
    methods: {
        login() {
            const callback = (response) => {
                if (response.status === "success") {
                    this.$router.push({ name:'home' })
                } else {
                    alert("로그인 실패 : " + response.message)
                }
            }
            this.$store.dispatch(Constant.LOGIN, { id:this.userid, password:this.password, callback })
        }
    },
}
</script>

<style>
.link
{
    display: block;
    margin-top: 10px;
}
</style>