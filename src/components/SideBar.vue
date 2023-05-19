
<template>
  <div class="sidebar">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/" class="nav-link">หน้าหลัก</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/add-user" class="nav-link">เพิ่มผู้ใช้งาน</router-link>
      </li>
    </ul>
  </div>
</template>

<style>
.sidebar {
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}
.nav-item{
  margin: 20px;
}
.nav-link {
  color: #333;
}
.nav-link:hover {
  background-color: #ddd;
  color: #000;
}
</style>

<script lang="ts">
export default {
  name : 'SideBar',
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const sidebar = document.querySelector('.sidebar') as HTMLElement;
      if (sidebar) {
        sidebar.style.top = window.scrollY  + 'px';
      }
    },
  },
}
</script>