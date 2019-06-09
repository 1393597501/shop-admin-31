<template>
   <div class="form-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="uname">
                <el-input v-model="ruleForm.uname" value="admin"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="upwd">
                <el-input type="password" v-model="ruleForm.upwd" value="123456"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button>取消</el-button>
                </el-form-item>
        </el-form>
    </div> 
</template>

<script>
export default {
        data(){
            return {
                ruleForm: {
                uname: '',
                pwd: ''
                },
                rules: {
                    uname: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入用户密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            onSubmit(){
                const data = {
                    uname:this.ruleForm.uname,
                    upwd:this.ruleForm.upwd
                }
                //  调用axios
                this.$axios({
                    // 请求的地址
                    url: "http://localhost:8899/admin/account/login",
                    // 请求方式
                    method: "POST",
                    // 数据
                    data,
                     // 处理session跨域
                    withCredentials: true
                }).then(res => {
                    const {message,status} = res.data;
                    if(status===0){
                           this.$router.push('/'); 
                    }
                    if(status===1){
                           this.$message.error(message);
                    }
                })
            }
        }
}
</script>

<style scoped>

.demo-ruleForm{
  width:500px;
  position: absolute;
  left:50%;
  margin-left:-250px;
  top:50%;
  margin-top:-95px;
}
</style>
