<template>
  <div class="container-fluid" id="app">
    <navbar></navbar>
    <p v-if="$store.getters.getUsername" id="welcomeMessage" style="text-align: right; color:orange;">Welcome {{ $store.getters.getUsername }}</p>
    <div class="row d-flex flex-sm-column flex-md-row justify-content-sm-center justify-content-md-end">
      <search></search>
    </div>
    <div>
      <h5 id="errorMsg">{{ $store.getters.getMsg }}</h5>
      <div class="row">
        <div class="col-sm-12 col-md-7 col-lg-9">
          <router-view></router-view>
        </div>
        <div class="col-sm-12 col-md-5 col-lg-3" id="membersList">
          <members></members>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import latestPosts from "./components/latestPosts.vue";
import latestThreads from "./components/latestThreads.vue";
import myPosts from "./components/myPosts.vue";
import myThreads from "./components/myThreads.vue";
import members from "./components/members.vue";
import thread from "./components/thread.vue";
import search from "./components/search.vue";
import filtered from "./components/filtered.vue";

export default {
  name: "app",
  components: {
    navbar,
    latestPosts,
    latestThreads,
    myPosts,
    myThreads,
    members,
    thread,
    filtered,
    search
  }
};
</script>

<style scoped>
#errorMsg {
  color: red;
  font-weight: bold;
  text-align: center;
}

#welcomeMessage {
  margin-right: 30px;
}
</style>
/**************************************************************************/
/* Global styles */
<style>
* {
  padding: 0px;
  margin: 0px;
}

body,
html {
  background-color: #072756;
  color: white;
  width: 100%;
  height: 100vh;
  min-width: 320px;
}

.title {
  color: black;
  padding: 5px;
  font-size: 0.9rem;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  padding: 5px;
  font-size: 1rem;
}

.card {
  width: 100%;
  margin: 0;
  max-width: 100%;
}

.card-body {
  background-color: lightblue;
  color: black;
  height: auto;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  max-width: 100%;
  padding: 10px 5px;
  border-radius: 5px 5px 0 0;
  margin-bottom: 0;
}

.card-footer {
  height: 25px;
  color: black;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  justify-content: space-between;
  background-color: deepskyblue;
  padding-top: 4px;
  font-size: 0.9rem;
  text-align: right;
  border-radius: 0 0 5px 5px;
  margin-bottom: 5px;
}

.post-footer {
  display: flex;
  height: 25px;
  flex-direction: row;
  flex-flow: nowrap;
  justify-content: space-between;
}

.list-title {
  color: lightgreen;
  text-align: left;
  font-size: 1.2rem;
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 10px;
}

.link-span {
  color: green;
  align-items: center;
  font-size: 0.9rem;
}

.enhance {
  color: red;
  font-weight: bold;
}

.nav-link {
  color: green !important;
  border: none;
}

.nav-link:hover {
  color: red !important;
}

.postImage {
  display: block;
  margin: 4px;
  border: none;
  min-width: 200px;
  min-height: 200px;
  max-width: 90%;
  max-height: 100vh;
}

span {
  color: black;
  margin-right: 10px;
  font-weight: bold;
}

.slide-up-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}

.slide-up-enter,
.fade-leave-to {
  opacity: 0;
}

/************************************************************/
@media screen and (max-width: 768px) {
  .container-fluid {
    margin: auto auto;
    width: 100%;
    padding: 0 5px;
  }

  .card-footer > .single-thread-footer {
    display: flex;
    justify-content: flex-start;
    margin-left: 2px;
    padding: 2px;
    width: 100%;
    max-width: 100%;
    font-size: 0.7rem;
  }

  #welcomeMessage {
    margin-right: 20px !important;
  }

  .strong {
    margin: 0;
    font-weight: bold;
    padding: 0 2px;
  }

  .list-title {
    color: lightgreen;
    text-align: left;
    font-size: 0.8rem;
    margin-bottom: 6px;
    margin-left: 10px;
  }
}
</style>

