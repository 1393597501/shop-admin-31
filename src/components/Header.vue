<template>
    <el-row type="flex" justify="space-between">
        <div class="arrow" @click="headleClick">
            <i class="el-icon-back"></i>
        </div>
        <div> admin 超级管理员 退出 </div>
    </el-row>
</template>

<script>
export default {
        methods:{
            headleClick:function(){
                this.$emit('click')
            }
        }
}
</script>

<style scoped>
    .arrow{
        cursor: pointer;
    }
</style>
