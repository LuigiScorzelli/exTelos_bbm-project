import Event from "../../assets/models/Event";
import httpClient from "../../api/httpClient";
import * as api from "../../api/api";

export default {
  namespaced: true,
  state: {
    items: []
  },
  actions: {
    async create(context, event) {
      try {
        let response = await httpClient.postRequest(api.EVENTS_URL, event);
        context.commit("pushItem", response.data);
      } catch (e) {
        console.log("errore", JSON.stringify(e.message));
      }
    }
  },
  mutations: {
    pushItem(state, event) {
      state.items.push(event);
    }
  },
  getters: {}
};
