<template>
    <div class="p-5">
        <h1 class="text-2xl font-bold mb-4">Daftar Resep Menunggu / Siap Diambil</h1>

        <table class="min-w-full border border-gray-300">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border px-3 py-2">ID</th>
                    <th class="border px-3 py-2">Pasien</th>
                    <th class="border px-3 py-2">Dokter</th>
                    <th class="border px-3 py-2">Status</th>
                    <th class="border px-3 py-2">Tanggal</th>
                    <th class="border px-3 py-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="resep in resepList" :key="resep.id">
                    <td class="border px-3 py-2">{{ resep.id }}</td>
                    <td class="border px-3 py-2">{{ resep.pasien_nama }}</td>
                    <td class="border px-3 py-2">{{ resep.dokter_nama }}</td>
                    <td class="border px-3 py-2">
                        <span :class="{
                            'text-gray-500': resep.status === 'menunggu',
                            'text-blue-600': resep.status === 'siap_diambil',
                            'text-green-600': resep.status === 'selesai',
                            'text-red-600': resep.status === 'tidak_tersedia',
                            'text-yellow-600': resep.status === 'expired'
                        }">
                            {{ resep.status }}
                        </span>
                    </td>
                    <td class="border px-3 py-2">{{ resep.tanggal }}</td>
                    <td class="border px-3 py-2">
                        <button @click="lihatDetail(resep.id)" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                            Detail
                        </button>

                        <button v-if="resep.status === 'menunggu'" @click="updateStatus(resep.id, 'siap_diambil')"
                            class="bg-purple-500 text-white px-2 py-1 rounded mr-2">
                            Siap Diambil
                        </button>

                        <button v-if="resep.status === 'siap_diambil'" @click="updateStatus(resep.id, 'selesai')"
                            class="bg-green-500 text-white px-2 py-1 rounded mr-2">
                            Selesai
                        </button>

                        <button v-if="resep.status === 'menunggu'" @click="updateStatus(resep.id, 'tidak_tersedia')"
                            class="bg-red-500 text-white px-2 py-1 rounded">
                            Tidak Tersedia
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal Detail Obat -->
        <div v-if="showDetail" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div class="bg-white p-5 rounded shadow-lg w-96">
                <h2 class="text-xl font-bold mb-3">Detail Resep ID: {{ detailResep.id }}</h2>
                <p><strong>Pasien:</strong> {{ detailResep.pasien_nama }}</p>
                <p><strong>Dokter:</strong> {{ detailResep.dokter_nama }}</p>
                <p><strong>Status:</strong> {{ detailResep.status }}</p>

                <h3 class="font-semibold mt-3">Daftar Obat:</h3>
                <ul class="list-disc ml-5">
                    <li v-for="item in detailItems" :key="item.id">
                        {{ item.nama_obat }} - Dosis: {{ item.dosis }}, Jumlah: {{ item.jumlah }}, Keterangan: {{
                            item.keterangan }}
                    </li>
                </ul>

                <button @click="closeDetail" class="mt-3 bg-gray-500 text-white px-3 py-1 rounded">Tutup</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { io } from "socket.io-client"
import Swal from "sweetalert2";

// =====================
// State
// =====================
const resepList = ref([]);
const detailResep = ref({});
const detailItems = ref([]);
const showDetail = ref(false);
const socket = io("http://localhost:3003")


socket.on("resepStatusUpdated", (data) => {
    console.log("Resep diperbarui:", data);
    const index = resepList.value.findIndex(r => r.id === data.id);
    if (index !== -1) {
        resepList.value[index].status = data.status;
        resepList.value[index].apoteker_id = data.apoteker_id;
    }
});

const getResep = async () => {
    try {
        const res = await axios.get("http://localhost:3003/api/apoteker/resep", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        resepList.value = res.data;
    } catch (err) {
        console.error(err);
    }
};

const lihatDetail = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3003/api/apoteker/resep/${id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
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
            `http://localhost:3003/api/apoteker/resep/${id}/status`,
            { status },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        );

        // Pesan sukses
        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: `Status resep berhasil diubah menjadi "${status}"`,
            timer: 1500,
            showConfirmButton: false
        });

        getResep(); // refresh daftar
    } catch (err) {
        console.error(err);
        // Pesan error
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

<style scoped>
/* optional styling */
</style>
