<template>
    <div class="form">
        <a-form :model="formline">
            <a-form-item>
                <a-input placeholder="Username" v-model:value="formline.username">
                    <template #prefix>
                        <UserOutlined style="color:rgba(0,0,0,.25)" />
                    </template>
                </a-input>

                <!-- <a-input v-model:value="value" placeholder="Basic usage" /> -->
            </a-form-item>
            <a-form-item>
                <a-input placeholder="Password" type="password" v-model:value="formline.password">
                    <template #prefix>
                        <LockOutlined style="color:rgba(0,0,0,.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button :disabled="formline.username === '' || formline.password === ''" @click="login" html-type="submit" type="primary">Log in</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'Login',
    components: {
        UserOutlined,
        LockOutlined,
    },
    setup() {
        const store = useStore()
        const formline = reactive({
            username: '',
            password: '',
        })
        var login = () => {
            store.dispatch('user/login', formline)
        }

        return {
            formline,
            login,
        }
    },
})
</script>
<style lang="scss" scoped>
.ant-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>