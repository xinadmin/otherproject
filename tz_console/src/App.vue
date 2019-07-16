<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {}
        }
    }
</script>

<style lang="scss">
    #app{
        .margin_bottom20{
            margin-bottom:20px;
        }
        .margin_top_bottom10{
            margin:10px 0;
        }
        .margin_top_bottom20{
            margin:20px 0;
        }
        .radius_8{
            border-radius: 8px;
        }
        .text_center{
            text-align: center;
        }
        .text_right{
            text-align: right;
        }
        .flex_align_center{
            display: flex;
            align-items: center;
            justify-content: center
        }
        .flex_center_between{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .flex_center_around{
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .flex_col_between{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .flex_center_start{
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        /* 背景图片 */
        .bgImg{background-size: cover;background-position: center;background-repeat: no-repeat;background-color: #ddd;overflow: hidden;}
        /* 文本超出省略号（单行） */
        .txtOver{overflow: hidden;white-space: nowrap;text-overflow: ellipsis; }
        /* 文本超出省略号（多行） */
        .ellipsis_word{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}

        .rtc-exit {
            .el-dialog {
                border-radius: 8px;
            }
            .el-dialog__body {
                padding: 10px 20px;
            }
        }
    }
</style>

