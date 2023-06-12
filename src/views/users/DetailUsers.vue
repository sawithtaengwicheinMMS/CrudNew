<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
 
let userToUpdate = reactive({
  first_name: "",
  last_name:"",
  member_type:<any>{},
  address:"",
  room:"",
  rank:"",
  id:"",
});
 
const route = useRoute();
 
onMounted(() => {
  axios
    .get(`https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member/${route.params.id}`)
    .then((response) => {
      console.log(response.data)
      userToUpdate.id = response.data.id;
      userToUpdate.first_name = response.data.first_name;
      userToUpdate.last_name = response.data.last_name;
      userToUpdate.member_type = response.data.member_type;
      userToUpdate.address = response.data.address;
      userToUpdate.room = response.data.room;
      userToUpdate.rank = response.data.rank;
    });
});
 
</script>
<template>
  <div class="container mt-4">
    <h2>ข้อมูลผู้ใช้งาน</h2>
    <div class="col-flex">
      <div class="box-con">      
        <div class="mb-3">
          <label for="first_name" class="form-label">ชื่อ : </label>
          <input type="text" class="form-control" id="first_name" v-model="userToUpdate.first_name" required readonly>
        </div>
        <div class="mb-3">
          <label for="last_name" class="form-label">นามสกุล : </label>
          <input type="text" class="form-control" id="last_name" v-model="userToUpdate.last_name" required readonly>
        </div>
        <div class="mb-3">
          <label for="member_type" class="form-label">ตำแหน่ง : </label>
          <input type="text" class="form-control" id="member_type" v-model="userToUpdate.member_type.value" required readonly>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">ที่อยู่ : </label>
          <input class="form-control" id="address" v-model="userToUpdate.address" required readonly>
        </div>
        <div class="mb-3">
          <label for="room" class="form-label">ห้อง : </label>
          <input type="text" class="form-control" id="room" v-model="userToUpdate.room" required readonly>
        </div>
        <div class="mb-3">
          <label for="rank" class="form-label">เลขที่ : </label>
          <input type="text" class="form-control" id="rank" v-model="userToUpdate.rank" required readonly>
        </div>
        <div class="mb-3">
          <label for="id" class="form-label">เลขประจำตัว : </label>
          <input type="id" class="form-control" id="id" v-model="userToUpdate.id" required readonly>
        </div>
      </div>
  </div>
</div>
</template>
<style>
  h2{
      text-align: center;
      justify-content: center;
      font-weight: bold;
      margin: 20px;
    
  }
  .col-flex{
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
