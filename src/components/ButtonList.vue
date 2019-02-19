<template>
  <div class="buttons is-centered">
    <button v-for="(btn, index) in buttons" :key="index" class="button" @click="$emit(btn.method)">
      {{ btn.value }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonList",
  props: {
    buttons: Array
  }
};
</script>

<style scoped></style>
