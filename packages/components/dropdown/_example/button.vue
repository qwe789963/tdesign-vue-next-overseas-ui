<template>
  <div class="tdesign-dropdown">
    <t-dropdown :options="options" @click="clickHandler">
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
        {
          content: 'Fifth Tab',
          value: 1,
        },
        {
          content: 'Sixth Tab',
          value: 2,
        },
        {
          content: 'Seventh Tab',
          value: 3,
        },
      ],
    };
  },
  methods: {
    clickHandler(data) {
      console.log(`checked【${data.content}】`);
    },
  },
};
</script>
