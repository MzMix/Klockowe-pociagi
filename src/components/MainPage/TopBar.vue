<script setup>
import { useMenuStore } from "@Stores/MenuStore";
import BoardName from "@MainPage/BoardName.vue";

const MenuStore = useMenuStore();
const { SwitchMenu } = MenuStore;

const TopBarElement = "align-self-center fs-4";

const icons = ['palette', 'brush', 'share', 'gear'];

</script>

<template>
    <div class="col-12 d-flex flex-row flex-nowrap justify-content-between bg-purple text-white pt-1 pb-1">

        <div :class="TopBarElement" class="d-flex flex-row gap-2">
            <button v-for="(icon, index) in icons" :key="index" @click="SwitchMenu(index)"
                class="btn btn-lg text-white">
                <i :class="'bi-'+icon"></i>
            </button>
        </div>

        <div :class="TopBarElement">
            <BoardName />
        </div>

        <div :class="TopBarElement" class="me-3">Klockowe pociągi <i class="bi bi-bricks"></i></div>

    </div>
</template>

<style scoped>

</style>