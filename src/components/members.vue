<template>
    <div id="members-list">
      <h6 class="text-center" id="membersHeading">Members List</h6>
      <p style="font-weight:normal; font-style: italic; margin-bottom:20px;" class="text-center" id="membersSubHeading">(active members in bold)</p>
      <p style="font-weight:normal; font-style: italic; margin-bottom:20px; line-height:0.8" class="text-center" id="subHeading">(click to message)</p>
      <contact v-if="contacting" :name='memberName' :msgReceived="incomingMessage" @messageSent="contacting = false"></contact>  <!-- :contacting="contacting" -->
      <ul>
        <li v-for="member in orderedMembers" :key="member.username"><p v-if="member.username != $store.getters.getUsername" class="memberName text-center" @click="contactMember(member.username, member.active)" :class="{setBold: member.active === true}">
         {{ member.username }}</p>
        </li>
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
          //receivedMessage: false,
          receivedFrom: '',
          name_selected: false,
          incomingMessage: {}
        }
      },
      methods: {
        contactMember(recipientName, status) {
          // Called when member is selected
          if(this.name_selected === true) { return; }
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
              this.name_selected = true;
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
        this.$socket.emit('membersList');
      },
      sockets: {
        messageReceived(data) {
          console.log('message: '+ data.message);
          console.log('Message Received from: '+ data.sender);
          this.incomingMessage = {
            message: data.message,
            sender: data.sender,
            //created: Date.now().toLocaleString()
          }
          this.$store.commit('setMessages', this.incomingMessage);
          //this.receivedMessage = true;
        },
        loadMembers(members) {
          console.log('In loadMembers socket method in members.vue. Value of data = '+members);
          this.$store.dispatch('setAllMembers', members);
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
    font-size:1.8rem;
    font-weight:bold;
  }

  #membersSubHeading {
    color:green;
    font-size:1.2rem;
    font-weight:bold;
  }

  #subHeading {
    color: rgb(23, 134, 23);
    font-size:1rem;
  }

  #members-list {
      margin:20px;
      background-color: lightblue;
      border:10px solid deepskyblue;
      border-radius: 6px;
      overflow: auto;
      height: 100%;
      font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

  }

  .memberName {
      margin-bottom:20px;
      font-style: italic;
      margin: auto auto;
      font-weight:lighter;
      font-size:1rem;
      cursor: pointer;
      color: navy;
      font-size:1.4rem;
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
