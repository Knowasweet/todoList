import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './index.css'

import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan, faCircleXmark, faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import {
  faCirclePlus,
  faCheckCircle,
  faXmark,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCheckCircle,
  faTrashCan,
  faCirclePlus,
  faCircleXmark,
  faSquarePlus,
  faXmark,
  faCircleInfo,
)

const app = createApp(App)

app.use(createPinia())
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(Vue3ColorPicker)
app.mount('#app')
