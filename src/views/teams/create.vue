<template>
  <div>
    <h1 class="title">Inserisci un nuovo team</h1>
    <section class="section is-fullheight">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column card is-half">
            <section>
              <b-field>
                <b-select v-model="selectedTeamType" label="team">
                  <option v-for="type in teamTypes">{{ type }}</option>
                </b-select>
              </b-field>

              <b-field label="denomination">
                <b-input v-model="formData.denomination" type="text" minlength="3">
                </b-input>
              </b-field>

              <a class="button is-primary" @click="onSave()">
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
import Team from "../../assets/models/Team";
import FormMixin from "../../mixins/FormMixin";

export default {
  name: "TeamsCreate",
  mixins: [FormMixin],
  data() {
    return {
      Team,
      teamTypes: [],
      selectedTeamType: null,
      minibasketDefault: {
        denomination: "",
        type: Team.Type.MINIBASKET,
        players: []
      },
      basketDefault: {
        denomination: "",
        type: Team.Type.BASKET,
        players: []
      },
    }
  },
  computed: {
    formData() {
      let toRet = null;
      switch (this.selectedTeamType) {
        default:
          toRet = {
            denomination: ""
          };
          break;
        case Team.Type.MINIBASKET:
          toRet = this.minibasketDefault;
          break;
        case Team.Type.BASKET:
          toRet = this.basketDefault;
          break;
      }
      return toRet;
    }
  },
  created() {
    this.formNamespace = "teams";
    this.createRedirectView = "teamsIndex";

    for (let typeKey of Object.keys(Team.Type)) {
      this.teamTypes.push(Team.Type[typeKey]);
    }
  },
  methods: {
    async onSave () {
      this.formCreate();
    }
  }
}
</script>