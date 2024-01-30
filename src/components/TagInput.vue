<template>
  <div class="space-y-[12px]">
    <div class="flex items-center">
      <input
        type="text"
        v-model="inputValue"
        @keyup.enter="addTag"
        class="placeholder-gray-300 border-gray-300 w-5/6 rounded-md border-[1px] p-[14px] text-xs font-medium text-gray-700 outline-gray-400"
        placeholder="Enter a Tag"
      />

      <button type="button" @click="addTag" class="mx-auto">
        <FontAwesomeIcon
          :icon="['far', 'square-plus']"
          size="2x"
          class="text-gray-300 hover:text-green-300 select-none transition-colors duration-300 active:text-green-600"
        />
      </button>
    </div>

    <div v-if="tags.length > 0" class="flex flex-wrap items-center gap-[12px]">
      <div
        class="flex h-[25px] min-w-[30px] items-center gap-[4px] rounded-[10px] bg-green-50 px-[8px] py-[5px] text-xs font-bold text-green-600"
        v-for="(tag, index) in tags"
        :key="index"
      >
        <input
          v-model="tags[index]"
          @keyup.enter="updateTag(index)"
          @blur="updateTag(index)"
          class="overflow-ellipsis bg-transparent outline-none"
          :style="{ width: tags[index].length + 'ch' }"
        />

        <div @click="removeTag(index)" class="cursor-pointer">
          <FontAwesomeIcon
            :icon="['fas', 'xmark']"
            class="text-slate-400 transition duration-300 hover:text-rose-600"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  hasTagsRemoved: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['updateTags'])

const inputValue = ref('')
const tags = ref([])

const addTag = () => {
  if (inputValue.value !== '') {
    tags.value.push(transformFirstLetterToUpperCase(inputValue.value))
    createUniqueTags(tags.value)
    updateTags()
    inputValue.value = ''
  }
}

const updateTag = (index) => {
  if (tags.value[index] ?? '' !== '') {
    tags.value[index] = transformFirstLetterToUpperCase(tags.value[index])
    createUniqueTags(tags.value)
    updateTags()
  } else {
    removeTag(index)
  }
}

const updateTags = () => {
  emits('updateTags', tags.value)
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
  updateTags()
}

const createUniqueTags = (allTags) => {
  tags.value = Array.from(new Set(allTags))
}

const transformFirstLetterToUpperCase = (tag) => {
  return tag.charAt(0).toUpperCase() + tag.slice(1)
}

watch(
  () => props.hasTagsRemoved,
  (newValue) => {
    if (newValue) {
      tags.value = []
    }
  },
)
</script>
