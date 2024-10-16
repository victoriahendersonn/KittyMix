<template>
    <Cat 
      v-for="placedCat in placedCats"
      :key="idPrefix + placedCat.cat.id"
      :id="idPrefix + placedCat.cat.id"
      :color="placedCat.cat.colour"
      :type="placedCat.cat.type"
      :ears="placedCat.cat.ears"
      :body="placedCat.cat.body"
      :tail="placedCat.cat.tail"
      :head="placedCat.cat.face"
      :style="`top: ${placedCat.top}px; left: ${placedCat.left}px;`"
      class="fixed" />
  </template>
  
  <script setup>
  import Cat from "@/components/Cat.vue"
  import { onMounted, ref, onBeforeUnmount } from "vue"
  import { listMyCats } from "../secret/messages"
  import { getKeplr } from "@/secret";
  
  const placedCats = ref([])
  const idPrefix = "placed-"
  const maximumCats = 21;

  function getRandomSubset(cats) {
    let subset = cats;
    if (subset.length > maximumCats) {
        for (let i = cats.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [subset[i], subset[j]] = [subset[j], subset[i]];
        }
        return subset.slice(0, 21);
    } else {
        return subset;
    }
  }

  const calculateCatPositions = (myCats, width, height) => {
    const displayCats = getRandomSubset(myCats)

    let wSpacing = (width * 0.9) / displayCats.length
    return displayCats.map((cat, i) => {
        const topPercent = 70 + ((i % 3) * (height / 20)) * 100 / height
        const leftPercent = (5 + (i * wSpacing)) * 100 / width
        return {
            cat,
            topPercent,
            leftPercent, 
        }
    })
  }
  
  const updateCatPositions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      placedCats.value.forEach(catPlacement => {
          catPlacement.top = (catPlacement.topPercent / 100) * height
          catPlacement.left = (catPlacement.leftPercent / 100) * width
      })
  }
  
  onMounted(async () => {
      const keplrClient = await getKeplr()
      const myCats = await listMyCats(keplrClient);
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const calculatedCats = calculateCatPositions(myCats, width, height);
      placedCats.value = calculatedCats.map(catPlacement => ({
          ...catPlacement,
          top: (catPlacement.topPercent / 100) * height,
          left: (catPlacement.leftPercent / 100) * width
      }));
  
      window.addEventListener('resize', updateCatPositions);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCatPositions);
  });
  
  </script>
  
  