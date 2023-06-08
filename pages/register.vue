<template>
<v-row>
  <v-col cols="10" offset="1" md="4" offset-md="4">
    <v-card>
      <v-toolbar dark color="primary">Register</v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="Fullname"
            :rules="rules.fullname"
            v-model="form.fullname"
            required
          />

          <v-text-field
            label="Email"
            :rules="rules.email"
            v-model="form.email"
            @keydown="resetEmailExistMessage"
            required
          />
            
          <v-text-field
            label="Password"
            :rules="rules.password"
            v-model="form.password"
            type="password"
            required
          />
            
          <v-text-field
            label="Confirm Password"
            :rules="rules.password_confirmation"
            v-model="form.password_confirmation"
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
        >Register</v-btn>
      </v-card-actions>

    </v-card>
    <div class="d-flex align-baseline">
      <p>{{ $t('HAVE_ACCOUNT') }}</p>
      <v-btn
        text
        plain
        :to="localePath('/login')"
        :ripple="false"
        color="primary"
        class="pl-1"
      >Login</v-btn>
    </div>
  </v-col>
</v-row>
</template>

<script>
export default {
  layout: 'auth',
  middleware: ['unauthenticated'],
  head() {
    return {
      title: 'Register'
    }
  },
  data() {
    return {
      emailExist: false,
      isLoading: false,
      form: {
        fullname: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      rules: {
        fullname: [
          v => !!v || this.$t('FIELD_REQUIRED', {field: 'Fullname'}),
        ],
        email: [
          v => !!v || this.$t('FIELD_REQUIRED', {field: 'Email'}),
          v => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v) || this.$t('EMAIL_INVALID'),
          v => !this.emailExist || this.$t('EMAIL_EXIST'),
        ],
        password: [
          v => !!v || this.$t('FIELD_REQUIRED', {field: 'Password'}),
          v => v.length >= 6 || this.$t('FIELD_MIN', {field: 'Password', min: 6}),
        ],
        password_confirmation: [
          v => !!v || this.$t('FIELD_REQUIRED', {field: 'Password confirmation'}),
          v => v === this.form.password || this.$t('FIELD_CONFIRM', 
              {field_confirm: 'password confirm', field: 'password'}),
        ]
      }
    }
  },
  methods: {
    resetEmailExistMessage() {
      this.emailExist = false
    },
    async onSubmit() {
      try {
        if(this.$refs.form.validate()){
          this.isLoading = true;
          const response = await this.$axios.$post('http://localhost:3000/register', this.form);
          if(response.message == 'USER_REGISTER_SUCCESS') {
            // save user data to cookies
            this.$store.commit('auth/setFullName', response.fullname);
            this.$store.commit('auth/setAccessToken', response.accessToken);
            this.$store.commit('auth/setRefreshToken', response.refreshToken);
            
            // go to dashboard page
            this.$router.push({ name: 'index___' + this.$i18n.locale });
          }

          this.isLoading = false;
        }
      } catch (error) {
        if(error.response.data.message == 'EMAIL_ALREADY_EXIST') {
          this.emailExist = true
          this.$refs.form.validate()
        }
        this.isLoading = false;
      }
    }
  }
}
</script>