<template>
  <div class="box">
    <t-head-menu>
      <template #logo>
        <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
      </template>
      <template #s2Menu>
        <t-menu expand-mutex default-value="Internal Hiring Program" @change="onChange" @expand="onExpand">
          <!-- 可通过 trigger 自定义触发按钮 -->
          <!-- <template #trigger>
            MENU
          </template> -->
          <t-submenu title="Home" value="Home">
            <t-menu-item value="My Profile" to="/vue/components/menu?tab=api">API(会关闭菜单）</t-menu-item>
          </t-submenu>
          <t-submenu title="HR" value="HR">
            <t-menu-item value="Benefits">Benefits</t-menu-item>
            <t-submenu title="Recruiting and Referral" value="Recruiting and Referral">
              <t-menu-item value="Internal Hiring Program">Internal Hiring Program</t-menu-item>
              <t-menu-item value="Emplovee Referral Program">Emplovee Referral Program</t-menu-item>
              <t-menu-item value="Campus Recruitment">Campus Recruitment</t-menu-item>
              <t-menu-item value="Overseas Interviewers">Overseas Interviewers</t-menu-item>
            </t-submenu>
            <t-menu-item value="Employee Journey">Employee Journey</t-menu-item>
            <t-menu-item value="Learning and Development">Learning and Development</t-menu-item>
            <t-menu-item value="Quick Links">Quick Links</t-menu-item>
          </t-submenu>
          <t-submenu title="ExpenseManagement" value="ExpenseManagement">
            <t-menu-item value="Reimbursement Application">Reimbursement Application</t-menu-item>
            <t-menu-item value="Application Query">Application Query</t-menu-item>
            <t-menu-item value="In Progess">In Progess</t-menu-item>
            <t-menu-item value="Pending my Approval">Pending my Approval</t-menu-item>
            <t-menu-item value="Approved Applications">Approved Applications</t-menu-item>
            <t-menu-item value="My Draft">My Draft</t-menu-item>
            <t-menu-item value="Rejected & Withdrawn">Rejected & Withdrawn</t-menu-item>
          </t-submenu>
          <t-menu-item value="PreTravel Request">PreTravel Request</t-menu-item>
        </t-menu>
      </template>
      <template #operations>
        <div class="lang-operator" @click="changeLocale">
          <earth-icon size="19px" />
          <span>{{ locale }}</span>
        </div>
        <t-popup placement="bottom-right" overlay-inner-class-name="user-info-inner">
          <t-avatar size="30px" :image="userInfo.avatar"></t-avatar>
          <template #content>
            <div class="user-card">
              <t-avatar size="76px" :image="userInfo.avatar"></t-avatar>
              <div class="user-name">{{ userInfo.fullName }}</div>
              <div class="user-org">
                <div>{{ userInfo.deptName }}</div>
                <div>{{ userInfo.orgName }}</div>
              </div>
              <t-button shape="round" variant="outline" style="width: 120px" size="medium" @click="signOut">
                Sign Out
              </t-button>
            </div>
          </template>
        </t-popup>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EarthIcon } from 'tdesign-icons-vue-next';

/**
 * 用户信息数据
 */
const userInfo = ref({
  fullName: 'sanzhang(张三)',
  avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  deptName: 'S Lines Finacial Management',
  orgName: 'Tencent   Technology (Shenzhen) Co., Ltd',
});

/**
 * 当前语言
 */
const locale = ref('English');

/**
 * 登出操作
 */
const signOut = () => {
  console.log('sign out');
};

/**
 * 切换语言
 */
const changeLocale = () => {
  console.log('change locale');
  locale.value = locale.value === 'English' ? '中文' : 'English';
};

/**
 * 菜单选中事件
 */
const onChange = (value: string | number) => {
  console.log('[menu change]: ', value);
};

/**
 * 菜单展开事件
 */
const onExpand = (value: Array<string | number>) => {
  console.log('[menu expand]: ', value);
};
</script>

<style lang="less">
.user-info-inner {
  margin-top: 19px !important; // (60 - 30) / 2 + 4
  color: #333333;
  min-width: 300px;
  max-width: 450px;
  border-radius: 16px;
}
.lang-operator {
  display: flex;
  gap: 12.34px;
  align-items: center;
}
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 25px 43px;
}
.user-name {
  font-size: 16px;
  line-height: 15px;
  font-weight: bold;
  margin: 27px 0 21px;
}
.user-org {
  line-height: 14px;
  text-align: center;
  margin-bottom: 50px;
  word-break: break-word;
  div:not(:last-child) {
    margin-bottom: 14px;
  }
}
</style>
