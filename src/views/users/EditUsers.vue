<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
 
let userToUpdate = reactive({
  id: "",
  first_name: "",
  last_name:"",
  member_type:<any>{},
  address:"",
  room:"",
  rank:"",
});
let userToUpdateAll = reactive([])

const router = useRouter();
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
  axios
    .get("https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member")
    .then((response) => {
    userToUpdateAll = response.data;
  });
});
 
const updateUser = () => {
  const checkEdit = userToUpdateAll.filter((userToUpdateAll: any) => userToUpdateAll.first_name == userToUpdate.first_name);
  if (checkEdit.length === 0){
    const checkRoomEdit = userToUpdateAll.filter((userToUpdateAll: any) => userToUpdateAll.room == userToUpdate.room); 
    const checkMemberEdit = checkRoomEdit.filter((checkRoomEdit: any) => checkRoomEdit.member_type.key == userToUpdate.member_type.key);
    if(checkMemberEdit.length !== 0 && userToUpdate.member_type.value === "member" ){
      axios.put(`https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member/${route.params.id}`, userToUpdate).then(() => {
      router.push("/");
      });}
    else if(checkMemberEdit.length === 0 && (userToUpdate.member_type.value === "leader" || "ast")){
      axios.put(`https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member/${route.params.id}`, userToUpdate).then(() => {
      router.push("/");
      })
    } else {alert('แต่ละห้องสามารถมีหัวหน้าและรองหัวหน้าได้อย่างละคน')}
  }else{
    alert('ชื่อซ้ำ')
  }
};

const member_type_select = [
{ key: 0 , value: 'member'},
{ key: 1 , value: 'leader'},
{ key : 2 , value:'ast'}
]

const rooms = Array.from({ length: 10 }, (_, index) => index + 1)

</script>
<template>
  <div class="container mt-4">
    <h2>เพิ่มข้อมูลผู้ใช้งาน</h2>
    <form @submit.prevent="updateUser">
      <div class="box-con">
        <div class="mb-3">
          <label for="first_name" class="form-label">ชื่อ : </label>
          <input type="text" class="form-control" id="first_name" v-model="userToUpdate.first_name" required>
        </div>
        <div class="mb-3">
          <label for="last_name" class="form-label">นามสกุล : </label>
          <input type="text" class="form-control" id="last_name" v-model="userToUpdate.last_name" required>
        </div>
        <div class="mb-3">
          <label for="member_type" class="form-label">ตำแหน่ง : </label>
          <select class="form-control" id="member_type" v-model="userToUpdate.member_type" required>
            <option v-for="item in member_type_select" :value="item">
              {{item.value}}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">ที่อยู่ : </label>
          <input type= "text" class="form-control" id="address" v-model="userToUpdate.address" required>
        </div>
        <div class="mb-3">
          <label for="room" class="form-label">ห้อง : </label>
          <select class="form-control" id="room" v-model="userToUpdate.room" required>
            <option v-for="item in rooms" :value="item" :disabled="userToUpdate.member_type.value === 'leader'">
              {{item}}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="rank" class="form-label">เลขที่ : </label>
          <input type="number" class="form-control" id="rank" v-model="userToUpdate.rank" required>
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
