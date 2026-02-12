<template>
  <div class="tdesign-dropdown">
    <t-dropdown :options="options" @click="clickHandler">
      <t-space>
        <t-link size="large">
          More
          <chevron-down-icon />
        </t-link>
      </t-space>
    </t-dropdown>
  </div>
</template>
<script lang="jsx">
import { ChevronDownIcon, LocationIcon } from 'tdesign-icons-vue-next';

export default {
  components: {
    ChevronDownIcon,
  },
  data() {
    return {
      options: [
        {
          content: 'Fifth Tab',
          value: 1,
          prefixIcon: () => <LocationIcon />,
        },
        {
          content: 'Sixth Tab',
          value: 2,
          prefixIcon: () => <LocationIcon />,
        },
        {
          content: 'Seventh Tab',
          value: 3,
          prefixIcon: () => <LocationIcon />,
        },
      ],
    };
  },
  methods: {
    clickHandler() {
      // console.log(`checked【${data.value}】`);
    },
  },
};
</script>
