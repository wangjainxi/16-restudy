<template>
  <div class="home">
      <div>count:  {{$store.state.count}}</div>
    <button @click="$store.commit('add')">加一</button>
    <button @click="$store.dispatch('add')">action: 加一</button>
    <p>doubleCounter: {{$store.getters.doubleCounter}}</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
