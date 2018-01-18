<template>
<div v-if="messenging">
  <div class="container-fluid text-center" id="messageBox" v-if="messenging">
    <input type="text" id="messageText" placeholder="type message.." autofocus v-model="message">
    <button type="submit" class="btn btn-success" id="submit_message" @click.prevent="submitMessage">Send</button>
  </div>
  <div v-if="messageReceived" id="receivedMessageBox">
    <p id="receivedText">Message received from {{ name }}</p>
    <input type="text" id="receivedMessageText" style="margin-bottom:5px;" v-model="receivedMessage">
    <button type="submit" class="btn btn-success" id="reply_message" @click.prevent="replyToMessage">Reply</button>
  </div>
</div>
</template>

<script>
  export default {
    name: 'contact',
    props: [ 'name' ],
    data() {
      return {
        messageReceived: true,
        messenging: true,
        placeholderText: `type reply to ${name}`,
        receivedMessage: '',
        message: ''
      }
    },
    methods: {
      submitMessage() {
        if(message) {
          this.$socket.emit('message', this.message);

          this.message = '';
        }
      },
      replyToMessage() {

      }
    },
    sockets: {
      messageReceived() {

      }
    }

  }
</script>

<style scoped>

#messageBox {
  margin:auto;
  width:95%;
  border:2px solid green;
  padding:2px;
  display: flex;
  justify-content: center;
  margin-top:5px;
}

#receivedMessageBox {
  margin:auto;
  width:95%;
  border:2px solid green;
  padding:2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top:5px;
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
