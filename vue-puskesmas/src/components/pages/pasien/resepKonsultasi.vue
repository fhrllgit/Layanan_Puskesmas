<template>
    <div class="h-screen">
        <div class="px-4 sm:px-6 md:px-10 h-full mt-25">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">Status Resep Konsultasi</h1>
            <div v-if="statusKonsultasi.length === 0"
                class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-gray-500 text-lg">Belum ada resep konsultasi</p>
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
                            <tr v-for="item in statusKonsultasi" :key="item.id"
                                class="hover:bg-gray-50 transition-colors duration-150">

                                <td class="px-6 py-4 whitespace-nowrap">#{{ item.id }}</td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div
                                            class="flex-shrink-0 h-10 w-10 bg-[#c8c6c6] rounded-full flex items-center justify-center">
                                            <span class="text-white font-semibold text-sm">{{
                                                item.dokter_nama?.charAt(0) || 'D' }}</span>
                                        </div>
                                        <div class="ml-3">
                                            <p class="text-sm font-medium text-gray-900">{{ item.dokter_nama }}</p>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
                                        :style="{ background: hexToRgba(colorStatus(item.status), 0.15), color: colorStatus(item.status) }">
                                        {{ fakeStatus(item.status) }}
                                    </span>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ formatDate(item.tanggal) }}
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ formatDate(item.siap_diambil_at) || "-" }}
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ getExpireRemaining(item.siap_diambil_at) }}
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <button @click="detailGet(item.id)"
                                        class="inline-flex cursor-pointer items-center px-4 py-2 bg-[#d34341] text-white rounded-lg hover:bg-[#d81714] transition">
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="lg:hidden space-y-4">
                    <div v-for="item in statusKonsultasi" :key="item.id"
                        class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md">

                        <div class="flex justify-between items-start mb-4">
                            <span class="text-sm font-bold text-gray-900">#{{ item.id }}</span>
                            <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
                                :style="{ background: hexToRgba(colorStatus(item.status), 0.15), color: colorStatus(item.status) }">
                                {{ fakeStatus(item.status) }}
                            </span>
                        </div>

                        <div class="flex items-center mb-4 pb-4 border-b border-gray-100">
                            <div
                                class="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                                <span class="text-white font-semibold">{{ item.dokter_nama.charAt(0) }}</span>
                            </div>
                            <div class="ml-3">
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Dokter</p>
                                <p class="text-sm font-semibold text-gray-900">{{ item.dokter_nama }}</p>
                            </div>
                        </div>

                        <div class="space-y-3 mb-4">
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-500 font-medium">Tanggal</span>
                                <span class="text-sm text-gray-900 font-medium">{{ formatDate(item.tanggal) }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-500 font-medium">Siap Diambil</span>
                                <span class="text-sm text-gray-900 font-medium">{{ formatDate(item.siap_diambil_at) ||
                                    "-" }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-500 font-medium">Sisa Waktu</span>
                                <span class="text-sm text-gray-900 font-medium">{{
                                    getExpireRemaining(item.siap_diambil_at) }}</span>
                            </div>
                        </div>

                        <button @click="detailGet(item.id)"
                            class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Lihat Detail Resep
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showDetail"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">

                <div class="bg-gray-100 p-4 flex justify-between items-center border-b">
                    <h2 class="text-lg font-semibold">Detail Resep #{{ detailResep.id }}</h2>
                    <button @click="closeDetail" class="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <div class="flex-1 overflow-y-auto p-6">
                    <p class="font-semibold mb-4">Ringkasan Obat</p>

                    <div class="bg-white border rounded-xl overflow-hidden">
                        <table class="w-full">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-3 py-2 text-left text-xs font-semibold">Nama Obat</th>
                                    <th class="px-3 py-2 text-left text-xs font-semibold">Dosis</th>
                                    <th class="px-3 py-2 text-left text-xs font-semibold">Jumlah</th>
                                    <th class="px-3 py-2 text-left text-xs font-semibold">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="i in itemDetail" :key="i.id" class="border-t">
                                    <td class="px-3 py-2">{{ i.nama_obat }}</td>
                                    <td class="px-3 py-2">{{ i.dosis }}</td>
                                    <td class="px-3 py-2">{{ i.jumlah }}</td>
                                    <td class="px-3 py-2">{{ i.keterangan }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 border-t">
                    <button @click="closeDetail" class="px-4 py-2 bg-gray-700 text-white rounded-lg">Tutup</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { io } from "socket.io-client";

const token = localStorage.getItem("token");
const socket = io("http://localhost:3003");
const statusKonsultasi = ref([]);
const detailResep = ref({});
const itemDetail = ref([]);
const showDetail = ref(false);

const getStatusKonsultasi = async () => {
    try {
        const res = await axios.get("http://localhost:3003/api/pasien/konsultasi/status", {
            headers: { Authorization: "Bearer " + token },
        });
        statusKonsultasi.value = res.data.data || [];
    } catch (err) {
        console.error(err);
    }
};
const detailGet = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3003/api/pasien/konsultasi/detail/${id}`, {
            headers: { Authorization: "Bearer " + token },
        });

        detailResep.value = res.data.resep;
        itemDetail.value = res.data.items;
        showDetail.value = true;
    } catch (err) {
        console.error("Detail error:", err);
    }
};

const closeDetail = () => {
    showDetail.value = false;
    detailResep.value = {};
    itemDetail.value = [];
};

const colorStatus = (status) => {
    const s = status.toLowerCase();
    if (s.includes("menunggu")) return "#9CA3AF";
    if (s.includes("siap_diambil")) return "#2563EB";
    if (s.includes("selesai")) return "#16A34A";
    if (s.includes("expired")) return "#DC2626";
    return "#9CA3AF";
};

const fakeStatus = (s) => ({
    menunggu: "Menunggu",
    siap_diambil: "Siap Diambil",
    selesai: "Selesai",
    expired: "Expired",
}[s] || s);

const hexToRgba = (hex, opacity = 0.7) => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const getExpireRemaining = (siapAt) => {
    if (!siapAt) return "-";

    const now = new Date();
    const siapDate = new Date(siapAt);
    const expireAt = new Date(siapDate.getTime() + 24 * 60 * 60 * 1000);
    const diff = expireAt - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours} jam ${minutes} menit`;
};

onMounted(() => {
    getStatusKonsultasi();
});

socket.on("resepKonsultasiStatusUpdated", (updated) => {
    const idx = statusKonsultasi.value.findIndex((i) => i.id === updated.id);
    if (idx !== -1) {
        statusKonsultasi.value[idx] = {
            ...statusKonsultasi.value[idx],
            ...updated
        };
    }
});

</script>
