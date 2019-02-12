<template>
  <v-app>
    <v-toolbar
      color="#008080"
      dark
      app>
      <v-toolbar-title>
        <v-btn
          href="/#/"
          fab
          flat>BUDDY</v-btn>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<style lang="scss">
  @import '/styles/app.scss';

  #app {
  font-family: 'Muli', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

</style>

<script>
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
    };
  },
  mounted() {
  }
};
</script>
