<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      user: {
        firstName: "Username",
        uuid: "12345",
      },
    };
  },
};
</script>

<template>
  <va-navbar shape class="mb-2" color="primary">
    <template #right>
      <va-navbar-item>
        <router-link to="/login">{{ user.firstName }}</router-link>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>
