<template>
  <div>
    <div v-if="isShowAddTodo" class="text-center">
      <button @mouseleave="toggleAddTodo" @click="toggleAddTodo">
        <FontAwesomeIcon
          :icon="['fas', 'circle-plus']"
          size="2x"
          class="text-slate-200 transition duration-500 hover:text-green-600"
        />
      </button>
    </div>

    <Transition
      name="form"
      enterFromClass="opacity-0 translate-y-[15px]"
      enterActiveClass="transition duration-500"
      leaveToClass="opacity-0 translate-y-[15px]"
      leaveActiveClass="transition duration-500"
    >
      <form @submit="onSubmit" v-if="!isShowAddTodo">
        <div class="mb-9 rounded-xl border-2 border-gray-100 bg-white p-10 shadow-sm">
          <div class="mb-3.5">
            <input
              type="text"
              v-model="title"
              v-bind="titleAttrs"
              class="title w-full rounded-md border-2 border-gray-100 p-3.5 text-xs font-medium text-slate-200 placeholder-slate-200 outline-gray-400"
              placeholder="Take dog out on walk"
            />
            <FormErrorMessage :error="errors.title" />
          </div>

          <div class="mb-3.5">
            <textarea
              type="text"
              v-model="text"
              v-bind="textAttrs"
              class="h-[70px] w-full resize-none rounded-md border-2 border-gray-100 p-3.5 text-xs font-medium text-slate-200 placeholder-slate-200 outline-gray-400"
              placeholder="He needs vaccine shot too"
            />
            <FormErrorMessage :error="errors.text" />
          </div>

          <div class="mb-7">
            <input
              type="text"
              v-model="tags"
              v-bind="tagsAttrs"
              class="w-full rounded-md border-2 border-gray-100 p-3.5 text-xs font-medium text-slate-200 placeholder-slate-200 outline-gray-400"
              placeholder="Tags"
            />
            <FormErrorMessage :error="errors.tags" />
          </div>

          <div class="mb-7">
            <div class="flex gap-4">
              <PriorityRadioButton
                v-for="index in 4"
                :key="index"
                v-model="priority"
                :priorityValue="index"
                :bgColor="bgColorsForRadioButtons[index - 1]"
              />
            </div>
            <FormErrorMessage :error="errors.priority" />
          </div>
        </div>

        <div class="flex items-center justify-center gap-3.5">
          <button type="button" :icon="['far', 'trash-can']" @click="toggleAddTodo">
            <FontAwesomeIcon
              :icon="['far', 'circle-xmark']"
              size="2x"
              class=":text-rose-600 scale-95 text-slate-400 transition duration-500 hover:text-rose-600"
            />
          </button>
          <button type="submit" :icon="['far', 'trash-can']">
            <FontAwesomeIcon
              :icon="['fas', 'check-circle']"
              class="mt-[2.5px] scale-150 rounded-full bg-slate-400 p-0.5 text-white transition duration-500 hover:bg-white hover:text-green-600"
            />
          </button>
        </div>
      </form>
    </Transition>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import FormErrorMessage from '@/components/FormErrorMessage.vue'
import { useTodoStore } from '@/stores/TodoStore.js'
import PriorityRadioButton from '@/components/PriorityRadioButton.vue'

const bgColorsForRadioButtons = ref(['bg-rose-100', 'bg-green-50', 'bg-blue-50', 'bg-yellow-50'])
const isShowAddTodo = ref(false)
const todoStore = useTodoStore()

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string('Title must be a string').required('Title is required').default(''),
    text: yup.string('Text must be a string').default(''),
    tags: yup.string('Tags must be a string').required('Tags are required').default(''),
    priority: yup.number('Priority must be a number').required('Priority is required'),
  }),
})

const [title, titleAttrs] = defineField('title')
const [text, textAttrs] = defineField('text')
const [tags, tagsAttrs] = defineField('tags')
const [priority] = defineField('priority')

const onSubmit = handleSubmit((content, { resetForm }) => {
  todoStore.addTodo(content)
  resetForm()
})

const toggleAddTodo = () => {
  isShowAddTodo.value = !isShowAddTodo.value
}
</script>
