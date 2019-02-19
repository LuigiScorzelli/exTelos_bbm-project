import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";
import Home from "./views/home.vue";
import Login from "./views/login.vue";
import UsersCreate from "./views/users/create.vue";
import UsersIndex from "./views/users/index.vue";
import UsersUpdate from "./views/users/_id/update.vue";
import TeamsIndex from "./views/teams/index";
import TeamsCreate from "./views/teams/create";
import TeamsUpdate from "./views/teams/_id/update";
import JobsIndex from "./views/jobs/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/users/create",
      name: "usersCreate",
      component: UsersCreate
    },
    {
      path: "/users",
      name: "usersIndex",
      component: UsersIndex
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/users/:id/update",
      name: "usersUpdate",
      component: UsersUpdate
    },
    {
      path: "/teams",
      name: "teamsIndex",
      component: TeamsIndex
    },
    {
      path: "/teams/create",
      name: "teamsCreate",
      component: TeamsCreate
    },
    {
      path: "/teams/:id/update",
      name: "teamsUpdate",
      component: TeamsUpdate
    },
    {
      path: "/jobs",
      name: "jobsIndex",
      component: JobsIndex
    }
  ]
});

const noAuthPages = ["/login"];

/*router.beforeEach((to, from, next) => {
  let auth = store.getters["accounts/getAuth"];
  let redirectUrl = null;
  if (auth == null && !noAuthPages.includes(to.path)) {
    redirectUrl = "/login";
  } else if (auth != null && noAuthPages.includes(to.path)) {
    redirectUrl = "home";
  }
  if (redirectUrl != null) {
    next(redirectUrl);
  } else {
    next();
  }
})*/

export default router;
