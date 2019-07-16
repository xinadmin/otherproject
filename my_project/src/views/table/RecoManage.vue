<template>
    <div class="contract-container">
        <p class="rent_title">推荐药店列表</p>
        <el-row :gutter="24">
            <el-col class="flex_center_between" :span="5">
                <span class="select_title">药店名称:</span>
                <el-input placeholder="请输入药店名称" v-model="DrugstoreName" size="small"
                          style="min-width: 60%;max-width:70%"/>
            </el-col>
            <el-col class="flex_center_between" :span="5">
                <span class="select_title">电话:</span>
                <el-input placeholder="请输入电话" v-model="tel" size="small" style="min-width: 60%;max-width:70%"/>
            </el-col>

            <el-col class="flex_center_between" :span="5">
                <span class="select_title">类别:</span>
                <el-select v-model="type" placeholder="==请选择==" size="small" style="min-width: 50%;max-width: 60%">
                    <el-option label="连锁" value=''></el-option>
                    <el-option label="单体店" value='1'></el-option>
                    <el-option label="医院诊所" value='3'></el-option>
                    <el-option label="租金递增" value='4'></el-option>
                    <el-option label="即将到期" value='2'></el-option>

                </el-select>
            </el-col>
            <el-col class="flex_center_between" :span="5">
                <span class="select_title">推荐状态:</span>
                <el-select v-model="status" placeholder="==请选择==" size="small" style="min-width: 50%;max-width: 60%">
                    <el-option label="可推广" value=''></el-option>
                    <el-option label="跟进保护中" value='1'></el-option>
                    <el-option label="可开户" value='3'></el-option>
                    <el-option label="已禁显" value='4'></el-option>

                </el-select>
            </el-col>
            <el-col class="text_center" :span="4">
                <el-button type="primary" size="small " @click="handleSearch">搜 索</el-button>
                <el-button size="small " @click="handleReset">重置</el-button>
            </el-col>
        </el-row>
        <div class="create_box">
            <el-button type="primary" size="small" @click="dialogShowPop=true">批量新增</el-button>
        </div>
        <section class="wrap" style="margin-top: 40px">
            <el-table border :data="contractList" size="small" style="margin-top:10px;width: 100%;">
                <el-table-column label="佣金类别" prop="lesseeMobile" align="center"/>
                <el-table-column label="名称" prop="status" align="center"/>
                <el-table-column label="省" prop="subject"/>
                <el-table-column label="市/区" prop="id" width="130px"/>
                <el-table-column label="详细地址" prop="number"/>
                <el-table-column label="电话" prop="type"/>
                <el-table-column label="简介" prop="type"/>
                <el-table-column label="状态" prop="type"/>
                <el-table-column label="操作" width="140px" align="center">
                    <template slot-scope="scope">
                        <el-dropdown
                                split-button
                                type="primary"
                                size="small"
                        >
                            禁显推荐
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div @click="showdialogShowMessage">维护</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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
            <el-dialog custom-class="sign_popover" title="维护-推荐药店" :before-close="closedigMessage"
                       :visible.sync="dialogShowMessage" width="45%" top="30px">
                <div class="center_content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="ruleForm.name" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="类别" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="=请选择=">
                                <el-option label="单体店" value="shanghai"></el-option>
                                <el-option label="连锁" value="beijing"></el-option>
                                <el-option label="医疗机构" value="beijing"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="省" prop="name">
                            <el-input v-model="ruleForm.name" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="市" prop="name">
                            <el-input v-model="ruleForm.name" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="name">
                            <el-input v-model="ruleForm.name" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="name">
                            <el-input v-model="ruleForm.name" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="简介" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="精度" prop="name">
                            <el-input v-model="ruleForm.name" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="纬度" prop="name">
                            <el-input v-model="ruleForm.name" size="medium"></el-input>
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
  import XLSX from 'xlsx'
  import controller from '@/controllers/contractcontrollers'
  import { formatDate } from '@/utils/filters'

  export default {
    name: 'RecoManage',
    data() {
      return {
        DrugstoreName: '',
        tel: '',
        type: '',
        status: '',
        success_length: 0,
        error_length: 0,
        is_show: false,
        dialogShowPop: false,
        dialogShowMessage: true,
        contractList: [],
        total: 0,
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
          searchType: 0
        },
        outputs: [],
        ruleForm: {
          name: '广东康之家医药连锁有限制公司',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getContractList()
    },
    methods: {
      // 搜索
      handleSearch() {

      },
      // 重置
      handleReset() {

      },
      // 分页
      handleSizeChange(val) {
        this.allChecked = false
        this.searchForm.ids = []
        this.$set(this.searchForm, 'pageNum', 1)
        this.$set(this.searchForm, 'pageSize', val)
        this.getContractList()
      },
      handleCurrentChange(val) {
        this.allChecked = false
        this.searchForm.ids = []
        this.getContractList()
      },
      // 上传表格数据
      closeDialogs() {

      },
      showdialogShowMessage() {
        this.dialogShowMessage = true
      },
      closedigMessage() {
        this.dialogShowMessage = false
      },
      closedig() {
        this.dialogShowPop = false
        this.is_show = false
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
    }

    .select_title {
        display: inline-block;
        width: 60px;
        font-size: 14px;
        color: #909399;
    }

    .el-input, .el-select {
        position: relative;
        font-size: 14px;
        display: inline-block;
        min-width: 80%;
        max-width: 90%;
    }

    .rent_title {
        padding-bottom: 20px;
    }

    .create_box {
        padding: 30px 0;
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
</style>
