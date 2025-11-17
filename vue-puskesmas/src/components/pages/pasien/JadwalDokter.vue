<template>
    <div class="h-screen">
        <div class="px-4 sm:px-6 md:px-10 h-full mt-25">
            <h2 class="text-2xl font-bold mb-4">Jadwal Dokter Hari Ini</h2>
            <div v-if="loading" class="text-gray-600">Memuat jadwal...</div>
            <div v-if="error" class="text-red-600">{{ error }}</div>
            <div v-if="!loading && jadwal.length === 0" class="text-gray-500">
                Tidak ada jadwal untuk hari ini / libur.
            </div>
            <table class="w-full mt-4 border-collapse">
                <thead>
                    <tr class="bg-gray-100 text-left">
                        <th class="p-3 border">No</th>
                        <th class="p-3 border">Nama Dokter</th>
                        <th class="p-3 border">Poli</th>
                        <th class="p-3 border">Jam Mulai</th>
                        <th class="p-3 border">Jam Selesai</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in jadwal" :key="i" class="hover:bg-gray-50">
                        <td class="p-3 border">{{ i + 1 }}</td>
                        <td class="p-3 border font-medium">{{ item.nama_dokter }}</td>
                        <td class="p-3 border">{{ item.nama_poli }}</td>
                        <td class="p-3 border">{{ item.jam_mulai }}</td>
                        <td class="p-3 border">{{ item.jam_selesai }}</td>
                    </tr>
                </tbody>
            </table>
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
