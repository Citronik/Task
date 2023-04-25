<template>
  <v-card class="side" v-if="userStore.isLoggedIn">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        app
        @click="rail = false"
      >
        <v-list-item
          :prepend-avatar="avatar"
          :title="username"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="min-height: 100vh">

          <router-view></router-view>

      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
  import { useUserStore } from "../store/UserStore";
export default {
  setup() {
    const userStore = useUserStore();
    userStore.initialize();
    return { userStore };
  },
  data() {
    return {
      username: "",
      avatar: "",
      drawer: true,
      rail: false,
    };
  },
  mounted() {
    this.username = this.userStore.user?.username;
    this.avatar = "http://127.0.0.1:3333/uploads/" + this.userStore.profile?.avatar.file.name;
  },
  methods: {
    async logout() {
      await this.userStore.signOut();
    },
  },
};
</script>

<style>
  #side {
    grid-area: side;
    padding: 1rem;
  }
</style>
