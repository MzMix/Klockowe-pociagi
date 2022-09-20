<script setup>
// Import Components
import SideMenu from './components/MainPage/SideMenu.vue'
import WelcomeModal from './components/General/WelcomeModal.vue'
import AppBoard from './components/Board/AppBoard.vue'
import TopBar from './components/MainPage/TopBar.vue'
import ToastManager from './components/Toast/ToastManager.vue'

//Import from Bootstrap
import { Toast } from 'bootstrap'

//Import from Vue
import { onMounted, provide } from 'vue';

//Import from Pinia - Menu Store
import { useMenuStore } from './stores/MenuStore'
import { storeToRefs } from 'pinia';

//Setup Menu Store
const MenuStore = useMenuStore();
const { ShowLeaveWarn } = storeToRefs(MenuStore);

//Add warning on leaving
onMounted(() => {

  if (!ShowLeaveWarn.value) return;

  window.onbeforeunload = function () {
    return 'Are you sure you want to leave?';
  };
})

//Provide function for triggering toasts
provide('ToastTrigger', (querry, options = {
  animation: true,
  autohide: true,
  delay: 5000
}) => {

  const toastElList = document.querySelectorAll(querry)
  const toastList = [...toastElList].map(toastEl => new Toast(toastEl, options))

  toastList.forEach(toast => {
    toast.show()
  })
});

</script>

<template>

  <div class="container-fluid vh-100 d-flex flex-column flex-nowrap overflow-hidden">

    <div class="row">
      <TopBar />
    </div>

    <div class="row flex-grow-1">

      <div class="col-xl-3 col-lg-4 col-sm-3">
        <SideMenu />
      </div>

      <div class="col-xl-9 col-lg-8 col-sm-9 pt-4 d-flex flex-column justify-content-center">
        <AppBoard class="mb-5" />
      </div>

    </div>

    <ToastManager />

  </div>

  <WelcomeModal />

</template>

<style scoped>

</style>
