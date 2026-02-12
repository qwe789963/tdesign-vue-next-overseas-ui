<template>
  <div class="tdesign-dropdown">
    <t-dropdown :options="options" :max-column-width="120" direction="left" @click="clickHandler">
      <t-link size="large">
        More
        <chevron-down-icon />
      </t-link>
    </t-dropdown>
  </div>
</template>
<script setup>
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const options = [
  {
    content: '选项一',
    value: 1,
    children: [
      {
        content: '选项九',
        value: 9,
      },
    ],
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
        children: [
          {
            content: '选项七',
            value: 7,
          },
          {
            content: '选项八',
            value: 8,
          },
        ],
      },
    ],
  },
  {
    content: '选项三',
    value: 3,
    children: [
      {
        content: '选项十',
        value: 10,
      },
    ],
  },
];

const clickHandler = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
</script>
