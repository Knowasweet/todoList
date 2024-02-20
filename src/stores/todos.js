import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { capitalizeFirstLetter } from '@/helpers/stringHelpers.js'

export const useTodosStore = defineStore('todosStore', () => {
  const nextTodoId = ref(localStorage.getItem('nextTodoId') ?? 0)
  const todos = ref(JSON.parse(localStorage.getItem('todos')) ?? [])

  const addTodo = (todo) => {
    todo.id = nextTodoId.value++
    todo.title = capitalizeFirstLetter(todo.title)
    todo.completed = ref(false)
    todo.creationDate = new Date()
    todo.modifiedDate = new Date()
    todos.value.push(todo)
  }

  const openedTodos = computed(() => {
    return todos.value
      .filter((todo) => !todo.completed)
      .sort((a, b) => sortByPriority(a, b) || sortByCreationDate(a, b))
  })

  const completedTodos = computed(() => {
    return todos.value.filter((todo) => todo.completed).sort(sortByModifiedDate)
  })

  const countTodos = computed(() => {
    return todos.value.length
  })

  const sortByCreationDate = (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
  const sortByModifiedDate = (a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate)

  const sortByPriority = (a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  }

  const updateTodoCompleted = (id) => {
    const todoToUpdate = todos.value.find((todo) => todo.id === id)
    todoToUpdate.completed = !todoToUpdate.completed
    todoToUpdate.modifiedDate = new Date()
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
    () => nextTodoId.value,
    (newTodoId) => {
      localStorage.setItem('nextTodoId', JSON.stringify(newTodoId))
    },
  )

  return {
    todos,
    openedTodos,
    completedTodos,
    countTodos,
    addTodo,
    removeTodo,
    updateTodoCompleted,
  }
})
