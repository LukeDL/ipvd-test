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
      state.session.id = data.id;
      state.session.expires = data.expires;
    },
    endSession(state) {
      state.session.id='';
      state.session.expires=0;
    }
  },
  actions: {
    createSession({ commit }, data) {
      commit("setSession", data);
    },
    endSession({ commit }) {
      commit("endSession");
    }
  },
});

export default store;
