<template>
<div class="w-full flex gap-2 mt-8">
    <CatCard
        v-if="myCat"
        :cat="myCat"
        :idPrefix="prefix + my_token + other_token"
        :button="false"
    />

    <CatCard
        v-if="otherCat"
        :cat="otherCat"
        :idPrefix="prefix + other_token + my_token"
        :button="false"
    />
</div>
<button class="rounded-full pink enabled:hover:bg-gray-50 p-2 absolute text-black text-center enabled:hover:cursor-pointer transition border-white border-2" @click="accept" :disabled="pending">
    <span v-if="!pending">Accept!</span>
    <span v-if="pending" class="pi pi-spin pi-spinner"></span>
</button>

<div v-if="newCat != null" class="fixed w-full h-full flex flex-col justify-center items-center top-0 right-0" style="background: rgba(0, 0, 0, 0.5);" @click="removeCat()">
        <h1>You have a new cat!</h1>
        <CatCard
            :key="newCat.id"
            :cat="newCat"
            :idPrefix="preview"
            :button="false"
        />
    </div>
</template>

<script setup>
import { getCat, remixAccept, listMyCats } from '@/secret/messages';
import { onMounted, ref } from 'vue';
import { getKeplr } from "@/secret";
import CatCard from './CatCard.vue';

const myCat = ref(null)
const otherCat = ref(null)
const newCat = ref(null)
const pending = ref(false)

const emit = defineEmits(["reload", "newcat"])

const props = defineProps({
    my_token: String,
    other_token: String,
    prefix: String,
})

const accept = async () => {
    pending.value = true;
    const secret = await getKeplr();
    await remixAccept(secret, props.my_token, props.other_token);
    pending.value = false;
    emit("newcat");
}

onMounted(async () => {
    const secret = await getKeplr();
    getCat(secret, props.my_token).then(cat => {
        myCat.value = cat
    })
    getCat(secret, props.other_token).then(cat => {
        otherCat.value = cat
    })
})
</script>