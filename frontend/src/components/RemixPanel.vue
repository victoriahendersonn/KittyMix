<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="rounded-lg border-4 border-white grid grid-cols-2 gap-16 p-4 w-[75%]">
            <CatCard :cat="myCat" idPrefix="remix" @click="clearMyCat" :button="true" />
            <CatCard :cat="otherCat" idPrefix="remix" @click="clearOtherCat" :button="true" />
        </div>
        <button class="rounded-full pink enabled:hover:bg-gray-50 absolute p-4 text-black text-center enabled:hover:cursor-pointer transition border-white border-2" @click="remix" :disabled="pending">
            <span v-if="!pending">✨ Remix! ✨</span>
            <span v-if="pending" class="pi pi-spin pi-spinner"></span>
        </button>
    </div>

</template>

<script setup>
import CatCard from "@/components/CatCard.vue"
import { remixAccept, remixRequest } from "@/secret/messages";
import { getKeplr } from "@/secret";
import { ref } from "vue";

const pending = ref(false)

const emit = defineEmits(["clear", "reload"])

const props = defineProps({
    myCat: Object,
    otherCat: Object,
})

const clearMyCat = () => {
    emit("clear", "self")
}

const clearOtherCat = () => {
    emit("clear", "other")
}

const remix = async () => {
    pending.value = true;
    const keplrClient = await getKeplr();
    await remixRequest(keplrClient, props.myCat.id, props.otherCat.id)
    clearMyCat();
    clearOtherCat();
    pending.value = false;
    await remixAccept(keplrClient, props.myCat.id, props.otherCat.id)
    emit("reload")
}

</script>