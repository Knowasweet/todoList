import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTodoStore = defineStore('todoStore', () => {
  const id = ref(localStorage.getItem('id') || 0)
  const todos = ref([])

  const todosInLocalStorage = localStorage.getItem('todos')
  if (todosInLocalStorage) {
    todos.value = JSON.parse(todosInLocalStorage)
  }

  const updateTodo = (todo) => {
    todo.id = id.value++
    todo.tags = todo.tags.split(' ').map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
    todos.value.push(todo)
  }

  const removeTodo = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  watch(
    () => todos.value,
    (state) => {
      localStorage.setItem('todos', JSON.stringify(state))
    },
    { deep: true },
  )

  watch(
    () => id.value,
    (newId) => {
      localStorage.setItem('id', JSON.stringify(newId))
    },
  )
  return {
    todos,
    updateTodo,
    removeTodo,
  }
})
