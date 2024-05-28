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
      <div class="text-area">
        <p>Text Line 1</p>
        <p>Text Line 2</p>
      </div>
      <input
        class="text-box"
        type="text"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuOpen: false,
      inputValue: ''
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
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
  width: 200px;
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
  width: 35px;
  height: 35px;
  background-color: #8a2be2;
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
</style>
