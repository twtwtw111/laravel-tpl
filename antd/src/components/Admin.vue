<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider :trigger="null" collapsible v-model:collapsed="collapsed">
            <div class="logo" />
            <a-menu mode="inline" theme="dark" v-model:selectedKeys="selectedKeys">
                <a-menu-item key="1">
                    <router-link to="/admin/user">
                        <user-outlined />
                        <span>user</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <video-camera-outlined />
                    <span>nav 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined />
                    <span>nav 3</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined @click="() => (collapsed = !collapsed)" class="trigger" v-if="collapsed" />
                <menu-fold-outlined @click="() => (collapsed = !collapsed)" class="trigger" v-else />
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    components: {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
    },
    data() {
        return {
            selectedKeys: ['1'],
            collapsed: false,
        }
    },
})
</script>
<style lang="scss" scoped>
#components-layout-demo-custom-trigger {
    height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
</style>
