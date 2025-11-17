<template>
  <div>
    <div class="px-4 sm:px-6 md:px-10 min-h-screen h-full">
      <div class="flex flex-col lg:flex-row relative border-b-3 border-b-[#cacaca4c]">
        <div class="flex-1 flex flex-col h-auto lg:h-screen justify-center py-10 lg:py-0">
          <div class="flex flex-col mt-10 space-y-2.5">
            <h1 v-if="user" class="font-semibold text-lg sm:text-xl">Halo, {{ user.nama }} 👋</h1>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl text-[#d34341]" style="font-weight: 800;">
              Selamat datang <span class="text-black">di<br> Sisma <br> Siap Melayani <br> Masyarakat</span>
            </h1>
            <p class="text-sm mt-7 text-[#626262]">
              Perawatan cerdas kami siap membantu anda. <span class="hidden sm:inline">Hubungi kami untuk mendapatkan
                <br class="hidden lg:inline"> perawatan kesehatan yang lebih baik</span>
              <span class="inline sm:hidden">Hubungi kami untuk mendapatkan perawatan kesehatan yang lebih baik</span>
            </p>
            <RouterLink to="/pasien/konsultasi">
              <button
                class="flex w-max items-center gap-2 bg-[#d34341] rounded-xl text-white px-5 py-2 cursor-pointer mt-7 hover:bg-[#1576c7] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                <span class="text-sm font-semibold">Konsultasi</span>
              </button>
            </RouterLink>
            <div class="border-l-2 mt-10 border-l-[#6e6e6e4c] space-y-1 px-2.5 w-max">
              <div class="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  class="w-8 h-8 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                  alt="">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  class="w-8 h-8 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                  alt="">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  class="w-8 h-8 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                  alt="">
              </div>
              <span class="text-md font-semibold">100.000+</span>
              <p class="text-sm text-[#626262]">Pasien kami di seluruh jepara</p>
            </div>
          </div>
        </div>

        <div class="flex-1 flex relative overflow-hidden min-h-[400px] lg:min-h-0">
          <div class="relative w-full h-full">
            <div class="w-full flex items-center justify-center h-full">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=1000&fit=crop"
                class="rounded-xl w-full h-150 object-cover mt-10 bg-center bg-no-repeat" alt="">
            </div>
          </div>
        </div>
        <div class="bg-white shadow-2xl border border-gray-100 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 absolute z-10 left-1/2 -translate-x-1/2 bottom-10 lg:left-auto lg:translate-x-0 lg:top-1/3 lg:bottom-auto lg:right-10 xl:right-20 w-[90%] sm:w-[80%] md:w-[70%] lg:w-auto lg:max-w-sm backdrop-blur-sm bg-opacity-95">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="">
                <img src="../../../assets/img/logoS.png" class="w-12 h-12 object-cover bg-no-repeat rounded-full" alt="">
              </div>
              <div class="flex flex-col -space-y-1">
                <h3 class="font-bold text-lg text-gray-800">Layanan 24/7</h3>
                <p class="text-sm text-[#626262]">Kami siap melayani Anda</p>
              </div>
            </div>

            <div class="space-y-3 pt-2">
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-5 text-[#d34341] mt-0.5 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p class="text-sm text-[#626262]">Konsultasi cepat dan mudah</p>
              </div>
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-5 text-[#d34341] mt-0.5 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p class="text-sm text-[#626262]">Poli umum, gigi, KIA, kandungan</p>
              </div>
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-5 text-[#d34341] mt-0.5 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p class="text-sm text-[#626262]">Antrian lebih mudah, Daftar poli sekarang</p>
              </div>
            </div>

            <!-- ini route scrol ke bawah bagian landing page -->
            <button
              class="bg-[#d34341] hover:bg-[#1576c7] text-white font-semibold py-3 px-6 rounded-xl transition-colors w-full mt-2 flex items-center justify-center gap-2">
              <span>Hubungi Kami</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="h-screen">
      haha
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref(null);
const api_url = "http://localhost:3003"

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api_url}/api/pasien/profil`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = res.data;
  } catch (err) {
    console.error("Gagal mengambil profil pasien:", err);
  }
});
</script>
