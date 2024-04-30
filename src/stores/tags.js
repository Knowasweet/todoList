import { defineStore } from 'pinia'
import { ref } from 'vue'
import { capitalizeFirstLetter } from '@/helpers/stringHelpers.js'

export const useTagsStore = defineStore('tagsStore', () => {
  const tags = ref(JSON.parse(localStorage.getItem('tags')) ?? [])

  const addTag = (tag) => {
    tag.name = capitalizeFirstLetter(tag.name)
    tags.value.push(tag)
    saveTagsToLocalStorage()
  }

  const saveTagsToLocalStorage = () => {
    localStorage.setItem('tags', JSON.stringify(tags.value))
  }

  const isTagUnique = (newTag) => {
    return !tags.value.find((tag) => {
      return tag.name === capitalizeFirstLetter(newTag)
    })
  }

  return {
    tags,
    addTag,
    isTagUnique,
  }
})
