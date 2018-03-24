<template>
  <div class="container-fluid" id="postList">
    <h5 class="list-title">Latest Posts</h5>
    <ul>
      <transition-group tag='li' name='slide-up'>
        <li v-for="post in orderedPosts" :key="post._id" class="latestPostsList">
          <div class="card card-body" @click="view(post.threadID, post.threadName)">
            <router-link v-bind:to="'/thread/'+ post.threadID">
              <h6 class="title flex-item"><strong>{{ post.title }}</strong></h6>
              <img class="postImage img-fluid" v-if="post.image" :src="'data:image/*;base64,'+ post.image" alt="No Image" />
            </router-link>
          </div>
          <div>
            <div class="card card-footer">
              <p class="thread-footer">posted by: {{ post.postedBy }} on: {{ post.postedOn | moment }}</p>
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

.card-footer {
  display:flex;
  justify-content:flex-end;
}

.content {
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
}

.content:hover {
  cursor:pointer;
}

router-link:hover {
  text-decoration-style: none;
}

</style>
