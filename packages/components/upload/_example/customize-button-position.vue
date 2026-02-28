<template>
  <t-space direction="vertical">
    <div>position: <t-switch v-model="pos" size="medium" :label="['Up', 'Down']" /></div>

    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      placeholder="使用filelistdisply"
      theme="s2-file"
      multiple
      :show-thumb="showThumb"
      :max="8"
      :position="pos ? 'top' : 'bottom'"
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

const showThumb = ref(true);
const pos = ref(true);
const files = ref<UploadFile[]>([]);

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
