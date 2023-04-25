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
        //apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        const res = await apiClient.get('/users/me');
        this.user = res.data.data;
        //localStorage.setItem('user', res.data.data);
        //console.log(res);
        localStorage.setItem('userStore', JSON.stringify(this.$state));
        return this.user;
      } catch (error: any) {
        this.err = error.message;
      }
    },
    async fetchProfile() {
      console.log('getting profile');
      try {
        //apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
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
      const res = await apiClient.post('/users/login', credentials);
      //console.log(res);
      const data = res.data;
      //console.log(data.data);
      if (data.data.token){
        console.log('token received');
        this.token = data.data.token;
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        localStorage.setItem('userStore', JSON.stringify(this.$state));
      }
      return await this.fetchUser();
      //return res.data;
    },
    async signOut() {
      console.log('logout');
      this.user = null;
      this.token = null;
      const res = await apiClient.post('/users/login');
      if (!this.err) {
        localStorage.removeItem('userStore');
        return true;
      }
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