<template>
    <div class="h-screen">
        <div class="px-4 sm:px-6 md:px-10 h-full mt-25">
            <div @click="$router.push('/pasien/resep-konsultasi')" class="flex justify-between items-center mb-5">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">Status Obat</h1>
                <button class="flex cursor-pointer shadow-lg px-5 py-2 rounded-3xl bg-gradient-to-r bg-[#d34341] hover:bg-[#d81714] text-white text-sm font-medium">Resep Konsultasi</button>
            </div>

            <div v-if="statusObat.length === 0"
                class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-gray-500 text-lg">Belum ada antrian obat</p>
            </div>

            <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="hidden lg:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gradient-to-r from-blue-50 to-indigo-50">
                            <tr>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    ID</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Dokter</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Status</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Tanggal</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Siap Diambil</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Sisa Waktu</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="resep in statusObat" :key="resep.id"
                                class="hover:bg-gray-50 transition-colors duration-150">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm font-medium text-gray-900">#{{ resep.id }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div
                                            class="flex-shrink-0 h-10 w-10 bg-[#c8c6c6] rounded-full flex items-center justify-center">
                                            <span class="text-white font-semibold text-sm">{{
                                                resep.dokter_nama.charAt(0) }}</span>
                                        </div>
                                        <div class="ml-3">
                                            <p class="text-sm font-medium text-gray-900">{{ resep.dokter_nama }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
                                        :style="{ background: hexToRgba(colorStatus(resep.status), 0.15), color: colorStatus(resep.status) }">
                                        {{ fakeStatus(resep.status) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ formatDate(resep.tanggal) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ formatDate(resep.siap_diambil_at) || "-" }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ getExpireRemaining(resep.siap_diambil_at) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <button @click="detailGet(resep.id)"
                                        class="inline-flex cursor-pointer items-center px-4 py-2 bg-gradient-to-r bg-[#d34341] hover:bg-[#d81714] text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-150 hover:shadow-md">
                                        <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="lg:hidden space-y-4">
                    <div v-for="resep in statusObat" :key="resep.id"
                        class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">

                        <div class="flex justify-between items-start mb-4">
                            <span class="text-sm font-bold text-gray-900">#{{ resep.id }}</span>
                            <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
                                :style="{ background: hexToRgba(colorStatus(resep.status), 0.15), color: colorStatus(resep.status) }">
                                {{ fakeStatus(resep.status) }}
                            </span>
                        </div>

                        <div class="flex items-center mb-4 pb-4 border-b border-gray-100">
                            <div
                                class="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                                <span class="text-white font-semibold">{{ resep.dokter_nama.charAt(0) }}</span>
                            </div>
                            <div class="ml-3">
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Dokter</p>
                                <p class="text-sm font-semibold text-gray-900">{{ resep.dokter_nama }}</p>
                            </div>
                        </div>


                        <div class="space-y-3 mb-4">
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-500 font-medium">Tanggal</span>
                                <span class="text-sm text-gray-900 font-medium">{{ formatDate(resep.tanggal) }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-500 font-medium">Siap Diambil</span>
                                <span class="text-sm text-gray-900 font-medium">{{ formatDate(resep.siap_diambil_at) ||
                                    "-" }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-500 font-medium">Sisa Waktu</span>
                                <span class="text-sm text-gray-900 font-medium">{{
                                    getExpireRemaining(resep.siap_diambil_at) }}</span>
                            </div>
                        </div>

                        <button @click="detailGet(resep.id)"
                            class="w-full cursor-pointer inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-150 hover:shadow-md">
                            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Lihat Detail Resep
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showDetail"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">

                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-semibold text-gray-800">Detail Resep #{{ detailResep.id }}</h2>
                        <button @click="closeDetail" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto px-6 py-5">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                            <p class="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Pasien</p>
                            <p class="text-sm font-semibold text-gray-800">{{ detailResep.pasien_nama }}</p>
                        </div>
                        <div
                            class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
                            <p class="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">Dokter</p>
                            <p class="text-sm font-semibold text-gray-800">{{ detailResep.dokter_nama }}</p>
                        </div>

                        <div
                            class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                            <p class="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">Status</p>
                            <p class="text-sm font-semibold text-gray-800">{{ detailResep.status }}</p>
                        </div>
                    </div>

                    <div class="mb-4">
                        <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Ringkasan Obat
                        </h3>
                        <div
                            class="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                            <table class="w-full">
                                <thead>
                                    <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Nama Obat</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Dosis</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Jumlah</th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    <tr v-for="obat in itemDetail" :key="obat.nama_obat"
                                        class="hover:bg-blue-50 transition-colors">
                                        <td class="px-4 py-3 text-sm text-gray-800 font-medium">{{ obat.nama_obat }}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-gray-600">{{ obat.dosis }}</td>
                                        <td class="px-4 py-3 text-sm text-gray-600">{{ obat.jumlah }}</td>
                                        <td class="px-4 py-3 text-sm text-gray-600">{{ obat.keterangan }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="md:hidden space-y-3">
                            <div v-for="obat in itemDetail" :key="obat.nama_obat"
                                class="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 shadow-sm">

                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex-1">
                                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Nama
                                            Obat</p>
                                        <p class="text-sm font-semibold text-gray-800">{{ obat.nama_obat }}</p>
                                    </div>
                                    <div class="ml-3 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">
                                        {{ obat.jumlah }}x
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                                    <div>
                                        <p class="text-xs text-gray-500 font-medium mb-1">Dosis</p>
                                        <p class="text-sm text-gray-800 font-medium">{{ obat.dosis }}</p>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500 font-medium mb-1">Keterangan</p>
                                        <p class="text-sm text-gray-800">{{ obat.keterangan }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div class="flex justify-end">
                        <button @click="closeDetail"
                            class="px-6 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all duration-150 hover:shadow-md flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { io } from "socket.io-client";

const statusObat = ref([]);
const detailResep = ref([])
const itemDetail = ref([])
const showDetail = ref(false)
const token = localStorage.getItem("token")
const socket = io("http://localhost:3003");


const getStatusObat = async () => {
    try {
        const res = await axios.get("http://localhost:3003/api/pasien/status-obat", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        statusObat.value = res.data.data || [];
    } catch (err) {
        console.error(err);
    }
};

const detailGet = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3003/api/pasien/resep/${id}/detail`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        detailResep.value = res.data.resep
        itemDetail.value = res.data.items
        showDetail.value = true
    } catch (e) {
        console.log("Error get detail resep" + e)
    }
}

const closeDetail = () => {
    showDetail.value = false
    detailResep.value = {}
    itemDetail.value = []
}

socket.on("resepStatusUpdated", (updatedResep) => {
    console.log("real status data:", updatedResep);
    const index = statusObat.value.findIndex(r => r.id === updatedResep.id);
    if (index !== -1) {
        statusObat.value[index].status = updatedResep.status;
        statusObat.value[index].siap_diambil_at = updatedResep.siap_diambil_at;
    } else if (updatedResep.pasien_id === parseInt(localStorage.getItem("userId"))) {
        statusObat.value.unshift(updatedResep);
    }
});

const getExpireRemaining = (siapAt) => {
    if (!siapAt) return "None";

    const now = new Date();
    const siapDate = new Date(siapAt);
    const expireDate = new Date(siapDate.getTime() + 24 * 60 * 60 * 1000);
    const diff = expireDate - now;

    if (diff <= 0) return "Sudah expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} jam ${minutes} menit lagi`;
};


const colorStatus = (status) => {
    const s = status.toLowerCase();
    if (s.includes("menunggu")) return "#9CA3AF";
    if (s.includes("siap_diambil")) return "#2563EB";
    if (s.includes("selesai")) return "#16A34A";
    if (s.includes("tidak_tersedia")) return "#EA580C";
    if (s.includes("expired")) return "#DC2626";
    return "#9CA3AF";
};

const fakeStatus = (status) => {
    const map = {
        menunggu: "Menunggu",
        siap_diambil: "Siap Diambil",
        selesai: "Selesai",
        tidak_tersedia: "Tidak Tersedia",
        expired: "Expried"
    }
    return map[status] || status
}


const hexToRgba = (hex, opacity = 0.7) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const formatDate = (date) => {
    if (!date) return "-";
    const parsed = new Date(date);
    if (isNaN(parsed)) return "-";

    return parsed.toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};
onMounted(() => {
    getStatusObat();
});

setInterval(() => {
    statusObat.value = [...statusObat.value];
}, 10000); 
</script>
