<template>
  <b-modal :active.sync="isActive" :can-cancel="false" has-modal-card>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <h2>
            <slot name="headerMessage"></slot>
          </h2>
        </header>
        <section class="modal-card-body">
          <slot name="content"></slot>
        </section>
        <slot name="footer">
          <footer class="modal-card-foot">
            <button class="button" @click="onCancel">Chiudi</button>
            <button v-if="showConfirm" class="button is-primary" @click="onConfirm">Ok</button>
          </footer>
        </slot>
    </div>
  </b-modal>
</template>

<script>
import BModal from "buefy/src/components/modal/Modal";
export default {
  name: "AlertDialog",
  components: { BModal },
  props: {
    isActive: { type: Boolean },
    showConfirm: { type: Boolean, default: true }
  },
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
