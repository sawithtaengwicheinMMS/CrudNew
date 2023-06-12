<script setup>
import { ref, onMounted, reactive } from "vue";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup.vue";
import axios from "axios";
const allUsers = ref([]);
const itemToDeleteId = ref([0]);
const checkMemberDel = ref('member');
const rooms = Array.from({ length: 10 }, (_, index) => index + 1)
let deleteModal;
// let MathRoom = reactive(0)




onMounted(() => {
  deleteModal = new window.bootstrap.Modal(
    document.getElementById("deleteModal")
  );

  axios.get("https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member").then((response) => {
    response.data.sort((a,b) => a.room - b.room)
    allUsers.value = response.data;
  });
});

const openDeleteModal = (id,member_type) => {
  checkMemberDel.value = member_type.value
  itemToDeleteId.value = id;
  deleteModal.show();
};




const confirmDelete = () => {
  if (checkMemberDel.value !== 'leader'){
    axios
      .delete(`https://647efbeec246f166da8fd1bd.mockapi.io/api/student/member/${itemToDeleteId.value}`)
      .then(() => {
        allUsers.value = allUsers.value.filter(
          (_) => _.id !== itemToDeleteId.value
        );
        itemToDeleteId.value = 0;
        deleteModal.hide();
        router.push("/");
      });} 
  else {
    deleteModal.hide();
    alert('ไม่สามารถลบหัวหน้าห้องได้')}
};

//
</script>
<template>
      <div>
        <div class="table-responsive-xl">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ชื่อ </th>
                <th scope="col">สกุล </th>  
                <th scope="col">ตำแหน่ง </th>
                <th scope="col">เลขที่ </th>
                <th scope="col">ที่อยู่ </th> 
                <th scope="col">ห้อง </th>  
                <th scope="col" class="text-nowrap">เลขประจำตัว </th>
                <th scope="col">action </th>
              </tr>
            </thead>
            <tbody class="col" v-for="item in allUsers" :key="item.id">
              <tr>
                <td class="text-nowrap">
                  {{item.first_name}}
                </td>
                <td class="text-nowrap">
                  {{item.last_name}}
                </td>
                <td class="text-nowrap">
                  {{item.member_type.value}}
                </td>
                <td class="text-nowrap">
                  {{item.rank}}
                </td>
                <td class="text-nowrap">
                  {{item.address}}
                </td>
                <td class="text-nowrap">
                  {{item.room}}
                </td>
                <td class="text-nowrap">
                  {{item.id}}
                </td>
                <td class="text-nowrap">
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
                    @click="openDeleteModal(item.id,item.member_type)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <button>
            <select v-model="MathRoom">
              <option v-for="item in rooms">
                  {{item}}
              </option>
            </select>
          </button> -->
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
