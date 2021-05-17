<template>
    <div class="register-form">
        注册
        <v-text-field label="用户名"  :rules="rules1"  hide-details="auto" v-model="userName"></v-text-field>
        <v-text-field label="密码" :rules="rules1"  hide-details="auto"  type="password" v-model="password" ></v-text-field>
        <v-text-field label="邮箱" v-model="email" ></v-text-field>
        <v-btn  width="100px" color="primary" elevation="16" @click="register" >注册</v-btn>&nbsp;&nbsp;
        <v-btn width="100px"  elevation="16"  @click="to_login">直接登录</v-btn>
    </div>
</template>
<script>
export default {
    
    data(){
        return{
            rules1: [
                value => !!value || '用户名不能为空.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],rules2: [
                value => !!value || '密码不能为空不能为空.',
                value => (value && value.length >= 3) || '密码必须大于3位',
            ],
        // 保存输入的页面输入的用户信息
            userName: "",
            password: "",
            email: ""
        }
      
      
    },
    methods:{
        // 跳转到登录页面
        to_login(){
            this.$router.push({name:"login"})
        },
        // 引入user接口中的注册方法
        register(){
            // 声明变量并赋值
            let register_data = {
                userName : this.userName,
                password : this.password,
                email : this.email,
            }
            
            this.$api.user.register(register_data).then(res=>{
                console.log(res)
                console.log(res.data.resultMsg)
                if(res.data.resultMsg == '注册成功'){
                    this.$router.push({name:"login"})
                }
            })
        }
    },
}
</script>
<style scoped>
    .register-form{
        width: 500px;
        margin: 0 auto;
        text-align: center;
    }
</style>