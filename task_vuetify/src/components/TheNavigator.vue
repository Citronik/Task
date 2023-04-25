<template>
  <v-toolbar app dark fixed id="toolbar">
    <router-link id="name" class="custom-link-style" to="/">
      <v-toolbar-title class="mr-4">PLATEFORM</v-toolbar-title>
    </router-link>
    <v-toolbar-items>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <TheSearchBar />
      <v-btn :key="register" :to="register" v-if="!userStore.isLoggedIn">
        <router-link class="custom-link-style" to="/register">
          <v-icon class="mr-2">account_box</v-icon>
          Register
      </router-link>
      </v-btn>
      <v-btn flat v-if="!userStore.isLoggedIn">
        <router-link class="custom-link-style" to="/login">
          <v-icon class="mr-2">fingerprint</v-icon>
          Login
        </router-link>
      </v-btn>
      <v-btn flat v-if="userStore.isLoggedIn" @click="logout">
        <v-icon class="mr-2">exit_to_app</v-icon>
        Logout
      </v-btn>
      <v-btn flat>
        <router-link class="custom-link-style" to="/about">
          <v-icon class="mr-2">ondemand_video</v-icon>
          About
      </router-link>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { useUserStore } from "../store/UserStore";
import TheSearchBar from './TheSearchBar.vue';
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore, TheSearchBar };
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async logout() {
      console.log("logout");
      await this.userStore.signOut();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#toolbar {
  background-color: #37474F;
  color: #fff;
}
.custom-link-style {
  font-weight: bold;
  color: #fff;
  text-decoration: wavy;
}
.mr-4 {
  padding-left: 1rem !important;
}

</style>
