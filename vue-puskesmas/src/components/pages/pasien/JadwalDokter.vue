<template>
    <div class="min-h-screen py-10">
        <div class="px-4 mt-15 sm:px-6 md:px-10 max-w-7xl mx-auto">
            <div class="mb-8">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d34341]/10 to-orange-400/10 border border-[#d34341]/20 mb-4 backdrop-blur-sm">
                    <div class="w-2 h-2 bg-[#d34341] rounded-full animate-pulse"></div>
                    <span
                        class="text-sm font-semibold bg-gradient-to-r from-[#d34341] to-orange-600 bg-clip-text text-transparent">
                        JADWAL PRAKTIK
                    </span>
                </div>

                <div class="flex items-center gap-4 mb-3">
                    <div
                        class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d34341] to-orange-500 flex items-center justify-center shadow-lg shadow-[#d34341]/25">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">Jadwal Dokter Hari Ini</h2>
                        <p class="text-gray-600 text-sm mt-1">{{ new Date().toLocaleDateString('id-ID', {
                            weekday:
                                'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                    </div>
                </div>
            </div>

            <div v-if="loading"
                class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div
                    class="inline-block w-8 h-8 border-4 border-[#d34341]/30 border-t-[#d34341] rounded-full animate-spin mb-3">
                </div>
                <p class="text-gray-600">Memuat jadwal...</p>
            </div>
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <p class="text-red-600 font-medium">{{ error }}</p>
                </div>
            </div>
            <div v-if="!loading && jadwal.length === 0"
                class="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
                <div class="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                        </path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Tidak Ada Jadwal</h3>
                <p class="text-gray-500">Tidak ada jadwal praktik untuk hari ini / libur.</p>
            </div>

            <div v-if="!loading && !error && jadwal.length > 0"
                class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div
                    class="bg-gradient-to-r from-[#d34341]/5 via-orange-50/50 to-transparent p-4 border-b border-gray-100">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-lg bg-[#d34341]/10 flex items-center justify-center">
                                <svg class="w-4 h-4 text-[#d34341]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500">Total Dokter Praktik</p>
                                <p class="text-lg font-bold text-gray-900">{{ jadwal.length }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gradient-to-r from-gray-50 to-gray-100/50">
                                <th
                                    class="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                    <div class="flex items-center gap-2">
                                        <span
                                            class="w-6 h-6 rounded-lg bg-[#d34341]/10 flex items-center justify-center text-[#d34341] text-xs font-bold">#</span>
                                        No
                                    </div>
                                </th>
                                <th
                                    class="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#d34341]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                            </path>
                                        </svg>
                                        Nama Dokter
                                    </div>
                                </th>
                                <th
                                    class="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#d34341]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                            </path>
                                        </svg>
                                        Poli
                                    </div>
                                </th>
                                <th
                                    class="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#d34341]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Jam Mulai
                                    </div>
                                </th>
                                <th
                                    class="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#d34341]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Jam Selesai
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in jadwal" :key="i"
                                class="group hover:bg-gradient-to-r hover:from-[#d34341]/5 hover:to-orange-50/30 transition-all duration-200 border-b border-gray-100">
                                <td class="p-4">
                                    <div
                                        class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d34341]/10 to-orange-100 flex items-center justify-center">
                                        <span class="text-sm font-bold text-[#d34341]">{{ i + 1 }}</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d34341] to-orange-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-gray-900">{{ item.nama_dokter }}</p>
                                            <p class="text-xs text-gray-500">Dokter Spesialis</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <span
                                        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#d34341]/10 text-[#d34341] text-sm font-medium">
                                        <div class="w-2 h-2 rounded-full bg-[#d34341]"></div>
                                        {{ item.nama_poli }}
                                    </span>
                                </td>
                                <td class="p-4">
                                    <div class="flex items-center gap-2">
                                        <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <span class="font-medium text-gray-900">{{ item.jam_mulai }}</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <div class="flex items-center gap-2">
                                        <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <span class="font-medium text-gray-900">{{ item.jam_selesai }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="bg-gradient-to-r from-gray-50 to-gray-100/50 p-4 border-t border-gray-200">
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                        <svg class="w-4 h-4 text-[#d34341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Jadwal dapat berubah sewaktu-waktu. Harap konfirmasi melalui pendaftaran.</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const apiUrl = "http://localhost:3003/api/pasien/jadwal/hari-ini";

const jadwal = ref([]);
const loading = ref(true);
const error = ref(null);

const getJadwalHariIni = async () => {
    loading.value = true;
    error.value = null;

    try {
        const token = localStorage.getItem("token");

        const res = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        jadwal.value = res.data.data;
    } catch (err) {
        error.value = "Gagal memuat jadwal. Pastikan Anda login.";
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getJadwalHariIni();
});
</script>

<style scoped></style>
