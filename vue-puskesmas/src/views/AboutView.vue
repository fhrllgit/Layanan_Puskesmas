<template>
  <div class="h-full">
    <div class="mt-25 px-4 sm:px-6 md:px-10">
      <div class="flex items-center gap-3 text-sm">
        <button @click="$router.push('/pasien/dashboard')" class="text-[#d34341] cursor-pointer">Home</button>
        <span>></span>
        <p>Tanya Dokter</p>
      </div>
      <div class="flex mt-10 h-full min-h-screen overflow-hidden">
     <div class="flex-1 px-4 md:px-8 lg:px-12 py-6 md:py-10 max-w-6xl mx-auto">
    <!-- Header Section -->
    <div class="flex flex-col gap-3 mb-8 md:mb-12 text-center">
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            Chat Dokter di Sisma
        </h1>
        <p class="text-sm md:text-base lg:text-lg text-[#5d5c5c] max-w-2xl mx-auto px-4">
            Konsultasi kesehatan jadi lebih mudah dan cepat. Dapatkan solusi kesehatan Anda kapan saja, di mana saja dengan dokter profesional.
        </p>
    </div>

    <!-- Auto Sliding Carousel -->
    <div class="mb-10 md:mb-16">
        <div class="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-teal-500 to-blue-600">
            <!-- Carousel Container -->
            <div class="relative h-64 md:h-80 lg:h-96">
                <!-- Slides -->
                <div 
                    v-for="(slide, index) in carouselSlides" 
                    :key="index"
                    :class="currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'"
                    class="absolute inset-0 transition-all duration-700 ease-in-out"
                >
                    <div class="flex flex-col md:flex-row items-center justify-between h-full p-6 md:p-10 lg:p-12">
                        <!-- Text Content -->
                        <div class="flex-1 text-white mb-6 md:mb-0 text-center md:text-left">
                            <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                                {{ slide.title }}
                            </h3>
                            <p class="text-sm md:text-base lg:text-lg opacity-90 max-w-md">
                                {{ slide.description }}
                            </p>
                        </div>
                        
                        <!-- Image/Icon -->
                        <div class="flex-shrink-0">
                            <div class="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-6xl md:text-7xl lg:text-8xl">
                                {{ slide.icon }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Dots -->
            <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                <button 
                    v-for="(slide, index) in carouselSlides" 
                    :key="index"
                    @click="currentSlide = index"
                    :class="currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2'"
                    class="h-2 rounded-full transition-all duration-300"
                ></button>
            </div>

            <!-- Arrow Navigation (Desktop) -->
            <button 
                @click="prevSlide"
                class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full items-center justify-center text-white transition-all duration-200"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <button 
                @click="nextSlide"
                class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full items-center justify-center text-white transition-all duration-200"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    </div>

    <!-- Why Chat Dokter Section -->
   
</div>


        <div class="flex-1/5 border-l border-l-[#a7a6a6] px-3 py-3">
          <div class="flex justify-center mb-3">
            <img src="../../../../../src/assets/img/logoS.png" class="w-10 h-auto rounded-full object-cover" alt="">
          </div>
          <div class="flex mb-8 gap-5 py-2 px-5 justify-between w-full items-center border-[#a9a6a6] border rounded-md">
            <input v-model="searchPoli" type="text" placeholder="Cari dokter..." class="outline-none ring-0 w-full" name="" id="">
            <svg class="w-5 h-5 " fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
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

const router = useRouter();
const poli = ref([]);
const searchPoli = ref("")
const chatSisma = ref("")

const currentSlide = ref(0);
let autoSlideInterval = null;


const carouselSlides = ref([
    {
        title: 'Balas Chat Cepat',
        description: 'Dokter kami siap merespon pertanyaan Anda dengan cepat, kapan pun Anda membutuhkan',
        icon: '⚡'
    },
    {
        title: 'Konsultasi 24/7',
        description: 'Layanan konsultasi tersedia setiap saat, siang atau malam hari untuk kenyamanan Anda',
        icon: '🕐'
    },
    {
        title: 'Dokter Profesional',
        description: 'Tim dokter berpengalaman dan tersertifikasi siap membantu masalah kesehatan Anda',
        icon: '👨‍⚕️'
    },
    {
        title: 'Privasi Terjaga',
        description: 'Semua konsultasi Anda dijamin kerahasiaannya dengan enkripsi end-to-end',
        icon: '🔒'
    }
]);

// 👇 Fungsi carousel
const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % carouselSlides.value.length;
};

const prevSlide = () => {
    currentSlide.value = currentSlide.value === 0 
        ? carouselSlides.value.length - 1 
        : currentSlide.value - 1;
};

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % carouselSlides.value.length;
    }, 4000); // Ganti slide setiap 4 detik
};

// Existing functions
onMounted(async () => {
    try {
        const res = await axios.get("/api/poli");
        poli.value = res.data.data;
    } catch (err) {
        console.error(err);
    }
    
    onMouchat();
    startAutoSlide(); // 👈 Start auto slide
});

// 👇 Cleanup interval saat component unmount
onUnmounted(() => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
});

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
        { id: 1, nama: "Konsultasi Cepat & Mudah", img: ori },
        { id: 2, nama: "Dokter Berpengalaman", img: ori },
        { id: 3, nama: "Privasi Terjamin", img: ori },
        { id: 4, nama: "Tersedia 24/7", img: ori },
        { id: 5, nama: "Harga Terjangkau", img: ori },
        { id: 6, nama: "Respon Cepat", img: ori }
    ];
};

const pilihPoli = (poliId) => {
  router.push({ name: "dokterId", params: { id: poliId } });
};

onMounted(() => {
  onMouchat()
})
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