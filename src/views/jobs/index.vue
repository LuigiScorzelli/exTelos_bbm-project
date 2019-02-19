<template>
  <div>
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from "../../components/Calendar";

export default {
  name: "calendarIndex",
  components: {Calendar},
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped>
.borderButton {
  border: 1px solid black;
}
</style>
