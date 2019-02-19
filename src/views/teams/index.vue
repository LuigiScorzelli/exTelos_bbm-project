<template>
  <div>
    <action-bar>
      <template slot="actions">
        <router-link to="teams/create">Create new Team</router-link>
      </template>
    </action-bar>
    <alert-dialog :is-active="isDeleteDialogActive" @confirm="onDeleteItemConfirm" @cancel="onDeleteItemCancel">
      <template slot="headerMessage">
        Vuoi eliminare questo team?
      </template>
    </alert-dialog>

    <team-players-dialog v-if="selectedTeam" :team="selectedTeam" :is-active="isPlayersDialogActive" @cancel="onPlayersDialogCancel">
    </team-players-dialog>

    <table-component
      :items="teams"
      :columns="tableColumns"
      :actions="tableActions"
      @actionUpdate="onActionUpdate"
      @actionDelete="onActionDelete"
      @actionShowPlayers="onActionShowPlayers"
    >
    </table-component>
  </div>
</template>

<script>
import TableComponent from "../../components/TableComponent";
import ActionBar from "../../components/ActionBar";
import AlertDialog from "../../components/AlertDialog";
import TeamPlayersDialog from "../../components/TeamPlayersDialog";

export default {
  name: "teamsIndex",
  components: {TeamPlayersDialog, TableComponent, ActionBar, AlertDialog },
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
          field: "denomination",
          label: "Denomination"
        },
        {
          field: "playersLength",
          label: "# giocatori"
        }
      ],
      tableActions: [
        {
          name: "showPlayers",
          icon: "fas fa-users",
          event: "actionShowPlayers"
        }
      ],
      isDeleteDialogActive: false,
      isPlayersDialogActive: false,
      selectedTeam: null
    };
  },
  computed: {
    teams() {
      let toRet = this.$store.getters["teams/getItems"];
      for (let i = 0; i < toRet.length; i++) {
        toRet[i].playersLength = toRet[i].players.length;
      }
      return toRet;
    }
  },
  created() {
    this.$store.dispatch("teams/find");
  },
  methods: {
    goToUpdateView(id) {
      this.$router.push({name: "teamsUpdate", params: {id}});
    },
    onActionUpdate(team) {
      this.goToUpdateView(team.id);
    },
    onActionDelete(team) {
      this.selectedTeam = team;
      this.toggleDeleteDialog(true);
    },
    onActionShowPlayers(team) {
      this.selectedTeam = team;
      this.isPlayersDialogActive = true;
    },
    onPlayersDialogCancel() {
      this.isPlayersDialogActive = false;
      this.selectedTeam = null;
    },
    async deleteItem() {
      await this.$store.dispatch("teams/delete", this.selectedTeam);
    },
    toggleDeleteDialog(active) {
      this.isDeleteDialogActive = active;
    },
    onDeleteItemConfirm() {
      this.toggleDeleteDialog(false);
      this.deleteItem();
      this.selectedTeam = null;
    },
    onDeleteItemCancel() {
      this.toggleDeleteDialog(false);
    }
  }
};
</script>
