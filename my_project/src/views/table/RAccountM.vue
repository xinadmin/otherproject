<template>
    <div class="contract-container">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="代理收款账号" name="first">
                <el-row :gutter="24" style="margin-top: 20px">
                    <el-col class="flex_center_between" :span="8">
                        <span class="select_title">机构/个人:</span>
                        <el-input placeholder="请输入机构/个人" v-model="person" size="small"/>
                    </el-col>
                    <el-col class="flex_center_between" :span="8">
                        <span class="select_title">代理名称:</span>
                        <el-input placeholder="请输入代理手机号" v-model="tel" size="small"/>
                    </el-col>
                    <el-col class="flex_center_between" :span="8">
                        <span class="select_title">代理手机号:</span>
                        <el-input placeholder="请输入开户人" v-model="AccountName" size="small"/>
                    </el-col>


                </el-row>
                <el-row :gutter="24" style="margin-top: 20px">
                    <el-col class="flex_center_between" :span="8">
                        <span class="select_title">开户人:</span>
                        <el-input placeholder="请输入开户人" v-model="AccountName" size="small"/>
                    </el-col>
                    <el-col class="flex_center_between" :span="8">
                        <span class="select_title">收款银行卡号:</span>
                        <el-input placeholder="请输入开户人" v-model="AccountName" size="small"/>
                    </el-col>
                    <el-col class="text_center" :span="8">
                        <el-button type="primary" size="mini" @click="handleSearch">搜 索</el-button>
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
                        <el-table-column label="机构/个人" prop="lesseeMobile" align="center"/>
                        <el-table-column label="代理名称" prop="status" align="center"/>
                        <el-table-column label="代理电话" prop="subject"/>
                        <el-table-column label="收款银行卡号" prop="id" width="130px"/>
                        <el-table-column label="开户人" prop="number"/>
                        <el-table-column label="开户银行" prop="type"/>
                        <el-table-column label="开户银行所在支行" prop="type"/>
                        <el-table-column label="开户银行所在省" prop="type"/>
                        <el-table-column label="开户银行所在市" prop="type"/>
                        <el-table-column label="账号类型" prop="type"/>
                        <el-table-column fixed="right" width="100px" align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" @click="toEdit(scope.row.id)">修改</el-button>
                            </template>
                        </el-table-column>
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
            <el-tab-pane label="代理佣金明细" name="second">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import controller from '@/controllers/contractcontrollers'
  import { formatDate } from '@/utils/filters'

  export default {
    name: 'RAccountM',
    data() {
      return {
        activeName: 'first',
        contractList: [],
        total:0,
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
      }
    },
    created() {
      this.getContractList()
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
      handleClick(tab, event) {
        console.log(tab, event)
      }
      ,
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

    .contract-container .select_title {
        display: inline-block;
        width: 90px;
        font-size: 14px;
        color: #909399;
    }

    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 60%;
    }
</style>
