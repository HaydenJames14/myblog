<template>
<div>
  <div class="container-fluid text-center" id="sendMessageBox" v-if="messenging">
    <input type="text" id="messageText" :placeholder='placeholderText' autofocus v-model="message">
    <button type="submit" class="btn btn-success" id="submit_message" @click.prevent="submitMessage">Send</button>
  </div>
  <div id="receivedMessageBox">  <!--   v-if="messageReceived" -->
    <p id="receivedText">Message received from {{ receivedFrom }}</p>
    <input type="text" id="receivedMessageText" style="margin-bottom:5px;" v-model="receivedMessage">
    <button type="submit" class="btn btn-success" id="reply_message" @click.prevent="replyToMessage">Reply</button>
  </div>
</div>
</template>

<script>
  export default {
    name: 'contact',
    props: [ 'name', 'messageReceived' ],
    data() {
      return {
        messenging: true,
        receivedMessage: this.$store.getters.getReceivedMessage.message,
        receivedFrom: this.$store.getters.getReceivedMessage.sender,
        message: '',
        placeholderText: `type reply to ${name}`
      }
    },
    methods: {
      submitMessage() {
        if(this.message) {
          let sender = this.$store.getters.getUsername;
          this.$socket.emit('message', { message: this.message, recipient: this.name, sender: sender });
          this.message = '';
          this.messenging = false;
        }
      },
      replyToMessage() {
        if(this.message) {
          let sender = this.$store.getters.getUsername;
          this.$socket.emit('message', { message: this.message, recipient: this.name, sender: sender });  // reverse recipient and sender values?
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

#receivedText {
  color:red;
  font-size:0.8rem;
  text-align:center;
  margin:5px;
}
</style>
