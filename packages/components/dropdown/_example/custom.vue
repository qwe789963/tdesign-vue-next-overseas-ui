<template>
  <div class="tdesign-dropdown">
    <t-dropdown :options="options" trigger="click" :hide-after-item-click="false" :min-column-width="100">
      <t-link size="large">
        More
        <chevron-down-icon />
      </t-link>
    </t-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ChevronDownIcon } from 'tdesign-icons-vue-next';

const options = [
  {
    content: '选项一',
    value: 1,
  },
  {
    content: '选项二',
    value: 2,
    children: [
      {
        content: '选项五',
        value: 5,
      },
      {
        content: '选项六',
        value: 6,
      },
    ],
  },
  {
    content: '选项三',
    value: 3,
  },
  {
    content: '选项四',
    value: 4,
  },
];
</script>
