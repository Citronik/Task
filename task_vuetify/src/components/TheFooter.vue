<template>
  <v-footer id="footer">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
        :to="link.path"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>PLATFORMER</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
    data: () => ({
      links: [
        {name:'Home', path:'/'},
        {name:'About Us', path:'/about'},
        {name:'Facebook', path:'/facebook'},
        {name:'Blog', path:'/blog'},
        {name:'Contact Us', path:'/contact'},
      ],
    }),
    methods: {

  },
  }
</script>

<style>
#footer {
  background-color: #263238;
  color: white;
  padding: 16px;
  font-size: xx-large;
}
#footer .v-btn {
  color: white;
}

#footer a {
  color: #01579B;
}

#footer a:hover {
  font-weight: bold;
  color: black;
}

</style>
