<template>
  <div>
    <calendar @show-modal="onShowModal"></calendar>

    <alert-dialog :is-active="isAddEventDialogActive" @confirm="onAddEventConfirm" @cancel="onAddEventCancel">
      <template slot="headerMessage">
        Aggiungi evento 
      </template>
      <template slot="content">
        <section>
          <b-field label="Tipologia">
            <b-select v-model="event.type" label="Seleziona" expanded>
              <option v-for="(type, index) in typologies" :key="index" :value="type.value">{{ type.name }}</option>
            </b-select>
          </b-field>
          <b-field v-if="event.type === 'ALLENAMENTO' && teams.length > 0" label="Squadra">
            <b-select v-model="event.team" label="Team" expanded>
              <option v-for="team in teams" :key="team.id" :value="team">{{ team.denomination }}</option>
            </b-select>
          </b-field>
          <b-field label="Partecipanti" v-else>
            <b-taginput
              v-model="event.users"
              :data="filteredUsers"
              autocomplete
              field="completeName"
              ellipsis
              icon="label"
              placeholder="Aggiungi persona"
              @typing="getFilteredUsers"
            ></b-taginput>
          </b-field>
          <b-field label="Orario di inizio">
            <b-timepicker
              v-model="event.startTime"
              rounded
              placeholder="Seleziona"
              icon="clock"
            >
            </b-timepicker>
          </b-field>
          <b-field label="Orario di fine">
            <b-timepicker 
              v-model="event.endTime"
              rounded
              placeholder="Seleziona"
              icon="clock"
            >
            </b-timepicker>
          </b-field>
          <b-field label="Descrizione">
            <b-input v-model="event.description"></b-input>
          </b-field>
        </section>
      </template>
    </alert-dialog>
  </div>
</template>

<script>
import Calendar from "../../components/Calendar";
import AlertDialog from "../../components/AlertDialog";

export default {
  name: "calendarIndex",
  components: {Calendar, AlertDialog},
  data() {
    return {
      isAddEventDialogActive: false,
      event: {
        team: {},
        users: [],
        type: "ALLENAMENTO",
        startTime: null,
        endTime: null,
        description: ""
      },
      filteredUsers: [],
      typologies: [
        {
          name: "RIUNIONE",
          value: "RIUNIONE"
        },
        {
          name: "ALLENAMENTO",
          value: "ALLENAMENTO"
        },
      ]
    };
  },
  created() {
    this.$store.dispatch("teams/find");
    this.$store.dispatch("users/find");
    this.filteredUsers = this.users;
  },
  computed: {
    teams() {
      return this.$store.getters["teams/getItems"];
    },
    users() {
      return this.$store.getters["users/getItems"];
    }
  },
  methods: {
    getFilteredUsers(text) {
      this.filteredUsers = this.users.filter(user => {
        if(user.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0 
        || user.lastName.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0) {
          let completeName = user.name + ' ' + user.lastName;
          user.completeName = completeName;
          return user.completeName
        }
      })
    },
    toggleAddEventDialog(active) {
      this.isAddEventDialogActive = active;
    },
    isValid(event) {
      return true;
    },
    onShowModal(indexes) {
      this.toggleAddEventDialog(true);
    },
    onAddEventConfirm() {
      if(this.isValid(this.event)) {
        this.$store.dispatch("events/create",this.event);
      }
      this.toggleAddEventDialog(false);
    },
    onAddEventCancel() {
      this.toggleAddEventDialog(false);
    }
  }
};
</script>

<style scoped>
.borderButton {
  border: 1px solid black;
}
</style>
