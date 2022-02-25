<script>
import { ref } from "vue";
// import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";
import store from "@/store";

export default {
  methods: {
    login: async (user) => {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          data: { email: user.email, password: user.password },
        },
      });

      console.log("response", response);

      if (response.status === 200) {
        store.dispatch("createSession", response.data.session);

        /**
         * route to /
         */

        console.log("pushing to /");

        router.push("/");
      }

      return response;
    },
  },
};
</script>

<script setup>
// import { reactive } from "vue";
import { NCard, NButton, NForm, NFormItem, NInput } from "naive-ui";

axios.defaults.withCredentials = true;

// const formRef = ref(null);

const user = ref({
  email: "",
  password: "",
});

const rules = {
  user: {
    email: {
      required: true,
      message: "Email é obrigatório",
      trigger: ["blur", "input"],
    },
    password: {
      required: true,
      message: "Senha é obrigatória",
      trigger: ["blur", "input"],
    },
  },
};
</script>

<template>
  <n-card title="Login">
    <n-form :model="user" :rules="rules">
      <n-form-item path="email" label="Email">
        <n-input v-model:value="user.email" @keydown.enter.prevent />
      </n-form-item>

      <n-form-item path="password" label="Password">
        <n-input
          v-model:value="user.password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button
        type="primary"
        @click="login({ email: user.email, password: user.password })"
        >Login</n-button
      >
    </template>
  </n-card>
</template>
