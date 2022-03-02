<template>
  <div>
    <v-btn @click="showAddDialog()" block color="primary" depressed>add</v-btn>
    <v-data-table
      :headers="headers"
      :items="elements"
      hide-default-footer
      no-data-text="Ma'lumotlar mavjud emas"
    >
      <template #item.edit_btn="items">
        <v-btn icon @click="showDialog(items)">
          <v-icon small color="orange"> mdi-pencil </v-icon>
        </v-btn>
      </template>
      <template #item.delete_btn="items">
        <v-btn icon @click="showDeleteDialog(items)">
          <v-icon small color="error"> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog width="600px" v-model="dialog" persistent>
      <v-card min-height="70vh" width="600px" style="position: relative">
        <VueEditor class="pa-5" v-model="content" />
        <div style="position: absolute; width: 100%; height: 60px; bottom: 0">
          <div
            style="
              width: 100%;
              height: 60px;
              position: sticky;
              position: -webkit-sticky;
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <div
              style="
                width: 100%;
                height: 60px;
                position: sticky;
                position: -webkit-sticky;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: right;
                background-color: #fff;
              "
            >
              <v-btn @click="editText()" class="mr-5" color="success" depressed
                >saqlash</v-btn
              >
              <v-btn
                class="mr-5"
                color="error"
                depressed
                @click="dialog = false"
                >bekor qilish</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog width="600px" v-model="add_dialog" persistent>
      <v-card min-height="70vh" width="600px" style="position: relative">
        <VueEditor class="pa-5" v-model="content" />
        <div style="position: absolute; width: 100%; height: 60px; bottom: 0">
          <div
            style="
              width: 100%;
              height: 60px;
              position: sticky;
              position: -webkit-sticky;
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <div
              style="
                width: 100%;
                height: 60px;
                position: sticky;
                position: -webkit-sticky;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: right;
                background-color: #fff;
              "
            >
              <v-btn @click="saveData()" class="mr-5" color="success" depressed
                >saqlash</v-btn
              >
              <v-btn
                class="mr-5"
                color="error"
                depressed
                @click="add_dialog = false"
                >bekor qilish</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog width="600px" v-model="delete_dialog">
      <v-card class="pa-5" width="600px" height="100%">
        <h3>{{ delete_title }}ni o'chirish</h3>
        <div
          style="
            position: -webkit-sticky;
            position: sticky;
            width: 100%;
            height: 70px;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: right;
          "
        >
          <v-btn @click="deleteElement()" class="mr-3" color="success" depressed
            >tasdiqlash</v-btn
          >
          <v-btn @click="delete_dialog = false" color="error" depressed
            >bekor qilish</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  name: "edit-site-page",
  components: { VueEditor },

  data() {
    return {
      delete_title: null,
      delete_dialog: false,
      add_dialog: false,
      element_id: null,
      content: null,
      elements: [],
      data: [],
      dialog: false,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Elements",
          value: "elements",
          align: "center",
        },
        {
          text: "Edit",
          value: "edit_btn",
        },
        {
          text: "Delete",
          value: "delete_btn",
        },
      ],
    };
  },
  created() {
    this.getElements();
  },
  methods: {
    async deleteElement() {
      try {
        const response = await axios.delete(
          "http://localhost:4000/api/delete",
          {
            params: {
              id: this.element_id,
            },
          }
        );
        this.getElements();
        this.delete_dialog = false;
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    },
    showDeleteDialog(items) {
      this.element_id = items.item.id;
      this.delete_title = items.item.elements;
      this.delete_dialog = true;
    },
    async saveData() {
      try {
        const response = await axios.post("http://localhost:4000/api/create", {
          elements: this.content,
        });
        this.getElements();
        this.add_dialog = false;
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    },
    showAddDialog() {
      this.content = "";
      this.add_dialog = true;
    },
    async editText() {
      try {
        const response = await axios.put("http://localhost:4000/api/update", {
          params: {
            id: this.element_id,
            elements: this.content,
          },
        });
        this.getElements();
        this.dialog = false;
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    },
    async getElements() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/get-elements"
        );
        this.elements = response.data;
      } catch (e) {
        console.log(e);
      }
    },
    showDialog(items) {
      this.content = items.item.elements;
      this.element_id = items.item.id;
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
@import "~vue2-editor/dist/vue2-editor.css";
@import "~quill/dist/quill.bubble.css";
</style>
