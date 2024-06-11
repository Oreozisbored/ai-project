<template>
    <div id="login-page">
      <div class="login-container">
        <div class="login-box">
          <h2 class="login-title">Login</h2>
          <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" class="login-input" />
            <input type="password" v-model="password" placeholder="Password" class="login-input" />
            <button type="submit" class="login-button" :disabled="loggingIn">Log In</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login-page',
    data() {
      return {
        username: '',
        password: '',
        loggingIn: false
      };
    },
    methods: {
      login() {
        this.loggingIn = true;
        // Add your login logic here
  
        // Simulate a login delay
        setTimeout(() => {
          this.loggingIn = false;
        }, 2000);
      }
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
  
    #login {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #1f0020;
      padding: 20px;
      border: 3px solid var(--border);
      border-radius: 10px;
      box-shadow: 0px 0px 10px 2px #670060;
    }
  
    .login-box {
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
  
    .login-title {
      margin-bottom: 20px;
      color: #c5a3ff;
    }
  
    .login-input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 2px solid var(--border);
      border-radius: 20px;
      background-color: #2a2a2a;
      color: #c5a3ff;
      box-sizing: border-box;
      font-size: 16px;
    }
  
    .login-button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 20px;
      background-color: #ab00b1;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
  
    .login-button:disabled {
      background-color: #670060;
      cursor: not-allowed;
    }
  </style>  