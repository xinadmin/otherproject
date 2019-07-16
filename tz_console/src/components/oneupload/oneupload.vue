<template>
    <el-upload ref="upload" class="oneupload"
        :action="UploadUrl"
        :headers="Headers"
        :disabled="disabled"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-error="handleError"
    >
        <img :src="url" class="img" v-if="url != null && url != ''"/>
        <i class="el-icon-plus images-uploader-icon" v-else></i>
        <slot name="tip" slot="tip"></slot>
        <slot name="filetip"></slot>
    </el-upload>
</template>

<script>

import {UploadUrl, Headers} from '@/controllers/uploadUrl'

export default {
    model:{
        prop: 'imgUrl',
        event: 'imgUrl'
    },
    props:{
        imgUrl:{
            required: true
        },
        rules:{
            type: [Array, Object],
            default: ''
        },
        errorMessage:{
            type: String,
            default: ''
        },
        disabled:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            url: '',
            UploadUrl,
            Headers
        }
    },
    methods:{
        //格式大小判断
        beforeUpload(file){
			// const isLt2M = file.size / 1024 / 1024 < 2
			// if (!isLt2M) {
			// 	this.$message.error(`图片太大，上限2M`)
			// 	return false
			// }

            const rules = this.rules;

            let allowFileArr = '';
            let width = 0;
            let height = 0;
            let type_error_message = '上传的格式有误!';

            if(Object.prototype.toString.call(rules) == '[object Array]'){
                allowFileArr = rules;
                type_error_message = this.errorMessage || '上传的图片只能是 ' + allowFileArr.toString() + ' 格式!';
            }

            if(Object.prototype.toString.call(rules) == '[object Object]'){
                allowFileArr = rules.type;
                width = rules.size.width;
                height = rules.size.height;
                if(rules.typeErrorMessage) type_error_message = rules.typeErrorMessage || '上传的图片只能是 ' + allowFileArr.toString() + ' 格式!';
            }

            const isTypeAllow = allowFileArr.length > 0 ? allowFileArr.indexOf(file.type) > -1 : true;

            let isSize = true;
            if(width !== undefined || height !== undefined){
                //若图片大小规则存在
                isSize = new Promise(function(resolve, reject) {
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    img.onload = function() {
                        let validWidth = true;
                        let validHeight = true;
                        if(width !== 0) validWidth =  img.width == width;
                        if(height !== 0) validHeight = img.height == height;
                        validWidth && validHeight ? resolve() : reject();
                    }
                    img.src = _URL.createObjectURL(file);
                }).then(() => {
                    return file;
                }, () => {
                    if(width === undefined && height !== undefined){
                        //只限定高度
                        this.$message.error(`上传的图片的高度必须是${height}`);
                    }else if(width !== undefined && height === undefined){
                        //只限定宽度
                        this.$message.error(`上传的图片的宽度必须是${width}`);
                    }else{
                        this.$message.error(`上传的图片的大小必须是${width}*${height}`);
                    }
                    return Promise.reject();
                });
            }

            if (!isTypeAllow) {
                this.$message.error(type_error_message);
            }
            return isTypeAllow && isSize;
        },
        //处理上传成功事件
        handleSuccess(res, file){
            if(res.code == 200){
                this.url = res.data.url;
                this.$emit('imgUrl', this.url);
				this.$emit('clearImageValidate',true)
            }else{
                this.$message.error('上传服务出错!');
            }
        },
        //处理移除图片事件
        handleRemove(){
            this.url = '';
        },
        //处理上传图片出错
        handleError(err, file, fileList){
            this.$message.error('上传服务出错!');
        },
        //清除文件
        clearFiles(){
            this.$refs['upload'].clearFiles();
        }
    },
    watch:{
        imgUrl:{
            immediate: true,
            handler: function(newVal, oldVal){
                if(newVal !== this.url){
                    this.url = newVal;
                }
            }
        }
    }
}
</script>

<style lang="scss">
.oneupload {
    .el-upload{
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        position: relative;
    }
    .el-upload:hover {
        border-color: #409EFF;
    }
    .images-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .images {
        width: 178px;
        height: 178px;
        display: block;
    }
    .img{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }
    &.picture-card{
      .images-uploader-icon{
        width: 148px;
        height: 148px;
        line-height: 148px;
      }
    }
}
</style>
