<template>
  <div>
    <action-bar>
      <template slot="actions">
        <router-link to="users/create">Create User</router-link>
      </template>
    </action-bar>
    <!-- LOADER -->
    <b-loading :active.sync="isLoading"></b-loading>
    <!-- ALERT DI CONFERMA ELIMINAZIONE -->
    <alert-dialog :is-active="isDeleteDialogActive" @confirm="onDeleteItemConfirm" @cancel="onDeleteItemCancel">
      <template slot="headerMessage">
        Vuoi eliminare questo utente?
      </template>
    </alert-dialog>
    <!-- DIALOG SELEZIONE SQUADRA-->
    <alert-dialog :is-active="isAddToTeamDialogActive" @confirm="onAddToTeamConfirm" @cancel="onAddToTeamCancel">
      <template slot="headerMessage">
        Aggiungi il giocatore ad una squadra
      </template>
      <template slot="content">
        <section>
          <b-field v-if="selectUserAvailableTeams.length > 0">
            <b-select v-model="selectedTeam" label="team">
              <option v-for="team in selectUserAvailableTeams" :key="team.id" :value="team">{{ team.denomination }}</option>
            </b-select>
          </b-field>
          <b-field v-else>
            Non è possibile selezionare nessun gruppo
          </b-field>
        </section>
      </template>
    </alert-dialog>
    <!-- TABELLA UTENTI -->
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <table-component
            :items="users"
            :columns="tableColumns"
            :actions="tableActions"
            @actionUpdate="onActionUpdate"
            @actionDelete="onActionDelete"
            @actionAddToTeam="onActionAddToTeam"
        ></table-component>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBar from "../../components/ActionBar";
import AlertDialog from "../../components/AlertDialog";
import TableComponent from "../../components/TableComponent";

export default {
  name: "usersIndex",
  components: {TableComponent, ActionBar, AlertDialog},
  data() {
    return {
      tableColumns: [
        {
          field: "id",
          label: "id"
        },
        {
          field: "type",
          label: "Type"
        },
        {
          field: "name",
          label: "Name"
        },
        {
          field: "lastName",
          label: "Last Name"
        }
      ],
      tableActions: [
        {
          name: "addToTeam",
          icon: "fas fa-basketball-ball",
          event: "actionAddToTeam"
        }
      ],
      isDeleteDialogActive: false,
      isAddToTeamDialogActive: false,
      selectedUser: null,
      selectedTeam: null,
      isLoading: false
    };
  },
  computed: {
    users() {
      return this.$store.getters["users/getItems"];
    },
    selectUserAvailableTeams() {
      if (this.selectedUser) {
        return this.$store.getters["teams/getAvailableItems"](this.selectedUser.id);
      } else {
        return [];
      }
    }
  },
  created() {
    this.$store.dispatch("users/find");
    this.$store.dispatch("teams/find");
  },
  methods: {
    goToUpdateView(id) {
      this.$router.push({name: "usersUpdate", params: {id}});
    },
    onActionUpdate(user) {
      this.goToUpdateView(user.id);
    },
    onActionDelete(user) {
      this.selectedUser = user;
      this.toggleDeleteDialog(true);
    },
    onActionAddToTeam(user) {
      this.selectedUser = user;
      this.toggleAddToTeamDialog(true);
    },
    async deleteItem() {
      await this.$store.dispatch("users/delete", this.selectedUser);
    },
    toggleDeleteDialog(active) {
      this.isDeleteDialogActive = active;
    },
    toggleAddToTeamDialog(active) {
      this.isAddToTeamDialogActive = active;
    },
    onDeleteItemConfirm() {
      this.toggleDeleteDialog(false);
      this.deleteItem();
      this.selectedUser = null;
    },
    onDeleteItemCancel() {
      this.selectedUser = null;
      this.toggleDeleteDialog(false);
    },
    async onAddToTeamConfirm() {
      this.toggleAddToTeamDialog(false);
      this.isLoading = true;
      setTimeout(async () => {
        if (this.selectedTeam) {
          this.selectedTeam.players.push(this.selectedUser.id);
          await this.updateTeam();
          this.selectedTeam = null;
          this.selectedUser = null;
        }
        this.isLoading = false;
      }, 1500);
    },
    onAddToTeamCancel() {
      this.selectedTeam = null;
      this.selectedUser = null;
      this.toggleAddToTeamDialog(false);
    },
    async updateTeam () {
      await this.$store.dispatch("teams/update", this.selectedTeam);
    }
  }
};
</script>
