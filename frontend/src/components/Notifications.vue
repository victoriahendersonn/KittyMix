<template>
    <div class="notification-panel">
      <div class="icon pi pi-bell text-white pink_background" @click="togglePanel()">
        
      </div>
      <transition name="slide-fade">
        <div v-if="isOpen" class="panel">
          <div class="panel-content">
            <h3>Notifications</h3>
            <hr class="mt-2">
            <div v-if="notifications.length != 0" class="-mb-8"></div>
            <NotificationCard v-for="notification in notifications" :prefix="notification.prefix" :my_token="notification.my_token" :other_token="notification.other_token" @newcat="showNewCat"/>
            <div v-if="notifications.length == 0" class="mt-2 -mb-8">
              <h4>You have no notifications!</h4>
            </div>
            <hr class="mt-12">
            <button class="p-2 mt-2 bg-sky-100 rounded" @click="togglePanel">Close</button>
          </div>
        </div>
      </transition>
    </div>


    <div v-if="newCat != null" class="fixed w-full h-full flex flex-col justify-center items-center top-0 right-0" style="background: rgba(0, 0, 0, 0.5);" @click="removeCat()">
        <h1 class="text-white mb-3">You have a new cat!</h1>
        <CatCard
            :key="newCat.id"
            :cat="newCat"
            :idPrefix="preview"
            />
    </div>

  </template>
  
<script setup>
import { remixMeOffers, listMyCats } from '@/secret/messages';
import { ref, onMounted } from 'vue';
import NotificationCard from './NotificationCard.vue';
import CatCard from './CatCard.vue';
import { getKeplr } from "@/secret";
  
const isOpen = ref(false);
const notifications = ref([]);
const newCat = ref(null)

const togglePanel = () => {
    isOpen.value = !isOpen.value;
};

const fetchNotifications = async () => {
    const wallet = await getKeplr();
    notifications.value = await remixMeOffers(wallet);
}

const showNewCat = async () => {
  await fetchNotifications();
  const wallet = await getKeplr();
  let myCats = await listMyCats(wallet);
  newCat.value = myCats[myCats.length - 1];
  togglePanel();
}

const removeCat = () => {
    newCat.value = null
}

onMounted(async () => {
    fetchNotifications();
})
  </script>
  
  <style scoped>
  .notification-panel {
    position: relative;
  }
  
  .icon {
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 24px;

  }
  
  .panel {
    position: fixed;
    top: 60px;
    right: 20px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .panel-content {
    padding: 10px;
  }
  
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }


.pink_background {
  background-color: #efd2f0;
  border-radius: 50%;  
  padding: 10px;
}
</style>
