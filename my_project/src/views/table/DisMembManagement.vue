<template>
    <div class="contract-container">
        <el-row :gutter="24">
            <el-col class="flex_center_between" :span="5">
                <span class="select_title">vip账号:</span>
                <el-input placeholder="请输入vip账号" v-model="rentalSite"/>
            </el-col>
            <el-col class="flex_center_between" :span="5">
                <span class="select_title">昵称:</span>
                <el-input placeholder="请输入昵称" v-model="lessee"/>
            </el-col>
            <el-col class="text_center" :span="4">
                <el-button type="primary" size="small" @click="handleSearch">查 询</el-button>
                <el-button type="text" size="small" @click="handleReset">重置</el-button>
            </el-col>
        </el-row>
        <div class="create_box">
            <router-link to="/user/Usermessage">
                <el-button type="primary" size="mini">添加</el-button>
            </router-link>
            <el-button type="primary" size="mini" @click="handleDelete">删除</el-button>
            <el-button type="primary" size="mini" @click="handleExport">导出</el-button>
        </div>
        <section class="wrap">
            <el-table border :data="contractList" size="small" style="margin-top:10px;width: 100%;">
                <el-table-column width="40px" prop="checked" align="center" :render-header="customFieldColumn">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.checked"
                                     @change="handleChekck(scope.row.id,scope.row.checked)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="会员名" prop="subject"/>
                <el-table-column label="会员类型" prop="status">

                    <template slot-scope="scope">
                        <div v-if="scope.row.status==='0'" >普通会员</div>
                        <div v-else class="red">vip会员</div>
                    </template>

                </el-table-column>
                <el-table-column label="发布贴子数" prop="subject"/>
                <el-table-column label="分红" prop="subject"/>
                <el-table-column label="点赞数" prop="subject"/>
                <el-table-column label="vip加入时间" prop="signCreateTime">
                    <template slot-scope="scope">
                        {{ scope.row.signCreateTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="vip到期时间" prop="signCreateTime">
                    <template slot-scope="scope">
                        {{ scope.row.signCreateTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="signCreateTime">
                    <template slot-scope="scope">
                        {{ scope.row.signCreateTime | formatDate1 }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="100px" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
                        <!--                        <el-button type="text" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>-->
                        <el-button type="text" size="mini" @click="handleExport(scope.row.id)">详情</el-button>
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
    import {formatDate} from "@/utils/filters";

    export default {
        name: "Contract",
        data() {
            return {
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
                contractList: []


            }
        },
        created() {
            // this.getContractList();
            // this.getStatusCount();
        },
        watch: {
            doctorType(newVal, oldVal) {
                if (newVal) {
                    this.searchOne = this.searchForm.id = this.searchForm.number = "";
                }
            }
        },
        computed: {},
        methods: {
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
            // 多选
            handleChekck(val, checked) {
                if (checked) {
                    this.searchForm.ids.push(val)
                } else {
                    this.searchForm.ids = this.searchForm.ids.filter(item => {
                        if (item !== val) {
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
            handleSearch() {
                this.allChecked = false;
                this.searchForm.ids = []
                this.clickType = 0;
                if (this.doctorType == '1') {
                    this.$set(this.searchForm, 'id', this.searchOne);
                    this.$set(this.searchForm, 'number', "");
                } else {
                    this.$set(this.searchForm, 'number', this.searchOne);
                    this.$set(this.searchForm, 'id', "");
                }
                this.$set(this.searchForm, 'searchType', 0);
                this.$set(this.searchForm, 'lessee', this.lessee);
                this.$set(this.searchForm, 'status', this.status);
                this.$set(this.searchForm, 'rentalSite', this.rentalSite);
                this.$set(this.searchForm, 'pageNum', 1);
                this.getContractList()
            },
            // 租金递增,即将到期列表

            // 租金递增列表
            coinSelect() {
                this.searchForm.ids = []
                this.$set(this.searchForm, 'id', '');
                this.$set(this.searchForm, 'number', '');
                this.$set(this.searchForm, 'searchType', 0);
                this.$set(this.searchForm, 'status', 4);
                this.$set(this.searchForm, 'lessee', this.lessee);
                this.$set(this.searchForm, 'rentalSite', this.rentalSite);
                this.$set(this.searchForm, 'pageNum', 1);
                this.getContractList()
            },
            // 重置
            handleReset() {
                this.searchForm = {
                    id: '',
                    ids: [],
                    lessee: '',
                    status: '',
                    pageNum: 1,
                    pageSize: 10,
                    searchEndTime: '',
                    searchStartTime: '',
                    contractType: "1",
                    searchType: 0
                }
                this.id = ''
                this.lessee = ''
                this.status = ''
                this.searchOne = ''
                this.rentalSite = ''
            },
            // 合同列表
            getContractList() {
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
            // 删除
            handleDelete() {
                if (this.searchForm.ids.length == 0) {
                    this.$message.warning('请选择删除对象')
                    return
                }
                this.$confirm("确定删除数据？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    controller.delete(this.searchForm.ids).then(res => {
                        this.$message.success('删除成功！')
                        this.getContractList()
                        this.$router.push({name: 'Contract', query: {timestamp: new Date().getTime()}})
                    })
                }).catch(() => {
                });
            },
            // 导出
            handleExport(val) {
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
            // 编辑
            toEdit(val) {
                this.$router.push({name: 'Create', query: {'id': val, 'type': 2}})
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

        }
    }
</script>

<style lang="scss" scoped>
    .el-input {
        width: 70%;
    }
    .contract-container {
        margin: 10px;
        padding: 17px;
        border-radius: 2px;
        background: #fff;

        .select_title {
            display: inline-block;
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

    .red {
        color: red;
    }

    .blue {
        color: #3b6eff;
    }

    .blue:hover {
        cursor: pointer;
    }
</style>
