<template>
  <div>
    <button tabindex="-1" type="button" @click="hide">
      <FontAwesomeIcon
        :icon="['far', 'square-plus']"
        size="2x"
        class="text-gray-300 transition-colors duration-300 hover:text-green-600 active:select-none active:text-green-800"
      />
    </button>
    <div v-if="isShowModal">
      <div
        class="fixed left-0 top-0 z-10 h-full w-full cursor-pointer bg-gray-500 opacity-20"
        @click="hide"
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
                  class="w-full rounded-[4px] border-[1px] border-gray-300 p-[14px] text-xs font-medium text-gray-700 placeholder-gray-300 outline-gray-400"
                  placeholder="New tag name"
                />
              </div>
              <ErrorMessage :error="errors.name" />
              <div class="flex items-center justify-center gap-[15px]">
                <button type="button" @click="hide">
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
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/ErrorMessage.vue'
import { ref } from 'vue'

import { notification } from '@/plugins/toastify.js'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useTagsStore } from '@/stores/tags.js'
const tagsStore = useTagsStore()

const isShowModal = ref(false)

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup
      .string('Name must be a string')
      .required('Name is required')
      .test('is-unique', 'Name must be unique', async (value) => {
        // Assuming you have a function to check if the name is unique
        return await tagsStore.isTagUnique(value)
      }),
    selectedColor: yup.string('Color must be a string').required('Color is required'),
  }),
  initialValues: {
    selectedColor: '#FF0000',
  },
})

const [name] = defineField('name')
const [selectedColor] = defineField('selectedColor')

const onSubmit = handleSubmit((content, { resetForm }) => {
  tagsStore.addTag(content)
  resetForm()
  hide()
  notification('Tag has been created!')
})

const hide = () => {
  isShowModal.value = !isShowModal.value
}
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

<style>
.vc-color-wrap {
  width: 42px !important;
  height: 42px !important;
  border: 2px solid #cbd5e1 !important;
}
</style>
