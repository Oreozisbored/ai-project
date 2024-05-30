<template>
  <div id="app">
  <div class="App">
  <div class="menu-button" @click="toggleMenu">
  <div class="menu-line"></div>
  <div class="menu-line"></div>
  <div class="menu-line"></div>
  </div>
  <div v-if="menuOpen" class="menu">Menu Content Here</div>
  <div class="profile-picture"></div>
  <div class="text-area" ref="chatContainer">
  <div v-for="response in responses" :key="response.id" :class="{'user-message': isUserMessage(response.text), 'ai-message': !isUserMessage(response.text)}">
  <p>{{ response.text }}</p>
  </div>
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
  import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
  export default {
  name: 'App',
  data() {
  return {
  menuOpen: false,
  inputValue: '',
  responses: [],
  sendingMessage: false,
  genAI: null,
  model: null,
  generationConfig: {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192
  },
  safetySettings: [
  {
  category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
  category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
  category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
  category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  ],
  };
  },
  methods: {
  toggleMenu() {
  this.menuOpen = !this.menuOpen;
  },
  async sendMessage() {
  if (this.inputValue.trim() === '') {
  return;
  }
  
  this.sendingMessage = true;
  
  const message = this.inputValue;
  const response = { id: Date.now(), text: `You: ${message}` };
  this.responses.push(response);
  this.inputValue = '';
  
  try {
  const chatSession = this.model.startChat({
  generationConfig: this.generationConfig,
  safetySettings: this.safetySettings,
  history: this.responses.map(response => ({
  role: 'user',
  parts: [{ text: response.text.slice(5) }] // Removing "You: " from the message
  }))
  });
  
  const result = await chatSession.sendMessage(message);
  const apiResponse = { id: Date.now(), text: `Gemini: ${await result.response.text()}` };
  this.responses.push(apiResponse);
  } catch (error) {
  console.error('Error:', error);
  } finally {
  this.sendingMessage = false;
  this.$nextTick(() => {
  this.$refs.inputField.focus();
  this.scrollToBottom();
  });
  }
  },
  scrollToBottom() {
  this.$nextTick(() => {
  const chatContainer = this.$refs.chatContainer;
  chatContainer.scrollTop = chatContainer.scrollHeight;
  });
  },
  isUserMessage(text) {
  return text.startsWith('You:');
  }
  },
  async mounted() {
  const apiKey = process.env.VUE_APP_GEMINI_API_KEY;
  this.genAI = new GoogleGenerativeAI(apiKey);
  this.model = this.genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `Your primary function is to serve as an educational assistant for students in middle school (5th grade) and above. ...`,
  history: this.responses.map(response => ({
  role: 'user',
  parts: [{ text: response.text.slice(5) }] // Removing "You: " from the message
  }))
  });
  
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
  position: relative;
  }
  
  .menu-button {
  position: absolute;
  top: 10px;
  left: 10px;
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
  bottom: 0;
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
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  display: inline-block;
  background-image: url("test1.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 40%;
  }
  
  .text-area {
  margin-top: 100px;
  justify-content: center;
  color: #c5a3ff;
  overflow-y: auto;
  height: calc(100vh - 160px); /* Adjust according to header/footer height */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  }
  
  .user-message p, .ai-message p {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  }
  
  .user-message p {
  background-color: #2a2a2a;
  text-align: right;
  }
  
  .ai-message p {
  background-color: #3a3a3a;
  text-align: left;
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
  bottom: 20px;
  left: 0;
  width: 100%;
  text-align: center;
  }
  
  </style>