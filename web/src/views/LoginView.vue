<script setup>
import axios from "axios";
import { reactive } from "vue";

axios.defaults.withCredentials = true;

let user = reactive({
  email: "",
  password: "",
});

const login = async () => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/users/login",
    data: { data: { ...user } },
  });
  return response.data;
};

const teste = async () => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/users/protected",
//    withCredentials: true,
  });
  return response.data;
};

/*export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login: async () => {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/user/login",
        data: { ...this.user },
      });
      return response.data;
    },
  },
};*/
</script>

<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-card color="primary" gradient>
        <va-card-title>
          <h2 class="title">Login</h2>
        </va-card-title>
        <va-card-content>
          <va-form>
            <form>
              <va-input
                class="mb-4"
                label="email"
                v-model="user.email"
              ></va-input>

              <va-input
                class="mb-4"
                label="password"
                v-model="user.password"
                type="password"
              >
              </va-input>

              <va-button
                class="mb-4"
                color="primary"
                :rouded="false"
                @click="login"
              >
                Login</va-button
              >

              <va-button
                class="mb-4"
                color="primary"
                :rouded="false"
                @click="teste"
              >
                Teste</va-button
              >
            </form>
          </va-form>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>
