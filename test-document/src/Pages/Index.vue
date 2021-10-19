<template>
  <el-container>
    <el-header>
      <el-row align="middle">
        <el-col :span="12">
          <h2>
            Документы
          </h2>
        </el-col>

        <el-col :span="12" align="right">
          <!-- <el-button circle>
            <i class="el-icon-collection-tag"></i>
          </el-button> -->

          <el-button
              round
              icon="el-icon-plus"
              @click="typeFormVisible = true">
            Новый тип
          </el-button>

          <el-button
              round
              icon="el-icon-plus"
              @click="documentFormVisible = true">
            Новый документ
          </el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row>
        <el-col :span="12">
          <el-input
              v-model="searchText"
              v-on:input="onSearchInput"
              placeholder="Поиск..."
              prefix-icon="el-icon-search"
              clearable />
        </el-col>
      </el-row>

      <el-row class="accordion">
        <el-col :span="12">
          <div v-for="_type in types" :key="_type.id">
            <el-row align="middle" class="accordion-title">
              <el-col :span="2">
                <el-button size="mini"
                           round
                           @click="accordionState(_type.id).opened = !isAccordionOpened(_type.id)"
                           :disabled="documents.filter(el => el.typeId === _type.id).length === 0">
                  <fa-icon :icon="isAccordionOpened(_type.id) ? 'arrow-up' : 'arrow-down'" />
                </el-button>
              </el-col>
              <el-col :span="18">
                {{ _type.name }}
                <span type="danger">{{ _type.description }}</span>
              </el-col>
              <el-col :span="4" align="right">
                <el-button size="mini" round>
                  <fa-icon icon="pen-alt" />
                </el-button>
                <el-button type="danger"
                           size="mini"
                           round
                           @click="$store.commit('deleteType', _type.id)">
                  <fa-icon icon="trash" />
                </el-button>
              </el-col>
            </el-row>

            <div v-for="doc in documents.filter(el => el.typeId === _type.id)"
                 :key="doc.id"
                 class="accordion-item">
              <div v-if="isAccordionOpened(_type.id)">
                <el-row align="middle">
                  <el-col :span="19" :offset="1">
                    {{ doc.name }}
                  </el-col>
                  <el-col :span="4" align="right">
                    <el-button size="mini" round>
                      <fa-icon icon="pen-alt" />
                    </el-button>
                    <el-button type="danger"
                               size="mini"
                               round
                               @click="$store.commit('deleteDocument', doc.id)">
                      <fa-icon icon="trash" />
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>

    <el-dialog v-model="typeFormVisible" :before-close="resetTypeForm">
      <type-add-edit></type-add-edit>
    </el-dialog>

    <el-dialog v-model="documentFormVisible" :before-close="resetDocumentForm">
      <document-add-edit></document-add-edit>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  ElCol,
  ElRow,
  ElButton,
  ElInput,
  ElContainer,
  ElHeader,
  ElMain,
  ElDialog,
} from 'element-plus';
import TypeAddEdit from './Forms/TypeAddEdit.vue';
import DocumentAddEdit from './Forms/DocumentAddEdit.vue';

export default {
  name: 'Index',
  components: {
    ElCol,
    ElRow,
    ElButton,
    ElInput,
    ElContainer,
    ElHeader,
    ElMain,
    ElDialog,
    TypeAddEdit,
    DocumentAddEdit,
  },
  data() {
    return {
      searchText: '',
      typeFormVisible: false,
      documentFormVisible: false,
      accordionStates: [],
    };
  },
  computed: {
    typesActiveNames() {
      return this.$store.getters.allTypes.map((el) => el.name);
    },
    types() {
      return this.$store.getters.allTypes;
    },
    documents() {
      return this.$store.getters.allDocuments;
    },
  },
  methods: {
    onSearchInput(query) {
      return query;
    },
    resetTypeForm(done) {
      this.emitter.emit('resetTypeForm');
      done();
    },
    resetDocumentForm(done) {
      this.emitter.emit('resetDocumentForm');
      done();
    },
    accordionState(typeId) {
      return this.accordionStates.find((el) => el.id === typeId);
    },
    isAccordionOpened(typeId) {
      return this.accordionState(typeId).opened;
    },
  },
  created() {
    this.emitter.on('documentAdd', () => {
      this.documentFormVisible = false;
    });

    this.emitter.on('typeAdd', (typeId) => {
      this.typeFormVisible = false;
      this.accordionStates.unshift({ id: typeId, opened: false });
    });

    this.accordionStates = this.types.map((el) => ({ id: el.id, opened: false }));
  },
};
</script>

<style>
.ml-20 {
  margin-left: 20px;
}
.accordion {
  margin-top: 20px;
}
.accordion-item {
  margin-top: 10px;
  margin-bottom: 10px;
}
.accordion-title {
  margin-bottom: 15px;
}
</style>
