<template>
    <router-view></router-view>
</template>



<script>
import Echo from 'laravel-echo'
// import io from 'socket.io-client'

export default {
    name: 'App',
    created() {
        // window.io = io
        window.Pusher = require('pusher-js')
        window.Echo = new Echo({
            host: 'http://localhost:6001',
            broadcaster: 'pusher',
            key: 'f87718d37518226dc0b7',
            // authEndpoint: '//endpoint/auth'
            // authEndpoint: '/api/broadcasting/auth',
            // auth: {
            //     headers: {
            //         Authorization: 'Bearer ' + localStorage.getItem('Authorization'),
            //     },
            // },
        })
        console.log(window.Echo)
    },
}
</script>

<style>
</style>

<!-- 

<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

-->
