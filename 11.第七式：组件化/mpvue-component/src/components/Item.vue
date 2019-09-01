<!-- Item.vue -->
<template>
  <div>
    <div>This is Header</div>
    <slot name="header"></slot>
    <div>This is Body</div>
    <slot></slot>
    <div>This is Footer</div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {
  }
</script>
