export const state = () => ({
  accessToken: null,
  refreshToken: null,
  fullname: null
});

export const getters = {
  authenticated(state) {
    if(state.accessToken) {
      return true;
    }
    return false;
  }
}

export const mutations = {
  setFullName(state, fullName) {
    state.fullname = fullName;
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  logout(state) {
    state.fullname = null;
    state.accessToken = null;
    state.refreshToken = null;
  }
}

export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.post('http://localhost:3000/login', payload);
    if(!response) { return false }

    commit('setFullName', response.data.fullname);
    commit('setAccessToken', response.data.accessToken);
    commit('setRefreshToken', response.data.refreshToken);

    return response;
  }
}
