<template>
  <div class="web-layout-footer">
    <div class="layout-footer-top">
      <div>学习文档</div>
      <div>官网</div>
    </div>
    <div class="layout-footer-bottom">Copyright © 2024 淅川县 LC 科技</div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less">
.web-layout-footer {
  width: 100%;
  margin-top: 20px;
  .web-fun-col-center();

  .layout-footer-top {
    display: flex;

    div {
      color: #b3b2b2;
      margin: 0 20px;
    }
  }

  .layout-footer-bottom {
    font-size: 14px;
    color: #b3b2b2;
    margin-top: 10px;
  }
}
</style>
