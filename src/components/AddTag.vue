<template>
  <div v-if="isShowModal">
    <div
      class="fixed left-0 top-0 z-10 h-full w-full cursor-pointer bg-gray-500 opacity-20"
      @click="toggleShowModal"
    ></div>

    <div class="container fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <div
        class="mx-[6.5px] rounded-[8px] bg-white pb-[30px] pl-[30px] pr-[39px] pt-[22px] shadow-sm"
      >
        <div class="space-y-[25px]">
          <h3 class="text-center text-2xl text-gray-700">Add new tag</h3>
          <form @submit="onSubmit" class="space-y-[25px]">
            <div class="flex items-center gap-[12px]">
              <div ref="colorPickerWrapper">
                <ColorPicker
                  v-model:pureColor="selectedColor"
                  shape="circle"
                  format="hex"
                  pickerType="chrome"
                  disableAlpha
                  roundHistory
                />
              </div>

              <input
                type="text"
                v-model="name"
                v-bind="nameAttrs"
                class="w-full rounded-[4px] border-[1px] border-gray-300 p-[14px] text-xs font-medium text-gray-700 placeholder-gray-300 outline-gray-400"
                placeholder="New tag name"
              />
            </div>
            <ErrorMessage :error="errors.name" />
            <div class="flex items-center justify-center gap-[15px]">
              <button type="button" @click="toggleShowModal">
                <div class="flex items-center">
                  <FontAwesomeIcon
                    :icon="['far', 'circle-xmark']"
                    class="h-[36px] w-[36px] rounded-full text-slate-400 transition-colors duration-300 hover:text-red-600 active:text-red-800"
                  />
                </div>
              </button>
              <button>
                <div
                  class="submit-btn relative h-[36px] w-[36px] rounded-full bg-slate-400 transition-colors duration-300 hover:bg-slate-200"
                >
                  <FontAwesomeIcon
                    :icon="['fas', 'check-circle']"
                    class="submit-icon absolute left-1/2 top-1/2 h-[29px] w-[29px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 text-gray-50 transition-colors duration-300"
                  />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { toast } from 'vue3-toastify'

import { useTagStore } from '@/stores/TagStore.js'

const tagStore = useTagStore()

const selectedColor = ref('#FF0000')
const colorPickerWrapper = ref(null)

defineProps({
  isShowModal: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['toggleShowModal'])

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string('Name must be a string').required('Name is required'),
  }),
})

const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit((content, { resetForm }) => {
  content.selectedColor = selectedColor.value
  tagStore.addTag(content)
  resetForm()
  toggleShowModal()
  notify()
})
const notify = () => {
  toast.info(`Tag has been created!`, {
    transition: 'slide',
    multiple: false,
    collapse: false,
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  })
}

const toggleShowModal = () => {
  emits('toggleShowModal')
}

onMounted(() => {
  const colorPickerCircle = colorPickerWrapper.value.querySelector('.vc-color-wrap')
  if (colorPickerCircle) {
    Object.assign(colorPickerCircle.style, {
      width: '42px',
      height: '42px',
      border: '2px solid #CBD5E1',
    })
  }
})
</script>

<style scoped>
.submit-btn:hover .submit-icon {
  background: #f9fafb;
  color: #16a34a;
}

.submit-btn:active .submit-icon {
  background: #f3f4f6;
  color: #2e7d32;
}
</style>
