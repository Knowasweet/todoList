<template>
  <MainShadowBox />
  <div class="container relative mx-auto">
    <h1 class="container-inside mb-10 pt-9 text-center text-7xl text-slate-200">Daily Todo</h1>
    <SectionTodoList :todos="todoStore.openTodos" />
    <AddTodo class="container-inside" />
    <SectionTodoList title="Done" :todos="todoStore.completedTodos" />
  </div>
</template>

<script setup>
import AddTodo from '@/components/AddTodo.vue'
import { useTodoStore } from '@/stores/TodoStore.js'
import SectionTodoList from '@/components/SectionTodoList.vue'
import MainShadowBox from '@/components/MainShadowBox.vue'

const todoStore = useTodoStore()
</script>
