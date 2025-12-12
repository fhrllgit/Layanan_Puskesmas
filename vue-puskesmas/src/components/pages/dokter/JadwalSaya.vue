<template>
    <div class="p-4 sm:p-6 lg:p-8 mt-15 min-h-screen">
        <div class="max-w-4xl mx-auto">
            <div class="mb-8">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                    Jadwal Minggu Ini
                </h2>
                <p class="text-gray-600">Lihat jadwal praktik dokter untuk minggu ini</p>
            </div>
            <div v-if="loading" class="flex items-center justify-center py-12">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#d34341] mb-4">
                    </div>
                    <p class="text-gray-600 font-medium">Memuat jadwal...</p>
                </div>
            </div>

            <div v-else-if="jadwal.length === 0" class="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-10 h-10 text-[#d34341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Tidak Ada Jadwal</h3>
                <p class="text-gray-600">Tidak ada jadwal untuk akun dokter ini.</p>
            </div>

            <div v-else class="grid gap-4 sm:gap-6">
                <div v-for="(item, i) in jadwal" :key="i"
                    class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-300">
                    <div class="bg-gradient-to-r from-[#d34341] to-[#b83331] px-6 py-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="text-xl sm:text-2xl font-bold text-white">
                                    {{ item.hari }}
                                </h3>
                            </div>
                            <div class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span class="text-white text-sm font-medium">Aktif</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 space-y-4">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-[#d34341]" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-gray-500 mb-1">Poliklinik</p>
                                <p class="text-lg font-semibold text-gray-800">{{ item.nama_poli }}</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-gray-500 mb-1">Jam Praktik</p>
                                <div class="flex items-center space-x-2">
                                    <span class="text-lg font-semibold text-gray-800">
                                        {{ formatJam(item.jam_mulai) }}
                                    </span>
                                    <span class="text-gray-400">—</span>
                                    <span class="text-lg font-semibold text-gray-800">
                                        {{ formatJam(item.jam_selesai) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4 border-t border-gray-100">
                            <div
                                class="inline-flex items-center space-x-2 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 rounded-lg">
                                <svg class="w-4 h-4 text-[#d34341]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="text-sm font-medium text-gray-700">
                                    Durasi Praktik
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3003/api",
});

const jadwal = ref([]);
const loading = ref(true);
const formatJam = (time) => {
    if (!time) return "";
    return time.slice(0, 5);
};

const getJadwal = async () => {
    try {
        const res = await api.get("/dokter/jadwal-saya", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        jadwal.value = res.data.jadwal;
    } catch (err) {
        console.error("Gagal mengambil jadwal:", err.response || err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getJadwal();
});
</script>

