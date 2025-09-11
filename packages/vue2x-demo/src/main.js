import behaviorAnalysis from "behavior-analysis";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import router from "@/router";

behaviorAnalysis.config({ info: { apId: "vue2x-demo", userId: "A00000001" } });
Vue.use(VueRouter);
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
});
