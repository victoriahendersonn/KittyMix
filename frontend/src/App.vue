<template>
  <div class="w-full h-full" id="app">
    <Navbar />
    <canvas class="p-0 w-full h-full bg-black overflow-y-hidden" style="image-rendering: pixelated;" id="canvas"></canvas>
    <PlacedCats />
    <Notifications />
  </div>
</template>

<script setup>
import backgroundImage from '@/assets/sprites/backgrounds/Background.png';

import 'primeicons/primeicons.css'
import Navbar from "@/components/Navbar.vue"
import PlacedCats from '@/components/PlacedCats.vue'
import { onMounted } from 'vue'
import Notifications from './components/Notifications.vue';

let canvas = null;
let context = null;
let img = null;

onMounted(() => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context.imageSmoothingEnabled = false;

  img = new Image();
  img.src = backgroundImage;
  img.onload = () => {
    drawImageCover();
  };

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = false;
    drawImageCover();
  });
});

const drawImageCover = () => {
  const canvasAspectRatio = canvas.width / canvas.height;
  const imageAspectRatio = img.width / img.height;

  let drawWidth, drawHeight, offsetX, offsetY;
  
  if (canvasAspectRatio > imageAspectRatio) {
    // If canvas is wider, scale by width
    drawWidth = canvas.width;
    drawHeight = (canvas.width / img.width) * img.height;
    offsetX = 0;
    offsetY = (canvas.height - drawHeight) / 2; // Center vertically
  } else {
    // If canvas is taller, scale by height
    drawHeight = canvas.height;
    drawWidth = (canvas.height / img.height) * img.width;
    offsetX = (canvas.width - drawWidth) / 2; // Center horizontally
    offsetY = 0;
  }

  // Clear the canvas and draw the image covering the entire canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
};
</script>