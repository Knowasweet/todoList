<template>
  <div class="container mx-auto mb-[21px]">
    <Transition
      mode="out-in"
      enterFromClass="opacity-0 translate-y-[5px]"
      enterActiveClass="transition duration-300"
      leaveToClass="opacity-0 translate-y-[5px]"
      leaveActiveClass="transition duration-300"
      :key="isShowAddTodo"
    >
      <div v-if="!isShowAddTodo" class="text-center">
        <button @click="toggleAddTodo">
          <FontAwesomeIcon
            :icon="['fas', 'circle-plus']"
            class="h-[36px] w-[36px] text-slate-200 transition-colors duration-300 hover:text-green-600 active:text-green-800"
          />
        </button>
      </div>

      <form @submit="onSubmit" v-else>
        <div class="space-y-[34px]">
          <div
            class="space-y-[14px] rounded-xl border-[1px] border-gray-100 bg-white p-10 shadow-sm"
          >
            <div class="space-y-[12px]">
              <input
                ref="titleInput"
                type="text"
                v-model="title"
                v-bind="titleAttrs"
                class="w-full rounded-[4px] border-[1px] border-gray-300 p-[14px] text-xs font-medium text-gray-700 placeholder-gray-300 outline-[4px] outline-gray-400"
                placeholder="Take dog out on walk"
              />
              <ErrorMessage :error="errors.title" />
            </div>

            <div class="space-y-[12px]">
              <textarea
                type="text"
                v-model="text"
                v-bind="textAttrs"
                class="block h-[70px] w-full resize-none rounded-[4px] border-[1px] border-gray-300 p-[14px] text-xs font-medium text-gray-700 placeholder-gray-300 outline-gray-400"
                placeholder="He needs vaccine shot too"
              />
              <ErrorMessage :error="errors.text" />
            </div>

            <div class="space-y-[29px]">
              <div class="space-y-[12px]">
                <SelectTags v-model="tags" />
                <ErrorMessage :error="errors.tags" />
              </div>
              <div class="space-y-[12px]">
                <PriorityButtons v-model="priority" />
                <ErrorMessage :error="errors.priority" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center gap-[15px]">
            <button type="button" @click="toggleAddTodo">
              <div class="flex items-center">
                <FontAwesomeIcon
                  :icon="['far', 'circle-xmark']"
                  class="h-[36px] w-[36px] rounded-full text-slate-400 transition-colors duration-300 hover:text-red-600 active:text-red-800"
                />
              </div>
            </button>
            <button type="submit">
              <div
                class="group flex h-[36px] w-[36px] items-center justify-center rounded-full bg-slate-400 transition-colors duration-300 hover:bg-green-600 active:bg-green-800"
              >
                <div
                  class="flex h-[29px] w-[29px] items-center justify-center rounded-full bg-white"
                >
                  <FontAwesomeIcon
                    :icon="['fas', 'check']"
                    class="text-slate-400 transition-colors duration-300 group-hover:text-green-600 group-active:text-green-800"
                  />
                </div>
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
import PriorityButtons from '@/components/PriorityButtons.vue'
import SelectTags from '@/components/SelectTags.vue'

import { nextTick, ref, watch } from 'vue'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useTodosStore } from '@/stores/todos.js'
import { showInfoNotification } from '@/plugins/toastify.js'

const todosStore = useTodosStore()

const isShowAddTodo = ref(false)
const titleInput = ref(null)

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string('Title must be a string').required('Title is required').default(''),
    text: yup.string('Text must be a string').default(''),
    tags: yup.array().min(1, 'Tags are required').required('Tags are required'),
    priority: yup.string('Priority must be a string').required('Priority is required'),
  }),
})

const [title, titleAttrs] = defineField('title')
const [text, textAttrs] = defineField('text')
const [tags] = defineField('tags')
const [priority] = defineField('priority')

const onSubmit = handleSubmit((content, { resetForm }) => {
  todosStore.addTodo(content)
  isShowAddTodo.value = false
  resetForm()
  showInfoNotification(`Todo #${todosStore.countTodos} has been created!`)
  scrollToCreatedTodo(content.id)
})

const scrollToCreatedTodo = (todoId) => {
  setTimeout(() => {
    const createdTodo = document.querySelector(`.todo-${todoId}`)
    createdTodo.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
  }, 0)
}

const toggleAddTodo = () => {
  isShowAddTodo.value = !isShowAddTodo.value
}

watch(
  () => todosStore.countTodos,
  (newValue) => {
    if (!newValue) {
      toggleAddTodo()
    }
  },
)

watch(isShowAddTodo, (newValue) => {
  if (newValue) {
    nextTick(() => {
      titleInput.value.focus()
    })
  }
})
</script>
