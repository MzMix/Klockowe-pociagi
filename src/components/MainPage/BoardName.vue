<script setup>
import { storeToRefs } from "pinia";
import { useBoardStore } from "../../stores/BoardStore";

const BoardStore = useBoardStore();
const { BoardName } = storeToRefs(BoardStore);

</script>

<template>
        <input type="text" v-model="BoardName" maxlength="32" minlength="4" aria-label="Nazwa Planszy"
            aria-describedby="editName" class="text-center text-white bg-transparent m-0 border-bottom" />
</template>

<style scoped>
input {
    resize: none;
    border: none;
    border-radius: 0;
}
</style>