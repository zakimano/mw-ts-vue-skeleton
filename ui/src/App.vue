<template>
  <!-- define mwActiveArea class for our "main" div: this means that the active-areas-manager will set up an active area for us around the "main" div, making it clickable -->
  <div id="main" class="mwActiveArea">
    <div class="flex-item">
      <img alt="Vue logo" class="logo center" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
      <!-- example button for ipc communication -->
      <button @click="onClick">Ping!</button>
      <br />
      {{ pong }}
    </div>

    <div class="flex-item">
      <TheWelcome />
    </div>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { activeAreasManagerSetup } from './active-areas-manager'
import { getPing } from './ipc'
import { ref } from 'vue'

// we call the active-areas-manager setup function
activeAreasManagerSetup()

const pong = ref('')
// Ping button, displaying "pong", result sent over IPC
function onClick() {
  getPing().then((result: string) => {
    pong.value = result
  })
  setTimeout(() => {
    pong.value = ''
  }, 3000)
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

#main {
  display: flex;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
}

.flex-item {
  flex-grow: 1;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: 10%;
  max-width: 50%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
