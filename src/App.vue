<template>
  <div id="app" ref="chatContainer">
    <div class="App" ref="chatContent">
      <div :class="['menu-bar', { expanded: menuOpen }]">
        <div class="menu-button" @click="toggleMenu">
          <div class="menu-line"></div>
          <div class="menu-line"></div>
          <div class="menu-line"></div>
        </div>
        <div v-if="menuOpen" class="expanded-content">Made by Wilson Li :)</div>
      </div>
      <div class="profile-section">
        <select class="grade-dropdown">
          <option v-for="grade in grades" :key="grade" :value="grade">{{ grade }}th Grade</option>
        </select>
      </div>
      <div class="profile-picture"></div>
      <div class="text-area" ref="chatMessages">
        <div v-for="response in responses" :key="response.id" :class="isUserMessage(response.text) ? 'user-message' : 'ai-message'">
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
      grades: [5, 6, 7, 8, 9, 10, 11, 12],
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
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
    const modelInstruction = `FILLER`;
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: modelInstruction,
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

  :root {
    --border: #670060
  }
  
  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #1f0020;
    color: #c5a3ff;
    position: relative;
  }
  
  .menu-bar {
    position: fixed;
    height: 100%;
    width: 2.5%;
    left: 0;
    top: 0;
    background-color: #400042;
    transition: width 0.3s ease;
  }

  .menu-bar.expanded {
    width: 10%;
  }

  .expanded-content {
    position: absolute;
    top: 2%;
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
    background-color: #ab00b1;
    margin: 5px 0;
  }
  
  .expanded-content {
    padding: 20px;
    color: #c5a3ff;
  }

  .profile-section {
    position: absolute;
    top: 10px;
    right: 3.25%;
    display: flex;
    align-items: center;
  }

  .grade-dropdown {
    margin-right: 10px;
    padding: 5px;
    border: 1px solid var(--border);
    background-color: #2a2a2a;
    color: #c5a3ff;
    border-radius: 5px;
  }

  .profile-picture {
    position: absolute;
    width: 37px;
    height: 37px;
    top: 5px;
    right: .75%;
    display: inline-block;
    background-color: red;
    background-size: cover;
    border-radius: 40%;
  }
  
  .text-area {
    margin-top: 100px;
    justify-content: center;
    color: #ffffff;
    overflow-y: auto;
    height: calc(100vh - 160px); /* Adjust according to header/footer height */
    width: 95%;
    right: 2.5%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .user-message p, .ai-message p {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 25px;
    border: 3px solid var(--border);
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
    border: 2px solid var(--border);
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
