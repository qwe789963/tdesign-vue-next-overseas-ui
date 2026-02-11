<template>
  <t-space>
    <t-radio>Not Selected</t-radio>
    <t-radio :checked="true">Selected</t-radio>
    <t-radio :checked="true" disabled>Unselectable by Default</t-radio>
    <t-radio disabled>Unselectable</t-radio>
  </t-space>
</template>

<style scoped>
.default-focus {
  .focusBox {
    display: inline-block;
  }
}
</style>
