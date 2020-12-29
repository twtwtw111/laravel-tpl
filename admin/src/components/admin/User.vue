<template>
    <div>user</div>
</template>
<script>
import Echo from 'laravel-echo'
import io from 'socket.io-client'

export default {
    created() {
        window.io = io
        window.Echo = new Echo({
            host: 'http://localhost:6001',
            broadcaster: 'socket.io',
            authEndpoint: '/api/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('Authorization'),
                },
            },
        })
        console.log(window.Echo)
        let user_info = JSON.parse(localStorage.getItem('user'))
        // console.log(localStorage.getItem('Authorization'))
        // console.log(localStorage.getItem('Authorization'))
        window.Echo.private('user.' + user_info.user.id)
            .listen('.H2pDepositCallbackEvent', (e) => {
                console.log(e)
            })
            .listen('H2pDepositCallbackEvent', (e) => {
                console.log(e)
            })
    },
}
</script>