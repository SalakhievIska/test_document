import { createApp } from 'vue';
import mitt from 'mitt';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash,
  faPenAlt,
  faArrowsAltV,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store/index';

const emitter = mitt();
const app = createApp(App);

library.add(faTrash, faPenAlt, faArrowsAltV, faArrowUp, faArrowDown);

app.use(store);
app.component('fa-icon', FontAwesomeIcon);

app.config.globalProperties.emitter = emitter;

app.mount('#app');
