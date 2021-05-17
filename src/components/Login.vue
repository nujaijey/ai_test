<template>
    
    <div class="login-form">
        <h1>
        AiTest
        </h1>
        <v-text-field label="用户名" :rules="rules1" hide-details="auto" v-model="userName"></v-text-field>
        <v-text-field label="密码" :rules="rules2"  type="password" v-model="password" ></v-text-field>
           
        <v-btn width="100px" color="primary" elevation="16" @click="login" >登录</v-btn>
        &nbsp;
        <v-btn width="100px"  elevation="16" @click="register">注册</v-btn>
    </div>
    
    
</template>
<script>
export default {
    
     data(){
        return {
            rules1: [
                value => !!value || '用户名不能为空.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],rules2: [
                value => !!value || '密码不能为空不能为空.',
                value => (value && value.length >= 3) || '密码必须大于3位',
            ],
            userName:"",
            password:""
     }
      
    },
    methods:{
        register(){
            // 跳转到注册页面
            // name 是在router/index.js中register定义的name
            this.$router.push({name:'register'})
        },
        login(){
            // 声明变量
            let login_data = {
                userName : this.userName,
                password : this.password
            }
            // 引用user中的登录方法
            this.$api.user.login(login_data).then(res=>{
                console.log(res.data.data.token)
                // 登录后储存token和用户名到环境变量中
                localStorage.setItem('token',res.data.data.token)
                localStorage.setItem('username',this.userName)
                // 登录成功后跳转到task页面
                this.$router.push({name:'task'})
            })
        }
    }
}
</script>

<style scoped>
    .login-form{
        width: 500px;
        margin: 0 auto;
        text-align: center;
    }
</style>