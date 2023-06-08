<template>
  <v-toolbar flat class="px-1 px-md-2">

    <v-toolbar-title>
      <v-btn 
        text 
        plain
        :ripple="false"
        class="pl-0 v-btn--active"
        to="/">
          <p class="text-h4 mb-0"><strong>my</strong>form</p>
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
        text
        icon
        class="v-btn--active"
        v-on="on"
        >
          <v-icon large>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-toolbar>
</template>