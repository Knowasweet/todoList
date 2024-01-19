import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
library.add(faCheckCircle, faTrashCan, faCirclePlus, faCircleXmark)

const app = createApp(App)

app.use(createPinia())
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
