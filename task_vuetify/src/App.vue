<template>
  <v-app>
    <TheNavigator />
    <TheNavigatorAuth />

    <v-main v-if="!userStore.isLoggedIn" style="min-height: 100vh">
      <router-view></router-view>
    </v-main>
    <TheFooterVue />
  </v-app>
</template>

<script setup lang="ts">
  import TheNavigatorAuth from '@/components/TheNavigatorAuth.vue'
  import TheNavigator from '@/components/TheNavigator.vue'
  import TheFooterVue from '@/components/TheFooter.vue'
  import { useUserStore } from '@/store/UserStore'
  const userStore = useUserStore();
</script>

<style>
v-content {
  background-color: #BBDEFB !important;
  grid-area: v-main;
  overflow-y: auto;
  padding: 1rem;
}
</style>
