<template>
  <div class="web-user">
    <a-row style="height: 100%" :gutter="[0, 35]">
      <a-col style="height: 100%" :xs="{ span: 24 }" :lg="{ span: 8 }">
        <a-card class="web-a-card">
          <div class="web-user-top">
            <a-avatar :src="userInfo.avatar" shape="square" :size="100">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <div class="web-user-nickname">{{ userInfo.nickName }}</div>
            <div class="web-user-motto">{{ userInfo.motto }}</div>
          </div>
          <div class="web-user-info">
            <div class="user-info-item">
              <UserOutlined />
              <label>前端工程师</label>
            </div>
            <div class="user-info-item">
              <HomeOutlined />
              <label>xxx公司-前端研发部-xxx组</label>
            </div>
            <div class="user-info-item">
              <EnvironmentOutlined />
              <label>中国 · 河南 · 南阳</label>
            </div>
            <div class="user-info-item">
              <TagOutlined />
              <label>前端工程师</label>
            </div>
          </div>
          <div class="web-user-tag">
            <div class="user-tag-title">技术栈</div>
            <div>
              <a-tag color="success">JavaScript</a-tag>
              <a-tag color="processing">TypeScript</a-tag>
              <a-tag color="error">CSS</a-tag>
              <a-tag color="warning">HTML</a-tag>
              <a-tag color="default">Vue</a-tag>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col
        style="height: 100%"
        :xs="{ span: 24 }"
        :lg="{ span: 14, offset: 1 }"
      >
        <a-card class="web-a-card">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="基本信息">
              <a-form
                ref="formRef"
                :model="formState"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-form-item ref="nickName" label="昵称" name="nickName">
                  <a-input
                    class="web-antd-input"
                    v-model:value="formState.nickName"
                  />
                </a-form-item>
                <a-form-item label="性别" name="sex">
                  <a-select
                    class="web-antd-input"
                    v-model:value="formState.sex"
                    placeholder="please select your sex"
                  >
                    <a-select-option value="1">男</a-select-option>
                    <a-select-option value="0">女</a-select-option>
                    <a-select-option value="-1">保密</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="简介" name="desc">
                  <a-textarea
                    class="web-antd-input"
                    :rows="5"
                    v-model:value="formState.desc"
                  />
                </a-form-item>
                <a-form-item
                  style="display: flex; justify-content: end"
                  :wrapper-col="{ span: 3 }"
                >
                  <a-button type="primary" @click="onSubmit">保存</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="账号绑定" force-render>
              <div class="web-cell">
                <div class="web-cell-item">
                  <div class="item-right">
                    <div class="cell-item-top">密保手机</div>
                    <div class="cell-item-bottom">
                      <span>已绑定手机号156****0230</span>
                      <a>去修改</a>
                    </div>
                  </div>
                </div>
                <div class="web-cell-item">
                  <div class="item-right">
                    <div class="cell-item-top">密保手机</div>
                    <div class="cell-item-bottom">
                      <span>已绑定手机号156****0230</span>
                      <a>去修改</a>
                    </div>
                  </div>
                </div>
                <div class="web-cell-item">
                  <div class="item-right">
                    <div class="cell-item-top">密保手机</div>
                    <div class="cell-item-bottom">
                      <span>已绑定手机号156****0230</span>
                      <a>去修改</a>
                    </div>
                  </div>
                </div>
                <div class="web-cell-item">
                  <div class="item-left">
                    <QqOutlined
                      class="web-login-app-item"
                      style="background-color: #3492ed"
                    />
                  </div>

                  <div class="item-right">
                    <div class="cell-item-top">密保手机</div>
                    <div class="cell-item-bottom">
                      <span>已绑定手机号156****0230</span>
                      <a>去修改</a>
                    </div>
                  </div>
                </div>

                <div class="web-cell-item">
                  <div class="item-left">
                    <WechatOutlined
                      class="web-login-app-item"
                      style="background-color: #4daf29"
                    />
                  </div>

                  <div class="item-right">
                    <div class="cell-item-top">密保手机</div>
                    <div class="cell-item-bottom">
                      <span>已绑定手机号156****0230</span>
                      <a>去修改</a>
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import {
  UserOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  TagOutlined,
  QqOutlined,
  WechatOutlined,
} from '@ant-design/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
import { Rule } from 'ant-design-vue/es/form'
const store = useUserStore()
const { userInfo } = storeToRefs(store)

const activeKey = ref('1')

const labelCol = {
  span: 3,
}

const wrapperCol = { span: 24 }

const formState = reactive({
  nickName: '刘超宾-LC',
  sex: '1',
  email: '2212722889@qq.com',
  desc: '我不是永远的倒数第一!',
  phone: '1566020230',
})

const rules: Record<string, Rule[]> = {
  nickName: [
    {
      required: true,
      message: 'Please input nickName',
      trigger: 'change',
    },
    {
      min: 5,
      max: 10,
      message: '长度要在5-10之间!',
      trigger: 'blur',
    },
  ],
  sex: [
    {
      required: true,
    },
  ],
}

const onSubmit = () => {}
</script>
<style lang="less" scoped>
@import './style/index.less';
</style>
