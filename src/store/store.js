import Vue from "vue";
import Vuex from "vuex";
import accounts from "./modules/accounts";
import users from "./modules/users";
import teams from "./modules/teams";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    accounts,
    users,
    teams
  }
});
