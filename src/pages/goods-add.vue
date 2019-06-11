<template>
  <el-col :span="18">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择">
            <el-option :label="item.title"
                       :value="item.category_id"
                       v-for="(item, index) in categorys" 
                       :key="index">
            </el-option>          
        </el-select>
        </el-form-item>

        <el-form-item label="是否发布">
            <el-switch v-model="form.status"></el-switch>
            <span data-v-0c4abcb0="" class="tips">*不发布前台则无法显示</span>
        </el-form-item>

        <el-form-item label="推荐类型">
            <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
            <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
        </el-form-item>

        <el-form-item label="内容标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="副标题" class="imgborder">
            <el-input v-model="form.sub_title"></el-input>
        </el-form-item>
        
        <el-form-item label="图片相册">
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8899/admin/article/uploadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>

        <el-form-item label="商品货号">
            <el-input v-model="form.goods_no"></el-input>
        </el-form-item>

        <el-form-item label="库存数量">
            <el-input v-model="form.stock_quantity"></el-input>
            <span data-v-0c4abcb0="" class="tips">*我不确定要不要自动生成</span>
        </el-form-item>

        <el-form-item label="市场价格">
            <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="销售价格">
            <el-input v-model="form.sell_price"></el-input>
        </el-form-item>

        <el-form-item label="图片相册">
            <el-upload
            action="http://localhost:8899/admin/article/uploadimg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleCartSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>

        <el-form-item label="内容摘要">
            <el-input type="textarea" v-model="form.zhaiyao"></el-input>
        </el-form-item>
        <el-form-item label="内容描述">
             <quillEditor v-model="form.content"></quillEditor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
  </el-col>
</template>


<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

  export default {
    data() {
      return {
        form: {
            category_id: "",
            status: false,
            is_top: false,
            is_hot: false,
            title: "",
            sub_title: "",
            imgList: [], //封面图片
            goods_no: "",
            stock_quantity: "",
            market_price: "",
            sell_price:"",
            fileList: [], // 多张图片
            zhaiyao: "",
            content: "",

            is_slide: false // 不属于商品添加的
        },
        categorys: [], // 所属类别的数组
        imageUrl: '', // 预览图片的地址
        dialogImageUrl: '', // 多张图片预览时候的图片地址
        dialogVisible: false // 弹窗是否显示
      }
    },
 
    methods: {
        //封面图片
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(res,file);
        this.form.imgList = [res];
      },
        beforeAvatarUpload(file) {
           const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },

         // 多张图片删除的事件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
         // 图片的预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleCartSuccess(res,file,fileList){
            // console.log(fileList);
            const files = fileList.map(v=>{
              return v.response;
            })
            this.form.fileList = files;
      },
      onSubmit() {
            this.$axios({
                  url:'http://localhost:8899/admin/goods/add/goods',
                  method:'POST',
                  data:this.form,
                     // 处理session跨域
                  withCredentials: true
            }).then(res=>{
              console.log(res);
                  const {message,status} = res.data;
                  if(status===0){
                        this.$message.success(message);
                       this.$router.back();
                  }else{
                      this.$router.push("/login");
                  } 
            })
      }
    },
    components:{
        quillEditor
    },
    mounted(){
        this.$axios({
            method:'get',
            url: "http://localhost:8899/admin/category/getlist/goods",
        }).then(res=>{
            const {message,status} = res.data;
            this.categorys = message;     
        })
    }
  }
</script>
<style scoped>
.tips[data-v-0c4abcb0] {
    font-size: 12px;
    color: #999;
    vertical-align: middle;
    margin: 0 10px;
}
/* 图片 */
 .avatar-uploader .el-upload {
    border: 1px dashed #cccccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload i{
      border: 1px dashed #cccccc;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
