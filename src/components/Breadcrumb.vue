<template>
 <div class="Breadcrumb">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in info" :key="index">
                {{item}}
        </el-breadcrumb-item>
    </el-breadcrumb>
 </div>    
</template>

<script>
export default {
    data(){
        return {
             info:[]   
        }
    },
    watch:{
        $route(){
            this.getRoute();
        }
    },
    methods:{
        getRoute(){
            const arr = this.$route.matched;
            let info = [];
            arr.forEach(v => {
                info.push(v.meta);
            });
            this.info = info;
        }
    },
    mounted(){
      this.getRoute()
    }
}
</script>

<style>
.Breadcrumb{
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid;
    margin-bottom: 20px;
}
</style>
