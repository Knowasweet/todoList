<template>
  <div v-if="isShowRemoveTodo" class="relative z-10">
    <Button
      icon="remove"
      class="fixed left-10 top-1/2 -translate-y-1/2"
      @click="removeTodo(idCurrentTodo)"
    />
    <Button
      icon="submitClose"
      class="fixed right-10 top-1/2 -translate-y-1/2"
      @click="closeRemoveForm"
    />
  </div>

  <div class="pointer-events-auto relative mx-auto w-[445px]">
    <div
      style="box-shadow: inset 0 150px 40px -50px rgba(250, 250, 250, 0.68)"
      class="sticky top-0 h-10"
    ></div>
    <!--    <div-->
    <!--      class="pointer-events-auto fixed top-0 mx-auto h-5 w-[445px] cursor-pointer bg-gradient-to-b from-green-600 to-transparent backdrop-blur-0"-->
    <!--    ></div>-->
    <div>
      <h1 class="mx-9 mb-10 text-7xl text-slate-200">Daily Todo</h1>
      <Todo
        v-for="todo of todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @click="openRemoveTodo(todo.id)"
      />

      <AddTodo
        @close="closeAddTodo"
        @open="openAddTodo"
        :isShowAddTodo="isShowAddTodo"
        @create="updateTodo"
      />
    </div>

    <div
      style="box-shadow: inset 0 -150px 40px -50px rgba(250, 250, 250, 0.68)"
      class="sticky bottom-0 h-12"
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
  closeRemoveForm()
}
</script>
