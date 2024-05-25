<template>
  <div class="bottom">
    <div id="chatroom">
      <h1 style="margin-block-start: 0em; margin-block-end: 0.5em">chatroom</h1>
      <div id="messagebox">messagebox</div>
      <div id="inputbox">inputbox</div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.bottom {
  margin-top: 10px;
  margin: auto;
  /* height: 800px; */
  width: 90%;
  /* background-color: white; */
  overflow: hidden;
}
#chatroom {
  margin: 10px;
  height: 600px;
  /* height: 70%; */
  background-color: white;
  padding: 10px;
}
#messagebox {
  height: 60%;
  padding: 10px;
  background-color: gray;
}
#inputbox {
  height: 20%;
  padding: 10px;
  margin-top: 10px;
  background-color: gray;
}
</style>
