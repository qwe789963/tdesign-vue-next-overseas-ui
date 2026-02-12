<template>
  <div class="tdesign-dropdown">
    <t-dropdown :options="options" :max-height="400" :min-column-width="88">
      <t-link size="large">
        More
        <chevron-down-icon />
      </t-link>
    </t-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ChevronDownIcon } from 'tdesign-icons-vue-next';

const options = Array.from({ length: 20 }).map((_, k) => ({
  content: `选项${k + 1}`,
  value: k + 1,
}));
</script>
