<template>
    <el-container>
        <el-aside width="auto">
            <Menu :isShow="isShow"></Menu>
        </el-aside>
        <el-container>
            <el-header>
                 <Header @click="headleChangeShow"/>
            </el-header>
            <el-main>
                <Breadcrumb/>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from '../components/Header.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import Menu from '../components/Menu.vue'
export default {
    data(){
        return{
          isShow:false
        }
    },
      components:{
        Header,
        Breadcrumb,
        Menu
    },
    methods:{
        headleChangeShow(){
                this.isShow = !this.isShow;
        }
    },
  
}
</script>

<style>
 .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;

  }
/* 重新修改样式 */
  body > div > .el-container {
    bottom: 0;
    top: 0;
    position: absolute;
    width: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
