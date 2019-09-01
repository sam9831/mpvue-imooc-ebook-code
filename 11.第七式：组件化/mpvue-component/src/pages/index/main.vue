<!-- index.vue -->
<template>
  <div>
    <my-item>
      <div>body...</div>
      <div slot="header">header...</div>
      <div slot="footer">footer...</div>
    </my-item>
  </div>
</template>

<script>
import MyItem from '../../components/Item'

export default {
  components: {
    MyItem
  }
}
</script>
