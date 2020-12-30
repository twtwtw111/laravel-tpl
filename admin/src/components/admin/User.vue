<template>
    <div>user</div>
</template>
<script>
import { User } from '@/utils/http'
const _User = new User()
export default {
    created() {
        // let user_info = JSON.parse(localStorage.getItem('user'))
        // console.log(localStorage.getItem('Authorization'))
        // console.log(localStorage.getItem('Authorization'))
        // console.log(user_info.user.id)
        // window.Echo.private('message-channel.' + user_info.user.id)
        //     .listen('MessageEvent', (e) => {
        //         console.log(e)
        //     })
        //     .listen('.MessageEvent', (e) => {
        //         console.log(e)
        //     })
        window.Echo.channel('notice')
            .listen('.test', (e) => {
                console.log(e)
                console.log('2312321')
            })
            .listen('test', (e) => {
                console.log(e)
            })
    },
    mounted() {
        this.getIndex()
    },
    methods: {
        getIndex() {
            _User.userList().then((res) => {
                console.log(res.data)
            })
        },
    },
}
</script>