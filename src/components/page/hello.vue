<template>
  <div id="hello">
    <p>
      {{ msg }} World!
    </p>
  </div>
</template>

<script>
export default {
  name: "Hello",
  computed: {
    msg() {
      return this.$store.state.msg;
    },
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
  color: #2e9afe;
}
</style>

