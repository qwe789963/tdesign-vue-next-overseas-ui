<template>
  <t-space direction="vertical">
    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      placeholder="使用filelistdisply"
      theme="s2-file"
      multiple
      :show-thumb="showThumb"
      :outer-btn-text="'Customize Button'"
      :inner-btn-text="'Customize Upload'"
      :max="8"
      @dragenter="onDragenter"
      @dragleave="onDragleave"
      @drop="onDrop"
    >
      <template #fileListDisplay>
        <div>
          <div v-for="(file, index) in files" :key="file.name">
            {{ file.name }}
            <delete-icon size="small" @click="() => outsideRemove(index)" />
          </div>
        </div>
      </template>
    </t-upload>
  </t-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DeleteIcon } from 'tdesign-icons-vue-next';
import type { UploadFile } from 'tdesign-vue-next';

const showThumb = ref(true);
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

const outsideRemove = (index: number) => {
  files.value.splice(index, 1);
};
</script>
