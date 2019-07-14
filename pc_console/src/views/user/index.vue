<template>
    <div>
        <router-link to="/user/Usermessage">
            <button>跳转</button>
        </router-link>

    </div>

</template>

<script>
    import { getuserlist } from '@/api/user'
    export default {
        data() {
            list: null
        },
        created:{
            // this.fetchData()
        },
        methods: {
            fetchData() {
                // this.listLoading = true
                getuserlist().then(response => {
                    console.log(response)
                    // this.list = response.data.items
                    // this.listLoading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
