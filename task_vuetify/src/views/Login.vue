<template>
  <v-sheet id="login" class="bg-grey-lighten-2 pa-16" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="400">

      <v-form
        v-model="loginForm"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[rules.required, rules.email]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          :readonly="loading"
          clearable
          label="Password"
          placeholder="Enter your password"
          @click:append="show1 = !show1"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!loginForm"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import { useUserStore } from "../store/UserStore";
  export default {
    setup() {
    const userStore = useUserStore();
    userStore.initialize();
    return { userStore };
  },
    data: () => ({
      loginForm: false,
      username: null,
      email: null,
      password: null,
      show1: false,
      show2: true,
      loading: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
    }),

    methods: {
      async onSubmit () {
        if (!this.loginForm) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
        const res = await this.login();
        const profileRes = await this.profile();
        if (!res.error && !profileRes.error) {
          this.$router.push("/");
        }
      },
      required (v) {
        return !!v || 'Field is required'
      },
      async login() {
        const credentials = {
          username: this.username,
          email: this.email,
          password: this.password
        };
        var res = await this.userStore.signIn( JSON.stringify(credentials) );
        return res;
      },
      async profile() {
        var res = await this.userStore.fetchProfile();
        return res;
      },
    },
  }
</script>

<style>
#login {
  width: 100%;
  height: 100%;
}
</style>
