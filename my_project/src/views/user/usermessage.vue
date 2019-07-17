<template>
    <div class="contract-container">

        <p class="rent_title">租赁合同</p>
        <el-form ref="form" :model="form" label-width="210px" style="text-align: center;padding-left: 200px">
            <el-form-item label="订单分佣金额比例设置:" style="font-size: 60px" :rules="[{ required: true}]">
            </el-form-item>
            <el-form-item style="width: 500px" label="订单金额费率:"
                          :rules="[{ required: true, message: '请输入订单金额费率', trigger: 'blur' }]">
                <el-input v-model="form.OAmountRate" size="small" style="width: 220px"></el-input>
                <el-button style="border: none">元</el-button>
            </el-form-item>
            <el-form-item label="推广采购商认证成功佣金设置:" style="font-size: 40px;width: 250px"
                          :rules="[{ required: true}]">
            </el-form-item>
            <el-form-item style="width: 500px" label="单体店佣金:"
                          :rules="[{ required: true, message: '请输入单体店佣金', trigger: 'blur' }]">
                <el-input v-model="form.MonopolyCommission" style="width: 220px"></el-input>
                <el-button style="border: none">元</el-button>
            </el-form-item>
            <el-form-item label="连锁佣金:" style="width: 500px"
                          :rules="[{ required: true, message: '请输入连锁佣金', trigger: 'blur' }]">
                <el-input v-model="form.ChainCommission" style="width: 220px"></el-input>
                <el-button style="border: none">元</el-button>
            </el-form-item>
            <el-form-item label="医院诊所佣金:" style="width: 500px"
                          :rules="[{ required: true, message: '请输入医院诊所佣金', trigger: 'blur' }]">
                <el-input v-model="form.HospitalCommission" style="width: 220px"></el-input>
                <el-button style="border: none">元</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'commissions',
        data() {
            return {
                form: {
                    OAmountRate: '',
                    MonopolyCommission: '',
                    ChainCommission: '',
                    HospitalCommission: ''
                },
                activeName: 'second'
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event)
            },
            onSubmit() {

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

    .rent_title {
        margin-bottom: 10px;
        padding-left: 30px;
        padding-bottom: 10px;
        color: #222222;
        font-size: 24px;
    }

    .right_title {
        display: inline-block;
        width: 10px;
    }
</style>
