<template>
  <div class="columns is-vcentered is-centered">
    <div class="column card is-half">
      <section>
        <b-field label="username">
          <b-input type="text" v-model="username"> </b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password" password-reveal v-model="password">
          </b-input>
        </b-field>
        <a class="button" @click="login()">
          Login
        </a>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    auth() {
      return this.$store.getters.getAuth;
    }
  },
  methods: {
    async login() {
      let response = await this.$store.dispatch("accounts/login", {
        username: this.username,
        password: this.password
      });
      if (!response) {
        this.$router.push({ name: "home" });
      } else {
        alert(response);
      }
    }
  }
};
</script>

<style scoped>
.is-vcentered {
  margin-top: 8%;
}
</style>
