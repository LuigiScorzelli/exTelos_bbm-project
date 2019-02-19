<template>
  <alert-dialog
    :is-active="isActive"
    :show-confirm="showConfirm"
    @cancel="onDialogCancel"
  >
    <template slot="headerMessage">
      tutti i giocatori associati a questa scquadra
    </template>
    <template slot="content">
      <div>
        <table-component
         :items="teamPlayers"
         :columns="tableColumns"
         :show-delete="false"
         :show-update="false"
        >
        </table-component>
      </div>
    </template>
  </alert-dialog>
</template>

<script>
import AlertDialog from "./AlertDialog";
import TableComponent from "./TableComponent";

export default {
  name: "TeamPlayersDialog",
  components: {TableComponent, AlertDialog },
  props: {
    team: {
      type: Object,
      required: true
    },
    isActive: {type: Boolean}
  },
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
      showConfirm: false
    }
  },
  created() {
    this.$store.dispatch("users/find");
  },
  computed: {
    teamPlayers() {
      return this.$store.getters["users/findItems"](this.team.players);
    }
  },
  methods: {
    onDialogCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped></style>
