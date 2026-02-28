<template>
  <t-space direction="vertical">
    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      theme="s2-file"
      multiple
      :max="8"
      @dragenter="onDragenter"
      @dragleave="onDragleave"
      @drop="onDrop"
    >
    </t-upload>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { UploadFile } from 'tdesign-vue-next';

const files = ref<UploadFile[]>([
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: '这是上传失败的文件一.pdf',
    status: 'fail',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: '这是上传失败的文件二.pdf',
    status: 'fail',
  },
]);

const onDragenter = (p: any) => {
  console.log('dragenter', p);
};

const onDragleave = (p: any) => {
  console.log('dragleave', p);
};

const onDrop = (p: any) => {
  console.log('drop', p);
};
</script>
