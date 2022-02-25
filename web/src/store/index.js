import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      session: {
        id: "",
        expires: 0,
      },
    };
  },
  mutations: {
    setSession(state, data) {
      console.log('setSession', data);
      state.session.id = data.id;
      state.session.expires = data.expires;
    },
  },
  actions: {
    createSession({ commit }, data) {
      console.log("dispatching createSession:", data);
      commit("setSession", data);
    },
  },
});

export default store;
