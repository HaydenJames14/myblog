<template>
<div>
  <div class="loading" v-if="loading">
      Loading...
  </div>
  <div class="container-fluid">
    <h5 class="list-title">Threads</h5>
    <ul class="list-group">
      <transition-group tag='li' name='slide-up'>
        <li v-for="thread in orderedThreads" :key="thread._id">
          <div class="card card-body" @click="view(thread._id, thread.title)">
            <router-link :to="'/thread/'+ thread._id">
              <h6 class="title flex-item"><strong>{{ thread.title }}</strong></h6>
            </router-link>
          </div>
          <div class="card card-footer container-fluid">
            <p class="single-thread-footer">created by: <span class="strong">{{ thread.creatorName }}</span>on: <span class="strong">{{ thread.createdOn | moment }}</span></p>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    orderedThreads() {
      return this.$lodash.orderBy(
        this.$store.getters.getThreads,
        ["createdOn"],
        ["desc"]
      );
    }
  },
  methods: {
    view(id, title) {
      this.$store.commit("setThreadId", id);
      this.$store.commit("setThreadName", title);
    },
    beforeUnload() {
      this.$socket.emit("signedOut", this.$store.getters.getUsername);
      sessionStorage.removeItem("accessToken");
    }
  },
  filters: {
    moment: date => {
      return moment(date).format("MMMM Do YYYY");
    },
    toUpperCase: title => {
      return title.toUpperCase();
    }
  },
  created() {
    window.addEventListener("beforeunload", this.beforeUnload);
  },
  mounted() {
    this.loading = true;
    this.$http.get("http://localhost:5000/latestThreads").then(response => {
      this.$store.dispatch("setThreads", response.data);
      this.loading = false;
    });
  }
};
</script>
<style scoped>
.header-section {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 35px;
  font-size: 0.8rem;
  padding: 5px;
}

ul {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  height: 120vh;
}

.single-thread-footer {
  font-size: 0.8rem;
  width: 100%;
}

.view-btn {
  display: inline-block;
  width: 40px;
  height: 30px;
  padding: 4px;
  cursor: pointer;
}

.card-footer {
  margin-bottom: -4px;
}

.slide-up-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.slide-up-enter,
.fade-leave-to {
  opacity: 0;
}

.list-title {
  margin-top: 10px;
}

@media screen and (max-width: 768px) {
  .card {
    width: 100%;
    max-width: 100%;
  }

  .list-title {
    margin: 5px 0 3px 13px;
  }
}
</style>


