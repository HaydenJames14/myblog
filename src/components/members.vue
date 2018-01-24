<template>
    <div id="members-list">
      <h6 class="text-center" id="membersHeading">All Members</h6>
      <p style="font-weight:normal; font-style: italic; margin-bottom:20px;" class="text-center" id="membersHeading">(active members in bold)</p>
      <p style="font-weight:normal; font-style: italic; margin-bottom:20px;" class="text-center" id="subHeading">(click to message)</p>
      <contact v-if="contacting" :name='memberName' :msgReceived="incomingMessage"></contact>
      <ul>
        <li v-for="member in orderedMembers" :key="member.username"><p class="memberName text-center" @click="contactMember(member.username, member.active)" :class="{setBold: member.active === true}">
          {{ member.username }}</p></li>
      </ul>


    </div>
</template>

<script>
  import contact from '../components/contact.vue'
  export default {
      name: 'members',
      props: [ 'name' ],
      data() {
        return {
          contacting: false,
          memberName: '',
          receivedMessage: '',
          receivedFrom: '',
          messageReceived: false,
          incomingMessage: {}
        }
      },
      methods: {
        contactMember(recipientName, status) {
          // Called when member is selected
          if(!this.$store.getters.getLoggedStatus) {
            this.contacting = false;
            alert('Please log in to contact other members');
          } else {
            if(status === false) {
              this.contacting = false;
              alert(`${recipientName} must be logged in to receive messages`);
            }else {
              this.memberName = recipientName;
              this.contacting = true;


            }
          }
        },
      },
      computed: {
        orderedMembers() {
          return this.$lodash.orderBy(this.$store.getters.getAllMembers, ['username']);
        }
      },
      mounted() {
        this.$socket.emit('memberList');
        /*
          this.$http.get("http://localhost:5000/allMembers").then(response => {
              if(response) {
                  this.$store.dispatch('setAllMembers', response.data);
              } else {
                  console.log('could not retrieve members');
              }
          }).catch(err => {
              console.log('Error: '+ err + ' Could not retrieve members')
          }) */
      },
      sockets: {
        messageReceived(data) {
          console.log('message: '+ data.message);
          console.log('Message Received from: '+ data.sender);
          this.incomingMessage = {
            message: data.message,
            sender: data.sender
          }
          this.$store.commit('setReceivedMessage', this.incomingMessage);
        },
        loadmembers(data) {
          this.$store.dispatch('setAllMembers', data);
        }
      },
      components: {
        contact
      }
  }
</script>

<style scoped>
  #membersHeading {
    color:green;
    margin-top:20px;
  }

  #subHeading {
    color: rgb(23, 134, 23);
  }

  #members-list {
      margin:20px;
      background-color: lightblue;
      border:3px ridge navy;
      border-radius: 6px;
      overflow: auto;
      height: 100%;
  }

  .memberName {
      margin-bottom:20px;
      font-style: italic;
      margin: auto auto;
      font-weight:lighter;
      font-size:1rem;
      cursor: pointer;
      color: navy;
  }

  .memberName:hover {
      color: red;
  }

  ul {
      margin:0;
      padding:0;
  }

  li {
      list-style: none;
  }

  .setBold {
    font-weight:bolder;
    color:green;
  }
</style>
