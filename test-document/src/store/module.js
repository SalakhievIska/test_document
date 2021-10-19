export default {
  mutations: {
    createType(state, newType) {
      state.types.unshift(newType);
    },
    deleteType(state, id) {
      state.documents.filter((el) => el.typeId === id).forEach(
        (el) => this.commit('deleteDocument', el.id),
      );

      state.types.splice(state.types.findIndex((el) => el.id === id), 1);
    },

    createDocument(state, newDocument) {
      state.documents.unshift(newDocument);
    },
    deleteDocument(state, id) {
      state.documents.splice(state.documents.findIndex((el) => el.id === id), 1);
    },
  },
  state: {
    types: [],
    documents: [],
  },
  getters: {
    allTypes: (state) => state.types,
    newTypeId: (state) => {
      if (state.types.length === 0) return 0;
      return state.types.reduce((a, b) => (a < b ? a : b)).id;
    },
    allDocuments: (state) => state.documents,
    newDocumentId: (state) => {
      if (state.documents.length === 0) return 0;
      return state.documents.reduce((a, b) => (a < b ? a : b)).id;
    },
  },
};
