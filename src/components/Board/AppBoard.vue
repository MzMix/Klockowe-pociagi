<script setup>
//Import components
import BoardCell from './BoardCell.vue'

//Import from Vue
import { ref } from 'vue'

const Board = ref(null);

</script>

<template>

  <div class="d-grid" style="place-content: center;">
    <div id="BoardOuterContainer">
      <div id="BoardContainer" class="p-2">

        <div id="Board" ref="Board" class="border-end border-dark border-bottom">
          <BoardCell v-for="i in 128" :key="i" :cellId="i" v-bind="{ pos: i }" />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  transition: all 0.15s ease-in-out;
}

#BoardContainer {
  display: grid;
  grid-template-columns: calc(4vw) calc(40vw) calc(4vw);
  grid-template-rows: calc(4vw) calc(40vw) calc(4vw);
  grid-template:
    '.top-index.'
    'left-index board right-index'
    '.bottom-index.';
}

#Board {
  display: grid;
  grid-template-columns: repeat(16, 6.25%);
  grid-template-rows: repeat(8, 12.5%);
  grid-area: board;
  position: relative;
  box-sizing: border-box;

}
</style>