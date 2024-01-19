<template>
  <Transition
    enterFromClass="opacity-0 translate-y-[15px]"
    leaveToClass="opacity-0 translate-y-[15px]"
  >
    <div
      class="mx-28 mt-3 rounded-xl bg-rose-100 px-2 py-1 text-center text-xs font-medium text-rose-600 transition duration-500"
      v-if="error"
    >
      {{ error }}
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    required: true,
  },
})
</script>
