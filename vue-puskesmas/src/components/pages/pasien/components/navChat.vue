<template>
  <div class="relative overflow-hidden rounded-2xl mb-10">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-[#d34341] via-[#e05a58] to-[#b83331]"
    ></div>

    <!-- Decorative blur -->
    <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

    <!-- Content -->
    <div class="relative px-6 py-10 sm:px-10 text-white">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold mb-2">
            Konsultasi Dokter Online
          </h1>
          <p class="text-white/90 max-w-xl text-sm sm:text-base">
            Konsultasi kesehatan dengan dokter profesional secara cepat, aman, dan terpercaya di Sisma.
          </p>
        </div>

        <div class="flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl backdrop-blur">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 20l1.8-3.6A7.963 7.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div class="text-sm">
            <p class="font-semibold">Chat Langsung</p>
            <p class="text-white/80">Respon cepat & realtime</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
