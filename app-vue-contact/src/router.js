import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)


export default new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        alias: "/contact",
        name: "contact",
        component: () => import("./components/ContactList")
      },
      {
        path: "/contact/:id",
        name: "contact-details",
        component: () => import("./components/Contact")
      },
      {
        path: "/add",
        name: "add",
        component: () => import("./components/AddContact")
      }
    ]
  });