import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTagStore = defineStore('tagStore', () => {
  const tagId = ref(parseInt(localStorage.getItem('tagId')) || 0)
  const tags = ref([])

  const initializeTags = () => {
    const tagsInLocalStorage = localStorage.getItem('tags')
    if (tagsInLocalStorage) {
      tags.value = JSON.parse(tagsInLocalStorage)
    }
  }

  initializeTags()

  const addTag = (tag) => {
    tag.tagId = tagId.value++
    tag.code = tagId.value //for multiselect lib
    tag.name = capitalizeFirstLetter(tag.name)
    tags.value.push(tag)
    saveTagsToLocalStorage()
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const saveTagsToLocalStorage = () => {
    localStorage.setItem('tags', JSON.stringify(tags.value))
  }

  watch(
    () => tags.value,
    () => {
      saveTagsToLocalStorage()
    },
    { deep: true },
  )

  watch(
    () => tagId.value,
    (newId) => {
      localStorage.setItem('tagId', newId.toString())
    },
  )

  return {
    tags,
    addTag,
  }
})
