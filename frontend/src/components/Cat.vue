<template>
<canvas width=64 height=64 style="image-rendering: pixelated;" :id="id"></canvas>
</template>
<script setup>
import { onMounted } from 'vue'
import Rand from 'rand-seed'

const props = defineProps({
    id: String,
    type: String,
    color: String,
    ears: String,
    tail: String,
    body: String,
    head: String,
})

let canvas = null
let context = null

const catType = props.type;
const catColor = props.color;

const colors = {
    "orange": [
        { r: 214, g: 138, b: 45 }, //darkest
        { r: 240, g: 199, b: 149 }, //lightest
        { r: 227, g: 167, b: 93 }, //middle
    ],
    "black_and_white": [
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 },
        { r: 150, g: 150, b: 150 }
    ],
    "grey": [
        { r: 150, g: 150, b: 150 },
        { r: 190, g: 190, b: 190 },
        { r: 170, g: 170, b: 170 }
    ],
    "brown": [
        { r: 84, g: 44, b: 2 },
        { r: 161, g: 109, b: 55 },
        { r: 135, g: 86, b: 34 }
    ],
    "pink": [
        { r: 158, g: 68, b: 124 },
        { r: 222, g: 173, b: 203 },
        { r: 209, g: 123, b: 176 }
    ],
    "purple": [
        { r: 107, g: 70, b: 130 },
        { r: 197, g: 174, b: 212 },
        { r: 172, g: 132, b: 196 }
    ],
}


const seed = props.id.split("-")[1]
const imageSize = 64

const rand = new Rand(seed);

const maxNumBlotches = 8
const minNumBlotches = 3
const blotches = []

const randomRange = (min, max) => {
    return (rand.next() * max) + min
}

const preloadTextures = () => {
    // Blotchy!
    const numBlotches = randomRange(minNumBlotches, maxNumBlotches)
    for (let i = 0; i < numBlotches; i++) {
        blotches.push({
            x: randomRange(0, imageSize),
            y: randomRange(0, imageSize),
            size: randomRange(2, imageSize / 6),
        })
    }
}

const renderCatBit = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      context.drawImage(img, 0, 0, imageSize, imageSize)
      resolve()
    }
  })
}

const indexToTextureCoord = (index) => {
    return {
        x: Math.floor((index / 4) / imageSize),
        y: (index / 4) % imageSize,
    }
}

const getColorForPixel = (index) => {
    if (catType === "solid") { // 1
        return colors[catColor][0] 
    }
    if (catType === "blotchy") { // 2
        const textureCoord = indexToTextureCoord(index)
        for (let i = 0; i < blotches.length; i++) {
            const blotch = blotches[i]
            const distanceSquared = (textureCoord.x - blotch.x) ** 2 + (textureCoord.y - blotch.y) ** 2
            const radiusSquared = blotch.size ** 2

            if (distanceSquared < radiusSquared) {
                return colors[catColor][1]
            }
        }
        return colors[catColor][0]
    }
    if (catType === "tabby") { // 3
        const textureCoord = indexToTextureCoord(index)
        const centerX = imageSize / 2 + 17;
        const centerY = imageSize / 2 - 7;
        const ovalHeight = imageSize * 0.45;
        const ovalWidth = imageSize * 0.25;

        const normalizedX = (textureCoord.x - centerX) / (ovalHeight / 2);
        const normalizedY = (textureCoord.y - centerY) / (ovalWidth / 2);
        const distanceFromCenter = (normalizedX ** 2) + (normalizedY ** 2);

        const edgeThreshold = 1;
        const stripeChanger = randomRange(1, 4)
        const patchChanger = randomRange(1, 5)
        if (distanceFromCenter > edgeThreshold) {
            return (stripeChanger < 2) ? colors[catColor][1] : colors[catColor][textureCoord.x % 3];
        } else {
            return (patchChanger < 2 && textureCoord.x % 2 === 1) ? colors[catColor][1] : colors[catColor][2];
        }
    }
    if (catType === "rainbow") {
        return {r: randomRange(120, 255), g: randomRange(120, 255), b: randomRange(120, 255)}
    }
}

const completeRender = () => {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const threshold = 150

    for (let i = 0; i < data.length; i += 4) {
        if (data[i] > threshold && data[i + 1] > threshold && data[i + 2] > threshold) {
            const color = getColorForPixel(i)
            data[i + 0] = color.r
            data[i + 1] = color.g
            data[i + 2] = color.b
        }
    }

    context.putImageData(imageData, 0, 0)
}

onMounted(async () => {
    canvas = document.getElementById(props.id)
    canvas.width = imageSize
    canvas.height = imageSize
    context = canvas.getContext('2d', { willReadFrequently: true });
    context.imageSmoothingEnabled = false;

    if (props.type === "EMPTY") {
        return
    }

    preloadTextures()

    await Promise.all([
      renderCatBit(`cat_bits/ears/${props.ears}.png`),
      renderCatBit(`cat_bits/face/${props.head}.png`),
      renderCatBit(`cat_bits/tail/${props.tail}.png`),
      renderCatBit(`cat_bits/bodyodyody/${props.body}.png`)
    ]);

    completeRender();
})
</script>