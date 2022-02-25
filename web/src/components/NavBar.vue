<script setup>
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NAvatar,
  NCountdown,
} from "naive-ui";
</script>

<script>
export default {
  computed: {
    timer() {
      return (
        new Date(this.$store.state.session.expires).getTime() -
        new Date().getTime()
      );
    },
  },
};
</script>

<template>
  <n-layout has-sider sider-placement="right">
    <n-layout-content content-style="padding: 24px;">
      Sua sessão expirará em: <n-countdown :duration="timer" />
    </n-layout-content>
    <n-layout-sider content-style="padding: 24px;">
      Username
      <n-avatar
        round
        :size="32"
        src="https://avatars.dicebear.com/api/bottts/username.svg"
      ></n-avatar
    ></n-layout-sider>
  </n-layout>
</template>

<style>
.n-layout-sider,
.n-layout-content {
  background: #fafafa;
}
</style>
