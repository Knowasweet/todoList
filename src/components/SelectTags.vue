<template>
  <div>
    <div class="flex items-center gap-[17px]">
      <Multiselect
        v-model="modelValue"
        :options="options"
        trackBy="name"
        label="name"
        placeholder="Search tag"
        openDirection="bottom"
        :searchable="options.length > 0"
        :max="options.length ? options.length : modelValue ? 0 : 1"
        :preserveSearch="true"
        :multiple="true"
        :showNoOptions="true"
        :showNoResults="true"
        :hideSelected="true"
        :closeOnSelect="false"
        :showPointer="false"
        :taggable="false"
      >
        <template #placeholder>
          <div class="pl-[4px] pt-[1px] text-xs font-medium text-gray-300">Tags</div>
        </template>
        <template #noResult>
          <div>No results</div>
        </template>
        <template #noOptions>
          <div>Add one more tag to select</div>
        </template>
        <template #maxElements>
          <div>No more tags</div>
        </template>

        <template #tag="{ option, remove }">
          <div
            class="mb-[8px] mr-[2px] inline-flex items-center rounded-[10px] px-[8px] py-[5px] text-xs font-bold"
            :style="{
              backgroundColor: colorConvertHexToRgba(option.selectedColor, 0.2),
              color: option.selectedColor,
            }"
          >
            <div>{{ option.name }}</div>
            <div class="ml-[4px] cursor-pointer" @click="remove(option)">
              <div class="flex items-center">
                <FontAwesomeIcon
                  :icon="['fas', 'xmark']"
                  class="text-red-300 h-[12px] w-[12px] transition-colors duration-300 hover:text-red-600 active:text-red-800"
                />
              </div>
            </div>
          </div>
        </template>
      </Multiselect>
      <AddTag />
    </div>
  </div>
</template>

<script setup>
import AddTag from '@/components/AddTag.vue'
import { ref } from 'vue'
import { colorConvertHexToRgba } from '@/helpers/colorHelpers.js'

import { useTagsStore } from '@/stores/tags.js'
const tagsStore = useTagsStore()

// eslint-disable-next-line vue/require-prop-types
const modelValue = defineModel({ required: true })
const options = ref(tagsStore.tags)
</script>

<style>
.multiselect {
  @apply !text-gray-700;
}

.multiselect__input::placeholder {
  @apply !text-gray-300;
}

.multiselect,
.multiselect__input,
.multiselect__single {
  @apply !text-xs !font-medium;
}

.multiselect__tags {
  @apply !border-gray-300;
}

.multiselect__select::before {
  @apply !border-t-gray-300;
}

.multiselect__element {
  @apply hover:bg-gray-100;
}
</style>
