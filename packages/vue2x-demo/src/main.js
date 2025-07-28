import behaviorAnalysis from "behavior-analysis";
import Vue from "vue";
import App from "./App.vue";

behaviorAnalysis.init({ apId: "vue2x-demo" });

new Vue({
  el: "#app",
  render: (h) => h(App),
});
