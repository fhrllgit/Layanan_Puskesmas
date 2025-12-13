<template>
    <section class="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
        <div class="pointer-events-none absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-20"></div>
        <div class="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-20"></div>

        <div class="absolute inset-0 overflow-hidden opacity-40">
            <div class="absolute top-20 right-32 w-72 h-72 bg-gradient-to-br from-[#039BE5]/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
            <div
                class="absolute top-40 right-20 w-20 h-20 border-2 border-[#039BE5]/20 rounded-2xl rotate-45 animate-float">
            </div>
            <div class="absolute bottom-1/3 left-1/4 w-16 h-16 border-2 border-cyan-400/20 rounded-xl rotate-12 animate-float"
                style="animation-delay: 0.5s;"></div>
            <div class="absolute top-1/2 right-1/3 w-25 h-25 border-2 border-[#039BE5]/15 rounded-lg rotate-90 animate-float"
                style="animation-delay: 1.5s;"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-15">
                <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#039BE5]/10 to-cyan-400/10 border border-[#039BE5]/20 mb-6 backdrop-blur-sm">
                    <div class="w-2 h-2 bg-[#039BE5] rounded-full animate-pulse"></div>
                    <span
                        class="text-sm font-semibold bg-gradient-to-r from-[#039BE5] to-cyan-600 bg-clip-text text-transparent">
                        HUBUNGI KAMI
                    </span>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Kontak
                    <span
                        class="bg-gradient-to-r from-[#039BE5] via-[#0288D1] to-cyan-500 bg-clip-text text-transparent">
                        Puskesmas SISMA
                    </span>
                </h2>
                <p class="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                    Kami siap melayani kebutuhan kesehatan Anda dengan cepat, ramah, dan profesional
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
                <div class="space-y-6">
                    <div
                        class="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#039BE5]/30">
                        <div class="flex items-start gap-5">
                            <div
                                class="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#039BE5] to-[#0288D1] flex items-center justify-center shadow-lg shadow-[#039BE5]/25 group-hover:scale-110 transition-transform">
                                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-900 mb-2">Alamat Lengkap</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    Jl. Jepara Kedung No. 12, Kecamatan Bae<br>
                                    Kota Jepara, Indonesia
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="grid sm:grid-cols-2 gap-6">
                        <div
                            class="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#039BE5]/30">
                            <div
                                class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#039BE5] to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#039BE5]/20">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 mb-2">Telepon</h3>
                            <p class="text-[#039BE5] font-semibold">(021) 1234 5678</p>
                        </div>

                        <div
                            class="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#039BE5]/30">
                            <div
                                class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-[#039BE5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 mb-2">Email</h3>
                            <p class="text-[#039BE5] font-semibold text-sm">info@puskesmassisma.com</p>
                        </div>
                    </div>

                    <div
                        class="group bg-gradient-to-br from-[#039BE5]/5 via-white to-cyan-50/30 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#039BE5]/20">
                        <div class="flex items-start gap-5">
                            <div
                                class="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#039BE5] to-cyan-500 flex items-center justify-center shadow-lg shadow-[#039BE5]/25 group-hover:scale-110 transition-transform">
                                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-900 mb-4">Jam Operasional</h3>
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center py-2 border-b border-gray-200/50">
                                        <span class="text-gray-700 font-medium">Senin – Jumat</span>
                                        <span class="text-[#039BE5] font-semibold">08.00 – 16.00</span>
                                    </div>
                                    <div class="flex justify-between items-center py-2 border-b border-gray-200/50">
                                        <span class="text-gray-700 font-medium">Sabtu</span>
                                        <span class="text-[#039BE5] font-semibold">08.00 – 12.00</span>
                                    </div>
                                    <div class="flex justify-between items-center py-2">
                                        <span class="text-gray-700 font-medium">Minggu & Libur</span>
                                        <span class="text-red-500 font-semibold">Tutup</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center lg:justify-end lg:sticky lg:top-8">
                    <div class="relative">
                        <div class="absolute -inset-4 bg-gradient-to-r from-[#039BE5]/20 to-cyan-400/20 rounded-[4rem] blur-2xl opacity-60">
                        </div>
                        <div class="relative w-[300px] h-[600px] rounded-[3rem] bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl p-2 border overflow-hidden">
                            <div class="absolute mt-2 left-1/2 -translate-x-1/2 w-30 h-7 bg-black rounded-3xl z-20 flex items-end justify-center pb-1">
                                <div class="w-16 h-1 bg-gray-800 rounded-full"></div>
                            </div>
                            <div class="w-full h-full rounded-[2.3rem] overflow-hidden bg-white relative">
                                <div class="absolute bottom-20 left-0 right-0 z-10 px-4">
                                    <div class="flex items-center justify-between bg-white p-2 rounded-xl">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-xl bg-[#039BE5] flex items-center justify-center shadow-lg">
                                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                                    </path>
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm font-bold text-gray-900">Lokasi Kami</p>
                                                <p class="text-xs text-gray-500">Jl. Jepara Kedung No. 12 ...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <iframe class="w-full h-full border-0" loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps?q=puskesmas&output=embed">
                                </iframe>

                                <div
                                    class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
                                    <button
                                        class="w-full py-3 bg-gradient-to-r from-[#039BE5] to-cyan-500 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7">
                                            </path>
                                        </svg>
                                        Buka di Maps
                                    </button>
                                </div>
                            </div>

                            <div class="absolute right-0 top-28 w-1 h-12 bg-gray-700 rounded-l-lg"></div>
                            <div class="absolute right-0 top-44 w-1 h-16 bg-gray-700 rounded-l-lg"></div>
                            <div class="absolute right-0 top-64 w-1 h-16 bg-gray-700 rounded-l-lg"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </section>
</template>
<style>
@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(45deg);
    }

    50% {
        transform: translateY(-20px) rotate(45deg);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}
</style>