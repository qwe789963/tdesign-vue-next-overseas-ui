<template>
  <div class="tdesign-dropdown">
    <t-dropdown :options="options" :min-column-width="88">
      <t-button variant="outline">
        More
        <caret-down-small-icon />
      </t-button>
    </t-dropdown>
  </div>
</template>
<script lang="jsx">
import { CaretDownSmallIcon } from 'tdesign-icons-vue-next';

export default {
  components: {
    CaretDownSmallIcon,
  },
  data() {
    return {
      options: [
        { content: 'First Tab', value: 1 },
        { content: 'Second Tab', value: 2 },
        { content: 'Third Tab', value: 3, divider: true },
        { content: 'Fourth Tab', value: 4 },
      ],
    };
  },
};
</script>
