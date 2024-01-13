<template>
  <div v-if='isShowRemoveTodo' class='relative'>
    <Button
      icon='remove'
      class='fixed left-10 top-1/2 -translate-y-1/2'
      @click='removeTodo(idCurrentTodo)'
    />
    <Button
      icon='submitClose'
      class='fixed right-10 top-1/2 -translate-y-1/2'
      @click='closeRemoveForm'
    />
  </div>
  <div class='mx-auto w-[445px]'>
    <div
      class=' top-0 mx-auto h-5 w-[445px] cursor-pointer bg-gradient-to-b from-gray-50 to-transparent backdrop-blur-0 pointer-events-auto fixed'
    ></div>
    <h1 class='mx-9 my-10 text-7xl text-slate-200'>Daily Todo</h1>
    <Todo
      v-for='todo of todoStore.todos'
      :key='todo.id'
      :todo='todo'
      @click='openRemoveTodo(todo.id)'
    />

    <AddTodo
      @close='closeAddTodo'
      @open='openAddTodo'
      :isShowAddTodo='isShowAddTodo'
      @create='updateTodo'
      class='z-10'
    />
    <div
      class='pointer-events-auto fixed bottom-0 mx-auto h-5 w-[445px] cursor-pointer bg-gradient-to-t from-transparent to-gray-50 backdrop-blur-0'
    ></div>
  </div>
</template>

<script setup>
import AddTodo from '@/components/AddTodo.vue'
import { useTodoStore } from '@/stores/TodoStore.js'
import { ref } from 'vue'
import Todo from '@/components/Todo.vue'
import Button from '@/components/Button.vue'

const todoStore = useTodoStore()
const isShowAddTodo = ref(false)
const isShowRemoveTodo = ref(false)
const idCurrentTodo = ref('')

const openAddTodo = () => {
  isShowAddTodo.value = true
}

const closeAddTodo = () => {
  isShowAddTodo.value = false
}

const updateTodo = (todo) => {
  todoStore.updateTodo(todo.value)
}

const openRemoveTodo = (id) => {
  isShowRemoveTodo.value = true
  idCurrentTodo.value = id
}

const closeRemoveForm = () => {
  isShowRemoveTodo.value = false
  idCurrentTodo.value = ''
}

const removeTodo = (id) => {
  todoStore.removeTodo(id)
}
</script>
