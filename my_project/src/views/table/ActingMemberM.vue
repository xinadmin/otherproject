<template>
    <div class="contract-container">
        <p class="soon_num"><span class="el-icon-warning">代理会员列表</span></p>
        <el-row :gutter="20" style="margin-bottom: 10px">
            <el-col class="flex_center_between" :span="6">
                <span class="select_title">用户昵称/姓名</span>
                <el-input placeholder="" size="small" style="min-width: 50%;max-width: 60%"/>
            </el-col>
            <el-col class="flex_center_between" :span="6">
                <span class="select_title">电话</span>
                <el-input placeholder="" size="small" style="min-width: 50%;max-width: 60%"/>
            </el-col>
            <el-col class="flex_center_between" :span="6">
                <span class="select_title">状态:</span>
                <el-select placeholder="请选择状态" size="small" style="min-width: 50%;max-width: 60%">
                    <el-option label="待审核" value=''></el-option>
                    <el-option label="禁用" value='1'></el-option>
                    <el-option label="启用" value='3'></el-option>
                    <el-option label="待认证" value='2'></el-option>

                </el-select>
            </el-col>
            <el-col class="flex_center_between" :span="6">
                <span class="select_title">类型:</span>
                <el-select placeholder="==请选择==" size="small" style="min-width: 50%;max-width: 60%">
                    <el-option label="待审核" value=''></el-option>
                    <el-option label="禁用" value='1'></el-option>
                    <el-option label="启用" value='3'></el-option>
                    <el-option label="待认证" value='2'></el-option>

                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col class="flex_center_between" :span="10">
                <span class="select_title">加入时间</span>
                <el-date-picker

                        type="daterange"
                        range-separator="-"
                        value-format="timestamp"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
            </el-col>
            <el-col class="text_center" :span="6" style="margin-top: 10px">
                <el-button type="primary" size="mini" @click="handleSearch">查 询</el-button>
                <el-button type="text" size="mini" @click="handleReset">重置</el-button>
            </el-col>
        </el-row>

        <div class="create_box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogShowMessage=true">新增代理</el-button>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogShowPop=true">批量新增代理</el-button>
        </div>

        <section class="wrap">
            <el-table border :data="contractList" size="small" style="margin-top:10px;width: 100%;">
                <el-table-column width="60px" prop="checked" align="center" :render-header="customFieldColumn">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.checked"
                                     @change="handleChekck(scope.row.id,scope.row.checked)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="类型" width="120px" prop="status" align="center">
                </el-table-column>

                <el-table-column label="用户昵称" prop="lesseeMobile" width="140px" align="center"/>
                <el-table-column label="头像" width="140px" align="center">
                    <img :src="circleUrl" class="head_pic"/>
                </el-table-column>
                <el-table-column label="姓名" prop="rentalSite" width="140px" align="center"/>

                <el-table-column label="电话" prop="rentalSite" width="140px" align="center">
                    <template slot-scope="scope">

                        {{ scope.row.lesseeMobile | telTan }}
                    </template>
                </el-table-column>

                <el-table-column label="加入时间" prop="signCreateTime" width="140px">
                    <template slot-scope="scope">
                        {{ scope.row.signCreateTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="monthlyRent" width="160px"/>
                <el-table-column label="操作" width="140px" align="center">
                    <template slot-scope="scope">
                        <el-dropdown
                                split-button
                                type="primary"
                                size="small"
                                @click="ShowDialog(1)"
                        >
                            审核通过
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div @click="resetPassword(scope.row.uId)">资料</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div @click="resetPassword(scope.row.uId)">佣金记录</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div @click="resetPassword(scope.row.uId)">推广成员</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div @click="resetPassword(scope.row.uId)">充值密码</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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
        <el-dialog custom-class="sign_popover" title="审核提示" :visible.sync="dialogShowPop" width="350px" top="120px"
                   style="padding-top: 0">
            <div style="padding-top: 0 !important">

                <el-row class="text_center" style="border-top: solid 1px #ddd;padding-top: 5px">
                    <p class="title_head"><span>确定审核通过？</span></p>
                    <el-button type="info" @click="dialogShowPop=false">取消</el-button>
                    <el-button @click="dialogVisibless" type="primary">确定</el-button>
                </el-row>
            </div>
        </el-dialog>

        <div class="pre-container">
            <el-dialog custom-class="sign_popover" title="批量新增药店" :before-close="closedig"
                       :visible.sync="dialogShowPop" width="52%" top="30px">
                <div class="center_content">
                    <p class="center_content_title">批量新增推荐药店</p>
                    <div class="content_left">
                        <p class="content_left_one" v-if="!is_show">上传推荐药店资料：</p>
                        <span class="content_left_content" v-if="is_show">导入成功：{{success_length}}</span><br/>
                        <span class="content_left_content" v-if="is_show">导入失败：{{error_length}}</span>

                    </div>
                    <input class="input-file" type="file" @change="exportData"
                           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                    <el-button size="small" type="primary" plain @click="btnClick"
                               style="margin-right: 20px;margin-left: 10px" v-if="!is_show">浏览
                    </el-button>
                    <span v-if="!is_show">未上传</span>
                    <el-button size="small" type="primary" plain style="float: right;position: absolute;right: 10px;bottom: 100px;
                    ">下载模板
                    </el-button>
                     
                    <el-row class="text_center" style="margin: 20px;border-top: solid 1px #ddd;padding-top: 20px">
                        <el-button type="primary" @click="closeDialogs">确定</el-button>
                        <el-button @click="closedig">取消</el-button>
                    </el-row>
                </div>
            </el-dialog>
        </div>
        <div class="pre-container">
            <el-dialog custom-class="sign_popover" title="新增代理账号" :before-close="closedigMessage"
                       :visible.sync="dialogShowMessage" width="45%" top="30px">
                <div class="center_content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                        <el-form-item label="角色归属" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="=请选择=">
                                <el-option label="单体店" value="shanghai"></el-option>
                                <el-option label="连锁" value="beijing"></el-option>
                                <el-option label="医疗机构" value="beijing"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号" prop="tel">
                            <el-input v-model="ruleForm.tel" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="微信号" prop="wx">
                            <el-input v-model="ruleForm.wx" size="medium"></el-input>
                        </el-form-item>
                        <el-row class="text_center"
                                style="margin: 20px;padding-top: 20px;text-align: center;border-top: 1px solid #222222">
                            <el-button type="primary" @click="closedigMessage">保存</el-button>
                            <el-button @click="closedigMessage">取消</el-button>
                        </el-row>
                    </el-form>
                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    // import XLSX from 'xlsx'
    // import controller from "@/controllers/contractcontrollers";
    import {formatDate} from "@/utils/filters";

    export default {
        name: "newindexs",
        data() {
            return {
                tel_real: false,
                circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                allChecked: false,
                doctorType: "1",
                searchOne: "",
                searchForm: {
                    id: '',
                    number: '',
                    ids: [],
                    lessee: '',
                    status: '',
                    pageNum: 1,
                    pageSize: 10,
                    searchEndTime: '',
                    searchStartTime: '',
                    rentalSite: "",
                    contractType: 1,
                    searchType: 0
                },
                id: '',
                lessee: '',
                status: '',
                total: 0,
                totalCoin: 0,
                rentalSite: "",
                soonOverdue: 0,
                rentRaise: 0,
                contractList: [],
                contractListCoin: [],
                dialogShowPop: false,
                dialogVisible: false,
                contractType: 1,
                activeName: "",
                dialogShowPop: false,
                type: 0,
                dialogShowPop: false,
                success_length: 0,
                error_length: 0,
                is_show: false,
                dialogShowMessage: false,
                ruleForm: {
                    name: '广东康之家医药连锁有限制公司',
                    region: '',
                    tel: '',
                    wx: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    wx: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    tel: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],

                }
            }
        }
        ,
        created() {
            // 合同列表
            // this.getContractList()

        },
        methods: {
            closedigMessage() {
                this.dialogShowMessage = false
            },
            customFieldColumn(h, {column, $index}) {
                return h(
                    'el-checkbox',
                    {
                        on: {
                            change: () => {
                                this.allChecked = !this.allChecked;
                                if (this.allChecked) {
                                    this.contractList.forEach(item => {
                                        item.checked = true
                                    })
                                    this.searchForm.ids = this.contractList.map(item => {
                                        return item.id
                                    })
                                } else {
                                    this.contractList.forEach(item => {
                                        item.checked = false
                                    })
                                    this.searchForm.ids = []
                                }
                            }
                        },
                        props: {
                            value: this.allChecked
                        }
                    })
            },
            // 分页
            handleSizeChange(val) {
                this.allChecked = false;
                this.searchForm.ids = []
                this.$set(this.searchForm, 'pageNum', 1);
                this.$set(this.searchForm, 'pageSize', val);
                this.getContractList()
            },
            handleCurrentChange(val) {
                this.allChecked = false;
                this.searchForm.ids = []
                this.getContractList()
            },
            getContractList() {
                controller.contractList(this.searchForm).then(res => {
                    this.contractList = res.data.records
                    this.total = parseInt(res.data.total)
                    this.contractList = this.contractList.map(item => {
                        return {
                            checked: false,
                            ...item
                        }
                    })
                })
            },
            handleSearch() {

            },
            handleReset() {

            },
            toCreate() {

            },
            handleDelete() {

            },
            handleExport() {

            },
            ShowDialog(type) {
                if (type) {
                    this.type = type;
                }
                this.dialogShowPop = true;
            },
            // 审核
            dialogVisibless() {

            },
            btnClick() {
                document.querySelector('.input-file').click()
            },
            exportData(e) {
                var that = this
                const files = e.target.files
                console.log(files)
                if (files.length <= 0) {//如果没有文件名
                    return false
                } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                    this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
                    return false
                }

                const fileReader = new FileReader()
                fileReader.onload = (ev) => {
                    try {
                        const data = ev.target.result
                        const workbook = XLSX.read(data, {
                            type: 'binary'
                        })
                        const wsname = workbook.SheetNames[0]//取第一张表
                        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])//生成json表格内容
                        console.log(ws)
                        that.outputs = []//清空接收数据
                        //编辑数据
                        for (var i = 0; i < ws.length; i++) {
                            var sheetData = {
                                address: ws[i].addr,
                                value: ws[i].value
                            }
                            that.outputs.push(sheetData)
                        }
                        console.log(that.outputs.length)
                        this.success_length = that.outputs.length
                        that.is_show = true
                        this.$refs.upload.value = ''

                    } catch (e) {

                        return false
                    }
                }
                fileReader.readAsBinaryString(files[0])
            },
            closedig() {
                this.dialogShowPop = false
            },
            closeDialogs() {

            }

        }
    }
</script>

<style lang="scss" scoped>
    .el-dialog__body {
        padding-top: 0 !important;
    }

    .contract-container {
        margin: 10px;
        padding: 17px;
        border-radius: 2px;
        background: #fff;

        .select_title {
            display: inline-block;
            width: 90px;
            text-align: center;
            font-size: 14px;
            color: #909399;
        }

        .create_box {
            margin-top: 20px;
        }

        .soon_num {
            margin: 20px 0 20px;
            font-size: 15px;
            color: #909399;
        }

        .wrap {
            margin: 20px 0;
        }
    }

    .title_head {
        text-align: center;
    }

    .center_content {
        width: 95%;
        overflow: hidden;
        border: solid 1px #ddd;
        margin: 0 auto;
        position: relative;
        padding-top: 10px;
    }

    .center_content:last-child {
        border: none;
        border-top: solid 1px #222222;

    }

    .center_content_title {
        border-bottom: solid 1px #222222;
        padding: 20px 0 10px;
        width: 96%;
        margin: 0 auto 10px;
    }

    .content_left {
        padding-left: 10px;
    }

    .content_left_one {
        height: 30px;
        line-height: 30px;
    }

    .content_left_content {
        height: 30px;
        line-height: 30px;
    }

    .input-file {
        display: none;
    }

    .block {
        width: 100%;
        height: 100%;
    }

    .head_pic {
        width: 30%;
        height: 30%;
    }
</style>
