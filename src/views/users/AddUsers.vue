<script setup lang="ts">
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";


let usersdata = reactive({
  id: "",
  first_name: "",
  last_name:"",
  member_type:<any>{},
  address:"",
  room:"",
  rank:"",
});

const member_type_select = [
{ key: 0 , value: 'member'},
{ key: 1 , value: 'leader'},
{ key : 2 , value:'ast'}
]

const rooms = Array.from({ length: 10 }, (_, index) => index + 1)

const router = useRouter();

const addNewUsers = () => {
  axios.get("https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member").then((response) => {
    const allStudent = response.data
    const checkNameAdd = allStudent.filter((allStudent: any) => allStudent.first_name == usersdata.first_name); 
      if (checkNameAdd.length === 0){
        const checkRoomAdd = allStudent.filter((allStudent: any) => allStudent.room == usersdata.room); 
        const checkMemberAdd = checkRoomAdd.filter((checkRoomAdd: any) => checkRoomAdd.member_type.key == usersdata.member_type.key); 
          if(checkMemberAdd.length !== 0 && usersdata.member_type.value === "member" ){
            axios.post("https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member/", usersdata).then(() => {
            router.push("/");
            });
          } else if(checkMemberAdd.length === 0 && (usersdata.member_type.value === "leader" || "ast")){
            axios.post("https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member/", usersdata).then(() => {
            router.push("/");
        });
          } else {
            alert('แต่ละห้องสามารถมีหัวหน้าและรองหัวหน้าได้อย่างละคน')
          }
  }else(alert('ชื่อซ้ำ'))});
};
</script>

<template>
  <div class="container mt-4">
    <h2>เพิ่มข้อมูลผู้ใช้งาน</h2>
    <form @submit.prevent="addNewUsers">
      <div class="box-con">
        <div class="mb-3">
          <label for="name" class="form-label">ชื่อ : </label>
          <input type="text" class="form-control" id="name" v-model="usersdata.first_name" required>
        </div>
        <div class="mb-3">
          <label for="last_name" class="form-label">นามสกุล : </label>
          <input type="text" class="form-control" id="last_name" v-model="usersdata.last_name" required>
        </div>
        <div class="mb-3">
          <label for="member_type" class="form-label">ตำแหน่ง : </label>
          <select class="form-control" id="member_type" v-model="usersdata.member_type" required>
            <option v-for="item in member_type_select" :value="item">
              {{item.value}}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">ที่อยู่ : </label>
          <input type="text" class="form-control" id="address" v-model="usersdata.address" required>
        </div>
        <div class="mb-3">
          <label for="rank" class="form-label">เลขที่ : </label>
          <input type="number" class="form-control" id="rank" v-model="usersdata.rank" required>
        </div>
        <div class="mb-3">
          <label for="room" class="form-label">ห้อง : </label>
          <select class="form-control" id="room" v-model="usersdata.room" required>
            <option v-for="item in rooms" :value="item">
              {{item}}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">เพิ่มผู้ใช้งาน</button>
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
