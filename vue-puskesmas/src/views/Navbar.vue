<template>
  <transition name="slide-down">
      <div v-show="showNavbar" class="w-full fixed mt-2.5 z-50 justify-between px-10 items-center flex transition-all duration-300">
        <div class="flex gap-1.5 items-center">
          <img src="../../../../../src/assets/img/logoS.png" alt="" class="w-8 h-auto rounded-full object-cover">
          <div class="flex flex-col -space-y-1">
            <span class="text-xl font-medium tracking-tight text-[#d34341]" style="font-weight: 600;">SismaCare</span>
          </div>
        </div>
        <div class="flex gap-3 items-center shadow-xl tracking-tight text-[#686868] py-2 px-5 rounded-3xl bg-white">
          <RouterLink v-for="(item, index) in menuItems" :key="index" :to="item.to"
            class="flex items-center gap-1  transition-all">
            <span class="icon-wrapper -ml-1.5 flex items-center justify-centerr p-1.5 rounded-full ">
              <component :is="item.icon" class="size-5" stroke-width="1.6" />
            </span>
            <p class="text-sm tracking-tight pr-2">{{ item.text }}</p>
          </RouterLink>
        </div>
        <div @click="$router.push('/login')"
          class="flex items-center gap-6 px-5 py-2 bg-[#d34341]  hover:bg-[#d4322f] cursor-pointer text-white rounded-3xl">
          <button class="cursor-pointer">Login</button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </div>
      </div>
  </transition>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {
  HomeIcon,
  ClipboardIcon,
  List,
  ClockIcon,
  FileText,
  Users,
  MessageSquare
} from "lucide-vue-next";


const api_url = "http://localhost:3003";

const menuItems = [
  { text: "Beranda", to: "/pasien/dashboard", icon: HomeIcon },
  { text: "Layanan", to: "/pasien/daftar-poli", icon: ClipboardIcon },
  { text: "Edukasi", to: "/pasien/status-antrian", icon: List },
  { text: "Contact", to: "/pasien/riwayat-kunjungan", icon: ClockIcon },
  // { text: "Resep Konsultasi", to: "/pasien/resep-konsultasi", icon: MessageSquare },
  // { text: "Uji Konsul", to: "/pasien/test-kosul", icon: MessageSquare },
];

const showNavbar = ref(true);
let lastScroll = 0;

const handleScroll = () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 50) {
    showNavbar.value = false;
  } else {
    showNavbar.value = true;
  }
  lastScroll = currentScroll;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>

<style scoped>
.router-link-active {
  background-color: #d3434158;
  color: #d34341;
  border-radius: 1rem;
  font-weight: 500;
}
.router-link-active .icon-wrapper {
  background-color: #d34341;
  color: #fff;
  border-radius: 9999px;
}
.router-link-active:hover {
  background-color: #d3434190;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>

