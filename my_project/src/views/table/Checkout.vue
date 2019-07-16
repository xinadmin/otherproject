<template>
    <div class="contract-container">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="代理佣金明细" name="first">
                <p>
                    <el-button-group>
                        <el-button type="primary">确认结算</el-button>
                        <el-button type="primary">取消结算</el-button>
                        <el-button type="primary">删除</el-button>
                        <el-button type="primary">导出</el-button>

                    </el-button-group>
                    <span class="title">订单数量:&nbsp;&nbsp;<span class="blue">123</span>&nbsp;&nbsp;
                带转账金额:&nbsp;&nbsp;<span class="blue">12.02</span>
                转账审核中的金额:&nbsp;&nbsp;<span class="blue">12.02</span>
                已转账金额:&nbsp;&nbsp;<span class="blue">12.02</span></span>
                </p>
                <el-row :gutter="24" style="margin-top: 20px">
                    <el-col class="flex_center_between" :span="6">
                        <el-input placeholder="请输入内容" maxlength="18" v-model="searchOne" size="small">
                            <el-select
                                    class="foneSel"
                                    v-model="doctorType"
                                    slot="prepend"
                                    placeholder="请选择"
                                    size="small">
                                <el-option key="1" label="机构/个人名称" value="1"></el-option>
                                <el-option key="2" label="代理手机号" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-col>
                    <el-col class="flex_center_between" :span="6">
                        <span class="select_title">结算状态:</span>
                        <el-select v-model="status" placeholder="请选择" size="small">
                            <el-option label="待结算" value=''></el-option>
                            <el-option label="结算审核中" value='1'></el-option>
                            <el-option label="已结算" value='3'></el-option>
                            <el-option label="无需结算" value='4'></el-option>

                        </el-select>
                    </el-col>
                    <el-col class="flex_center_between" :span="8">
                        <span class="select_title">下单时间:</span>
                        <el-date-picker
                                v-model="joinTime"
                                size="small"
                                type="daterange"
                                range-separator="-"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-col>
                    <el-col class="text_center" :span="2">
                        <el-button type="primary" size="mini" @click="handleSearch">查 询</el-button>
                    </el-col>
                </el-row>
                <section class="wrap" style="margin-top: 60px">
                    <el-table border :data="contractList" size="small" style="margin-top:10px;width: 100%;">
                        <el-table-column width="40px" prop="checked" align="center" :render-header="customFieldColumn">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked"
                                             @change="handleChekck(scope.row.id,scope.row.checked)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号" prop="lesseeMobile" align="center" />
                        <el-table-column label="类型" prop="status" align="center" />
                        <el-table-column label="名称" prop="subject"/>
                        <el-table-column label="用户名" prop="id" width="130px"/>
                        <el-table-column label="应结算佣金金额" prop="number"/>
                        <el-table-column label="收益类型" prop="type"/>
                        <el-table-column label="认证时间" prop="signCreateTime">
                            <template slot-scope="scope">
                                {{ scope.row.signCreateTime | formatDate1 }}
                            </template>
                        </el-table-column>
                        <el-table-column label="结算状态" prop="status" width="110px"/>
                    </el-table>
                </section>
                <section class="text_right" style="margin-top: 10px;text-align: right">
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
            </el-tab-pane>
            <el-tab-pane label="订单分佣明细" name="second">
                <p>
                    <el-button-group>
                        <el-button type="primary">确认结算</el-button>
                        <el-button type="primary">取消结算</el-button>
                        <el-button type="primary">删除</el-button>
                        <el-button type="primary">导出</el-button>

                    </el-button-group>
                    <span class="title">订单数量:&nbsp;&nbsp;<span class="blue">123</span>&nbsp;&nbsp;
                带转账金额:&nbsp;&nbsp;<span class="blue">12.02</span>
                转账审核中的金额:&nbsp;&nbsp;<span class="blue">12.02</span>
                已转账金额:&nbsp;&nbsp;<span class="blue">12.02</span></span>
                </p>
                <el-row :gutter="24" style="margin-top: 20px">
                    <el-col class="flex_center_between" :span="6">
                        <el-input placeholder="请输入内容" maxlength="18" v-model="searchOne1" size="small">
                            <el-select
                                    class="foneSel"
                                    v-model="doctorType1"
                                    slot="prepend"
                                    placeholder="请选择"
                                    size="small">
                                <el-option key="3" label="分佣订单编号" value="3"></el-option>
                                <el-option key="1" label="机构/个人名称" value="1"></el-option>
                                <el-option key="2" label="代理手机号" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-col>
                    <el-col class="flex_center_between" :span="6">
                        <span class="select_title">结算状态:</span>
                        <el-select v-model="status1" placeholder="请选择" size="small">
                            <el-option label="待结算" value='2'></el-option>
                            <el-option label="结算审核中" value='1'></el-option>
                            <el-option label="已结算" value='3'></el-option>
                            <el-option label="无需结算" value='4'></el-option>

                        </el-select>
                    </el-col>
                    <el-col class="flex_center_between" :span="9">
                        <span class="select_title">加入时间:</span>
                        <el-date-picker
                                v-model="takeTime"
                                size="small"
                                type="daterange"
                                range-separator="-"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-col>
                    <el-col class="text_center" :span="2">
                        <el-button type="primary" size="mini" @click="handleSearch">查 询</el-button>
                    </el-col>
                </el-row>
                <section class="wrap" style="margin-top: 40px">
                    <el-table border :data="contractList1" size="small" style="margin-top:10px;width: 100%;">
                        <el-table-column width="40px" prop="checked" align="center" :render-header="customFieldColumn">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked"
                                             @change="handleChekck(scope.row.id,scope.row.checked)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="付款时间" prop="signCreateTime">
                            <template slot-scope="scope">
                                {{ scope.row.signCreateTime | formatDate1 }}
                            </template>
                        </el-table-column>
                        <el-table-column label="支付方式" prop="lesseeMobile" align="center" />
                        <el-table-column label="订单状态" prop="status" align="center" />
                        <el-table-column label="运费" prop="subject"/>
                        <el-table-column label="商品金额" prop="id" width="130px"/>
                        <el-table-column label="订单金额" prop="number"/>
                        <el-table-column label="退款金额" prop="type"/>
                        <el-table-column label="手续费" prop="type"/>
                        <el-table-column label="应结算金额" prop="type"/>
                        <el-table-column label="实际结算时间" prop="signCreateTime">
                            <template slot-scope="scope">
                                {{ scope.row.signCreateTime | formatDate1 }}
                            </template>
                        </el-table-column>
                        <el-table-column label="所属类型" prop="type"/>
                        <el-table-column label="代理名称" prop="type"/>
                        <el-table-column label="代理手机号" prop="type"/>
                        <el-table-column label="结账状态" prop="status" width="110px"/>
                        <el-table-column fixed="right" width="100px" align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="toEdit(scope.row.id)">修改手续费</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
                <section class="text_right" style="margin-top: 10px;text-align: right">
                    <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="searchForm1.pageNum"
                            :page-sizes="[10, 20, 50, 100,200]"
                            :page-size="searchForm1.pageSize"
                            layout="total,sizes, prev, pager, next"
                            :total="totals"
                    ></el-pagination>
                </section>
            </el-tab-pane>
            <el-tab-pane label="代理结账汇总" name="third">
                <p>
                    <el-button-group>
                        <el-button type="primary">确认结算</el-button>
                        <el-button type="primary">取消结算</el-button>
                        <el-button type="primary">删除</el-button>
                        <el-button type="primary">导出</el-button>

                    </el-button-group>
                    <span class="title">订单数量:&nbsp;&nbsp;<span class="blue">123</span>&nbsp;&nbsp;
                带转账金额:&nbsp;&nbsp;<span class="blue">12.02</span>
                转账审核中的金额:&nbsp;&nbsp;<span class="blue">12.02</span>
                已转账金额:&nbsp;&nbsp;<span class="blue">12.02</span></span>
                </p>
                <el-row :gutter="20" style="margin-top: 20px">


                    <el-col class="flex_center_between" :span="6">
                        <span class="select_title">机构/个人:</span>
                        <el-input placeholder="请输入机构/个人" v-model="person" size="small" style="width: 60%;"/>
                    </el-col>
                    <el-col class="flex_center_between" :span="6">
                        <span class="select_title">代理手机号:</span>
                        <el-input placeholder="请输入代理手机号" v-model="tel" size="small" style="width: 60%;"/>
                    </el-col>
                    <el-col class="flex_center_between" :span="6">
                        <span class="select_title">开户人:</span>
                        <el-input placeholder="请输入开户人" v-model="AccountName" size="small" style="width: 60%;"/>
                    </el-col>
                    <el-col class="flex_center_between" :span="6">
                        <span class="select_title">类型:</span>
                        <el-select v-model="status1" placeholder="请选择" size="small">
                            <el-option label="待结算" value='2'></el-option>
                            <el-option label="结算审核中" value='1'></el-option>
                            <el-option label="已结算" value='3'></el-option>
                            <el-option label="无需结算" value='4'></el-option>

                        </el-select>
                    </el-col>
                    <el-col class="flex_center_between" :span="9">
                        <span class="select_title">加入时间:</span>
                        <el-date-picker
                                v-model="endTime"
                                size="small"
                                type="daterange"
                                range-separator="-"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-col>
                    <el-col class="text_center" :span="2">
                        <el-button type="primary" size="mini" @click="handleSearch">查 询</el-button>
                    </el-col>
                </el-row>
                <section class="wrap" style="margin-top: 40px">
                    <el-table border :data="contractList1" size="small" style="margin-top:10px;width: 100%;">
                        <el-table-column width="40px" prop="checked" align="center" :render-header="customFieldColumn">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked"
                                             @change="handleChekck(scope.row.id,scope.row.checked)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="付款时间" prop="signCreateTime">
                            <template slot-scope="scope">
                                {{ scope.row.signCreateTime | formatDate1 }}
                            </template>
                        </el-table-column>
                        <el-table-column label="支付方式" prop="lesseeMobile" align="center" />
                        <el-table-column label="订单状态" prop="status" align="center" />
                        <el-table-column label="运费" prop="subject"/>
                        <el-table-column label="商品金额" prop="id" width="130px"/>
                        <el-table-column label="订单金额" prop="number"/>
                        <el-table-column label="退款金额" prop="type"/>
                        <el-table-column label="手续费" prop="type"/>
                        <el-table-column label="应结算金额" prop="type"/>
                        <el-table-column label="实际结算时间" prop="signCreateTime">
                            <template slot-scope="scope">
                                {{ scope.row.signCreateTime | formatDate1 }}
                            </template>
                        </el-table-column>
                        <el-table-column label="所属类型" prop="type"/>
                        <el-table-column label="代理名称" prop="type"/>
                        <el-table-column label="代理手机号" prop="type"/>
                        <el-table-column label="结账状态" prop="status" width="110px"/>
                        <el-table-column fixed="right" width="100px" align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="toEdit(scope.row.id)">修改手续费</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
                <section class="text_right" style="margin-top: 10px;text-align: right">
                    <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="searchForm1.pageNum"
                            :page-sizes="[10, 20, 50, 100,200]"
                            :page-size="searchForm1.pageSize"
                            layout="total,sizes, prev, pager, next"
                            :total="totals"
                    ></el-pagination>
                </section>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    // import  controller from '@/controllers/contractcontrollers'
    import { formatDate } from "@/utils/filters";

  export default {
    data() {
      return {
        doctorType: '1',
        searchOne: '',
        doctorType1: '1',
        searchOne1: '',
        status: '',
        status1: '',
        joinTime: '',
        takeTime: '',
        endTime:'',
        AccountName:'',
        person:'',
        tel:'',
        activeName: 'third',
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
          rentalSite: '',
          contractType: 1,
          searchType: 0,
        },
        searchForm1: {
          id: '',
          number: '',
          ids: [],
          lessee: '',
          status: '',
          pageNum: 1,
          pageSize: 10,
          searchEndTime: '',
          searchStartTime: '',
          rentalSite: '',
          contractType: 1,
          searchType: 0,
        },
        status:'',
        status1:'',
        contractList1: [],
        contractList: [],
        total:0,
        totals:0,
      }
    },
    created() {
      // this.getContractList()
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
      handleSizeChange1(val){
        this.allChecked = false;
        this.searchForm.ids = []
        this.$set(this.searchForm,'pageNum',1);
        this.$set(this.searchForm,'pageSize',val);
        this.getContractList()
      },
      handleCurrentChange1(val){
        this.allChecked = false;
        this.searchForm.ids = []
        this.getContractList()
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleSearch() {

      },
      getContractList() {
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
        controller.contractList(this.searchForm).then(res => {
          this.contractList1 = res.data.records
          this.totals = parseInt(res.data.total)
          this.contractList1 = this.contractList1.map(item => {
            return {
              checked:false,
              ...item
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
    .contract-container {
        margin: 10px;
        padding: 17px;
        border-radius: 2px;
        background: #fff;
        background: #fff;

    }
    .contract-container .select_title{
        display: inline-block;
        width:80px;
        font-size: 14px;
        color:#909399;
    }
    /*.el-input {*/
    /*    position: relative;*/
    /*    font-size: 14px;*/
    /*    display: inline-block;*/
    /*    !*width: 60%;*!*/
    /*    min-width: 60%;*/
    /*    max-width: 70%;*/
    /*}*/
    .foneSel {
        width: 130px;
    }

    .flex_center_between, .text_center {
        margin-top: 10px;
    }

    .title {
        float: right;
        display: inline-block;
        padding-right: 26px;
        height: 45px;
        line-height: 45px;
    }

    .blue {
        color: #3b6eff;
    }
</style>
