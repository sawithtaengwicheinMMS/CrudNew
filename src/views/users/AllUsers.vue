<script setup>
import { ref, onMounted, reactive } from "vue";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup.vue";
import axios from "axios";
const allUsers = ref([]);
const itemToDeleteId = ref([0]);
let deleteModal;
let search = reactive({
  name: "",
});

onMounted(() => {
  deleteModal = new window.bootstrap.Modal(
    document.getElementById("deleteModal")
  );

  axios.get("http://localhost:3000/users").then((response) => {
    allUsers.value = response.data;
  });
});

const openDeleteModal = (id) => {
  itemToDeleteId.value = id;
  deleteModal.show();
};

const confirmDelete = () => {
  axios
    .delete(`http://localhost:3000/users/${itemToDeleteId.value}`)
    .then(() => {
      allUsers.value = allUsers.value.filter(
        (_) => _.id !== itemToDeleteId.value
      );
      itemToDeleteId.value = 0;
      deleteModal.hide();
      router.push("/");
    });
};

const searchFunction = () => {
  if (search.name == "") {
    axios.get("http://localhost:3000/users").then((response) => {
      allUsers.value = response.data;
    });
  } else {
    const result = allUsers.value.filter((word) => word.name == search.name);
    allUsers.value = result;
  }
};
</script>
<template>
  <div class="container mt-3">
    <div class="input-group mb-3 flex-style">
      <form @submit.prevent="searchFunction">
        <input
          type="text"
          class="form-control"
          v-model="search.name"
          placeholder="ค้นหาผู้ใช้งาน"
        />
        <button class="btn btn-primary mt-3" type="submit">ค้นหา</button>
      </form>
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="item in allUsers" :key="item.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">Birthday: {{ item.birthday }}</p>
            <p class="card-text">phone: {{ item.phone }}</p>
            <p class="card-text">Address: {{ item.address }}</p>
            <router-link class="btn btn-primary" :to="`/edit-user/${item.id}`"
              >Edit</router-link
            >
            |
            <router-link class="btn btn-primary" :to="`/detail-user/${item.id}`"
              >Detail</router-link
            >
            |
            <button
              type="button"
              @click="openDeleteModal(item.id)"
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ConfirmDeletePopup @confirmdelete-click="confirmDelete"></ConfirmDeletePopup>
</template>

<style>
.flex-style{
  display: flex;
  justify-content: center;
}
</style>
