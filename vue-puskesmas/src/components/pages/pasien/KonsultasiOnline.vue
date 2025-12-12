<template>
  <div class="h-full">
    <div class="mt-25 px-4 sm:px-6 md:px-10">
      <div class="flex items-center gap-3 text-xs">
        <button @click="$router.push('/pasien/dashboard')" class="text-[#d34341] cursor-pointer">Home</button>
        <span>></span>
        <p>Tanya Dokter</p>
      </div>
      <div class="flex mt-10 h-full min-h-screen overflow-hidden">
        <div class="flex-1">
          <div class="flex flex-col gap-2">
            <h1 class="text-center text-xl font-semibold">Chat Dokter di Sisma</h1>
            <p class="text-md text-[#5d5c5c] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolorem dolorum non tenetur?</p>
          </div>
          <div class="w-70 mt-10 mx-auto overflow-hidden relative">
            <div class="flex transition-transform duration-500"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
              <div v-for="(item, index) in slides" :key="index" class="flex-shrink-0 w-full justify-center items-center flex">
                <img :src="item.img" :alt="item.text" class="w-40 h-auto object-cover" />
              </div>
            </div>
            <div class="mt-5 text-center font-semibold">
              {{ slides[currentIndex].text }}
            </div>
            <div class="flex justify-center gap-2 mt-5">
              <span v-for="(item, index) in slides" :key="index" class="w-2 h-2 rounded-full cursor-pointer"
                :class="currentIndex === index ? 'bg-[#d34341]' : 'bg-gray-300'" @click="goToSlide(index)"></span>
            </div>
          </div>
          <div class="mt-6">
            <h1 style="font-weight: 500;" class="text-lg text-[#474646]">Mengapa Chat Dokter di Sisma?</h1>
            <div class="flex flex-col gap-5 mt-5">
              <div v-for="item in chatSisma" :key="item.id" class="flex items-center gap-3">
                <img :src="item.img" class="w-10 h-auto rounded-full object-cover" alt="">
                <p class="">{{ item.nama }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1/5 border-l border-l-[#a7a6a6] px-3 py-3">
          <div class="flex justify-center mb-3">
            <img src="../../../../../src/assets/img/logoS.png" class="w-10 h-auto rounded-full object-cover" alt="">
          </div>
          <div class="flex mb-8 gap-5 py-2 px-5 justify-between w-full items-center border-[#a9a6a6] border rounded-md">
            <input v-model="searchPoli" type="text" placeholder="Cari dokter..." class="outline-none ring-0 w-full"
              name="" id="">
            <svg class="w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <div class="h-full scrollbar-hide overflow-y-auto max-h-165">
            <p class="text-2xl font-semibold">Cari Dokter</p>
            <span class="text-sm text-[#5b5a5a]">Pilih kategori yang sesuai kondisi anda.</span>
            <div class="flex mt-6 flex-wrap gap-3">
              <div v-for="p in filterPoli" :key="p.id" @click="pilihPoli(p.id)"
                class="cursor-pointer justify-start px-2 gap-2  flex flex-col items-center py-2 w-40">
                <img class="w-16 h-auto rounded-full object-cover" :src="filteredImg(p.nama_poli)" alt="">
                <span class="text-center">{{ fakeName(p.nama_poli) }}</span>
              </div>
              <div v-if="filterPoli.length === 0" class="text-[#5b5a5a] text-sm">
                Menu tidak ditemukan.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/utils/axios";
import ori from "../../../assets/img/logoS.png"
import imgKandungan from "../../../assets/img/Dkandungan.png"
import imgUmum from "../../../assets/img/Dumum.png"
import imgGigi from "../../../assets/img/Dgigi.png"
import imgKia from "../../../assets/img/Dkia.png"
import slide1 from "../../../assets/img/slide1.png"
import slide2 from "../../../assets/img/slide2.png"
import slide3 from "../../../assets/img/slide3.png"

const router = useRouter();
const poli = ref([]);
const searchPoli = ref("")
const chatSisma = ref("")
const currentIndex = ref(0);
let interval = null;

const slides = ref([
  { img: slide1, text: "Ini Slide 1" },
  { img: slide2, text: "Ini Slide 2" },
  { img: slide3, text: "Ini Slide 3" },
]);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

onMounted(async () => {
  try {
    const res = await axios.get("/api/poli");
    poli.value = res.data.data;
  } catch (err) {
    console.error(err);
  }
});

const filterPoli = computed(() =>
  !searchPoli.value
    ? poli.value
    : poli.value.filter(item => item.nama_poli.toLowerCase().includes(searchPoli.value.toLowerCase()))
);

const filteredImg = (img) => {
  const i = img.toLowerCase()
  if (i.includes("poli umum")) return imgUmum;
  if (i.includes("poli gigi")) return imgGigi;
  if (i.includes("poli kandungan")) return imgKandungan;
  if (i.includes("poli kia")) return imgKia;
  return ori
}

const fakeName = (item) => {
  const map = {
    "Poli Umum": "Dokter Umum",
    "Poli Gigi": "Dokter Gigi",
    "Poli Kangungan": "Dokter Kangungan",
    "Poli KIA": "Dokter Kesehatan Ibu & Anak",
  }
  return map[item] || item
}

const onMouchat = () => {
  chatSisma.value = [
    { id: 1, nama: "Bisa berbicara langsung dengan dokter tanpa harus datang ke puskesmas.", img: ori },
    { id: 2, nama: "Semua informasi dan riwayat kesehatan Anda dijaga kerahasiaannya.", img: ori },
    { id: 3, nama: "Mendapatkan rekomendasi dan saran medis sesuai kondisi Anda.", img: ori }
  ]
}

const pilihPoli = (poliId) => {
  router.push({ name: "dokterId", params: { id: poliId } });
};

onMounted(() => {
  interval = setInterval(nextSlide, 3000);
  onMouchat()
})

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #111b21;
}

::-webkit-scrollbar-thumb {
  background: #374045;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4a5358;
}
</style>