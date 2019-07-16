<template>
    <div class="create-container">
        <section>
            <p class="rent_title">租赁合同</p>
            <div class="rent_wrap">
                <el-form ref="contractform" :model="contractform" label-width="135px" size="small">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="合作主体：" prop="subject" :rules="[{ required: true, message: '请输入合作主体', trigger: 'blur' }]">
                                <el-input v-model="contractform.subject" size="small" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="租赁合同号：" prop="number" :rules="[{message: '请输入租赁合同号', trigger: 'blur' }]">
                                <el-input v-model="contractform.number" maxlength="100" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合同类型:" prop="type"  :rules="[{ required: true, message: '请输入合同类型', trigger: 'blur' }]">
                                <!--<el-input v-model="contractform.type" size="small" disabled></el-input>-->
                                <el-select v-model="contractform.type"  size="small">
                                    <el-option label="续签合同" value='续签合同'></el-option>
                                    <el-option label="租聘合同" value='租聘合同'></el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="承租方：" prop="lessee" :rules="[{ required: true, message: '请输入承租方', trigger: 'blur' }]">
                                <el-input v-model="contractform.lessee" maxlength="100" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="承租方电话：">
                                <el-input v-model="contractform.lesseeMobile" maxlength="20" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="签约代表:">
                                <el-input v-model="contractform.signPerson" maxlength="100" size="small"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="租赁场地:">
                                <el-input v-model="contractform.rentalSite" maxlength="100" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合同签订时间：">
                                <el-date-picker
                                        v-model="contractform.signCreateTime"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="请选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合同开始时间：">
                                <el-date-picker
                                        v-model="contractform.startTime"
                                        type="date"
                                        value-format="timestamp"
                                        :picker-options="startTimeOption"
                                        placeholder="请选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="合同结束时间:" prop="endTime">
                                <el-date-picker
                                        v-model="contractform.endTime"
                                        type="date"
                                        value-format="timestamp"
                                        :picker-options="expireTimeOption"
                                        placeholder="请选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="租金递增时间:" prop="rentRaiseTime">
                                <el-date-picker
                                        v-model="contractform.rentRaiseTime"
                                        type="date"
                                        value-format="timestamp"
                                        :picker-options="expireTimeOption"
                                        placeholder="请选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保证金：">
                                <el-input v-model="contractform.deposit" maxlength="20" type="number" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="共摊费：">
                                <el-input v-model="contractform.sharingFee" maxlength="20" type="number" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="月租金额：">
                                <el-input v-model="contractform.monthlyRent" maxlength="20" type="number" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="8">-->
                        <!--<el-form-item label="结算方式描述:">-->
                        <!--<el-input v-model="contractform.settleWayRemarks" maxlength="100" size="small"></el-input>-->
                        <!--</el-form-item>-->
                        <!--</el-col>-->
                        <el-col :span="8">
                            <el-form-item label="租赁合同负责人：">
                                <el-input v-model="contractform.createPerson" maxlength="100" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </section>
        <!-- <section v-if="stopFlag"> -->
        <section>
            <p class="stop_title">终止合同</p>
            <div class="stop_wrap">
                <el-form ref="contractStopForm" :model="contractform" label-width="140px" size="small">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="终止合同号:" prop="stopNumber">
                                <el-input v-model="contractform.stopNumber" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="终止合同时间:">
                                <el-date-picker
                                        v-model="contractform.stopTime"
                                        type="date"
                                        value-format="timestamp"
                                        :picker-options="expireTimeOption"
                                        placeholder="请选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="搬出场地时间:">
                                <el-date-picker
                                        v-model="contractform.moveOutTime"
                                        type="date"
                                        value-format="timestamp"
                                        :picker-options="expireTimeOption"
                                        placeholder="请选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="是否结清租金余款:">
                                <el-select v-model="contractform.isSettleBalance" size="small">
                                    <el-option label="是" value='1'></el-option>
                                    <el-option label="否" value='2'></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="是否退保证金:">
                                <el-select v-model="contractform.isReturnDeposit" size="small">
                                    <el-option label="是" value='1'></el-option>
                                    <el-option label="否" value='2'></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="终止合同负责人:">
                                <el-input v-model="contractform.stopPerson" maxlength="100" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </section>
        <section class="file">
            <p class="stop_title">合同文件</p>
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="uploadUrl"
                    :show-file-list="true"
                    :file-list="contractform.files"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :on-error="handleError"
                    :auto-upload="true">
                <el-button slot="trigger" size="mini" type="text">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">点击上传合同附件</div>
            </el-upload>
        </section>
        <section class="bottom">
            <el-button type="primary" size="small" @click="createOrUpdate">保 存</el-button>
            <el-button type="primary" size="small" @click="cancel">返 回</el-button>
        </section>
    </div>
</template>

<script>
    import controller from "@/controllers/contractcontrollers";
    import { uploadUrl, Headers} from '@/controllers/uploadUrl'
    import { formatDate } from "@/utils/filters";

    export default {
        name: "Create",
        data() {
            return {
                id:'',
                stopFlag:false,
                fileList: [],
                contractform:{
                    contractType:1,
                    subject:'共享空间',
                    number:'',
                    type:'请选择',
                    lessee:'',
                    lesseeMobile:'',
                    signPerson:'',
                    rentalSite:'',
                    signCreateTime:'',
                    startTime:'',
                    endTime:'',
                    monthlyRent:'',
                    deposit:'',
                    sharingFee:'',
                    createPerson:'',
                    settleWayRemarks:'',
                    searchType:"",
                    stopNumber:'',
                    stopTime:'',
                    moveOutTime:'',
                    isSettleBalance:'',
                    isReturnDeposit:'',
                    stopPerson:'',
                    rentRaiseTime:'',
                    files:[]
                },
                uploadUrl,
                //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
                startTimeOption:{
                    disabledDate:date => {
                        let signCreateTime = this.contractform.signCreateTime
                        return date.getTime() <= signCreateTime
                    }
                },
                expireTimeOption: {
                    disabledDate:date => {
                        let start = this.contractform.startTime
                        return date.getTime() <= start
                    }
                }
            }
        },
        created() {
            this.initContract()
        },
        watch: {

        },
        computed: {

        },
        methods: {
            // 合同详情
            initContract(){
                const type = this.$route.query.type;
                if(type == 2){
                    this.id = this.$route.query.id
                    this.stopFlag = true
                    controller.getDetail({'id':this.id}).then(res => {
                        this.contractform = res.data
                        if(this.contractform.isSettleBalance!==null) this.$set(this.contractform,'isSettleBalance',String(res.data.isSettleBalance))
                        if(this.contractform.isReturnDeposit!==null) this.$set(this.contractform,'isReturnDeposit',String(res.data.isReturnDeposit))
                    })
                }
            },
            //处理上传成功事件
            handleSuccess(res, file,fileList){
                if(res.code == 200){
                    this.contractform.files.push({
                        url:res.data,
                        name:file.name
                    })
                }
            },
            //处理移除图片事件
            handleRemove(file,fileList){
                this.contractform.files = this.contractform.files.filter(item => {
                    if(item.url!==file.url){
                        return true
                    }
                })
            },
            //处理上传图片出错,上传图片超过10M警告提示
            handleError(err, file, fileList){
                file.size > 10485760 ? this.$message.warning('上传文件不能超过10M!') : this.$message.error('上传服务出错!');
            },
            // 新增或编辑合同
            createOrUpdate(){
                const type = this.$route.query.type;
                const type_other =this.contractform.type;
                if(this.contractform.deposit!="") {
                    if (parseFloat(this.contractform.deposit)<0) {
                        alert("请输入正确保证金金额");
                        return  false;
                    }
                }
                if(this.contractform.sharingFee!="") {
                    if (parseFloat(this.contractform.sharingFee)<0) {

                        alert("请输入正确共摊金金额");
                        return  false;
                    }
                }
                if(this.contractform.monthlyRent!="") {
                    if (parseFloat(this.contractform.monthlyRent)<0) {

                        alert("请输入正确月租金额");
                        return  false;
                    }
                }
                this.$refs['contractform'].validate().then(formFlag=>{
                    this.$refs['contractStopForm'].validate().then(stopFormFlag=>{
                        if(formFlag && stopFormFlag){
                            if(type == 1){
                                if(type_other=="请选择"){
                                    alert("请选择合同类型");
                                    return false;


                                }else {
                                    controller.saveOrUpdate(this.contractform).then(res => {
                                        this.$message.success('新增合同成功！')
                                        this.cancel()
                                    })
                                }
                            }else if(type == 2){
                                this.$set(this.contractform,'id',this.id)
                                controller.saveOrUpdate(this.contractform).then(res => {
                                    this.$message.success('编辑合同成功！')
                                    this.cancel()
                                })
                            }
                        }
                    })
                })
            },
            // 返回
            cancel(){
                this.$router.push({name:'Contract'})
            },

        }
    }
</script>

<style>
    .create-container .rent_wrap .el-form .el-row .el-form-item__label,
    .create-container .stop_wrap .el-form .el-row .el-form-item__label{text-align: right;}
    .create-container .stop_wrap .el-form .el-row .el-form-item__content .el-select,
    .create-container .el-form .el-row .el-form-item__content .el-date-editor{width:100%;}
    .create-container .file .upload-demo{width:25%;}

</style>

<style lang="scss" scoped>

    .create-container{
        margin: 10px;
        padding: 17px;
        border-radius: 2px;
        background: #fff;
        .rent_title,.stop_title{
            margin-bottom:10px;
            padding-bottom:10px;
            color:#666;
            border-bottom:1px solid #e2e2e2;
        }
        .file{
            padding-bottom:20px;
            border-bottom:1px solid #e2e2e2;
        }
        .bottom{
            margin-top:10px;
        }
    }

</style>
