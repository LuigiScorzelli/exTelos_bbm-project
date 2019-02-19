import Account from "../../assets/models/Account";

export default {
  namespaced: true,
  state: {
    auth: null,
    items: [
      new Account(1, {
        username: "admin",
        password: "abc",
        role: "admin",
        teamId: 1
      })
    ]
  },
  actions: {
    async login(context, { username, password }) {
      /*let foundAccount = null;
      for (let account of context.store.items) {
        if (account.username === username) {
          if (account.password === password) {
            foundAccount = account;
          }
        }
      }*/
      let foundAccount = context.state.items.find(account => {
        return account.username === username && account.password === password
      });
      if (foundAccount) {
        let user = context.rootGetters["users/findItem"](foundAccount.teamId);
        if (user) {
          foundAccount.user = user;
        }
        context.commit("setAuth", foundAccount);
      } else {
        return "Username o Password Errati";
      }
    },
    async logout(context) {
      context.commit("logoutAuth", null);
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
    logoutAuth(state, auth) {
      state.auth = auth;
    }
  },
  getters: {
    getAuth(state) {
      return state.auth;
    }
  }
};
