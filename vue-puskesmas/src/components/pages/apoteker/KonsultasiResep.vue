<template>
    <div class="w-full">
        <div class="w-[67rem] mx-auto">
            <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                    <span class="bg-gradient-to-r from-[#d34341] to-[#b83735] bg-clip-text text-transparent">
                        Daftar Resep Konsultasi
                    </span>
                </h1>
                <p class="text-gray-600">Kelola resep dari konsultasi pasien</p>
            </div>
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div class="hidden scrollbar-hide lg:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gradient-to-r from-[#d34341] to-[#b83735]">
                            <tr>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    ID</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Pasien</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Dokter</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Status</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Tanggal</th>
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="resep in resepList" :key="resep.id"
                                class="hover:bg-red-50 transition-colors duration-150">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    #{{ resep.id }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div
                                            class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#d34341] to-[#b83735] rounded-full flex items-center justify-center">
                                            <span class="text-white font-semibold">{{ resep.pasien_nama.charAt(0)
                                                }}</span>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">{{ resep.pasien_nama }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ resep.dokter_nama }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="{
                                        'bg-[#d34341] text-white': resep.status === 'menunggu',
                                        'bg-blue-100 text-blue-700': resep.status === 'siap_diambil',
                                        'bg-green-100 text-green-700': resep.status === 'selesai',
                                        'bg-red-100 text-red-700': resep.status === 'tidak_tersedia',
                                        'bg-yellow-100 text-yellow-700': resep.status === 'expired'
                                    }" class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                                        {{ resep.status.replace('_', ' ').toUpperCase() }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ formatDate(resep.tanggal) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div class="flex gap-2">
                                        <button @click="lihatDetail(resep.id)"
                                            class="inline-flex cursor-pointer items-center px-3 py-1.5 bg-[#d34341] hover:bg-[#b83735] text-white text-xs font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Detail
                                        </button>
                                        <button v-if="resep.status === 'menunggu'"
                                            @click="updateStatus(resep.id, 'siap_diambil')"
                                            class="inline-flex items-center px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7" />
                                            </svg>
                                            Siap Diambil
                                        </button>
                                        <button v-if="resep.status === 'siap_diambil'"
                                            @click="updateStatus(resep.id, 'selesai')"
                                            class="inline-flex items-center px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Selesai
                                        </button>
                                        <button v-if="resep.status === 'menunggu'"
                                            @click="updateStatus(resep.id, 'tidak_tersedia')"
                                            class="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Tidak Tersedia
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="lg:hidden p-4 space-y-4">
                    <div v-for="resep in resepList" :key="resep.id"
                        class="bg-gradient-to-br from-white to-red-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 border border-gray-100">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-[#d34341] to-[#b83735] rounded-full flex items-center justify-center shadow-md">
                                    <span class="text-white font-bold text-lg">{{ resep.pasien_nama.charAt(0) }}</span>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm font-semibold text-gray-600">ID: #{{ resep.id }}</p>
                                    <p class="text-lg font-bold text-gray-900">{{ resep.pasien_nama }}</p>
                                </div>
                            </div>
                            <span :class="{
                                'bg-[#d34341] text-white': resep.status === 'menunggu',
                                'bg-blue-100 text-blue-700': resep.status === 'siap_diambil',
                                'bg-green-100 text-green-700': resep.status === 'selesai',
                                'bg-red-100 text-red-700': resep.status === 'tidak_tersedia',
                                'bg-yellow-100 text-yellow-700': resep.status === 'expired'
                            }" class="px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap">
                                {{ resep.status.replace('_', ' ').toUpperCase() }}
                            </span>
                        </div>

                        <div class="space-y-2 mb-4">
                            <div class="flex items-center text-sm text-gray-600">
                                <svg class="w-4 h-4 mr-2 text-[#d34341]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span class="font-medium">Dokter:</span>
                                <span class="ml-1">{{ resep.dokter_nama }}</span>
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <svg class="w-4 h-4 mr-2 text-[#d34341]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span class="font-medium">Tanggal:</span>
                                <span class="ml-1">{{ formatDate(resep.tanggal) }}</span>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <button @click="lihatDetail(resep.id)"
                                class="flex-1 min-w-[120px] inline-flex items-center justify-center px-3 py-2 bg-[#d34341] hover:bg-[#b83735] text-white text-sm font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Detail
                            </button>
                            <button v-if="resep.status === 'menunggu'" @click="updateStatus(resep.id, 'siap_diambil')"
                                class="flex-1 min-w-[120px] inline-flex items-center justify-center px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                Siap Diambil
                            </button>
                            <button v-if="resep.status === 'siap_diambil'" @click="updateStatus(resep.id, 'selesai')"
                                class="flex-1 min-w-[120px] inline-flex items-center justify-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Selesai
                            </button>
                            <button v-if="resep.status === 'menunggu'" @click="updateStatus(resep.id, 'tidak_tersedia')"
                                class="flex-1 min-w-[120px] inline-flex items-center justify-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Tidak Tersedia
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showDetail"
                class="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn">
                <div
                    class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp">
                    <div class="bg-gradient-to-r from-[#d34341] to-[#b83735] px-6 py-4">
                        <h2 class="text-2xl font-bold text-white">Detail Resep Konsultasi #{{ detailResep.id }}</h2>
                    </div>
                    <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <div class="space-y-4 mb-6">
                            <div class="flex items-start p-4 bg-red-50 rounded-lg">
                                <div
                                    class="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-[#d34341] to-[#b83735] rounded-full flex items-center justify-center shadow-md">
                                    <span class="text-white font-bold text-lg">{{ detailResep.pasien_nama.charAt(0)
                                        }}</span>
                                </div>
                                <div class="ml-4 flex-1">
                                    <p class="text-sm text-gray-600 font-medium">Pasien</p>
                                    <p class="text-lg font-bold text-gray-900">{{ detailResep.pasien_nama }}</p>
                                </div>
                            </div>

                            <div class="flex items-start p-4 bg-rose-50 rounded-lg">
                                <svg class="w-6 h-6 text-[#d34341] mt-1" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <div class="ml-4 flex-1">
                                    <p class="text-sm text-gray-600 font-medium">Dokter</p>
                                    <p class="text-lg font-semibold text-gray-900">{{ detailResep.dokter_nama }}</p>
                                </div>
                            </div>

                            <div class="flex items-start p-4 bg-red-50 rounded-lg">
                                <svg class="w-6 h-6 text-[#d34341] mt-1" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div class="ml-4 flex-1">
                                    <p class="text-sm text-gray-600 font-medium">Status</p>
                                    <span :class="{
                                        'bg-[#d34341] text-white': detailResep.status === 'menunggu',
                                        'bg-blue-100 text-blue-700': detailResep.status === 'siap_diambil',
                                        'bg-green-100 text-green-700': detailResep.status === 'selesai',
                                        'bg-red-100 text-red-700': detailResep.status === 'tidak_tersedia',
                                        'bg-yellow-100 text-yellow-700': detailResep.status === 'expired'
                                    }" class="inline-block mt-1 px-3 py-1 text-sm font-semibold rounded-full">
                                        {{ detailResep.status.replace('_', ' ').toUpperCase() }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="border-t pt-4">
                            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-[#d34341]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Daftar Obat
                            </h3>
                            <div class="space-y-3">
                                <div v-for="(item, index) in detailItems" :key="item.id"
                                    class="p-4 bg-gradient-to-br from-gray-50 to-red-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-150">
                                    <div class="flex items-start">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-[#d34341] text-white rounded-full flex items-center justify-center font-bold text-sm">
                                            {{ index + 1 }}
                                        </div>
                                        <div class="ml-3 flex-1">
                                            <p class="font-bold text-gray-900 text-lg">{{ item.nama_obat }}</p>
                                            <div class="mt-2 space-y-1">
                                                <p class="text-sm text-gray-700">
                                                    <span class="font-semibold text-[#d34341]">Dosis:</span> {{
                                                    item.dosis }}
                                                </p>
                                                <p class="text-sm text-gray-700">
                                                    <span class="font-semibold text-[#d34341]">Jumlah:</span> {{
                                                    item.jumlah }}
                                                </p>
                                                <p class="text-sm text-gray-700">
                                                    <span class="font-semibold text-[#d34341]">Keterangan:</span> {{
                                                    item.keterangan }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-6 py-4 flex justify-end border-t">
                        <button @click="closeDetail"
                            class="inline-flex cursor-pointer items-center px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-150 shadow-sm hover:shadow-md">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import Swal from "sweetalert2";

const resepList = ref([]);
const detailResep = ref({});
const detailItems = ref([]);
const showDetail = ref(false);
const socket = io("http://localhost:3003");

socket.on("resepKonsultasiStatusUpdated", (data) => {
    console.log("Realtime diterima:", data);

    const index = resepList.value.findIndex(r => r.id === data.id);
    if (index !== -1) {
        resepList.value[index].status = data.status;
    }
});

const getResep = async () => {
    try {
        const res = await axios.get(
            "http://localhost:3003/api/apoteker/resep-konsultasi",
            {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }
        );
        resepList.value = res.data;
    } catch (err) {
        console.error(err);
    }
};

const formatDate = (dateStr) => {
  if (!dateStr || dateStr === "-") return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
};

const lihatDetail = async (id) => {
    try {
        const res = await axios.get(
            `http://localhost:3003/api/apoteker/resep-konsultasi/${id}`,
            {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }
        );
        detailResep.value = res.data.resep;
        detailItems.value = res.data.items;
        showDetail.value = true;

    } catch (err) {
        console.error(err);
    }
};

const closeDetail = () => {
    showDetail.value = false;
    detailResep.value = {};
    detailItems.value = [];
};

const updateStatus = async (id, status) => {
    try {
        await axios.patch(
            `http://localhost:3003/api/apoteker/resep-konsultasi/${id}/status`,
            { status },
            {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }
        );

        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: `Status resep diubah menjadi "${status}"`,
            timer: 1500,
            showConfirmButton: false
        });

        getResep();

    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: err.response?.data?.msg || "Terjadi kesalahan",
        });
    }
};

onMounted(() => {
    getResep();
});
</script>
