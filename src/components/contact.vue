<template>
<div v-if="this.$store.getters.getLoggedStatus">
  <div class="container-fluid text-center" id="sendMessageBox">  <!-- v-if="messenging" -->
    <input type="text" id="messageText" :placeholder='placeholderText' autofocus v-model="message">
    <button type="submit" class="btn btn-success" id="submit_message" @click.prevent="submitMessage">Send</button>
  </div>
  <div id="receivedMessageBox" v-if="msgReceived">
    <p id="receivedTextNotice">Message received from {{ msgReceived.sender }}</p>
    <!-- <input type="text" id="receivedMessageText" style="margin-bottom:5px;" v-model="msgReceived.message"> -->
    <p id="receivedMessageText" style="margin-bottom:5px; color:red;">{{ msgReceived.message }}</p>
    <!--<button type="submit" class="btn btn-success" id="reply_message" @click.prevent="submitMessage">Reply</button> -->
  </div>
</div>
</template>

<script>
  export default {
    name: 'contact',
    props: [ 'name', 'msgReceived' ],
    data() {
      return {
        messenging: true,
        receivedMessage: this.$store.getters.getReceivedMessage.message,
        receivedFrom: this.$store.getters.getReceivedMessage.sender,
        message: '',
        placeholderText: 'type message..'
      }
    },
    methods: {
      submitMessage() {
        if(this.message) {
          let sender = this.$store.getters.getUsername;
          let messageData = {
            sender: this.$store.getters.getUsername,
            message: this.message
          }
          this.$store.commit('setReceivedMessage', messageData );
          this.$socket.emit('message', { message: this.message, recipient: this.name, sender: this.$store.getters.getUsername });
          this.message = '';
          this.messenging = false;
        }
      }
    }

  }
</script>

<style scoped>

#sendMessageBox, #receivedMessageBox {
  margin:auto;
  width:95%;
  border:2px solid rgb(57, 90, 57);
  padding:2px;
  display: flex;
  justify-content: center;
  margin-top:5px;
}

#receivedMessageBox {
  flex-direction: column;
  justify-content: center;
}

#messageText {
  width:100%;
  padding:2px;
  margin-right:2px;
}

#receivedMessageText {
  color:red;
  margin:5px;
  text-align: center;
  word-wrap: break-word;
}

#receivedTextNotice {
  color:red;
  font-size:0.8rem;
  text-align:center;
  margin:5px;
  text-decoration: underline;
}
</style>
