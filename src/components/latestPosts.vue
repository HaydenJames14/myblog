<template>
  <div class="container-fluid" id="postList">
    <h5 class="list-title">Latest Posts</h5>
    <ul>
      <transition-group tag='li' name='slide-up'>
        <li  v-for="post in orderedPosts" :key="post._id" class="latestPostsList">
          <div class="card card-body">
            <div class="content" @click="view(post.threadID, post.threadName)" title="Click to view">
                <h6 class="title flex-item"><strong>{{ post.title }}</strong></h6>
                <img class="postImage img-fluid" v-if="post.image" :src="'data:image/*;base64,'+ post.image" alt="No Image" />
            </div>
            <div class="d-none d-md-block">
              <router-link v-bind:to="'/thread/'+ post.threadID"><span class="link-span" @click="view(post.threadID, post.threadName)">open</span></router-link>
            </div>
          </div>
          <div class="container-fluid card-footer">
            <div class="row post-footer">
              <div class="col-sm-12 col-md-6">
                <p class="thread-footer">thread:<span class="enhance">{{ post.threadName }}</span></p>
              </div>
              <div class="d-none col-sm-12 col-md-6 d-md-block">
                <p class="thread-footer">posted by: <strong class="postedByText">{{ post.postedBy }}</strong>   on: <strong>{{ post.postedOn | moment }}</strong></p>
              </div>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
    import moment from 'moment'
    export default {
      name: 'latestPosts',
      data() {
        return {
          contentType: ''
        }
      },
      methods: {
        view(id,threadname) {
          this.$store.commit('setThreadId', id );
          this.$store.commit('setThreadName', threadname );
          this.$router.push('/thread/'+id);
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
        this.$http.get("http://localhost:5000/latestPosts").then(posts => {
          this.$store.dispatch('setPosts', posts.data);
          //this.contentType = posts.data.image.content-type;
          }).catch(err => {
            console.log('Error retrieving data: '+ err);
          });
      },
      computed: {
        orderedPosts: function() {
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

.card-body {
  display:flex;
}

.card-footer {
  display:flex;
  justify-content:space-between;
}

.post-footer p {
  display:flex;
  padding-bottom: 3px;
  justify-content: space-between
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
  justify-content: space-between;
}

.content {
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
}

.content:hover {
  cursor:pointer;
}
/*
.postImage {
  display:block;
  margin: 20px 0;
  border:1px solid grey;
  min-width:100px;
  min-height:100px;
  max-width:100%;
  max-height:100vh;
}
*/
router-link:hover {
  text-decoration-style: none;
}




</style>

<style>
.slide-up-enter-active, .fade-leave-active {
  transition: opacity 2.5s
}

.slide-up-enter, .fade-leave-to {
  opacity: 0
}
</style>
