<template>
  <div class="box">
    <!-- 三级菜单浮层展开示例（thirdExpandType="popup"，默认） -->
    <t-menu
      theme="light"
      default-value="3-1-3"
      expand-mutex
      :s2="false"
      :default-expanded="expanded"
      :collapsed="collapsed"
      style="margin-left: 40px"
    >
      <t-submenu title="消息区" value="3">
        <t-submenu title="二级菜单" value="3-1">
          <t-menu-item value="3-1-1">三级菜单内容</t-menu-item>
          <t-menu-item value="3-1-2">三级菜单内容</t-menu-item>
          <t-menu-item value="3-1-3">三级菜单内容</t-menu-item>
        </t-submenu>
        <t-submenu title="二级菜单" value="3-5">
          <t-menu-item value="3-5-1">Third Menu Content</t-menu-item>
          <t-menu-item value="3-5-2">三级菜单内容</t-menu-item>
          <t-menu-item value="3-5-3">三级菜单内容</t-menu-item>
        </t-submenu>
        <t-menu-item value="3-2">二级菜单内容</t-menu-item>
        <t-menu-item value="3-3">二级菜单内容</t-menu-item>
        <t-menu-item value="3-4">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="user-circle">个人中心</t-menu-item>
      <t-submenu disabled title="视频区" value="4">
        <t-menu-item value="4-1">二级菜单内容</t-menu-item>
        <t-menu-item value="4-2">二级菜单内容</t-menu-item>
        <t-menu-item value="4-3">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">资源编辑</t-menu-item>
    </t-menu>

    <!-- 三级菜单平铺展开示例（thirdExpandType="normal"） -->
    <t-menu
      theme="light"
      default-value="3-2"
      :s2="false"
      third-expand-type="normal"
      expand-mutex
      :default-expanded="expanded"
      :collapsed="collapsed"
      style="margin-left: 40px"
    >
      <t-submenu title="消息区" value="3">
        <t-submenu title="二级菜单" value="3-1">
          <t-menu-item value="3-1-1">Rejected & Withdrawn</t-menu-item>
          <t-menu-item value="3-1-2">三级菜单内容</t-menu-item>
          <t-menu-item value="3-1-3">三级菜单内容</t-menu-item>
        </t-submenu>
        <t-submenu title="二级菜单" value="3-5">
          <t-menu-item value="3-5-1">Third Menu Content</t-menu-item>
          <t-menu-item value="3-5-2">三级菜单内容</t-menu-item>
          <t-menu-item value="3-5-3">三级菜单内容</t-menu-item>
        </t-submenu>
        <t-menu-item value="3-2">二级菜单内容</t-menu-item>
        <t-menu-item value="3-3">二级菜单内容</t-menu-item>
        <t-menu-item value="3-4">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="user-circle">个人中心</t-menu-item>
      <t-submenu disabled title="视频区" value="4">
        <t-menu-item value="4-1">二级菜单内容</t-menu-item>
        <t-menu-item value="4-2">二级菜单内容</t-menu-item>
        <t-menu-item value="4-3">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">资源编辑</t-menu-item>
    </t-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * 默认展开的菜单项
 */
const expanded = ref(['2', '3']);

/**
 * 是否折叠菜单
 */
const collapsed = ref(false);

/**
 * 切换折叠状态
 */
const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  gap: 40px;
}

.t-demo-collapse-btn {
  color: #fff;

  &:hover {
    background-color: #4b4b4b;
    border-color: transparent;
    --ripple-color: #383838;
  }
}
</style>
