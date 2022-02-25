<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";

const thisIsNotLoginPage = computed(() => {
  const route = useRoute();

  return route.name !== "login";
});
</script>

<template>
  <NavBar v-if="thisIsNotLoginPage" />

  <RouterView />
</template>

<style>

</style>
