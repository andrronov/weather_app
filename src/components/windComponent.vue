<template>
  {{ gustSpeed }}Km/h
  {{ humidity }}%
  {{ currentWindDirection }}
</template>

<script>
export default {
props: {
  gustSpeed: {
    type: Number,
    default: -999,
  },
  humidity: {
    type: Number,
    default: -999,
  },
  currentWindDirection:{
    type: String,
    default: "err",
  }
}
}
</script>

<style>

</style>