import Team from "../../assets/models/Team";
import httpClient from "../../api/httpClient";
import * as api from "../../api/api";

export default {
  namespaced: true,
  state: {
    items: []
  },
  actions: {
    async find (context) {
      try {
        let response = await httpClient.getRequest(api.TEAMS_URL);
        context.commit("setItems", response.data);
      } catch (e) {
        console.log("errore", JSON.stringify(e.message));
      }
    },
    async create(context, team) {
      try {
        let response = await httpClient.postRequest(api.TEAMS_URL, team);
        context.commit("pushItem", response.data);
      } catch (e) {
        console.log("errore", JSON.stringify(e.message));
      }
    },
    async update(context, team) {
      let foundIndex = context.getters.findIndex(team.id);
      try {
        await httpClient.putRequest( api.TEAMS_URL + team.id, team);
        if (foundIndex !== -1) {
          context.commit("updateItem", {team, index: foundIndex});
        }
      } catch (e) {
        console.log("errore put", JSON.stringify(e.message));
      }
    },
    async delete(context, team) {
      let foundIndex = context.getters.findIndex(team.id);
      try {
        await httpClient.deleteRequest(api.TEAMS_URL + team.id);
        if (foundIndex !== -1) {
          context.commit("deleteItem", foundIndex);
        }
      } catch (e) {
        console.log("errore", JSON.stringify(e.message));
      }
    }
  },
  mutations: {
    setItems (state, users) {
      state.items = users;
    },
    pushItem(state, team) {
      state.items.push(team);
    },
    updateItem(state, {team, index}) {
      state.items[index] = team;
    },
    deleteItem(state, index) {
      state.items.splice(index, 1);
    }
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getAvailableItems: state => {
      return playerId => state.items.filter(item => !item.players.includes(parseInt(playerId)));
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
    }
  }
};
