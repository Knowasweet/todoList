<template>
  <div>
    <button>
      <img :src="getIconPath" :alt="`${getIconPath}-icon`" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
})

const getIconPath = computed(
  () => new URL(`/src/assets/icons/${props.icon}.svg`, import.meta.url).href,
)
</script>
