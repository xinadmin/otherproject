<template>
	<el-dialog custom-class="print_popover" :visible.sync="dialogShowPop" width="40%" top='10px' @close="dialogPrintClose" :close-on-click-modal='false' v-loading='loading' element-loading-text="正在努力处理图片...">
        <div slot="title" class="type_box">
            <span class="head_title">药品分类：</span>
            <el-button :class="'classify'+index" type="text" size="mini" v-for="(item,index) in drugsCategory" :key="index" @click="handleNext(item)">{{ item }}</el-button>
        </div>
        <section id="printTest" class="main_right" ref="imageTofile" style="padding:10px 20px;">
            <div style="padding:17px;height:83px;background: #F3F3F3;display: flex;align-items: center;justify-content: center;">
                <p style="font-size: 18px;font-weight:bold;color:#293755;margin:0;">河源长安医院康越互联网医院处方笺</p>
            </div>
            <div style="padding:17px 0 0;">
                <div style="display: flex;flex-wrap: wrap;font-size: 12px;color:#293755;">
                    <p style="width:50%;margin:5px 0;"><span style="display:inline-block;width:60px;height:14px;text-align:justify;vertical-align: middle;overflow:hidden;color:#222;"> 处方编号<i style="display:inline-block;width:100%;"></i></span>： {{ info.id }}</p>
                    <p style="width:50%;margin:5px 0;"><span style="display:inline-block;width:60px;height:14px;text-align:justify;vertical-align: middle;overflow:hidden;color:#222;"> 开具日期<i style="display:inline-block;width:100%;"></i></span>： {{ info.lastUpdateTime | formatDate1 }}</p>
                    <p style="width:50%;margin:5px 0;"><span style="display:inline-block;width:60px;height:14px;text-align:justify;vertical-align: middle;overflow:hidden;color:#222;"> 姓 名<i style="display:inline-block;width:100%;"></i></span>： {{ info.patientName }}</p>
                    <p style="width:50%;margin:5px 0;"><span style="display:inline-block;width:60px;height:14px;text-align:justify;vertical-align: middle;overflow:hidden;color:#222;"> 性 别<i style="display:inline-block;width:100%;"></i></span>： {{ info.sex }}</p>
                    <p style="width:50%;margin:5px 0;"><span style="display:inline-block;width:60px;height:14px;text-align:justify;vertical-align: middle;overflow:hidden;color:#222;"> 年 龄<i style="display:inline-block;width:100%;"></i></span>： {{ info.age }}</p>
                    <p style="width:50%;margin:5px 0;"><span style="display:inline-block;width:60px;height:14px;text-align:justify;vertical-align: middle;overflow:hidden;color:#222;"> 联系电话<i style="display:inline-block;width:100%;"></i></span>： {{ info.phone }}</p>
                    <p style="width:50%;margin:5px 0;"><span style="display:inline-block;width:60px;height:14px;text-align:justify;vertical-align: middle;overflow:hidden;color:#222;"> 科室<i style="display:inline-block;width:100%;"></i></span>： {{ info.hospDeptName }}</p>
                    <p style="width:100%;margin:5px 0;line-height:16px;"><span style="display:inline-block;width:60px;height:14px;text-align:justify;vertical-align: top;color:#222;"> 临床诊断<i style="display:inline-block;width:100%;"></i></span>： {{info.inquiryResult}}</p>
                </div>
                <div style="border-bottom:1px solid #F3F3F3;">
                    <div style="padding:10px 0;font-size: 18px;font-weight:bold;color:#333;border-top:1px solid #F3F3F3;">RP:</div>
                    <div style="position:relative;
                        padding:10px 0;
                        display:flex;
                        align-items:center;
                        font-size: 12px;
                        color:#666;
                        border-top:1px solid #F3F3F3;
                        border-bottom:1px solid #F3F3F3;" 
                        v-for="(item,index) in presData" :key="index">
                        <span style="margin-right:30px;font-size:15px;color:#555;">{{ index+1 }}</span>
                        <div style="display: flex;flex-direction: column;align-items: flex-start;justify-content: center;">
                            <p style="display:inline-block;margin:0;line-height:20px;font-size:13px;font-weight:500;color:#555;">
                                {{ item.drugsName }}&nbsp;&nbsp;{{ item.standard }}
                                <span style="position:absolute;top:20px;transform:translateY(-50%);right:0px;">x {{ item.count }}{{ item.packUnit || '盒' }}</span>
                            </p>
                            <p style="display:inline-block;margin:0;line-height:20px;">Sig：{{ item.takeType }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.numberdays }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每次{{ item.dosage }}</p>
                            <p style="margin:0;line-height:20px;">{{ item.attention || '注意事项' }}</p>
                        </div>
                    </div>
                    <p style="font-size:12px;color:#293755;text-align:right;">总金额：<span style="display:inline-block;width:80px;border-bottom:1px solid #F3F3F3;text-align:center;">￥{{ totalPrice | price }}</span> 元</p>
                </div>
                <div style="padding:10px 0;font-size: 13px;color:#293755;">
                    <div style=" display: flex;flex-wrap: wrap;">
                        <p style="display: flex;align-items: center;justify-content: flex-start;width:50%;margin:4px 0;"><strong>医生：</strong>{{ info.doctorName }}</p>
                        <p style="display: flex;align-items: center;justify-content: flex-start;width:50%;margin:4px 0;">
                            <strong>电子签名：</strong>
                            <span style="display: flex;width:120px;height:50px;align-items: center;justify-content: center;background-size: cover;background-position: center;background-repeat: no-repeat;background-color: #ddd;overflow: hidden;">
                                <img style="max-height:100%;" :src="eleSignatureUrl" alt="[签名图片]">
                            </span>
                        </p>
                    </div>
                    <div style=" display: flex;flex-wrap: wrap;">
                        <p style="display: flex;align-items: center;justify-content: flex-start;width:50%;margin:4px 0;"><strong>药师：</strong>{{ info.auditPharName }}</p>
                        <p style="display: flex;align-items: center;justify-content: flex-start;width:50%;margin:4px 0;">
                            <strong>电子签名：</strong>
                            <span style="display: flex;align-items: center;width:120px;height:50px;justify-content: flex-start;background-size: cover;background-position: center;background-repeat: no-repeat;background-color: #ddd;overflow: hidden;">
                                <img style="max-height:100%;" :src="elecSignatureUrl" alt="[签名图片]">
                            </span>
                        </p>
                    </div>
                    <p style="display: flex;align-items: center;justify-content: flex-start;"><strong>核对 | 发药药师签名：</strong></p>
                </div>
                <p style="font-size: 12px;color:#666;">注：处方当日有效，且只能购买一次，失效后购买需要重新申请</p>
            </div>
        </section>
        <el-button type="primary" v-print="'#printTest'" size="small" style="margin-left:20px;">打印处方</el-button>
        <el-button type="primary" size="small" @click="toImage(true)" v-if="downloadFlag">下载处方</el-button>
        <!-- <el-button type="primary" size="small" @click="uploadUrl">上传处方图片</el-button> -->
	</el-dialog>
</template>
	
<script>
import html2canvas from 'html2canvas'
import commoncontroller from "@/controllers/commoncontrollers";
import controller from "@/controllers/diagnosiscontrollers";
import { formatDate1,price } from "@/utils/filters";

export default {
	name: "PrintPop",
    props:{
        showPrintPop:{
            required:true,
            type:Boolean
        },
        perId:{
            type:String
        },
        makeFlag:{
            type:Boolean
        },
        downloadFlag:{
            type:Boolean
        }
    },
	data() {
		return {
            loading:false,
            dialogShowPop:false,
            info:{},
            presData:[],
            eleSignatureUrl:'',    //医生签名
            elecSignatureUrl:'',   //药师签名
            uploadImg:'',
            imageArr:[],
            totalPrice:null,
            drugsCategory:[],
            len:8   //初始分类按钮数量
		}
	},
	mounted(){
        
    },
    watch:{
        showPrintPop(newVal,oldVal){
            this.dialogShowPop = newVal
            this.getDetailById()
            this.selectDrugsById()
            //从审核操作进入，同时生成并上传图片
            this.imageArr = [];     //重置图片列表
            if(this.makeFlag){    
                this.loading = true;
                let index = 0;      //初始按钮索引
                // 循环定时器
                let time = setInterval(()=>{
                    let classify = document.querySelector(".classify"+index);
                    classify.click();
                    index++;
                    setTimeout(()=>{
                        this.toImage(false)
                    },200)
                },1000);
                // 结束并清除循环
                let getLen = setTimeout(()=>{
                    let type = document.querySelector(".type_box");
                    this.len = type.getElementsByTagName('button').length;
                    let setTime = setTimeout(()=>{
                        console.log(this.len)
                        console.log(this.imageArr)
                        this.uploadUrl()
                        clearInterval(time)
                        clearTimeout(setTime)
                        clearTimeout(getLen)
                    },1400 * parseInt(this.len))
                },800)
            }
        }
    },
	methods:{
        // 关闭回调
		dialogPrintClose(){
            this.$emit('dialogPrintClose',false)
        },
        // 上传图片
        uploadUrl(){
            // this.toImage(false)
            this.uploadImg = this.imageArr.join()
            if(this.uploadImg==''){
                this.loading = false;
                this.$message.success('处方图片正在生成')
                this.dialogPrintClose()
            }else{
                let data = {
                    "id": this.perId,
                    "preImage": this.uploadImg
                }
                controller.temp(data).then(res => {
                    this.loading = false;
                    this.$message.success('处方图片上传成功！')
                    this.dialogPrintClose()
                    if(this.downloadFlag) this.$router.push({name:'Prescriptions'})
                })
            }
        },
        // 下载图片   flag为false时为下载处方图片
        toImage(flag){
            html2canvas(this.$refs.imageTofile,{
                backgroundColor:'#fff'
            }).then((canvas) => {
                let url = canvas.toDataURL('image/png');
                let formData = new FormData();
                formData.append("baseStr", url);
                commoncontroller.base64toFile(formData).then(res => {
                    // this.uploadImg = res.data.url
                    this.imageArr.push(res.data.url)
                    if(flag) window.open(res.data.url)
                })
            })
        },
        // 图片转base64
        imgToBase64(){
            if(this.info.eleSignature!==null&&this.info.eleSignature!==''){
                let formData = new FormData();  // 表单提交
                formData.append("imgURL", this.info.eleSignature);
                formData.append("imgType", 1);
                commoncontroller.imgToBase64(formData).then(res => {
                    this.eleSignatureUrl = res.data
                })
            }
        },
        // 图片转base64
        elecImgToBase64(){
            if(this.info.elecSignature!==null&&this.info.elecSignature!==''){
                let formData = new FormData();   // 表单提交
                formData.append("imgURL", this.info.elecSignature);
                formData.append("imgType", 1);
                commoncontroller.imgToBase64(formData).then(res => {
                    this.elecSignatureUrl = res.data
                })
            }
        },
        // 获取
        getDetailById(){
            controller.selectOneStorePreDetailById({'id':this.perId}).then(res => {
                // if(res.data.length!==0&&res.data[0]!==null) this.formateData(res.data)
                if(res.data.length!==0&&res.data[0]!==null) this.info = res.data[0] ;
                this.imgToBase64()
                this.elecImgToBase64()
                
            })
        },
        // 药品分类
        handleNext(name){
            this.selectDrugsById(name,true);
        },
        // 根据处方id 查询药品信息
        selectDrugsById(name,flag=false){
            this.totalPrice = 0 ;
            this.drugsCategory = [];
            let drugsData = new Object(),
                drugsArr = new Array(),
                pageSize = 5;   //显示药品数量
            controller.selectDrugsById({'id':this.perId}).then(res => {
                if(res.data){
                    // 药品分类,数量超过5分单
                    Object.keys(res.data).forEach(key => {
                        let name = key;
                        let arr = res.data[key];
                        let num = Math.ceil( res.data[key].length / pageSize );
                        for (let i=0; i < num; i++) {
                            drugsArr = arr.splice(0,pageSize);
                            key = num>1 && i>0 ? name+'(' + parseInt(i)+')' : name;
                            drugsData[key] = drugsArr;
                            this.drugsCategory.push(key)
                        }
                    })
                    // 初始化药品
                    if(!flag && drugsData.OTC){    
                        this.presData = drugsData.OTC;
                    }else if(!flag && drugsData.RX){
                        this.presData = drugsData.RX;
                    }else if(!flag && drugsData.中药饮片){
                        this.presData = drugsData.中药饮片;
                    }else if(!flag && drugsData.中药注射剂){
                        this.presData = drugsData.中药注射剂;
                    }else if(!flag){
                        Object.keys(drugsData).forEach(key => {
                            this.presData = drugsData[key]
                            console.log(this.presData)
                        })
                    }
                    //点击分类
                    if(flag){   
                        this.presData = drugsData[name];
                    }
                    // 总金额
                    Object.keys(drugsData).forEach(key => {
                        drugsData[key].forEach(item => {
                            this.totalPrice += parseFloat(item.total)
                        })
                    })
                }
            })
        },
        // 格式化
        formateData(data){
            const { id,inquiryResult,patientName,phone,sex,age,lastUpdateTime,auditStatus,doctorName,auditPharName,elecSignature,eleSignature } = data[0]
                this.info = {
                    id:id,
                    inquiryResult:inquiryResult,
                    patientName:patientName,
                    phone:phone,
                    sex:sex,
                    age:age,
                    lastUpdateTime:lastUpdateTime,
                    auditStatus:auditStatus,
                    doctorName:doctorName,
                    auditPharName:auditPharName,
                    elecSignature:elecSignature,
                    eleSignature:eleSignature
                }
        }
	}
};
</script>

<style rel="stylesheet/scss" lang="scss">

.print_popover .el-dialog__title{ font-size: 16px; }
.print_popover .el-dialog__body{ padding:10px 0px 20px; }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.print_popover{
    .head_title{
        margin-right:10px;
        font-size: 12px;
        color:#444;
    }
    .main_right{
        min-height:600px;
        &_head{
            padding:17px;
            height:83px;
            font-size: 16px;
            background: #F3F3F3;
            p{margin: 0;}
            .head_sign{
                color:#293755;
                &>span{font-size: 10px;}
            }
            // .head_status{color:#FF7B7B;}
            // .success_status{color:#42b983;}
        }
        .pres_box{
            padding:17px;
            .pres_user{
                display: flex;
                flex-wrap: wrap;
                font-size: 12px;
                color:#293755;
                p{width:50%;margin:8px 0;}
            }
            .pres_result{
                &_title{
                    font-size: 13px;
                    color:#293755;
                }
                &_desc{
                    font-size: 12px;
                    color:#5E7388;
                    line-height: 16px;
                }
            }
            .pres_info{
                border-bottom:1px solid #F3F3F3;
                &_head{
                    margin:20px 0 5px;
                    font-size: 20px;
                    color:#293755;
                }
                &_item{
                    padding:10px 0;
                    font-size: 12px;
                    color:#293755;
                    height:58px;
                    border-top:1px solid #F3F3F3;
                    p{margin:0;}
                    span.size{width:auto;}
                    span:nth-child(1){
                        display: inline-block;
                        width:180px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis; 
                    }
                }
            }
            .hospital_info{
                padding:20px 0;
                font-size: 13px;
                color:#293755;
                .audit_list{
                     display: flex;
                    flex-wrap: wrap;
                }
                p{
                    width:50%;
                    margin:8px 0;
                }
            }
            p.refused_info{
                font-size: 12px;
                color:#293755;
            }
        }
    }
}
	
</style>
