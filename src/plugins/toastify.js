import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const notification = (description) =>
  toast.info(description, {
    transition: 'slide',
    multiple: false,
    collapse: false,
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  })
