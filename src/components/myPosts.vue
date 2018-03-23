<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <h5 class="list-title">My Posts</h5>
        <ul>
          <!--<transition-group tag='li' name='slide-up'> -->
            <li v-for="post in orderedPosts" :key="post.id">
              <router-link v-bind:to="'/thread/'+ post.threadID">
                <div class="card card-body" @click="view(post.threadID, post.threadName)">
                  <h6 class="title flex-item"><strong>{{ post.title }}</strong></h6>
                  <img class="postImage img-fluid flex-item" v-if="post.image" :src="'data:image/*;base64,'+ post.image" alt="Error: can not display Image" />
                </div>
              </router-link>

              <div class="card card-footer">
                <p class="thread-footer">thread: <span class="enhance">{{ post.threadName }}</span></p>
                <p class="thread-footer">created on: <strong class="postedByText">{{ post.createdOn | moment }}</strong></p>
              </div>
            </li>
          <!--</transition-group> -->
  <li v-for="post in orderedPosts" :key="post._id">
                <div class="row">
                  <div class="card card-body">
                    <h6 class="title flex-item" style="padding:5px; height:auto; min-height:35px; overflow-x:auto"><strong>{{ post.title }}</strong></h6>
                    <img v-if="post.image" :src="'data:image/jpg;base64,'+ post.image" class="img-fluid post-image">
                  </div>
                </div>
                <div class="row">
                  <div class="card card-footer col-sm-12">
                    <p class="post-footer"><i class="fa fa-thumbs-o-up" @click="voteUp(post._id), post.likes += 1" aria-hidden="true"> {{ post.likes }}</i> <i class="fa fa-thumbs-o-down" @click="voteDown(post._id), post.dislikes += 1" aria-hidden="true"> {{ post.dislikes }}</i></p>
                    <p class="post-footer">posted by: <strong class="postedByText">{{ post.postedBy | toUpperCase }} : {{ post.postedOn | moment }}</strong></p>
                  </div>
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
  justify-content: flex-start;
  flex-direction:column;
}

.postImage {
  min-height:100px;
  max-width:50%;
  max-height:100vh;
}
*/
.slide-up-enter-active, .fade-leave-active {
  transition: opacity 2s
}

.slide-up-enter, .fade-leave-to {
  opacity: 0
}
/******************************************************************** */
@media screen and (min-width: 768px) {


}
</style>
