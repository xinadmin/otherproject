<template>
    <div class="pre-container">
        <el-dialog custom-class="sign_popover" title="处方详情" :visible.sync="dialogShowPop" width="52%" top="30px" @close="dialogClose">
            <div>
                <section>
                    
                    <section class="head_title flex_center_between">
                        <span>处方明细</span>
                        <div v-if="drugsCategory.length!==0">
                            <span class="head_category">药品分类：</span>
                            <el-button type="text" size="mini" v-for="(item,index) in drugsCategory" :key="index" @click="handleNext(item)">{{ item }}</el-button>
                        </div>
                    </section>
                    <el-table :data="presData" :stripe="true" size="small">
                        <el-table-column label="序号" prop="index" width="50px" align="left"/>
                        <el-table-column label="药品名称" prop="drugsName" align="left"/>
                        <el-table-column label="药品规格" prop="standard" width="100px" align="left"/>
                        <el-table-column label="用法" prop="takeType" width="50px" align="left"/>
                        <el-table-column label="数量" prop="count" width="50px" align="left"/>
                        <el-table-column label="频率" prop="numberdays" width="80px" align="left"/>
                        <el-table-column label="每次用量" prop="dosage" width="70px" align="left"/>
                        <el-table-column label="用药周期" prop="medicationCycle" width="70px" align="left"/>
                        <el-table-column label="备注" prop="attention" width="70px" align="left"/>
                    </el-table>
                </section>
                <section class="margin_top_bottom20">
                    <p class="head_title">诊断信息</p>
                    <div class="info_main">
                        <p><span class="info_title">现病史</span>： {{ info.historyNow }}</p>
                        <p><span class="info_title">既往史</span>： {{ info.history }}</p>
                        <p><span class="info_title">诊断类型</span>： 西医诊断</p>
                        <p><span class="info_title">诊断结果</span>： {{ info.inquiryResult }}</p>
                        <p><span class="info_title">处理意见</span>： {{ info.note }}</p>
                        <p><span class="info_title">诊断医师</span>： {{ info.doctorName }}</p>
                        <p><span class="info_title">科室</span>： {{ info.hospDeptName }}</p>
                    </div>
                    <!-- <div class="no_data">
                        暂无数据
                    </div> -->
                </section>
                <section v-if="info.auditStatus==3">
                    <p class="head_title">操作日志</p>
                    <el-table :data="handleLogData" border size="small">
                        <el-table-column label="药师" prop="auditPharName" width="100px" align="center"/>
                        <el-table-column label="操作" prop="auditStatus" align="center">
                            <template slot-scope="scope" v-if="scope.row.auditStatus==2">审核通过</template>
                            <template slot-scope="scope" v-if="scope.row.auditStatus==3">审核不通过 原因：{{ scope.row.reason }}</template>
                        </el-table-column>
                        <el-table-column label="时间" prop="lastUpdateTime" align="center">
                            <template slot-scope="scope">{{ scope.row.lastUpdateTime | formatDate }}</template>
                        </el-table-column>
                    </el-table>
                </section>
                
                <!-- 审核处方 -->
                <section class="audit_box" v-if="isAudit">
                    <p class="head_title">药师意见</p>
                    <el-form :model="form" ref="form" label-width='100px' style="padding-right:50%;">
                        <el-form-item prop='preId' label='药师姓名：' :rules="[{ required: true, message: '请选择药师', trigger: 'change' }]">
                            <el-select v-model="form.preId" placeholder="请选择审核药师" size="small" @change="selectPreName">
                                <el-option
                                    v-for="item in preList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop='elecPassword' label='密码：' :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                            <el-input v-model="form.elecPassword" type="password" placeholder="帐号密码" size="small"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" slot="label" size="small" @click="handleAuditDoctor('2')">审&nbsp;核&nbsp;通&nbsp;过</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" slot="label" size="small" @click="handleAuditDoctor('3')">审核不通过</el-button>
                            <el-input v-model="form.reason" placeholder="若不通过请输入不通过原因" size="small" clearable></el-input>
                        </el-form-item>
                    </el-form>
                </section>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import controller from "@/controllers/diagnosiscontrollers";

export default {
    name: 'Prescription',
    props:{
        showPop:{
            required:true,
            type:Boolean
        },
        id:{
            type:String
        },
        isAudit:{
            required:true,
            type:Boolean
        }
    },
    data() {
        return {
            dialogShowPop:false,
            preDetail:[],
            presData:[],
            handleLogData:[],
            info:{},
            preList:[],
            form:{
                preName:'',
                preId:'',
                elecPassword:'',
                reason:'',
                mechanical:'0',
                storeId:''
            },
            drugsCategory:[]
        }
    },
    computed: {},
    created(){
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        this.form.mechanical = userInfo.mechanical == null ? '0' : userInfo.mechanical
        this.form.storeId = userInfo.storeId == null ? '0' : userInfo.storeId
    },
    watch:{
        showPop(newVal,oldVal){
            this.dialogShowPop = newVal
            this.getDetailById()
            this.getPharmacistByStore()
            this.selectDrugsById()
            if(this.isAudit) {
                this.$nextTick(() => {
                    this.$refs['form'].resetFields();
                    this.form.reason = ''
                })
            }
        }
    },
    methods:{
        // 关闭
        dialogClose(){
            this.$emit('closeDialog',false)
        },
        // 获取
        getDetailById(){
            let itemArr = []
            this.form.preName = this.form.preId = this.form.elecPassword = ''
            controller.selectOneStorePreDetailById({'id':this.id}).then(res => {
                if(res.data.length!==0&&res.data[0]!==null) {
                    this.formateData(res.data,itemArr)
                    this.preDetail = res.data
                }
            })
            this.handleLogData = itemArr
        },
        // 药品分类
        handleNext(name){
            this.selectDrugsById(name,true)
        },
        // 根据处方id 查询药品信息
        selectDrugsById(name,flag=false){
            controller.selectDrugsById({'id':this.id}).then(res => {
                this.drugsCategory = [];
                Object.keys(res.data).forEach(key => {
                    this.drugsCategory.push(key)
                })
                if(!flag && res.data.OTC){
                    this.presData = res.data.OTC;
                }else if(!flag && res.data.RX){
                    this.presData = res.data.RX;
                }else if(!flag && res.data.中药饮片){
                    this.presData = res.data.中药饮片;
                }else if(!flag && res.data.中药注射剂){
                    this.presData = res.data.中药注射剂;
                }
                if(flag){   //点击分类
                    this.presData = res.data[name];
                }
                // 序列号
                if(this.presData !== []){
                    this.presData.forEach((item,index) => {
                        this.$set(item,'index',index+1)
                    })
                }
            })
        },
        // 药师列表
        getPharmacistByStore(){
            let data = {
                'mechanical':this.form.mechanical,
                'storeId':this.form.storeId
            }
            controller.pharmacistByStore(data).then(res => {
                this.preList = res.data
            })
        },
        selectPreName(val){
            this.preList.forEach(item => {
                if(item.id == val){
                    this.form.preName = item.name
                    this.form.storeId = item.store
                }
            })
        },
        // 审核
        handleAuditDoctor(auditCode){
            this.$refs['form'].validate().then(val=>{
                const { id,lastUpdateTime } = this.preDetail[0]
                this.$set(this.form,'auditStatus',auditCode)
                this.$set(this.form,'id',id)
                this.$set(this.form,'lastUpdateTime',lastUpdateTime)
                if(auditCode=='3' && this.form.reason==''){
                    this.$message.warning('请输入审核不通过原因！'); 
                }else{
                    controller.preAudit(this.form).then(res => {
                        this.$message.success('操作成功！'); 
                        this.$emit('closeDialog',false)
                        if(auditCode==='2') this.$emit('makeImage',this.id,true)
                    })
                }
                
            })
        },
        // 格式化
        formateData(data,itemArr){
            const { auditStatus,historyNow,history,hospDeptName,inquiryResult,note,doctorName } = data[0]
            this.info = {
                auditStatus:auditStatus,
                historyNow:historyNow,
                history:history,
                hospDeptName:hospDeptName,
                inquiryResult:inquiryResult,
                note:note,
                doctorName:doctorName
            }
            data.forEach((item,index) => {
                const { auditPharName,reason,auditStatus,lastUpdateTime } = item
                let itemObj = {
                    auditPharName:auditPharName,
                    reason:reason,
                    auditStatus:auditStatus,
                    lastUpdateTime:lastUpdateTime
                }
                itemArr.push(itemObj)
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">

.pre-container .el-dialog__title{ font-size: 16px; }
.pre-container .el-dialog__body{ padding:0 20px 20px; }
.pre-container .audit_box .el-select{width:100%; }
.pre-container .audit_box .el-form-item{ margin-bottom:15px; }
// .pre-container .audit_box .el-form-item__content{ display: flex;line-height: 30px; }
.pre-container .audit_box .el-form-item__label{ text-align: left; }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.pre {
    &-container {
        .head_title{
            margin:0 0 10px;
            padding:10px 10px;
            border-bottom:1px solid #dedede;
            color:#111;
            .head_category{
                font-size: 12px;
                color:#444;
            }
        }
        .info_main{
            padding:0 10px;
            font-size: 13px;
            color:#444;
            .info_title{
                display: inline-block;
                width:60px;
                height:16px;
                color:#111;
                text-align: justify;
                vertical-align: middle;
                overflow: hidden;
                &::after{
                    content: "";
                    display: inline-block;
                    width: 100%;
                }
            }
            
        }
        .no_data{
            height:60px;
            line-height: 60px;
            color: #909399;
            font-size: 12px;
            text-align: center;
        }
        .audit_box{
            margin-top:20px;
            &>div{width:60%;}
            span.audit_left{
                display: inline-block;
                width:100px;
            }
        }
    }
}
</style>
