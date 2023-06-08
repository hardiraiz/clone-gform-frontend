<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar dark color="primary">Login</v-toolbar>
        <v-card-text>
          <v-alert color="red lighten-2" dark v-if="isError">
            {{ $t(message) }}
          </v-alert>

          <v-form ref="form">
            <v-text-field
              label="Email"
              :rules="rules.email"
              v-model="form.email"
              required
            />
              
            <v-text-field
              label="Password"
              :rules="rules.password"
              v-model="form.password"
              type="password"
              required
            />
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          color="primary" 
          @click="onSubmit"
          >Login</v-btn>
        </v-card-actions>
  
      </v-card>
      <div class="d-flex align-baseline">
        <p>{{ $t('DONT_HAVE_ACCOUNT') }}</p>
        <v-btn
          text
          plain
          :to="localePath('/register')"
          :ripple="false"
          color="primary"
          class="pl-1"
        >Register</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
  
<script>
import { mapState } from 'vuex';

export default {
  layout: 'auth',
  middleware: ['unauthenticated'],
  head() {
    return {
      title: 'Login'
    }
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      message: null,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          v => !!v || this.$t('FIELD_REQUIRED', {field: 'Email'}),
          v => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v) || this.$t('EMAIL_INVALID'),
        ],
        password: [
          v => !!v || this.$t('FIELD_REQUIRED', {field: 'Password'}),
          v => v.length >= 6 || this.$t('FIELD_MIN', {field: 'Password', min: 6}),
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('auth/login', this.form); // trigger action vuex
        
        // go to dashboard page
        this.$router.push({ name: 'index___' + this.$i18n.locale });
        
        this.isLoading = false;
        this.isError = false;
      } catch (error) {
        console.log(error.response);

        this.isLoading = false;
        this.isError = true;

        this.message = error.response ? error.response.data.message : 'SERVER_ERROR';
      }
    }
  }
}
</script>