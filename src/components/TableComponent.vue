<template>
  <b-table :data="items" :columns="columns">
    <template slot-scope="props">
      <b-table-column
          v-for="(col, index) in columns"
          :key="index"
          :field="col.field"
          :label="col.label"
      >
        <template v-if="col.field === 'actions'">
          <div class="block">
            <span style="margin-right: 20px;">
              <a v-for="action in actions" :key="action.name" class="button" @click="onRowAction(action, props.row)">
                <i :class="action.icon"></i>
              </a>
            </span>

            <a v-for="action in standardActions" :key="action.name" :class="'button ' + action.button" @click="onRowAction(action, props.row)" style="margin-right: 3px;">
              <i :class="action.icon"></i>
            </a>
          </div>
        </template>
        <template v-else>
          {{ props.row[col.field] }}
        </template>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
export default {
  name: "TableComponent",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    showUpdate: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      standardActions: [],
      actionUpdate: {
        name: "update",
        button: "is-primary is-outlined",
        icon: "fas fa-pencil-alt",
        event: "actionUpdate"
      },
      actionDelete: {
        name: "delete",
        button: "is-danger is-outlined",
        icon: "fas fa-trash-alt",
        event: "actionDelete"
      }
    };
  },
  created () {
    if (this.showUpdate) {
      this.standardActions.push(this.actionUpdate)
    }
    if (this.showDelete) {
      this.standardActions.push(this.actionDelete)
    }
    if (this.standardActions.length > 0 || this.actions.length > 0) {
      this.columns.push({
        field: "actions",
        label: "Azioni",
      })
    }
  },
  methods: {
    onRowAction (action, row) {
      this.$emit(action.event, row)
    }
  }
};
</script>
