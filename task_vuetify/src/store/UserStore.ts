// /store/user.js
import { defineStore } from "pinia";
import apiClient from '@/store/modules/apiClient';

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
    err: null,
    token: null,
  }),

  actions: {
    async fetchUser() {
      console.log('getting user');
      try {
        console.log(this.token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        const res = await apiClient.get('/users/me');
        this.user = res.data.data;
        //localStorage.setItem('userStore', JSON.stringify(this.$state));
        return this.user;
      } catch (error: any) {
        this.err = error.message;
      }
    },
    async fetchProfile() {
      console.log('getting profile');
      try {
        this.err = null;
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        const res = await apiClient.get('/users/profiles/me');
        this.profile = res.data.data;
        //localStorage.setItem('user', res.data.data);
        console.log(res.data.data);
        localStorage.setItem('userStore', JSON.stringify(this.$state));
        return this.user;
      } catch (error: any) {
        this.err = error.message;
      }
    },
    async signUp(user:JSON) {
      try {
        this.err = null;
        const res = await apiClient.post('/users/register', user);
        this.user = res.data.user;
        //localStorage.setItem('token', res.data.token);
        localStorage.setItem('userStore', JSON.stringify(this.$state));
        return this.user;
      } catch (error: any) {
        this.err = error.message;
      }
    },
    async signIn(credentials:JSON) {
      console.log('logging');
      this.err = null;
      const res = await apiClient.post('/users/login', credentials);
      const data = res.data;
      if (data.data.token){
        console.log('token received');
        this.token = data.data.token;
        //apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        localStorage.setItem('userStore', JSON.stringify(this.$state));
      }
      return await this.fetchUser();
      //return res.data;
    },
    async signOut() {
      console.log('logout');
      apiClient.defaults.headers.common['Authorization'] = `Bearer ` + this.token;
      this.err = null;
      const res = await apiClient.post('/users/logout');
      console.log(res);
      if (!this.err) {
        localStorage.removeItem('userStore');
        return true;
      }
      this.user = null;
      this.token = null;
      this.profile = null;
      return false;
    },
    initialize() {
      const storedState = localStorage.getItem('userStore')
      if (storedState) {
        this.$patch(JSON.parse(storedState))
      }
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.token;
    }
  },
});
