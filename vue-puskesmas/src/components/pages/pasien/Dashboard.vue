<template>
  <div>
    <div class="px-4 sm:px-6 md:px-20 min-h-screen h-full">
      <div class="flex flex-col lg:flex-row relative">
        <div class="flex-1 relative flex flex-col h-auto lg:h-screen justify-center py-10 lg:py-0">
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
                class="flex w-max items-center gap-2 bg-[#d34341] rounded-xl text-white px-5 py-2 cursor-pointer mt-7 hover:bg-[#c7201d] transition-colors">
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
        <div
          class="bg-white shadow-2xl border border-gray-100 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 absolute z-10 left-1/2 -translate-x-1/2 bottom-10 lg:left-auto lg:translate-x-0 lg:top-1/3 lg:bottom-auto lg:right-10 xl:right-20 w-[90%] sm:w-[80%] md:w-[70%] lg:w-auto lg:max-w-sm backdrop-blur-sm bg-opacity-95">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="">
                <img src="../../../assets/img/logoS.png" class="w-12 h-12 object-cover bg-no-repeat rounded-full"
                  alt="">
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

            <!-- route bawah alamat mo sisma -->
            <button
              class="bg-[#d34341] hover:bg-[#c7201d] text-white font-semibold py-3 px-6 rounded-xl transition-colors w-full mt-2 flex items-center justify-center gap-2">
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

    <div class="relative h-full min-h-screen  overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden bg-gradient-to-b from-white via-gray-100/30 to-white">
      <div class="absolute inset-0 pointer-events-none
            bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)]
            bg-[size:4rem_4rem]
            [mask-image:linear-gradient(to_bottom,transparent_2%,black_70%,transparent_98%)]">
        <div class="grid-bg"></div>
        <div class="absolute top-20 left-10 w-72 h-72 bg-red-100/30 rounded-full blur-3xl animate-float"></div>
        <div class="absolute top-1/3 right-20 w-96 h-96 bg-red-50/40 rounded-full blur-3xl animate-float"
          style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-1/3 w-80 h-80 bg-red-100/20 rounded-full blur-3xl animate-float"
          style="animation-delay: 4s;"></div>
        <div class="absolute top-32 right-16 w-20 h-20 border-2 border-red-200/30 rounded-2xl rotate-12 animate-float">
        </div>
        <div class="absolute top-1/2 left-24 w-16 h-16 border-2 border-red-200/30 rounded-2xl -rotate-6 animate-float"
          style="animation-delay: 1s;"></div>
        <div
          class="absolute bottom-32 right-1/4 w-24 h-24 border-2 border-red-200/30 rounded-2xl rotate-45 animate-float"
          style="animation-delay: 3s;"></div>
      </div>

      <div class="relative mt-5 z-10 px-4 sm:px-6 md:px-20 py-12">
        <div class="flex flex-col lg:flex-row gap-8 mb-16">
          <div class="lg:w-2/5 flex flex-col justify-center">
            <div
              class="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6 w-fit">
              <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Platform Kesehatan Digital
            </div>
            <h1 class="text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight" style="font-weight: 700;">
              Mulai Akses Layanan Kesehatan di
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#d34341] to-[#e67876]">SISMA</span>
            </h1>
            <p class="text-md text-[#6c6a6a] leading-relaxed mb-8">
              Pilih layanan yang Anda butuhkan untuk memulai perjalanan kesehatan Anda dengan mudah dan cepat.
            </p>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
                <div class="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-5 h-5 text-[#d34341]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Waktu Tunggu</p>
                  <p class="text-sm font-semibold text-gray-900">12-15 menit</p>
                </div>
              </div>
              <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
                <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-5 h-5 text-green-600">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Status</p>
                  <p class="text-sm font-semibold text-gray-900">Buka Hari Ini</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-3/5">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div @click="goTo(item)" v-for="(item, index) in ctasection" :key="item.id"
                class="group bg-white cursor-pointer rounded-xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-red-200 transition-all duration-300 overflow-hidden hover:-translate-y-1">
                <div class="p-4">
                  <div class="flex items-start justify-between mb-3">
                    <div
                      class="w-11 h-11 bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <component :is="item.icon" class="w-5 h-5 text-[#d34341]" />
                    </div>
                    <div
                      class="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-[#d34341] transition-colors">
                      <component :is="ChevronRightIcon" class="w-3.5 h-3.5 text-[#d34341] group-hover:text-white"
                        stroke-width="3" />
                    </div>
                  </div>
                  <h3 class="font-semibold text-gray-900 mb-1.5 text-sm line-clamp-1">{{ item.nama }}</h3>
                  <p class="text-xs text-gray-500 line-clamp-2">{{ item.ktr }}</p>
                </div>
                <div
                  class="h-0.5 bg-gradient-to-r from-[#d34341] to-[#e67876] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-20">
          <div class="flex items-center gap-4 mb-8">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-[#d34341] rounded-full animate-pulse"></div>
              <div class="w-2 h-2 bg-[#d34341] rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
              <div class="w-2 h-2 bg-[#d34341] rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
            </div>
            <h2 class="text-3xl lg:text-4xl text-gray-900 font-bold">
              Informasi Hari Ini
            </h2>
          </div>
          <div
            class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8 backdrop-blur-sm hover:shadow-2xl transition-shadow">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div class="group">
                <div
                  class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-red-200 transition-all">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-5 h-5 text-[#d34341]">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1 text-sm">Jam Operasional</h3>
                    <p class="text-gray-600 text-sm mb-1">08:00 - 17:00</p>
                    <p class="text-xs text-red-600 font-medium">⚠️ Minggu & Tanggal Merah Libur</p>
                  </div>
                </div>
              </div>

              <div class="group">
                <div
                  class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-red-200 transition-all">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-5 h-5 text-green-600">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-2 text-sm">Poli Buka</h3>
                    <span v-if="loading" class="text-gray-500 text-xs">Memuat jadwal...</span>
                    <span v-else-if="error" class="text-red-600 text-xs">{{ err }}</span>
                    <div v-else-if="jadwalDokter.length === 0" class="text-gray-500 text-xs">
                      Tidak ada poli untuk hari ini / libur.
                    </div>
                    <div v-else class="space-y-1.5">
                      <div v-for="item in jadwalDokter" :key="item.id" class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-green-500 rounded-full"></span>
                        <span class="text-gray-700 text-xs font-medium">{{ item.nama_poli }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="group">
                <div
                  class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-red-200 transition-all">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-5 h-5 text-blue-600">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-2 text-sm">Dokter Hari Ini</h3>
                    <span v-if="loading" class="text-gray-500 text-xs">Memuat jadwal...</span>
                    <span v-else-if="error" class="text-red-600 text-xs">{{ err }}</span>
                    <div v-else-if="jadwalDokter.length === 0" class="text-gray-500 text-xs">
                      Tidak ada jadwal untuk hari ini / libur.
                    </div>
                    <div v-else class="space-y-1.5">
                      <div v-for="item in jadwalDokter" :key="item.id" class="flex items-center gap-2">
                        <span class="w-1 h-1 bg-blue-500 rounded-full"></span>
                        <span class="text-gray-700 text-xs font-medium">Dr. {{ item.nama_dokter }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="group">
                <div
                  class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-red-200 transition-all">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-5 h-5 text-purple-600">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1 text-sm">Estimasi Antrian</h3>
                    <p class="text-gray-600 text-lg font-bold">12 – 15 <span
                        class="text-xs font-normal text-gray-500">menit</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-xl">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 text-amber-600">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-0.5 text-sm">Pengumuman</h4>
                  <p class="text-gray-600 text-xs">Hari ini tidak ada layanan vaksinasi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-15 mb-20 py-16 px-6 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 right-10 w-72 h-72 bg-red-100/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-100/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 right-20 w-96 h-96 bg-red-50/40 rounded-full blur-3xl animate-float"
          style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-1/3 w-80 h-80 bg-red-100/20 rounded-full blur-3xl animate-float"
          style="animation-delay: 4s;"></div>
        <div class="absolute top-32 right-16 w-20 h-20 border-2 border-red-200/30 rounded-2xl rotate-12 animate-float">
        </div>
        <div class="absolute top-1/2 left-24 w-16 h-16 border-2 border-red-200/30 rounded-2xl -rotate-6 animate-float"
          style="animation-delay: 1s;"></div>
        <div
          class="absolute bottom-32 right-1/4 w-24 h-24 border-2 border-red-200/30 rounded-2xl rotate-45 animate-float"
          style="animation-delay: 3s;"></div>
      </div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-purple-50 px-5 py-2.5 rounded-full mb-4">
            <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span class="text-red-600 text-sm font-semibold">Sismahealth Excellence</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
              Board of Medical
            </span>
            <br>
            <span class="text-gray-900">Excellence</span>
          </h1>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Seluruh prosedur medis dan tenaga kesehatan di Sisma dipastikan memenuhi standar regulasi dan etika layanan
            kesehatan tertinggi.
          </p>
        </div>
        <div class="flex flex-wrap justify-center items-end gap-6 lg:gap-8">
          <div class="group relative">
            <div
              class="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div
                class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
              <div class="relative">
                <div class="w-56 h-72 overflow-hidden">
                  <img src="../../../assets/img/iamgepasien.jpeg"
                    alt="Dr. Novi"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div class="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30">
                    <p class="font-bold text-base mb-1">Dr. Novi</p>
                    <div class="flex items-center gap-2">
                      <span class="px-3 py-1 bg-yellow-400 text-purple-900 rounded-full text-xs font-semibold">
                        Medical Advisor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="absolute -top-3 -right-3 w-12 h-12 bg-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity">
            </div>
          </div>
          <div class="group relative">
            <div
              class="relative overflow-hidden rounded-2xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3">
              <!-- <div
                class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
              </div> -->
              <!-- <div class="absolute top-4 right-4 z-20">
                <div
                  class="bg-gradient-to-r from-red-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  ⭐ Chief Medical Officer
                </div>
              </div> -->
              <div class="relative">
                <div class="w-64 h-80 overflow-hidden">
                  <img src="../../../assets/img/iamgepasien.jpeg"
                    alt="Dr. Stevanus Firiri"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div class="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                    <p class="font-bold text-lg mb-2">Dr. Stevanus Firiri</p>
                    <div class="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4 text-yellow-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                      <span class="text-yellow-400 text-xs font-semibold">Verified Medical Professional</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity">
            </div>
            <div
              class="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity">
            </div>
          </div>
          <div class="group relative">
            <div
              class="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div
                class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
              <div class="relative">
                <div class="w-56 h-72 overflow-hidden">
                  <img src="../../../assets/img/iamgepasien.jpeg"
                    alt="Anang Setiawan"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div class="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30">
                    <p class="font-bold text-base mb-1">Anang Setiawan</p>
                    <div class="flex items-center gap-2">
                      <span
                        class="px-3 py-1 bg-yellow-400 text-purple-900 rounded-full text-xs font-semibold whitespace-nowrap">
                        Patient Care & Support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="absolute -top-3 -left-3 w-12 h-12 bg-yellow-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity">
            </div>
          </div>
        </div>
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div
            class="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div
              class="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <p class="font-bold text-gray-900 text-2xl mb-1">100+</p>
            <p class="text-gray-600 text-sm">Dokter Bersertifikasi</p>
          </div>
          <div
            class="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6 text-purple-500">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <p class="font-bold text-gray-900 text-2xl mb-1">15+</p>
            <p class="text-gray-600 text-sm">Pengalaman Tahunan</p>
          </div>
          <div
            class="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div
              class="w-12 h-12 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6 text-yellow-500">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
            <p class="font-bold text-gray-900 text-2xl mb-1">50K+</p>
            <p class="text-gray-600 text-sm">Pasien Suka</p>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full bg-white min-h-screen">
      <!-- buat card setiap poli dan di route ke halaman artikel/eduk setiap poli -->
      <div class="mt-15">
        <div class="flex flex-col lg:flex-row w-full px-4 sm:px-6 md:px-20">
          <div class="flex-1 flex relative overflow-hidden lg:min-h-0">
            <div class="relative w-full h-full">
              <div class="w-full flex items-center justify-center h-full">
                <img :src="imgPoli" class="w-full h-64 sm:h-80 md:h-96 lg:h-110 object-cover bg-center bg-no-repeat"
                  alt="" style="border-radius: 3em;">
              </div>
            </div>
          </div>
          <div class="flex-1 lg:flex-1 flex justify-center flex-col px-4 sm:px-6 lg:px-10 mt-6 lg:mt-0">
            <div class="flex flex-col space-y-2">
              <p class="text-sm text-[#d34341]" style="font-weight: 600;">Layanan Kami</p>
              <h1 class="text-2xl sm:text-3xl -tracking-wide" style="font-weight: 500;">Layanan Premium Untuk Anda</h1>
              <p class="text-xs text-[#6e6e6e] mt-3">SISMA membantu Anda mendapatkan pelayanan medis lebih efisien,
                transparan, dan nyaman melalui sistem antrian dan pemeriksaan modern.</p>
            </div>
            <div class="flex flex-col space-y-4 mt-5">
              <div v-for="item in ourServices" class="flex items-center gap-3">
                <component :is="item.icon" class="w-5 h-5 p-1 bg-[#d34341] border rounded-full text-white" />
                <span class="text-sm" style="font-weight: 600;">{{ item.service }}</span>
              </div>
            </div>
            <div
              class="py-2.5 flex items-center mt-5 cursor-pointer gap-2 bg-[#d34341] hover:bg-[#a92523] rounded-3xl w-max px-1.5">
              <p class="text-white text-sm ml-3">Read More</p>
              <span class="p-1 bg-white/60  rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                  stroke="currentColor" class="size-3 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap px-4 sm:px-6 md:px-20 gap-4 sm:gap-5 lg:gap-7 mt-10">
          <div v-for="item in cardSisma" :key="item.id"
            :class="['flex shadow-xl rounded-2xl py-3 px-3 justify-between overflow-hidden w-full sm:w-[calc(50%-0.625rem)] lg:w-auto lg:flex-1 flex-col h-55', item.bg || 'bg-white']">
            <component :is="item.icons" :class="['w-12 h-12', item.color || 'text-[#d34341]']" />
            <div :class="['flex flex-col gap-1 mt-1', item.color || 'text-black']">
              <span class="font-semibold text-md">{{ item.nama }}</span>
              <span class="text-xs font-light">{{ item.ktr }}</span>
            </div>
            <div
              :class="['py-2.5 flex items-center mt-5 cursor-pointer gap-2 rounded-3xl w-max px-1.5', item.bgBt || 'bg-[#d34341] hover:bg-[#a92523]']">
              <p :class="['text-sm ml-3', item.colorBt || 'text-white']" style="font-weight: 500;">Read More</p>
              <span :class="['p-1 rounded-full', item.bgIcons || 'bg-white/60 ']">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                  stroke="currentColor" :class="['size-3', item.colorBt || 'text-white']">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>


<div class="min-h-screen bg-white py-12 px-4 sm:px-6 md:px-20 relative overflow-hidden">
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-20 right-10 w-64 h-64 bg-red-100/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-40 left-10 w-80 h-80 bg-red-100/15 rounded-full blur-3xl"></div>
    <div class="absolute top-32 left-1/4 w-16 h-16 border-2 border-red-200/30 rounded-2xl rotate-12 animate-float"></div>
    <div class="absolute bottom-32 right-1/3 w-20 h-20 border-2 border-red-200/30 rounded-2xl -rotate-6 animate-float" style="animation-delay: 2s;"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto">
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-[#d34341] rounded-full animate-pulse"></div>
          <div class="w-2 h-2 bg-[#d34341] rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
          <div class="w-2 h-2 bg-[#d34341] rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
        </div>
        <div class="inline-flex items-center gap-2 bg-red-50 text-[#d34341] px-4 py-2 rounded-full text-sm font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Health Education
        </div>
      </div>
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Education & <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#d34341] to-[#e67876]">Articles</span>
      </h1>
      <p class="text-[#696969] text-lg max-w-2xl">
        Temukan berbagai artikel edukatif dan informasi kesehatan terkini untuk meningkatkan pengetahuan Anda.
      </p>
    </div>

    <div v-if="education.length === 0" class="py-20">
      <div class="flex flex-col items-center justify-center">
        <div class="relative mb-6">
          <div class="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div class="relative w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center border-4 border-red-200/50 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-[#d34341]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        </div>
        <h3 class="text-gray-700 font-semibold text-lg mb-2">Belum Ada Artikel</h3>
        <p class="text-gray-400 text-sm text-center max-w-md px-4">
          Saat ini belum ada artikel tersedia. Silakan cek kembali nanti untuk konten edukatif terbaru.
        </p>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <article 
        @click="toDetail(item.id)" 
        v-for="item in education" 
        :key="item.id"
        class="group bg-white cursor-pointer rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 hover:border-red-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col">
        <div class="relative w-full h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            :src="`http://localhost:3003/uploads/tmp/${item.gambar}`"
            :alt="item.judul"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute top-3 left-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 text-[#d34341]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              {{ item.nama_tipe }}
            </span>
          </div>
        </div>
        <div class="p-5 flex flex-col flex-grow">
          <h2 class="text-gray-900 font-bold text-base mb-3 line-clamp-2 group-hover:text-[#d34341] transition-colors leading-tight">
            {{ item.judul }}
          </h2>
          <div class="flex items-center gap-3 mb-3">
            <div class="flex items-center gap-1.5 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {{ formatDate(item.created_at) }}
            </div>
            <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
            <div class="flex items-center gap-1.5 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              5 min read
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
            {{ item.isi }}
          </p>
          <div class="flex items-center gap-2 text-[#d34341] font-semibold text-sm group-hover:gap-3 transition-all">
            <span>Read More</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
        <div class="h-1 bg-gradient-to-r from-[#d34341] to-[#e67876] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
      </article>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { UserGroupIcon, HeartIcon, SparklesIcon, UserIcon, BuildingLibraryIcon, QueueListIcon, DocumentTextIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { CheckIcon } from '@heroicons/vue/24/solid'
import router from "@/router";
import { useRouter } from "vue-router";
import imgPoli from "../../../assets/img/ImageLandingPoli.jpg"


const ctasection = ref([])
const ourServices = ref([])
const jadwalDokter = ref([])
const loading = ref(true)
const err = ref(null)
const routId = useRouter()
const error = ref(false)
const education = ref([])
const cardSisma = ref([])
const user = ref(null);
const api_url = "http://localhost:3003"
const apiJadwal = "http://localhost:3003/api/pasien/jadwal/hari-ini";
const token = localStorage.getItem("token")


const dataCTA = () => {
  ctasection.value = [
    { id: 1, nama: "Daftar Poli Sekarang", ktr: "Daftar poli tanpa harus antri.", icon: BuildingLibraryIcon, route: "/pasien/daftar-poli" },
    { id: 2, nama: "Status Antrian", ktr: "Lihat status antrian sekarang.", icon: QueueListIcon, route: "/pasien/status-antrian" },
    { id: 3, nama: "Riwayat Kunjungan", ktr: "Lihat riwayat pemeriksaan, diagnosa dan obat.", icon: DocumentTextIcon, route: "/pasien/riwayat-kunjungan" },
    { id: 4, nama: "Jadwal Dokter", ktr: "Cek jadwal dokter berdasarkan poli.", icon: CalendarDaysIcon, route: "/pasien/dokter-pasien" },
    { id: 5, nama: "Konsultasi Online", ktr: "Konsultasi dengan dokter yang sedang online.", icon: ChatBubbleLeftRightIcon, route: "/pasien/konsultasi" },
    { id: 6, nama: "Resep Obat", ktr: "Lihat status resep: wei status obat realtime.", icon: ClipboardDocumentListIcon, route: "/pasien/status-resep" }
  ]
}

const services = () => {
  ourServices.value = [
    { id: 1, service: "Tim Yang Berpengalaman", icon: CheckIcon },
    { id: 2, service: "Teknologi Terkini", icon: CheckIcon },
    { id: 3, service: "Layanan Komparatif", icon: CheckIcon },
    { id: 4, service: "Layanan Darurat Sisma", icon: CheckIcon },
  ]
}

const cardHealth = () => {
  cardSisma.value = [
    { id: 1, nama: "Perawatan Sisma Umum", ktr: "Layanan pemeriksaan kesehatan umum yang cepat, nyaman, dan mudah diakses untuk semua pasien.", icons: UserIcon, bgBt: "bg-[#fff]", bg: "bg-[#d34341]", color: "text-[#fff]", colorBt: "text-[#d34341]", bgIcons: "bg-[#d3434171]" },
    { id: 2, nama: "Perawatan Sisma Gigi", ktr: "Perawatan gigi yang aman dan profesional untuk menjaga kesehatan serta kenyamanan senyum Anda.", icons: SparklesIcon },
    { id: 3, nama: "Perawatan Sisma Kandungan", ktr: "Layanan kesehatan ibu dan kandungan dengan pendekatan ramah, aman, dan penuh perhatian.", icons: HeartIcon },
    { id: 4, nama: "Perawatan Sisma KIA", ktr: "Pendampingan kesehatan ibu dan anak agar tumbuh kembang selalu terpantau dengan baik.", icons: UserGroupIcon },
  ]
}

const goTo = (item) => {
  router.push(`${item.route}`)
}

const toDetail = (id) => {
  routId.push(`/education/${id}`)
}

const getJadwal = async () => {
  error.value = false
  loading.value = true
  err.value = null
  try {
    const token = localStorage.getItem("token")
    const res = await axios.get(apiJadwal, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    jadwalDokter.value = res.data.data
  } catch (err) {
    error.value = true
    console.log("Error get jadwal dokter!", err)
  } finally {
    loading.value = false
  }
}

const getBerita = async () => {
  try {
    const res = await axios.get("http://localhost:3003/api/berita", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    education.value = res.data.data
    console.log(education.value)
  } catch (e) {
    console.log(e)
  }
}

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

  dataCTA()
  services()
  cardHealth()
  getJadwal()
  getBerita()
});

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};

</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>