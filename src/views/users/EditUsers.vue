<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
 
let userToUpdate = reactive({
  id: 0,
  name: "",
  birthday:"",
  phone:"",
  address:"",
  username:"",
  password:"",
});
 
const router = useRouter();
const route = useRoute();
 
onMounted(() => {
  axios
    .get(`http://localhost:3000/users/${route.params.id}`)
    .then((response) => {
      console.log(response.data)
      userToUpdate.id = response.data.id;
      userToUpdate.name = response.data.name;
      userToUpdate.birthday = response.data.birthday;
      userToUpdate.phone = response.data.phone;
      userToUpdate.address = response.data.address;
      userToUpdate.username = response.data.username;
      userToUpdate.password = response.data.password;
    });
});
 
const updateUser = () => {
  axios.put(`http://localhost:3000/users/${route.params.id}`, userToUpdate).then(() => {
    router.push("/");
  });
};
</script>
<template>
  <div class="container mt-4">
    <h2>เพิ่มข้อมูลผู้ใช้งาน</h2>
    <form @submit.prevent="updateUser">
      <div class="box-con">
        <div class="mb-3">
          <label for="name" class="form-label">ชื่อ - นามสกุล : </label>
          <input type="text" class="form-control" id="name" v-model="userToUpdate.name" required>
        </div>
        <div class="mb-3">
          <label for="birthday" class="form-label">วันเกิด : </label>
          <input type="date" class="form-control" id="birthday" v-model="userToUpdate.birthday" required>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">เบอร์โทรศัพท์ : </label>
          <input type="tel" class="form-control" id="phone" v-model="userToUpdate.phone" required>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">ที่อยู่ : </label>
          <textarea class="form-control" id="address" v-model="userToUpdate.address" required></textarea>
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">Username : </label>
          <input type="text" class="form-control" id="username" v-model="userToUpdate.username" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password : </label>
          <input type="password" class="form-control" id="password" v-model="userToUpdate.password" required>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">บันทึก</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style>
  h2{
      text-align: center;
      justify-content: center;
      font-weight: bold;
      margin: 20px;
    
  }
  form{
      display: flex;
      text-align: center;
      justify-content: center;
      flex-direction: column;
  }

  .box-con{
    border: 2px solid red;
    border-radius: 15px;
    background-color: #f5f5f5;
    width: 50%;
    align-self: center;
  }
  .mb-3{
    margin:20px;
  }

  /* .form-group{
      text-align: center;
      justify-content: center;
  } */
</style>
