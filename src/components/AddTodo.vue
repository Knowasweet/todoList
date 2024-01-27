<template>
  <div class="container mx-auto mb-[21px]">
    <Transition
      mode="out-in"
      enterFromClass="opacity-0 translate-y-[5px]"
      enterActiveClass="transition duration-300"
      leaveToClass="opacity-0 translate-y-[5px]"
      leaveActiveClass="transition duration-300"
    >
      <div v-if="!isShowAddTodo && todoStore.countTodos !== 0" class="text-center">
        <button @click="toggleAddTodo">
          <FontAwesomeIcon
            :icon="['fas', 'circle-plus']"
            class="h-[36px] w-[36px] text-slate-200 transition-colors duration-300 hover:text-green-600"
          />
        </button>
      </div>

      <form @submit="onSubmit" v-else>
        <div class="space-y-[34px]">
          <div
            class="space-y-[14px] rounded-xl border-[1px] border-gray-100 bg-white p-[40px] shadow-sm"
          >
            <div class="space-y-[12px]">
              <input
                type="text"
                v-model="title"
                v-bind="titleAttrs"
                class="w-full rounded-md border-[1px] border-gray-100 p-[14px] text-xs font-medium text-gray-700 placeholder-slate-200 outline-gray-400"
                placeholder="Take dog out on walk"
              />
              <ErrorMessage :error="errors.title" />
            </div>

            <div class="space-y-[12px]">
              <textarea
                type="text"
                v-model="text"
                v-bind="textAttrs"
                class="h-[70px] w-full resize-none rounded-md border-[1px] border-gray-100 p-[14px] text-xs font-medium text-gray-700 placeholder-slate-200 outline-gray-400"
                placeholder="He needs vaccine shot too"
              />
              <ErrorMessage :error="errors.text" />
            </div>

            <div class="space-y-[29px]">
              <div class="space-y-[12px]">
                <TagInput @sendTagsToParent="receiveTagsFromChild" :removedTags="removedTags" />
                <ErrorMessage :error="errors.tags" />
              </div>
              <div class="space-y-[12px]">
                <PriorityButtons v-model="priorityValue" />
                <ErrorMessage :error="errors.priorityValue" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center gap-[15px]">
            <button type="button" @click="toggleAddTodo">
              <div class="flex items-center">
                <FontAwesomeIcon
                  :icon="['far', 'circle-xmark']"
                  class=":text-rose-600 h-[36px] w-[36px] rounded-full text-slate-400 transition-colors duration-300 hover:text-rose-600"
                />
              </div>
            </button>
            <button type="submit">
              <div
                class="submit-btn relative h-[36px] w-[36px] rounded-full bg-slate-400 transition-colors duration-300 hover:bg-slate-200"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'check-circle']"
                  class="submit-icon m absolute left-1/2 top-1/2 h-[29px] w-[29px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 text-gray-50 transition-colors duration-300"
                />
              </div>
            </button>
          </div>
        </div>
      </form>
    </Transition>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/ErrorMessage.vue'
import TagInput from '@/components/TagInput.vue'
import PriorityButtons from '@/components/PriorityButtons.vue'

import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useTodoStore } from '@/stores/TodoStore.js'
const todoStore = useTodoStore()

const isShowAddTodo = ref(false)
const removedTags = ref(false)
const toggleAddTodo = () => {
  isShowAddTodo.value = !isShowAddTodo.value
}

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string('Title must be a string').required('Title is required').default(''),
    text: yup.string('Text must be a string').default(''),
    tags: yup
      .array()
      .of(yup.string('Tag must be string'))
      .min(1, 'Tags are required')
      .required('Tags are required'),
    priorityValue: yup.string('Priority must be a string').required('Priority is required'),
  }),
})

const [title, titleAttrs] = defineField('title')
const [text, textAttrs] = defineField('text')
const [tags] = defineField('tags')
const [priorityValue] = defineField('priorityValue')

const onSubmit = handleSubmit((content, { resetForm }) => {
  todoStore.addTodo(content)
  removedTags.value = true

  setTimeout(() => {
    removedTags.value = false
  }, 100)

  resetForm()
  isShowAddTodo.value = false
})

const receiveTagsFromChild = (list) => {
  tags.value = list
}
</script>

<style scoped>
.submit-btn:hover .submit-icon {
  background: #f9fafb;
  color: #16a34a;
}
</style>
