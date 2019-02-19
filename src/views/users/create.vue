<template>
  <div>
    <h1 class="title">Inserisci un nuovo utente</h1>
    <section class="section is-fullheight">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column card is-half">
            <section>
              <b-field>
                <b-select v-model="selectedUserType" label="Ruolo">
                  <option v-for="type in userTypes">{{ type }}</option>
                </b-select>
              </b-field>

              <b-field label="name">
                <b-input v-model="formData.name" type="text" minlength="3">
                </b-input>
              </b-field>

              <b-field label="lastName">
                <b-input v-model="formData.lastName" type="text" minlength="3">
                </b-input>
              </b-field>

              <div v-if="selectedUserType === User.Type.PLAYER">
                <b-field label="age">
                  <b-input v-model="formData.age" type="number">
                  </b-input>
                </b-field>

                <b-field label="height">
                  <b-input v-model="formData.height" type="number" step="0.01">
                  </b-input>
                </b-field>

                <b-field label="weight">
                  <b-input v-model="formData.weight" type="number">
                  </b-input>
                </b-field>
                <br>
              </div>

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
import User from "../../assets/models/User";
import FormMixin from "../../mixins/FormMixin";

export default {
  name: "UsersCreate",
  mixins: [FormMixin],
  data() {
    return {
      User,
      userTypes: [],
      selectedUserType: null,
      coachDeafault: {
        name: "",
        lastName: "",
        type: User.Type.COACH
      },
      playerDefault: {
        name: "",
        lastName: "",
        type: User.Type.PLAYER,
        age: null,
        height: null,
        weight: null
      },
      managerDefault: {
        name: "",
        lastName: "",
        type: User.Type.MANAGER
      }
    };
  },
  created() {
    this.formNamespace = "users";
    this.createRedirectView = "usersIndex";

    for (let typeKey of Object.keys(User.Type)) {
      this.userTypes.push(User.Type[typeKey]);
    }
  },
  computed: {
    formData() {
      let toRet = null;
      switch (this.selectedUserType) {
        default:
          toRet = {
            name: "",
            lastName: ""
          };
          break;
        case User.Type.COACH:
          toRet = this.coachDeafault;
          break;
        case User.Type.PLAYER:
          toRet = this.playerDefault;
          break;
        case User.Type.MANAGER:
          toRet = this.managerDefault;
          break;
      }
      return toRet;
    }
  },
  methods: {
    onSave() {
      this.formCreate();
    }
  }
};
</script>
