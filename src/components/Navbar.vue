<template>
  <div>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div v-if="isLoggedIn" class="navbar-start">
          <router-link :to="'/'" class="navbar-item">
            Home
          </router-link>
          <router-link :to="'/users'" class="navbar-item">
            Users
          </router-link>
          <router-link :to="'/teams'" class="navbar-item">
            Teams
          </router-link>
          <router-link :to="'/jobs'" class="navbar-item">
            Jobs
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" v-if="isLoggedIn" @click="onLogout()">
                <strong>Logout</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: {
    isLoggedIn: {
      type: Boolean
    }
  },
  methods: {
    onLogout() {
      this.$emit("logout");
    }
  }
};
</script>

<style>
</style>
