<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <h5 class="list-title">My Posts</h5>
        <ul>
          <li v-for="post in orderedPosts" :key="post.id">
            <div class="card card-body">
              <h6 class="title flex-item"><strong>{{ post.title }}</strong></h6>
              <img class="postImage img-fluid flex-item" v-if="post.image" :src="'data:image/*;base64,'+ post.image" alt="Error: can not display Image" />
              <router-link v-bind:to="'/thread/'+ post.threadID"><span class="link-span" @click="view(post.threadID, post.threadName)">open</span></router-link>
            </div>
            <div class="card card-footer">
              <p class="thread-footer">thread: <span class="enhance">{{ post.threadName }}</span></p>
              <p class="thread-footer">created on: <strong class="postedByText">{{ post.createdOn | moment }}</strong></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'myposts',
    data() {
      return {
        posts: {}
      }
    },
    beforeMount() {
      if(!this.$store.getters.getLoggedStatus || !sessionStorage.getItem('accessToken')) {
        this.$router.push('/latestThreads');
      }
    },
    mounted() {
      let id = this.$store.getters.getUserId;
      if(!id) {
        console.log('Please log in to retreive your posts');
      } else {
        this.$http.get('http://localhost:5000/myPosts/' + id).then(response => {
          if(!response) {
            console.log('You have not posted anything yet')
          } else {
            this.$store.dispatch('setMyPosts', response.data);
          }
        }).catch(err => {
          console.log('Error retreiving your posts')
        })
      }
    },
    methods: {
      view(id, name) {
        this.$store.commit('setThreadId', id);
        this.$store.commit('setThreadName', name);
        if(id) {
          this.$http.get('http://localhost:5000/threadPosts/'+ id).then(response => {
            this.$store.dispatch('setMyPosts', response.data);
          }).catch(err => {
            console.log('Error loading threads');
          })
        }

      }
    },
    computed: {
      orderedPosts: function() {
        return this.$lodash.orderBy(this.$store.getters.getMyPosts,['postedOn'], ['desc']);
      }
    },
    filters: {
      moment: date => {
        return moment(date).format('MMMM Do YYYY, h:mm a');
      },
      toUpperCase: title => {
        return title.toUpperCase();
      }
    }
  }

</script>

<style scoped>

#listHeader {
  text-align: left;
  font-size:0.9rem;
  color:lightgreen;
}

.title {
  padding:5px;
}

.enhance {
  color: rgb(197, 45, 45);
  font-size:0.9rem;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
}

.card-body {
  display:flex;
}

.postImage {
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 20px 0;
  border:1px solid grey;
  min-width:100px;
  min-height:100px;
  max-width:100%;
  max-height:100vh;

}


</style>
