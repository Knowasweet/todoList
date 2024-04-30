<template>
  <Transition
    enterFromClass="opacity-0 translate-y-[15px]"
    leaveToClass="opacity-0 translate-y-[15px]"
  >
    <div
      class="mx-[100px] rounded-xl bg-rose-100 px-[8px] py-[4px] text-center text-xs font-medium text-rose-600 transition duration-300"
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
    default: '',
    required: true,
  },
})
</script>
