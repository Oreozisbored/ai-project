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
      <div class="profile-picture" @click="toggleProfileMenu"></div>
      <div v-if="profileMenuOpen" class="menu">
        <div v-if="currentForm === 'login'">
          <h2>Login</h2>
          <form @submit.prevent="handleLogin">
            <input type="email" v-model="loginData.email" placeholder="Email" required />
            <input type="password" v-model="loginData.password" placeholder="Password" required />
            <button type="submit">Login</button>
            <p @click="switchForm('signup')">Don't have an account? Sign up</p>
          </form>
        </div>
        <div v-if="currentForm === 'signup'">
          <h2>Sign Up</h2>
          <form @submit.prevent="handleSignup">
            <input type="text" v-model="signupData.fullName" placeholder="Full Name" required />
            <input type="email" v-model="signupData.email" placeholder="Email" required />
            <input type="password" v-model="signupData.password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
            <p @click="switchForm('login')">Already have an account? Login</p>
          </form>
        </div>
        <div v-if="currentForm === 'profile'">
          <h2>Profile Information</h2>
          <p>Full Name: {{ profileData.fullName }}</p>
          <p>Email: {{ profileData.email }}</p>
          <button @click="handleLogout">Logout</button>
        </div>
      </div>
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
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Import the Firebase auth and Firestore module

export default {
  name: 'App',
  data() {
    return {
      menuOpen: false,
      profileMenuOpen: false,
      inputValue: '',
      responses: [],
      sendingMessage: false,
      grades: [5, 6, 7, 8, 9, 10, 11, 12],
      currentForm: 'login',
      loginData: {
        email: '',
        password: ''
      },
      signupData: {
        fullName: '',
        email: '',
        password: ''
      },
      profileData: {
        fullName: '',
        email: ''
      }
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleProfileMenu() {
      this.profileMenuOpen = !this.profileMenuOpen;
    },
    switchForm(form) {
      this.currentForm = form;
    },
    async handleLogin() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.loginData.email, this.loginData.password);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        if (userDoc.exists()) {
          this.profileData = userDoc.data();
        }
        this.switchForm('profile');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async handleSignup() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.signupData.email, this.signupData.password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          fullName: this.signupData.fullName,
          email: this.signupData.email
        });
        this.profileData.fullName = this.signupData.fullName;
        this.profileData.email = this.signupData.email;
        this.switchForm('profile');
      } catch (error) {
        console.error('Signup error:', error);
      }
    },
    async handleLogout() {
      try {
        await signOut(auth);
        this.profileData = { fullName: '', email: '' };
        this.switchForm('login');
      } catch (error) {
        console.error('Logout error:', error);
      }
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
        // Assuming you have some AI model setup here to send messages to
        const apiResponse = { id: Date.now(), text: `Gemini: ${message}` }; // Replace with actual response from AI
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
    --border: #670060;
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
    cursor: pointer;
  }

  .menu {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #1f0020;
    border: 3px solid var(--border);
    border-radius: 30px;
    padding: 20px;
    z-index: 1000;
    width: 70%;
    height: 70%;
  }

  .menu h2 {
    margin-bottom: 20px;
  }

  .menu form {
    display: flex;
    flex-direction: column;
  }

  .menu input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid var(--border);
    background-color: #2a2a2a;
    color: #c5a3ff;
    border-radius: 5px;
  }

  .menu button {
    padding: 10px;
    background-color: #ab00b1;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .menu p {
    margin-top: 10px;
    cursor: pointer;
    color: #ab00b1;
    text-decoration: underline;
  }

  .text-area {
    margin-top: 50px;
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