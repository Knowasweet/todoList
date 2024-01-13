<template>
  <div class="mb-9 rounded-xl px-9 py-6 shadow-sm">
    <h2 class="mb-3 line-clamp-2 text-2xl text-gray-700">{{ todo.title }}</h2>
    <div class="mb-3 line-clamp-2 text-base text-gray-500">{{ todo.text }}</div>
    <div class="flex gap-5">
      <div class="self-start rounded-xl bg-rose-100 px-2 py-1 text-rose-600">
        P{{ todo.priority }}
      </div>
      <div class="flex flex-wrap items-center gap-5">
        <div
            v-for="(tag, index) of todo.tags"
            :key="index"
            class="rounded-xl bg-green-50 px-2 py-1 text-green-600"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
    default: () => {
    },
  },
})
</script>
