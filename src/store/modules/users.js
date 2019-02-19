import httpClient from "../../api/httpClient";
import * as api from "../../api/api";

export default {
  namespaced: true,
  state: {
    items: []
  },
  actions: {
    async create(context, user) {
      try {
        let response = await httpClient.postRequest(api.USERS_URL, user);
        context.commit("pushItem", response.data);
      } catch (e) {
        console.log("errore", JSON.stringify(e.message));
      }
    },
    async update(context, user) {
      let foundIndex = context.getters.findIndex(user.id);
      try {
        await httpClient.putRequest( api.USERS_URL + user.id, user);
        if (foundIndex !== -1) {
          context.commit("updateItem", {user, index: foundIndex});
        }
      } catch (e) {
        console.log("errore put", JSON.stringify(e.message));
      }
    },
    async delete(context, user) {
      let foundIndex = context.getters.findIndex(user.id);
      try {
        await httpClient.deleteRequest(api.USERS_URL + user.id);
        if (foundIndex !== -1) {
          context.commit("deleteItem", foundIndex);
        }
      } catch (e) {
        console.log("errore", JSON.stringify(e.message));
      }
    },
    async find (context) {
      try {
        let response = await httpClient.getRequest(api.USERS_URL);
        context.commit("setItems", response.data);
      } catch (e) {
        console.log("errore", JSON.stringify(e.message));
      }
    }
  },
  mutations: {
    pushItem(state, user) {
      state.items.push(user);
    },
    updateItem(state, {user, index}) {
      state.items[index] = user;
    },
    deleteItem(state, index) {
      state.items.splice(index, 1);
    },
    setItems (state, users) {
      state.items = users;
    }
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    findItem: state => id => {
      return state.items.find(item => {
        return item.id === id;
      });
    },
    findIndex: state => id => {
      return state.items.findIndex(item => {
        return item.id === id;
      });
    },
    findItems: state => ids => {
      return state.items.filter(item => {
        return ids.includes(parseInt(item.id));
      });
    }
  }
};
