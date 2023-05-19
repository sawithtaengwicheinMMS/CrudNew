<script lang="ts">
export default {
  name : 'NavBar'
}
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img class="logo" src="../assets/SUSU.jpg" alt="Logo">
        </a>
      </div>
      <h1>CRUD Maximum Soft</h1>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="/">หน้าหลัก</a>
          <a class="navbar-item" href="/add-user">เพิ่มผู้ใช้งาน</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style >
h1{
  color: #3300FF;
}
.navbar {
  background-color: #f5f5f5;
  padding: 1rem;
}

.navbar-brand {
  margin-right: 2rem;
}

.navbar-item {
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  display: flex;
  justify-content: center;
}

.logo{
  width: 100px;
}

.navbar-item:hover {
  background-color: #ddd;
}

.navbar-start {
  display: flex;
  justify-content: end;
}
</style>







