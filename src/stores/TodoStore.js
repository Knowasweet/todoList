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
    todo.title = capitalizeFirstLetter(todo.title)
    todo.completed = ref(false)
    todo.creationDate = new Date()
    todo.modifiedDate = new Date()
    todos.value.push(todo)
    notificationFlag.value = true
    scrollToCreatedTodo(todo.id)
    offNotificationFlag()
  }

  const openTodos = computed(() => {
    return todos.value
      .filter((todo) => !todo.completed)
      .sort(sortByCreationDate)
      .sort(sortByPriority)
  })

  const completedTodos = computed(() => {
    return todos.value.filter((todo) => todo.completed).sort(sortByModifiedDate)
  })

  const countTodos = computed(() => {
    return todos.value.length
  })

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const sortByCreationDate = (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
  const sortByModifiedDate = (a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate)

  const sortByPriority = (a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }
    return priorityOrder[a.priorityValue] - priorityOrder[b.priorityValue]
  }

  const updateTodoCompleted = (id) => {
    const todoToUpdate = todos.value.find((todo) => todo.id === id)
    todoToUpdate.completed = !todoToUpdate.completed
    todoToUpdate.modifiedDate = new Date()
  }
  const removeTodo = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  const scrollToCreatedTodo = (todoId) => {
    setTimeout(() => {
      const createdTodo = document.querySelector(`.todo-${todoId}`)
      const scrollTodo =
        createdTodo.offsetTop - window.innerHeight / 2 + createdTodo.offsetHeight / 2

      window.scrollTo({
        top: scrollTodo,
        behavior: 'smooth',
      })
    }, 0)
  }

  const notificationFlag = ref(false)

  const offNotificationFlag = () => {
    setTimeout(() => {
      notificationFlag.value = false
    }, 3000)
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
    countTodos,
    notificationFlag,
    addTodo,
    removeTodo,
    updateTodoCompleted,
  }
})
