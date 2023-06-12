<script lang="ts">

import Navbar from '../components/Navbar.vue';
import SideBar from '../components/SideBar.vue';

export default {
  props: {},
  components: { Navbar, SideBar },
}
</script>
<template>
  <div>
    <div>
        <Navbar/>
        <div>
          <!-- <SideBar/> -->
        </div>
        <div>
          <slot></slot>
        </div>
    </div>
  </div>
</template>
