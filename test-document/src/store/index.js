import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import module from './module';

export default createStore({
  modules: {
    module,
  },
  plugins: [createPersistedState()],
});
