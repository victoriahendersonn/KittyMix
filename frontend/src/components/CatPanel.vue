<template>
    <div class="w-full overflow-y-scroll">
        <div class="w-full flex items-center justify-center">
            <h2 class="bg-white rounded-full p-4 m-4 text-center text-black w-[40%]" v-if="type === 'my_cats'">
                My Cats
            </h2>
            <h2 class="bg-white rounded-full p-4 m-4 text-center text-black w-[40%]" v-if="type === 'other_cats'">
                Available Cats
            </h2>
        </div>

        <div class="grid grid-cols-3 gap-4 px-4">
            <CatCard 
                @clicked="setCat"
                v-for="cat in cats"
                :key="cat.id"
                :cat="cat"
                :idPrefix="props.type"
                :button="true"
            />
        </div>
        <div v-if="pending" class="w-full flex items-center justify-center mt-4">
            <span class="pi pi-spin pi-spinner text-black"></span>
        </div>
    </div>
</template>

<script setup>
import CatCard from '@/components/CatCard.vue';

const props = defineProps({
    type: String,
    required: true,
    cats: Array,
    pending: Boolean,
})

const emit = defineEmits(["on-click"])

const setCat = (cat) => {
    emit("on-click", cat)
}

</script>