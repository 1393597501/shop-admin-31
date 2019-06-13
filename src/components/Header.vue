<template>
    <el-row type="flex" justify="space-between">
        <div class="arrow" @click="headleClick">
            <i class="el-icon-back"></i>
        </div>
        <div>{{user.uname}} {{user.realname}} 
            <span class="Loginout" @click="handleLogout">退出</span>
        </div>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            user:{}
        }
        },
        methods:{
            headleClick:function(){
                this.$emit('click')
            },
            handleLogout(){
                    this.$axios({
                         method:'GET',
                         url:'http://localhost:8899/admin/account/logout',
                         withCredentials: true   
                    }).then(res=>{
                        //  console.log(res);
                         const {message,status} = res.data;
                         if(status===0){
                             this.$message.success(message);
                             this.$router.push('/login')
                             localStorage.removeItem("user")
                         }
                    })
            }
        },
        mounted(){
            this.user = this.$store.state.user;

        }
}
</script>

<style scoped>
    .arrow,.Loginout{
        cursor: pointer;
    }
</style>
