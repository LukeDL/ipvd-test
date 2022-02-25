<script setup>
import {
  NLayout,
  NLayoutContent,
  NSpace,
  NPageHeader,
  NGrid,
  NGridItem,
  NBreadcrumb,
  NStatistic,
  NNumberAnimation,
  NBreadcrumbItem,
  NButton,
  NAvatar,
} from "naive-ui";
</script>

<template>
  <n-layout>
    <n-layout-content>
      <n-page-header
        @back="handleBack"
        subtitle="Teste realizado por Lucas Leite"
      >
        <n-grid :cols="3">
          <n-grid-item>
            <n-statistic label="Usuários">
              <n-number-animation :from="0" :to="1" />
            </n-statistic>
          </n-grid-item>
          <n-grid-item>
            <n-statistic label="Departamentos">
              <n-number-animation :from="0" :to="1" />
            </n-statistic>
          </n-grid-item>
          <n-grid-item>
            <n-statistic label="Centros de Custo">
              <n-number-animation :from="0" :to="1" />
            </n-statistic>
          </n-grid-item>
        </n-grid>
        <template #title> TESTE IPVD </template>
        <template #header>
          <n-breadcrumb>
            <n-breadcrumb-item>Centros de Custo</n-breadcrumb-item>
            <n-breadcrumb-item>Departamentos</n-breadcrumb-item>
            <n-breadcrumb-item>Usuários</n-breadcrumb-item>
          </n-breadcrumb>
        </template>
        <template #avatar>
          <n-avatar
            style="background-color: blue;"
            :size="32"
            src="https://www.ipdvonline.com.br/wp-content/uploads/2020/09/logo.png"
          ></n-avatar>
        </template>
        <template #extra>
          <n-space>
            <n-button type="primary">Importar</n-button>
            <n-button type="error">Logout</n-button>
          </n-space>
        </template>
        <template #footer> São Luís, 25 de fevereiro de 2022. </template>
      </n-page-header>
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
.n-layout {
  background: #FFF;
  margin-left: 10em;
  margin-right: 10em;
}
</style>
