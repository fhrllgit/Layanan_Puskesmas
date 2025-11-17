<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Jadwal Minggu Ini</h2>
        <div v-if="loading" class="text-gray-500">Memuat jadwal...</div>
        <div v-else-if="jadwal.length === 0" class="text-red-600">
            Tidak ada jadwal untuk akun dokter ini.
        </div>
        <div v-else class="space-y-4">
            <div v-for="(item, i) in jadwal" :key="i" class="p-4 border rounded-xl shadow-sm bg-white">
                <div class="font-semibold text-lg text-blue-700">
                    {{ item.hari }}
                </div>
                <div class="text-gray-700">
                    Poli: <span class="font-semibold">{{ item.nama_poli }}</span>
                </div>
                <div class="text-gray-700">
                    Jam: {{ formatJam(item.jam_mulai) }} - {{ formatJam(item.jam_selesai) }}
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

<style></style>
