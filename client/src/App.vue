<template>
  <v-app>
    <v-app-bar class="elevation-0 success" dark app>
      <div>
        <h1>demo</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn text icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
