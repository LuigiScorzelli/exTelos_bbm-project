<script>
export default {
  name: "FormMixin",
  data() {
    return {
      formNamespace: null,
      createRedirectView: null,
      updateRedirectView: null
    }
  },
  computed: {
    formData() {
      return null;
    },
    formId() {
      return null;
    },
    formCreateAction() {
      return this.formNamespace + "/create";
    },
    formUpdateAction() {
      return this.formNamespace + "/update";
    }
  },
  methods: {
    async formCreate() {
      await this.$store.dispatch(this.formCreateAction, this.formData);
      this.formCreated();
    },
    async formUpdate() {
      await this.$store.dispatch(this.formUpdateAction, this.formData);
      this.formUpdated();
    },
    formCreated() {
      if (this.createRedirectView) {
        this.redirect(this.createRedirectView);
      }
    },
    formUpdated() {
      if (this.updateRedirectView) {
        this.redirect(this.updateRedirectView);
      }
    },
    redirect(redirectUrl) {
      this.$router.push({ name: redirectUrl });
    }
  }
};
</script>
