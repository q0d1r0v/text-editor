<template>
  <div>
    <div v-for="(element, id) of elements" :key="id">
      <div v-html="element.elements"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",

  components: {},

  data() {
    return {
      elements: null,
    };
  },
  created() {
    this.getElements();
  },
  methods: {
    async getElements() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/get-elements"
        );
        this.elements = response.data;
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
@import "~vue2-editor/dist/vue2-editor.css";
@import "~quill/dist/quill.bubble.css";

.ql-align-center {
  text-align: center;
}
.ql-align-right {
  text-align: right;
}
</style>
