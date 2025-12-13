<template>
  <transition name="slide-down">
    <div v-show="showNavbar"
      class="w-full fixed mt-2.5 z-50 justify-between px-10 items-center flex transition-all duration-300">
      <div class="flex gap-1.5 items-center">
        <img src="../../../../../src/assets/img/navbarLogo.png" alt="" class="w-8 h-auto rounded-full object-cover">
        <div class="flex flex-col -space-y-1">
          <span class="text-xl font-medium tracking-tight text-[#039BE5]" style="font-weight: 600;">SismaCare</span>
        </div>
      </div>
      <div class="flex gap-3 items-center shadow-xl tracking-tight py-2 px-5 rounded-3xl bg-white">
        <RouterLink v-for="(item, index) in menuItems" :key="index" :to="item.to"
          class="flex items-center gap-1 transition-all px-2 pl-0.5  rounded-2xl" :class="isActive(item.to.hash)
            ? 'bg-[#039BE5]/40 text-[#039BE5]'
            : 'text-[#686868]'">

          <span class="icon-wrapper -ml-1.5 flex items-center justify-center p-1.5 rounded-full transition-all" :class="isActive(item.to.hash)
            ? 'bg-[#039BE5]'
            : 'bg-transparent'">
            <component :is="item.icon" class="size-5 transition-colors" stroke-width="1.6" :class="isActive(item.to.hash)
              ? '!text-white'
              : '!text-[#595858]'" />
          </span>

          <p class="text-sm tracking-tight pr-2" :class="isActive(item.to.hash) ? 'text-white' : 'text-[#595858]'">{{
            item.text }}</p>
        </RouterLink>
      </div>
      <div class="flex items-center gap-5">
        <div class="w-10 h-10 justify-center items-center rounded-full bg-white shadow-xl cursor-pointer flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="size-5 text-[#039BE5]">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>

        </div>
        <div @click="$router.push('/login')"
          class="flex items-center gap-6 px-5 py-2 bg-[#039BE5]  hover:bg-[#0572a8] cursor-pointer text-white rounded-3xl">
          <button class="cursor-pointer">Login</button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
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
import { useRoute } from "vue-router";

const route = useRoute();

const activeHash = computed(() => route.hash || "#beranda");

const isActive = (hash) => activeHash.value === hash;
const menuItems = [
  {
    text: "Beranda",
    to: { path: "/", hash: "#beranda" },
    icon: HomeIcon
  },
  {
    text: "Layanan Kami",
    to: { path: "/", hash: "#layanan" },
    icon: ClipboardIcon
  },
  {
    text: "Edukasi",
    to: { path: "/", hash: "#edukasi" },
    icon: List
  },
  {
    text: "Kontak",
    to: { path: "/", hash: "#contact" },
    icon: ClockIcon
  }
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