import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueMoment from "vue-moment";

Vue.use(VueMoment, {});
Vue.use(Buefy, {
  defaultIconPack: "mdi"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
