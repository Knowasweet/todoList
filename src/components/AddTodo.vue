<template>
  <div class="container mx-auto mb-[21px]">
    <Transition
      mode="out-in"
      enterFromClass="opacity-0 translate-y-[5px]"
      enterActiveClass="transition duration-300"
      leaveToClass="opacity-0 translate-y-[5px]"
      leaveActiveClass="transition duration-300"
    >
      <div v-if="isShowAddTodo" class="text-center">
        <button @click="toggleAddTodo">
          <FontAwesomeIcon
            :icon="['fas', 'circle-plus']"
            class="hover:text-green-300 h-[36px] w-[36px] text-slate-200 transition-colors duration-300 active:text-green-600"
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
                class="border-gray-300 placeholder-gray-300 w-full rounded-md border-[1px] p-[14px] text-xs font-medium text-gray-700 outline-gray-400"
                placeholder="Take dog out on walk"
              />
              <ErrorMessage :error="errors.title" />
            </div>

            <div class="h-[70px] space-y-[12px]">
              <textarea
                type="text"
                v-model="text"
                v-bind="textAttrs"
                class="placeholder-gray-300 border-gray-300 h-[70px] w-full resize-none rounded-md border-[1px] p-[14px] text-xs font-medium text-gray-700 outline-gray-400"
                placeholder="He needs vaccine shot too"
              />
              <ErrorMessage :error="errors.text" />
            </div>

            <div class="space-y-[29px]">
              <div class="space-y-[12px]">
                <TagInput @updateTags="updateTags" :hasTagsRemoved="hasTagsRemoved" />
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
                  class="active:text-red-600 h-[36px] w-[36px] rounded-full text-slate-400 transition-colors duration-300 hover:text-red-100"
                />
              </div>
            </button>
            <button type="submit">
              <div
                class="submit-btn relative h-[36px] w-[36px] rounded-full bg-slate-400 transition-colors duration-300 hover:bg-slate-200"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'check-circle']"
                  class="submit-icon m hover: absolute left-1/2 top-1/2 h-[29px] w-[29px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 text-gray-50 transition-colors duration-300"
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

import { onMounted, ref, watch } from 'vue'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { useTodoStore } from '@/stores/TodoStore.js'

const todoStore = useTodoStore()

const isShowAddTodo = ref(false)
const hasTagsRemoved = ref(false)

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

  isShowAddTodo.value = true
  hasTagsRemoved.value = true
  resetForm()

  notify(todoStore.countTodos)
  scrollToCreatedTodo(content.id)
})

const notify = (index) => {
  toast.info(`Todo #${index} has been created!`, {
    transition: 'slide',
    multiple: false,
    collapse: false,
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  })
}

const scrollToCreatedTodo = (todoId) => {
  setTimeout(() => {
    const createdTodo = document.querySelector(`.todo-${todoId}`)
    const scrollTodo = createdTodo.offsetTop - window.innerHeight / 2 + createdTodo.offsetHeight / 2
    window.scrollTo({
      top: scrollTodo,
      behavior: 'smooth',
    })
  }, 100)
}

const updateTags = (allTags) => {
  tags.value = allTags
}

watch(
  () => hasTagsRemoved.value,
  (newValue) => {
    if (newValue) {
      hasTagsRemoved.value = false
    }
  },
)

const toggleAddTodo = () => {
  isShowAddTodo.value = !isShowAddTodo.value
}

watch(
  () => todoStore.countTodos,
  (newValue) => {
    if (!newValue) {
      toggleAddTodo()
    }
  },
)

onMounted(() => {
  if (todoStore.countTodos) {
    toggleAddTodo()
  }
})
</script>

<style scoped>
.submit-btn:hover .submit-icon {
  background: #f9fafb;
  color: #81c784;
}

.submit-btn:active .submit-icon {
  background: #f3f4f6;
  color: #16a34a;
}
</style>
