<template>
  <div class="container">
    <canvas ref="canvas" class="avatar-canvas"></canvas>
    <div class="button-container">
      <button class="recreate-button" @click="recreateAvatar">Пересоздать</button>
      <button class="download-button" @click="downloadAvatar">Скачать</button>
    </div>
  </div>
</template>

<script>
import { createAvatar } from "./utils/avatarGenerator.js";

export default {
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = 440;
    canvas.height = 440;
    createAvatar((generatedCanvas) => {
      canvas.getContext("2d").drawImage(generatedCanvas, 0, 0);
    });
  },
  methods: {
    recreateAvatar() {
      const canvas = this.$refs.canvas;
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      createAvatar((generatedCanvas) => {
        canvas.getContext("2d").drawImage(generatedCanvas, 0, 0);
      });
    },
    downloadAvatar() {
      const canvas = this.$refs.canvas;
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "avatar.png";
      link.click();
    },
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.avatar-canvas {
  border: 1px solid black;
}

.button-container {
  width: 440px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 16px;
}

.recreate-button,
.download-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.recreate-button {
  background-color: #007bff;
}

.download-button {
  background-color: #28a745;
}

.recreate-button:hover,
.download-button:hover {
  opacity: 0.8;
}

.recreate-button:focus,
.download-button:focus {
  outline: none;
}
</style>