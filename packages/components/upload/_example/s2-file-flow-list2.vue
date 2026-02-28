<template>
  <t-space direction="vertical">
    <div>
      Display thumbnails:
      <t-switch v-model="showThumb" size="medium" />
    </div>
    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      placeholder="支持批量上传图片文件"
      theme="s2-file"
      multiple
      :show-thumb="showThumb"
      :max="8"
      @dragenter="onDragenter"
      @dragleave="onDragleave"
      @drop="onDrop"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const showThumb = ref(true);
const files = ref([
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: '这是上传失败的文件一.pdf',
    showThumb: true,
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: '这是上传失败的文件二.pdf',
    showThumb: false,
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: '这是上传失败的文件三.pdf',
  },
]);

/**
 * 拖拽进入回调
 */
const onDragenter = (p) => {
  console.log('dragenter', p);
};

/**
 * 拖拽离开回调
 */
const onDragleave = (p) => {
  console.log('dragleave', p);
};

/**
 * 拖拽释放回调
 */
const onDrop = (p) => {
  console.log('drop', p);
};
</script>
