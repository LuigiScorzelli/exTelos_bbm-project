<template>
  <div v-if="formData">
    <section class="section is-fullheight">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column card is-half">
            <section>
              <b-select v-model="formData.type" label="Ruolo">
                <option v-for="type in userTypes">{{ type }}</option>
              </b-select>
              <b-field label="name">
                <b-input type="text" v-model="formData.name" minlength="3"> </b-input>
              </b-field>

              <b-field label="lastName">
                <b-input type="text" v-model="formData.lastName" minlength="3"> </b-input>
              </b-field>
              <a class="button" @click="onSave()">
                Save
              </a>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import User from "../../../assets/models/User";
import FormMixin from "../../../mixins/FormMixin";

export default {
  name: "updateUser",
  mixins: [FormMixin],
  data() {
    return {
      userTypes: []
    }
  },
  created() {
    this.formNamespace = "users";
    this.updateRedirectView = "usersIndex";

    for (let typeKey of Object.keys(User.Type)) {
      this.userTypes.push(User.Type[typeKey]);
    }
  },
  computed: {
    formData() {
      let toRet = null;
      if (this.teamId) {
        toRet = JSON.parse(JSON.stringify(this.$store.getters["users/findItem"](parseInt(this.teamId))));
      }
      return toRet;
    },
    teamId() {
      return this.$route.params.id;
    }
  },
  methods: {
    onSave() {
      this.formUpdate();
    }
  }
};
</script>
