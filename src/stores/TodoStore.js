import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useTodoStore = defineStore('todoStore', () => {
  const id = ref(localStorage.getItem('id') ?? 0)
  const todos = ref([])

  const todosInLocalStorage = localStorage.getItem('todos')
  if (todosInLocalStorage) {
    todos.value = JSON.parse(todosInLocalStorage)
  }

  const addTodo = (todo) => {
    todo.id = id.value++
    todo.completed = ref(false)
    todo.creationDate = new Date()
    todo.tags = todo.tags.split(' ').map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
    todos.value.push(todo)
  }

  const openTodos = computed(() => {
    return todos.value
      .filter((todo) => !todo.completed)
      .sort(sortByCreationDate)
      .sort((a, b) => a.priority - b.priority)
  })

  const completedTodos = computed(() => {
    return todos.value.filter((todo) => todo.completed).sort(sortByCreationDate)
  })

  const sortByCreationDate = (a, b) => new Date(b.creationDate) - new Date(a.creationDate)

  const updateTodoCompleted = (id) => {
    const todoToUpdate = todos.value.find((todo) => todo.id === id)
    todoToUpdate.completed = !todoToUpdate.completed
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
    openTodos,
    completedTodos,
    addTodo,
    removeTodo,
    updateTodoCompleted,
  }
})
