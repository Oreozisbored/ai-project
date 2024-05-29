<template>
  <div id="app" ref="chatContainer">
    <div class="App" ref="chatContent">
      <div class="menu-button" @click="toggleMenu">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
      </div>
      <div v-if="menuOpen" class="menu">Menu Content Here</div>
      <div class="profile-picture"></div>
      <div class="text-area" ref="chatMessages">
        <p v-for="response in responses" :key="response.id">{{ response.text }}</p>
      </div>
    </div>
    <div class="chat-input">
      <input
        ref="inputField"
        class="text-box"
        type="text"
        v-model="inputValue"
        @keyup.enter="sendMessage"
        :disabled="sendingMessage"
        placeholder="Type your message here..."
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      menuOpen: false,
      inputValue: '',
      responses: [],
      sendingMessage: false,
      geminiApiEndpoint: 'YOUR_GEMINI_API_ENDPOINT'
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    sendMessage() {
      if (this.inputValue.trim() === '') {
        return;
      }

      this.sendingMessage = true;

      const message = this.inputValue;
      const response = { id: Date.now(), text: `You: ${message}` };
      this.responses.push(response);
      this.inputValue = '';

      axios.post(this.geminiApiEndpoint, {
        message: message
      })
      .then((res) => {
        const apiResponse = { id: Date.now(), text: `Gemini: ${res.data}` };
        this.responses.push(apiResponse);
        this.sendingMessage = false;
        this.$nextTick(() => {
          this.$refs.inputField.focus(); // Keep the input field focused after sending message
          this.scrollToBottom(); // Scroll to bottom after receiving response
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.sendingMessage = false;
      });
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      const chatContent = this.$refs.chatContent;
      chatContainer.scrollTop = chatContent.offsetHeight - chatContainer.clientHeight;
    }
  },
  mounted() {
    this.scrollToBottom();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #1e1e1e;
  color: #c5a3ff;
  font-family: Arial, sans-serif;
}

#app {
  height: 100vh;
}

.App {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #310033;
  color: #c5a3ff;
  position: absolute;
}

.menu-button {
  position: absolute;
  top: 0.916666666667%;
  left: 0.5%;
  cursor: pointer;
  z-index: 10;
}

.menu-line {
  width: 30px;
  height: 3px;
  background-color: #c5a3ff;
  margin: 5px 0;
}

.menu {
  position: absolute;
  bottom: 0%;
  left: 0;
  width: 20%;
  height: 95%;
  background-color: #2a2a2a;
  z-index: 5;
  color: #c5a3ff;
  padding: 20px;
}

.profile-picture {
  position: absolute;
  top: 0.916666666667%;
  right: 0.5%;
  width: 50px;
  height: 50px;
  display: inline-block;
  background-image: url("test1.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 45%;
}

.text-area {
  margin-top: 100px;
  justify-content: center;
  color: #c5a3ff;
}

.text-box {
  width: 80%;
  height: 40px;
  border: 2px solid #8a2be2;
  border-radius: 20px;
  background-color: #2a2a2a;
  color: #c5a3ff;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-top: 20px;
  font-size: 16px;
}
.chat-input {
  position: fixed;
  bottom: 20px; /* Adjust the distance from the bottom as needed */
  left: 0;
  width: 100%;
  text-align: center;
}
</style>
