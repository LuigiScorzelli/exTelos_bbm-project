<template>
  <div id="app">
    <navbar :is-logged-in="isLoggedIn" @logout="onLogout"></navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: { Navbar },
  computed: {
    isLoggedIn() {
      let toRet = false;
      let auth = this.$store.getters["accounts/getAuth"];
      if (auth) {
        toRet = true;
      }
      return toRet;
    }
  },
  methods: {
    async onLogout() {
      await this.$store.dispatch("accounts/logout");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
