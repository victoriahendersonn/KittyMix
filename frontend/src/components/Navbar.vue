<template>

<div class="w-[95%] h-full fixed text-white p-8">
    <div :class="['rounded-md transition pink max-h-[40%]', navbarOpen ? 'w-full h-full' : 'w-fit h-fit']">
        <i @click="toggleNavbarOpen()" :class="['pi pi-bars fixed m-4 hover:cursor-pointer', navbarOpen ? '' : 'p-4 rounded-full pink']"></i>

        <div v-show="navbarOpen" id="panel" class="w-full h-full p-4 flex justify-center">
            <div class="flex w-full h-full justify-around">
                <CatPanel type="my_cats" :cats="myCats" :pending="pendingMyCats" @on-click="setMyCatRemixing"/>
                <RemixPanel :key="myCatRemixing.id + '-' + otherCatRemixing.id" :myCat="myCatRemixing" :otherCat="otherCatRemixing" @clear="clearRemixing" @reload="reload" />
                <CatPanel type="other_cats" :cats="otherCats" :pending="pendingOtherCats" @on-click="setOtherCatRemixing" />
            </div>
        </div>
    </div>
</div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import CatPanel from "@/components/CatPanel.vue"
import RemixPanel from "@/components/RemixPanel.vue"
import { getKeplr } from '@/secret';
import { listMyCats, listAllCats } from '@/secret/messages';

const navbarOpen = ref(false)
const myCats = ref([])
const otherCats = ref([])
const pendingMyCats = ref(false)
const pendingOtherCats = ref(false)

const toggleNavbarOpen = () => {
    navbarOpen.value = !navbarOpen.value
}

let myCatRemixing = ref({})
let otherCatRemixing = ref({})

const setMyCatRemixing = (myCat) => {
    if (myCatRemixing.value === myCat) {
        myCatRemixing.value = {}
    } else {
        myCatRemixing.value = myCat
    }
}

const setOtherCatRemixing = (otherCat) => {
    if (otherCatRemixing.value === otherCat) {
        otherCatRemixing.value = {}
    } else {
        otherCatRemixing.value = otherCat
    }
}

const clearRemixing = (type) => {
    if (type === "self") {
        myCatRemixing.value = {}
    } else if (type === "other") {
        otherCatRemixing.value = {}
    } else {
        myCatRemixing.value = {}
        otherCatRemixing.value = {}
    }
}

const reload = async () => {
    const keplrClient = await getKeplr()

    if (!pendingMyCats.value) {
        pendingMyCats.value = true
        listMyCats(keplrClient).then(cats => {
            myCats.value = cats
            pendingMyCats.value = false
        })
    }
    if (!pendingOtherCats.value) {
        pendingOtherCats.value = true
        listAllCats(keplrClient).then(cats => {
            otherCats.value = cats
            pendingOtherCats.value = false
        })
    }
}

onMounted(async () => {
    await reload()
})

</script>

<style>
.pink {
  background-color: #efd2f0;  
}
</style>