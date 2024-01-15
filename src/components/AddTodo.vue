<template>
  <div>
    <Button icon="open" @click="$emit('open')" class="text-center" v-if="!isShowAddTodo" />
    <form @submit="onSubmit" v-if="isShowAddTodo">
      <div class="mb-10 rounded-xl border-2 border-gray-100 p-10 shadow-sm">
        <div class="mb-3.5">
          <input
            type="text"
            v-model="title"
            v-bind="titleAttrs"
            class="w-full border-2 border-gray-100 p-3.5 text-slate-200"
            placeholder="Take dog out on walk"
          />
          <FormErrorMessage :error="errors.title" />
        </div>

        <div class="mb-3.5">
          <textarea
            type="text"
            v-model="text"
            v-bind="textAttrs"
            class="box-border h-24 w-full resize-none border-2 border-gray-100 p-3.5 text-slate-200"
            placeholder="He needs vaccine shot too"
          />
          <FormErrorMessage :error="errors.text" />
        </div>

        <div class="mb-7">
          <input
            type="text"
            v-model="tags"
            v-bind="tagsAttrs"
            class="w-full border-2 border-gray-100 p-3.5 text-slate-200"
            placeholder="Tags"
          />
          <FormErrorMessage :error="errors.tags" />
        </div>

        <div class="mb-7">
          <div class="flex gap-4">
            <div v-for="(priorityValue, index) in 4" :key="index">
              <input
                type="radio"
                v-model="priority"
                :value="priorityValue"
                :id="priorityValue"
                class="hidden"
              />
              <label
                :for="priorityValue"
                class="flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-gray-100 text-base text-gray-400 active:bg-green-50"
              >
                {{ priorityValue }}
              </label>
            </div>
          </div>
          <FormErrorMessage :error="errors.priority" />
        </div>
      </div>

      <div class="flex items-center justify-center gap-3.5">
        <Button icon="close" @click="$emit('close')" />
        <Button icon="submit" type="submit" />
      </div>
    </form>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import FormErrorMessage from '@/components/FormErrorMessage.vue'

defineProps({
  isShowAddTodo: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['create', 'open', 'close'])

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string('Title be a string').required('Title is required').default(''),
    text: yup.string('Text be a string').required('Text is required').default(''),
    tags: yup.string('Tags be a string').required('Tags is required').default(''),
    priority: yup.number('Priority must be a number').required('Priority is required'),
  }),
})

const [title, titleAttrs] = defineField('title')
const [text, textAttrs] = defineField('text')
const [tags, tagsAttrs] = defineField('tags')
const [priority] = defineField('priority')

const onSubmit = handleSubmit((content, { resetForm }) => {
  emits('create', ref(content))
  resetForm()
})
</script>
