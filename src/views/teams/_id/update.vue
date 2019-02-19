<template>
  <div v-if="formData">
    <section class="section is-fullheight">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column card is-half">
            <section>
              <b-select v-model="formData.type" label="teams">
                <option v-for="type in teamTypes">{{ type }}</option>
              </b-select>
              <b-field label="name">
                <b-input type="text" v-model="formData.denomination" minlength="3"></b-input>
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
import Team from "../../../assets/models/Team";
import FormMixin from "../../../mixins/FormMixin";
export default {
  name: "teamsUpdate",
  mixins: [FormMixin],
  data() {
    return {
      teamTypes: []
    }
  },
  created() {
    this.formNamespace = "teams";
    this.updateRedirectView = "teamsIndex";

    for (let typeKey of Object.keys(Team.Type)) {
      this.teamTypes.push(Team.Type[typeKey]);
    }
  },
  computed: {
    formData() {
      let toRet = null;
      if (this.teamId) {
        toRet = JSON.parse(JSON.stringify(this.$store.getters["teams/findItem"](parseInt(this.teamId))));
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
