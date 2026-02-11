<template>
  <t-space direction="vertical">
    <t-radio-group v-model="value" name="city" :options="options" allow-uncheck @change="onChange"></t-radio-group>

    <t-radio-group v-model="value2" @change="onChange2">
      <t-radio value="1">选项一</t-radio>
      <t-radio value="2">选项二</t-radio>
      <t-radio value="3">选项三</t-radio>
      <t-radio value="4" disabled>选项四</t-radio>
    </t-radio-group>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const options = [
  {
    value: '1',
    label: '选项一',
  },
  {
    value: '2',
    label: '选项二',
  },
  {
    value: '3',
    label: '选项三',
  },
  {
    value: '4',
    label: () => '选项四',
  },
];
const itemOptions = ['选项一', '选项二', '选项三', '选项四'];

const value = ref('');
const value2 = ref('');
const onChange = (checkedValues) => {
  value.value = checkedValues;
};
const onChange2 = (checkedValues) => {
  value2.value = checkedValues;
};
</script>

<style scoped>
.t-radio-group {
  margin-bottom: 16px;
}
</style>
