<template>
    <div class="bg-white p-4 rounded-lg" :class="{'hover:cursor-pointer': button, 'hover:bg-gray-50': button}" @click="clicked">
        <Cat :id="idPrefix + '-' + cat.id" :color="cat.colour" :type="cat.type" :ears="cat.ears" :body="cat.body" :tail="cat.tail" :head="cat.face" class="w-full"/>
    </div>
</template>

<script setup>
import Cat from "@/components/Cat.vue"

const emit = defineEmits(["clicked"])

const props = defineProps({
    cat: Object,
    idPrefix: String,
    button: Boolean
})

const clicked = () => {
    emit("clicked", props.cat)
}
</script>