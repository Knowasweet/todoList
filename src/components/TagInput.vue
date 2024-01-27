<template>
  <div class="space-y-[12px]">
    <div class="flex items-center justify-between">
      <input
        type="text"
        v-model="tagValue"
        @keyup.enter="addTag"
        class="w-5/6 select-none rounded-md border-[1px] border-gray-100 p-[14px] text-xs font-medium text-gray-700 placeholder-slate-200 outline-gray-400"
        placeholder="Enter a Tag"
      />

      <button type="button" @click="addTag">
        <FontAwesomeIcon
          :icon="['far', 'square-plus']"
          size="2x"
          class="mr-[15px] text-gray-100 transition-colors duration-300 hover:text-green-600"
        />
      </button>
    </div>

    <div v-if="tags.length" class="flex flex-wrap items-center gap-[12px]">
      <div
        class="flex h-[25px] min-w-[30px] items-center gap-[4px] rounded-[10px] bg-green-50 px-[8px] py-[5px] text-xs font-bold text-green-600"
        v-for="(tag, index) in tags"
        :key="index"
      >
        <input
          v-model="tags[index]"
          @focusout="updateTag(index)"
          @keyup.enter="updateTag(index)"
          :ref="(el) => (tagInputRefs[index] = el)"
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
  removedTags: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['sendTagsToParent'])

const tagValue = ref('')
const tags = ref([])
const tagInputRefs = ref([])

watch(
  () => props.removedTags,
  (newValue) => {
    if (newValue === true) {
      tags.value = []
    }
  },
)

const addTag = () => {
  if (tagValue.value !== '') {
    tags.value.push(toUpperCase(tagValue.value))
    uniqueTags(tags.value)
    sendTagsToParent()
    tagValue.value = ''
  }
}

const updateTag = (index) => {
  if (tags.value[index] !== '') {
    tags.value[index] = toUpperCase(tags.value[index])
    tagInputRefs.value[index].blur()
    uniqueTags(tags.value)
    sendTagsToParent()
  } else {
    tagInputRefs.value[index].blur()
    removeTag(index)
  }
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
  sendTagsToParent()
}

const sendTagsToParent = () => {
  emits('sendTagsToParent', tags.value)
}

const uniqueTags = (allTags) => {
  tags.value = Array.from(new Set(allTags))
}

const toUpperCase = (tag) => {
  return tag.charAt(0).toUpperCase() + tag.slice(1)
}
</script>
