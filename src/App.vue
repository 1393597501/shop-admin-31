<template>
  <div>
     <el-button type="primary">主要按钮</el-button>
     <p>
       <router-view></router-view>
     </p>
  </div>
</template>

<script>


export default {
  mounted(){
    // axios({
    //   url:"https://api.github.com/users",
    //   method:"GET",
    //   params:{
    //     abc:123
    //   }
    // }).then(res=>{
    //   console.log(res);
    // })
    this.$axios({
       url:"https://api.github.com/users",
       method:"GET",
    }).then(res=>{
      console.log(res);
    })
  }
}
</script>

<style>

</style>
