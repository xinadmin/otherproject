<template>
    <div class="contract-container" >
        <el-row :gutter="20">
            <el-col class="flex_center_between" :span="5">
                <el-input placeholder="请输入内容" maxlength="18" v-model="searchOne" size="small">
                    <el-select
                            class="foneSel"
                            v-model="doctorType"
                            slot="prepend"
                            placeholder="请选择"
                            size="small">
                        <el-option key="1" label="合同编号" value="1"></el-option>
                        <el-option key="2" label="合同号" value="2"></el-option>
                    </el-select>
                </el-input>
            </el-col>
            <el-col class="flex_center_between" :span="5">
                <span class="select_title">合同状态:</span>
                <el-select v-model="status" placeholder="请选择状态" size="small">
                    <el-option label="全部" value=''></el-option>
                    <el-option label="生效" value='1'></el-option>
                    <el-option label="到期" value='3'></el-option>
                    <el-option label="租金递增" value='4'></el-option>
                    <el-option label="即将到期" value='2'></el-option>

                </el-select>
            </el-col>
            <el-col class="flex_center_between" :span="5">
                <span class="select_title">租赁场地:</span>
                <el-input placeholder="请输入承租方" v-model="rentalSite" size="small"/>
            </el-col>
            <el-col class="flex_center_between" :span="5">
                <span class="select_title">承租方:</span>
                <el-input placeholder="请输入承租方" v-model="lessee" size="small"/>
            </el-col>
            <el-col class="text_center" :span="4">
                <el-button type="primary" size="mini" @click="handleSearch">查 询</el-button>
                <el-button type="text" size="mini" @click="handleReset">重置</el-button>
            </el-col>
        </el-row>
        <p class="soon_num"><span class="el-icon-warning"></span>&nbsp;&nbsp;{{ soonOverdue }}份合同即将到期&nbsp;&nbsp;<span @click="coinSelect" class="blue">{{ rentRaise }}</span>份合同即将租金递增</p>
        <div class="create_box">
            <router-link to="/tiezi/Fatie">
            <el-button type="primary" size="mini">发帖</el-button>
            </router-link>
            <el-button type="primary" size="mini" @click="handleDelete">删除</el-button>
            <el-button type="primary" size="mini" @click="handleExport">导出</el-button>
        </div>
        <section class="wrap">
            <el-table border :data="contractList" size="small" style="margin-top:10px;width: 100%;">
                <el-table-column width="40px" prop="checked" align="center" :render-header="customFieldColumn">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.checked" @change="handleChekck(scope.row.id,scope.row.checked)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="合同状态" prop="status" align="center"    >

                    <template slot-scope="scope">
                        <div v-if="scope.row.status==='即将到期'" class="red">{{ scope.row.status }}</div>
                        <div v-else-if="scope.row.status==='租金递增'" class="red">{{ scope.row.status }}</div>
                        <div v-else>{{ scope.row.status }}</div>
                    </template>

                </el-table-column>
                <el-table-column label="合同主体" prop="subject"/>
                <el-table-column label="合同编号" prop="id" width="130px"/>
                <el-table-column label="合同号" prop="number"/>
                <el-table-column label="合同类型" prop="type"/>
                <el-table-column label="承租方" prop="lessee"/>
                <el-table-column label="承租方联系电话" prop="lesseeMobile" width="110px"/>
                <el-table-column label="签约代表" prop="signPerson"/>
                <el-table-column label="租赁场地" prop="rentalSite"/>
                <el-table-column label="合同签订日期" prop="signCreateTime" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.signCreateTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="合同开始时间" prop="startTime" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.startTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="合同结束时间" prop="endTime" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.endTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="月租金额" prop="monthlyRent"/>

                <el-table-column label="保证金" prop="deposit"/>
                <el-table-column label="共摊费" prop="sharingFee"/>
                <el-table-column label="负责人" prop="createPerson"/>
                <el-table-column label="租金递增时间" prop="rentRaiseTime" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.rentRaiseTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="终止合同时间" prop="stopTime" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.stopTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="搬出场地时间" prop="moveOutTime" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.moveOutTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="是否结清租金余款" prop="isSettleBalance" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.isSettleBalance=='1'?'是':'否' }}
                    </template>
                </el-table-column>
                <el-table-column label="是否退保证金" prop="isReturnDeposit" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.isReturnDeposit=='1'?'是':'否' }}
                    </template>
                </el-table-column>
                <el-table-column label="创建人" prop="createName"/>
                <el-table-column label="创建时间" prop="createTime" width="90px">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | formatDate }}
                    </template>
                </el-table-column>
                <el-table-column label="更新人" prop="updateName" width="100px"></el-table-column>
                <el-table-column label="更新时间" prop="updateTime" width="100px">
                    <template slot-scope="scope">
                        {{ scope.row.updateTime | formatDate }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="100px" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
                        <!-- <el-button type="text" size="mini" @click="handleDelete(scope.row.id)">删除</el-button> -->
                        <!-- <el-button type="text" size="mini" @click="handleExport(scope.row.id)">导出</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <section class="text_right">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="searchForm.pageNum"
                    :page-sizes="[10, 20, 50, 100,200]"
                    :page-size="searchForm.pageSize"
                    layout="total,sizes, prev, pager, next"
                    :total="total"
            ></el-pagination>
        </section>
    </div>
</template>

<script>
    import { formatDate } from "@/utils/filters";

    export default {
        name: "Contract",
        data() {
            return {
                allChecked:false,
                doctorType: "1",
                searchOne:"",
                searchForm:{
                    id:'',
                    number:'',
                    ids:[],
                    lessee:'',
                    status:'',
                    pageNum:1,
                    pageSize:10,
                    searchEndTime:'',
                    searchStartTime:'',
                    rentalSite:"",
                    contractType:1,
                    searchType:0
                },
                searchForms:{
                    id:'',
                    number:'',
                    ids:[],
                    lessee:'',
                    status:'',
                    pageNum:1,
                    pageSize:10,
                    searchEndTime:'',
                    searchStartTime:'',
                    rentalSite:"",
                    contractType:1,
                    searchType:0
                },
                id:'',
                lessee:'',
                status:'',
                total:0,
                totalCoin:0,
                rentalSite:"",
                soonOverdue:0,
                rentRaise:0,
                contractList:[],
                contractListCoin:[],
                dialogShowPop:false,
                dialogVisible:false,
                contractType:1,
                activeName:"",
                clickType:0

            }
        },
        created() {
            this.getContractList();
            this.getStatusCount();
        },
        watch: {
            doctorType(newVal, oldVal) {
                if (newVal) {
                    this.searchOne = this.searchForm.id = this.searchForm.number = "";
                }
            }
        },
        computed: {

        },
        methods: {
            customFieldColumn (h, { column, $index }) {
                return h(
                    'el-checkbox',
                    {
                        on:{
                            change:() => {
                                this.allChecked = !this.allChecked;
                                if(this.allChecked){
                                    this.contractList.forEach(item => {
                                        item.checked = true
                                    })
                                    this.searchForm.ids = this.contractList.map(item => {
                                        return item.id
                                    })
                                }else{
                                    this.contractList.forEach(item => {
                                        item.checked = false
                                    })
                                    this.searchForm.ids = []
                                }
                            }
                        },
                        props:{
                            value:this.allChecked
                        }
                    })
            },
            // 多选
            handleChekck(val,checked){
                if(checked){
                    this.searchForm.ids.push(val)
                }else{
                    this.searchForm.ids = this.searchForm.ids.filter(item => {
                        if(item!==val){
                            return true
                        }
                    })
                }
                // 勾选状态
                let notAllCheck = this.contractList.every(item => {
                    return item.checked == true
                })
                notAllCheck ? this.allChecked = true : this.allChecked = false
            },
            // 查询
            handleSearch(){
                this.allChecked = false;
                this.searchForm.ids = []
                this.clickType=0;
                if(this.doctorType=='1'){
                    this.$set(this.searchForm,'id',this.searchOne);
                    this.$set(this.searchForm,'number',"");
                }else {
                    this.$set(this.searchForm,'number',this.searchOne);
                    this.$set(this.searchForm,'id',"");
                }
                this.$set(this.searchForm,'searchType',0);
                this.$set(this.searchForm,'lessee',this.lessee);
                this.$set(this.searchForm,'status',this.status);
                this.$set(this.searchForm,'rentalSite',this.rentalSite);
                this.$set(this.searchForm,'pageNum',1);
                this.getContractList()
            },
            // 租金递增,即将到期列表

            // 租金递增列表
            coinSelect(){
                this.searchForm.ids = []
                this.$set(this.searchForm,'id','');
                this.$set(this.searchForm,'number','');
                this.$set(this.searchForm,'searchType',0);
                this.$set(this.searchForm,'status',4);
                this.$set(this.searchForm,'lessee',this.lessee);
                this.$set(this.searchForm,'rentalSite',this.rentalSite);
                this.$set(this.searchForm,'pageNum',1);
                this.getContractList()
            },
            // 重置
            handleReset(){
                this.searchForm = {
                    id:'',
                    ids:[],
                    lessee:'',
                    status:'',
                    pageNum:1,
                    pageSize:10,
                    searchEndTime:'',
                    searchStartTime:'',
                    contractType:"1",
                    searchType:0
                }
                this.id = ''
                this.lessee = ''
                this.status = ''
                this.searchOne=''
                this.rentalSite=''
            },
            // 合同列表
            getContractList(){
                // controller.contractList(this.searchForm).then(res => {
                //     this.contractList = res.data.records
                //     this.total = parseInt(res.data.total)
                //     this.contractList = this.contractList.map(item => {
                //         return {
                //             checked:false,
                //             ...item
                //         }
                //     })
                // })
            },
            // 列表：租金递增，即将到期
            getcontractListCoins(){
                this.$set(this.searchForm,'searchType',1);
                controller.contractList(this.searchForm).then(res => {
                    this.contractList = res.data.records
                    this.total = parseInt(res.data.total)
                    this.contractList = this.contractList.map(item => {
                        return {
                            checked:false,
                            ...item
                        }
                    })
                })
            },
            // 弹窗列表：租金递增，即将到期
            getcontractListCoin(){
                this.$set(this.searchForms,'searchType',1);
                // controller.contractList(this.searchForms).then(res => {
                //     this.contractListCoin = res.data.records
                //     this.totalCoin = parseInt(res.data.total)
                //     this.contractListCoin = this.contractListCoin.map(item => {
                //         return {
                //             checked:false,
                //             ...item
                //         }
                //     })
                // })
            },
            // 合同状态总数
            getStatusCount(){
            //     controller.statusCount({'contractType':this.contractType}).then(res => {
            //     this.soonOverdue = res.data.soonOverdue;
            //     this.rentRaise = res.data.rentRaise;
            //     if(this.rentRaise>0|| res.data.soonOverdue> 0 ){
            //         let tipTime=localStorage.getItem("noTipTime");
            //         if(tipTime){
            //             let oldMonth=tipTime.split(":")[0];
            //             let oldDay=tipTime.split(":")[1];
            //             let date = new Date();
            //             let month = date.getMonth() + 1;
            //             let strDate = date.getDate();
            //             if(oldMonth<month || oldDay<strDate){
            //                 this.dialogShowPop=true;
            //                 this.getcontractListCoin();
            //                 localStorage.removeItem("noTipTime");
            //             }else {
            //                 this.dialogShowPop = false;
            //             }
            //         }else {
            //             this.dialogShowPop = true;
            //             this.getcontractListCoin();
            //         }
            //     }
            //
            // })
        },
            // 删除
            handleDelete(){
                if(this.searchForm.ids.length==0){
                    this.$message.warning('请选择删除对象')
                    return
                }
                this.$confirm("确定删除数据？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(()=>{
                    controller.delete(this.searchForm.ids).then(res => {
                        this.$message.success('删除成功！')
                        this.getContractList()
                        this.$router.push({name:'Contract',query:{timestamp:new Date().getTime()}})
                    })
                }).catch(() => {});
            },
            // 导出
            handleExport(val){
                // if(this.searchForm.ids.length==0){
                //     this.$message.warning('请选择导出对象')
                //     return
                // }
                // controller.export(this.searchForm).then(res => {
                //     const aLink = document.createElement("a");
                //     let blob = new Blob([res], {type: "application/vnd.ms-excel;charset=utf-8"})
                //     aLink.href = URL.createObjectURL(blob)
                //     aLink.setAttribute('download', this.contractList[0].subject + new Date().getTime() + '.xlsx') // 设置下载文件名称
                //     aLink.click()
                //     document.body.appendChild(aLink)
                //     this.$message.success('导出成功！')
                // })
            },
            // 创建
            toCreate(){
                this.$router.push({name:'fatie',query:{'type':1}})
            },
            // 编辑
            toEdit(val){
                this.$router.push({name:'Create',query:{'id':val,'type':2}})
            },
            // 分页
            handleSizeChange(val){
                this.allChecked = false;
                this.searchForm.ids = []
                this.$set(this.searchForm,'pageNum',1);
                this.$set(this.searchForm,'pageSize',val);
                this.getContractList()
            },
            handleCurrentChange(val){
                this.allChecked = false;
                this.searchForm.ids = []
                this.getContractList()
            },
            // 弹窗分页
            handleSizeChangeDig(val){
                this.searchForms.ids = []
                this.$set(this.searchForms,'pageNum',1);
                this.$set(this.searchForms,'pageSize',val);
                this.getcontractListCoin()
            },
            handleCurrentChangeDig(val){
                this.searchForms.ids = []
                this.getcontractListCoin()
            },
            // 关闭弹窗

            dialogVisibless(){
                this.dialogVisible = true;
            },
            // 立即处理
            closeDialogs(){
                this.dialogShowPop = false;
                this.getcontractListCoins();
                this.clickType=1;

            },
            //确认不处理提示
            noTipsDay(){
                this.dialogVisible = false;
                this.dialogShowPop = false;
                this.$set(this.searchForm,'searchType',0);
                let date = new Date();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                localStorage.setItem("noTipTime",month+":"+strDate);
            },
            // 关闭弹窗
            handleClose(){
                this.$set(this.searchForm,'searchType',0);
                this.dialogShowPop = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .foneSel {
        width: 130px;
    }
    .contract-container{
        margin: 10px;
        padding: 17px;
        border-radius: 2px;
        background: #fff;
        .select_title{
            display: inline-block;
            width:80px;
            font-size: 14px;
            color:#909399;
        }
        .create_box{
            margin-top:20px;
        }
        .soon_num{
            margin:20px 0 20px;
            font-size: 15px;
            color:#909399;
        }
        .wrap{
            margin:20px 0;
        }
    }
    .red {
        color: red;
    }
    .blue {
        color: #3b6eff;
    }
    .blue:hover{
        cursor: pointer;
    }
</style>
