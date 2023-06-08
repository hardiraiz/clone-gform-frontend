<template>
  <v-row>
    <v-col cols="6" offset="3" md="4" offset-md="4">
      <v-card>
        <v-card-text class="d-flex align-center">
          <!-- <v-icon class="ml-3">mdi-loading</v-icon> -->
          <v-progress-circular class="mr-3" indeterminate color="primary"></v-progress-circular>
          <h2>Logout</h2>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import * as Cookies from 'js-cookie'

export default {
  layout: 'auth',
  middleware: ['authenticated'],
  mounted() {
    setTimeout(() => {
      // delete cookies
      // Cookies.remove('mycloneform');
      // window.location.href = '/login';
      
      // reset data
      this.$store.commit('auth/logout');
      this.$router.push({ name: 'login___' + this.$i18n.locale });
    }, 1500);
  }
}
</script>