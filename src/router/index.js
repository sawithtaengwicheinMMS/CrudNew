import { createRouter, createWebHistory } from "vue-router";
import AllUsers from "../views/users/AllUsers.vue";
import AddUsers from "../views/users/AddUsers.vue";
import EditUsers from "../views/users/EditUsers.vue";
import DetailUsers from "../views/users/DetailUsers.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AllUsers,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: "/detail-user/:id",
      name: "detail User",
      component: DetailUsers,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: "/add-user",
      name: "Add User",
      component: AddUsers,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: "/edit-user/:id",
      name: "Edit User",
      component: EditUsers,
      meta: { layout: 'AppLayoutAdmin' }
    }
  ],
});

export default router;
