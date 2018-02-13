<template>
<div id="contactBox">
  <!-- message received notification box -->
  <div id="receivedMessageBox"  v-if="receivedMessage.sender">
    <p id="receivedTextNotice">Message received from {{ receivedMessage.sender }}</p>
    <p id="receivedMessageText" style="margin-bottom:5px; color:red;">{{ receivedMessage.message }}</p>
  </div>
  <div class="container-fluid text-center" id="sendMessageBox" v-if="receivedMessage || contacting">
    <div class="row">
      <div class="col-md-12">
        <input type="text" id="messageText" :placeholder='placeholderText' autofocus v-model="message">
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" id="btnContact">
        <button type="close" class="btn btn-warning" style="margin-right:20px;" id="cancel_message" @click.prevent="cancelMessage">Cancel</button>
        <button type="submit" class="btn btn-success" id="submit_message" @click.prevent="submitMessage">Send</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'contact',
    props: ['receivedMessage', 'name', 'contacting'],
    data() {
      return {
        //receivedMessage: false,
        message: '',
        placeholderText: 'type message to ' + this.name,
      }
    },
    methods: {
      submitMessage() {
        if(this.message) {                      /* error below getters.getusername and receivedMessage.sender not working  */
          this.$socket.emit('message', { message: this.message, recipient: this.name, sender: this.$store.getters.getUsername }); //
          this.message = '';
          //alert(`Message sent to ${this.name}`);
          this.$emit('messageSent');

        }
      },
      cancelMessage() {
        $('#contactBox').css('display', 'none');

      }
    }

  }
</script>

<style scoped>
#contactBox {
  margin:auto;
  width:95%;
  border:2px solid rgb(57, 90, 57);
  padding:2px;
  margin-top:5px;
}

#btnContact {
  display:fles;
  justify-content:space-between;

}

#btnContact > btn {
  margin-right:20px;
}
#receivedMessageBox {
  flex-direction: column;
  justify-content: center;
}

#messageText {
  width:100%;
  padding:2px;
  margin: auto;
  display:block;
  margin-bottom:8px;
}

#receivedMessageText {
  color:red;
  margin:5px;
  text-align: center;
  word-wrap: break-word;
}

#receivedTextNotice {
  color:rgb(112, 31, 31);
  font-size:0.8rem;
  text-align:center;
  margin:5px;
  text-decoration: underline;
}

#cancelMessage, #submitMessage {

}


</style>
