import VueRouter from "vue-router";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home.vue"),
      children: [
        {
          path: "home",
          component: () => import("@/views/home/Index.vue"),
        },
        {
          path: "configuration",
          component: () => import("@/views/home/Configuration.vue"),
        },
      ],
    },
  ],
});
