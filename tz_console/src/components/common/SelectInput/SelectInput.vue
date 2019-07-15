<template>
    <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
        <el-select class="foneSel" v-model="selectValue" slot="prepend" placeholder="请选择" @change="handleChange">
            <el-option v-for="(item, index) of selectList" :key="'selectList_' + index" :label="item.label" :value="item.key"></el-option>
        </el-select>
    </el-input>
</template>

<script>
export default {
    model:{
        prop: 'form',
        event: 'SelectInputChange'
    },
    props:{
        form:{
            type: Object,
            required: true
        },
        selectList:{
            type: Array,
            required: true
        }
    },
    data(){
        return{
            value: '',
            selectValue: ''
        }
    },
    mounted(){
        this.selectValue = this.selectList[0].key;
    },
    methods:{
        //处理select改变
        handleChange(e){
            const _thisSelectKey = e;

            //移除其他属性
            for(let item of this.selectList){
                if(_thisSelectKey !== item.key){
                    delete this.form[item.key]
                }
            }

            this.updataForm(this.value, _thisSelectKey);
        },
        updataForm(val, key){
            this.form[key] = val;
            this.$emit('SelectInputChange', this.form);
        }
    },
    watch:{
        value(newVal, oldVal){
            this.updataForm(newVal, this.selectValue);
        }
    }
}
</script>

<style lang="scss">
  .foneSel{
  	width:130px;
  }
</style>
