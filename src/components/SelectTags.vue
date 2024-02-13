<template>
  <div>
    <div class="flex items-center gap-[17px]">
      <Multiselect
        v-model="value"
        tagPlaceholder="Tags"
        placeholder="Tags"
        label="name"
        trackBy="code"
        :options="options"
        :multiple="true"
        @tag="addTag"
        :hideSelected="true"
        :searchable="false"
        :disabled="!options.length > 0"
        :maxHeight="value.length === options.length ? 0 : 300"
        @select="updateTags"
      ></Multiselect>
      <button tabindex="-1" type="button" @click="toggleShowModal" class="mx-auto">
        <FontAwesomeIcon
          :icon="['far', 'square-plus']"
          size="2x"
          class="text-gray-300 transition-colors duration-300 hover:text-green-600 active:select-none active:text-green-800"
        />
      </button>
    </div>
    <AddTag v-if="isShowModal" :isShowModal="isShowModal" @toggleShowModal="toggleShowModal" />
  </div>
</template>

<script setup>
import Multiselect from 'vue-multiselect'
import { useTagStore } from '@/stores/TagStore.js'
import { ref, watch } from 'vue'
import AddTag from '@/components/AddTag.vue'

const props = defineProps({
  hasTagsRemoved: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['updateTags'])

const tagStore = useTagStore()

const isShowModal = ref(false)

const value = ref([])
const options = ref(tagStore.tags)

const addTag = (newTag) => {
  options.value.push(newTag)
  value.value.push(newTag)
}

const updateTags = () => {
  emits('updateTags', value.value)
}

const toggleShowModal = () => {
  isShowModal.value = !isShowModal.value
}

watch(
  () => props.hasTagsRemoved,
  (newValue) => {
    if (newValue) {
      value.value = []
    }
  },
)
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
