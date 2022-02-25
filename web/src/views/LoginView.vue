<script setup>
import { NGrid, NH1, NGridItem } from "naive-ui";
import LoginCard from "../components/LoginCard.vue";

/* let user = reactive({
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
}; */
</script>

<template>
  <n-grid x-gap="12" :cols="2">
    <n-grid-item>
      <div class="left-login">
        <LoginCard />
      </div>
    </n-grid-item>
    <n-grid-item>
      <n-h1 prefix="bar">Bem-vindo ao Teste-IPVD</n-h1>
      <div class="img-login">
        <img src="../assets/undraw_secure_login_pdn4.svg" />
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style>
.left-login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 980px;
  background-color: #fafafa;
}
.img-login {
  /* display: flex; */
  /* align-items: center;
  justify-content: center; */
  width: "600px";
  height: "980px";
}
</style>
