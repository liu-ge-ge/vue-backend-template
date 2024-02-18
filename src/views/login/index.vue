<template>
  <div class="web-login">
    <div class="web-login-center">
      <div class="center-left">
        <div class="center-left-title">Login</div>
        <div class="center-left-welcome">Welcome to Vue-Backend System</div>
        <div class="center-left-icon">
          <ArrowRightOutlined />
        </div>
      </div>
      <div class="center-right">
        <div class="center-right-top">
          <div class="right-top-welcome">
            <div class="line"></div>
            <div class="top-weclome-content">Welcome</div>
            <div class="line"></div>
          </div>
          <a-form layout="vertical" :model="formState">
            <a-form-item label="用户名">
              <a-input
                class="center-right-top-input"
                :bordered="false"
                v-model:value="formState.username"
                placeholder="Please enter a username"
              ></a-input>
            </a-form-item>
            <a-form-item label="密码" style="margin-top: 30px">
              <a-input-password
                class="center-right-top-input"
                :bordered="false"
                v-model:value="formState.password"
                placeholder="Please enter a password"
              ></a-input-password>
            </a-form-item>
            <a-form-item style="margin-top: 20%">
              <a-button
                size="large"
                type="primary"
                shape="round"
                style="width: 100%"
                @click="login"
                >登录</a-button
              >
            </a-form-item>
            <a-form-item class="web-login-app">
              <QqOutlined
                class="web-login-app-item"
                style="background-color: #3492ed"
              />
              <WechatOutlined
                class="web-login-app-item"
                style="background-color: #4daf29"
              />
            </a-form-item>
          </a-form>
        </div>
        <div class="center-right-bottom">欢迎使用 L-C 后台管理系统</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ArrowRightOutlined,
  QqOutlined,
  WechatOutlined,
} from '@ant-design/icons-vue'
import { reactive } from 'vue'
import LoginService from '@/api/login'
const formState = reactive({
  username: '',
  password: '',
})
const login = () => {
  LoginService.Login(formState)
}
</script>
<style lang="less">
// @import '../../styles/fun.less';
@import './style/index.less';
@import './style/index_media.less';
</style>
