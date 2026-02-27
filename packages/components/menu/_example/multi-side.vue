<template>
  <div class="box">
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
        <!-- <template #icon>
          <icon name="mail" />
        </template> -->
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
      <t-menu-item value="user-circle">
        <!-- <template #icon>
          <icon name="user-circle" />
        </template> -->
        个人中心
      </t-menu-item>
      <t-submenu disabled title="视频区" value="4">
        <!-- <template #icon>
          <icon name="play-circle" />
        </template> -->
        <t-menu-item value="4-1">二级菜单内容</t-menu-item>
        <t-menu-item value="4-2">二级菜单内容</t-menu-item>
        <t-menu-item value="4-3">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">
        <!-- <template #icon>
          <icon name="edit-1" />
        </template> -->
        资源编辑
      </t-menu-item>
    </t-menu>

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
        <!-- <template #icon>
          <icon name="mail" />
        </template> -->
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
        <!-- <template #icon>
          <icon name="play-circle" />
        </template> -->
        <t-menu-item value="4-1">二级菜单内容</t-menu-item>
        <t-menu-item value="4-2">二级菜单内容</t-menu-item>
        <t-menu-item value="4-3">二级菜单内容</t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">资源编辑</t-menu-item>
      <!-- <template #operations>
        <t-button variant="text" shape="square">
          <t-button variant="text" shape="square" @click.native="changeCollapsed">
            <view-list-icon slot="icon" />
          </t-button>
        </t-button>
      </template> -->
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
