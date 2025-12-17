<template>
  <div class="h-full bg-gray-50">
    <div class="bg-white mt-20 border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-10 py-4">
        <div class="flex items-center gap-2 text-xs sm:text-sm">
          <button @click="$router.push('/pasien/dashboard')"
            class="text-[#d34341] text-sm hover:text-[#b12b29] transition-colors">Home</button>
          <span class="text-gray-400">></span>
          <p class="text-gray-700 text-sm">Tanya Dokter</p>
        </div>
      </div>
    </div>
    <div class="px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div class="w-full lg:w-2/5 xl:w-1/3 space-y-6">
          <div class="text-center lg:text-left">
            <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Chat Dokter di Sisma</h1>
            <p class="mt-2 text-sm sm:text-base text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Iusto dolorem dolorum non tenetur?</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="overflow-hidden">
              <div class="flex transition-transform duration-500"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <div v-for="(item, index) in slides" :key="index"
                  class="flex-shrink-0 w-full flex justify-center items-center">
                  <img :src="item.img" :alt="item.text" class="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
                </div>
              </div>
            </div>
            <div class="mt-4 text-center font-medium text-gray-800">
              {{ slides[currentIndex].text }}
            </div>
            <div class="flex justify-center gap-2 mt-4">
              <span v-for="(item, index) in slides" :key="index"
                class="w-2 h-2 rounded-full cursor-pointer transition-colors"
                :class="currentIndex === index ? 'bg-[#d34341]' : 'bg-gray-300'" @click="goToSlide(index)"></span>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-medium text-gray-800 mb-4">Mengapa Chat Dokter di Sisma?</h2>
            <div class="space-y-4">
              <div v-for="item in chatSisma" :key="item.id" class="flex items-center gap-3">
                <img :src="item.img" class="w-10 h-10 rounded-full object-cover flex-shrink-0" alt="">
                <p class="text-sm text-gray-700">{{ item.nama }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-3/5 xl:w-2/3">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
            <div class="p-4 sm:p-6 border-b border-gray-200">
              <div class="flex justify-center mb-4">
                <img src="../../../../../src/assets/img/logoS.png" class="w-12 h-12 rounded-full object-cover" alt="">
              </div>
              <div
                class="flex items-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <input v-model="searchPoli" type="text" placeholder="Cari dokter..."
                  class="outline-none flex-1 text-sm sm:text-base text-gray-700 placeholder-gray-400" />
                <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div class="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-350px)] lg:max-h-[calc(100vh-250px)]">
              <div class="mb-4">
                <h2 class="text-xl sm:text-2xl font-semibold text-gray-900">Cari Dokter</h2>
                <p class="text-sm text-gray-600 mt-1">Pilih kategori yang sesuai kondisi anda.</p>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                <div v-for="p in filterPoli" :key="p.id" @click="pilihPoli(p.id)"
                  class="cursor-pointer flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-[#d34341] hover:shadow-md transition-all group">
                  <img
                    class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3 group-hover:scale-105 transition-transform"
                    :src="filteredImg(p.nama_poli)" alt="">
                  <span
                    class="text-center text-sm font-medium text-gray-700 group-hover:text-[#d34341] transition-colors">
                    {{ fakeName(p.nama_poli) }}
                  </span>
                </div>
              </div>
              <div v-if="filterPoli.length === 0" class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-500 text-sm">Menu tidak ditemukan.</p>
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