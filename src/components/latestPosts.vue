<template>
  <div class="container-fluid" id="postList">
    <h5 class="list-title">Latest Posts</h5>
    <ul>
      <li  v-for="post in orderedPosts" :key="post._id" class="latestPostsList">
        <div class="card card-body">
          <h6 class="title flex-item"><strong>{{ post.title }}</strong></h6><br>
          <img class="postImage img-fluid" v-if="post.imageUrl" src="'data:image/jpg;base64,'+ post.imageUrl" />
          <router-link v-bind:to="'/thread/'+ post.threadID"><span class="link-span" @click="view(post.threadID, post.threadName)">open</span></router-link>
        </div>
        <div class="card-footer">
          <p class="thread-footer">thread: <span class="enhance">{{ post.threadName }}</span></p>
          <p class="thread-footer">created by: <strong class="postedByText">{{ post.postedBy }}</strong>   on: <strong>{{ post.postedOn | moment }}</strong></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import moment from 'moment'
    export default {
      name: 'latestPosts',
      methods: {
        view(id,threadname) {
          this.$store.commit('setThreadId', id );
          this.$store.commit('setThreadName', threadname );
        }
      },
      filters: {
        moment: date => {
          return moment(date).format('MMMM Do YYYY, h:mm a');
        },
        toUpperCase: title => {
          return title.toUpperCase();
        }
      },
      mounted() {
        this.$http.get("http://localhost:5000/latestPosts").then(res => {
          this.$store.dispatch('setPosts', res.data);
          }).catch(err => {
            console.log('Error retrieving data: '+ err);
          });
      },
      computed: {
        orderedPosts: function() {
          //console.log('posts2: '+this.posts);
          if(this.$store.getters.getPosts.length > 0) {
            return this.$lodash.orderBy(this.$store.getters.getPosts,['postedOn'], ['desc']);
          }
        }
      },
      sockets: {

      }
    }
</script>

<style scoped>
ul {
  margin:0;
  padding:0;
  overflow-y:scroll;
  height:120vh;
}

li {
  list-style: none;
  margin-bottom:0px;
  margin-right:10px;
  padding:5px;
  margin-top:2px;
}

.title {
  color:black;
  padding:5px;
}

#title {
  padding:5px;
  color:lightgreen;
  text-align:left;
  font-size: 1rem;
}

.latestPostsList {
  margin-bottom:-10px;
}
.enhance {
  color: rgb(197, 45, 45);
  font-size:0.9rem;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
  padding-bottom:2px;
}

.view-btn {
  padding:5px;
  font-size:12px;
}

.thread-footer {
  font-size:0.9rem;
  padding-bottom:4px;
  margin:0;
}

.postImage {
  display:block;
  margin: auto auto;
  border:1px solid grey;
  min-width:200px;
  min-height:200px;
  max-width:100%;
  max-height:100vh;
  align-self: left;
}
</style>
