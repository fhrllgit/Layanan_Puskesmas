<template>
    <div class="h-screen">
        <div class="px-4 sm:px-6 md:px-10 mt-25">
            <h2 class="text-4xl font-semibold mb-5">Antrian Sekarang</h2>
            <div v-if="loading" class="text-gray-500">Memuat data...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else>
                <div class="flex flex-wrap gap-8">
                    <div v-for="poli in antrianList" :key="poli.poli_id"
                        class="bg-white flex flex-1/3 h-50 flex-col rounded-xl shadow-lg overflow-hidden">
                        <div class="p-3">
                            <p class="text-lg font-semibold">{{ poli.nama_poli }}</p>
                        </div>
                        <div class="flex mt-1 flex-col justify-between h-full items-center">
                            <div class="flex justify-center items-center gap-1 flex-col">
                                <P class="text-xs text-[#757575]">Nomor Antrian</P>
                                <p class="text-5xl font-extrabold">{{ poli.nomor_antrian ?? "-" }}</p>
                            </div>
                            <div class="w-full bg-[#c9c9c962] py-1.5 text-center">
                                <p class="text-sm">{{ poli.nama_pasien ?? "Belum ada pasien dipanggil" }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const antrianList = ref([]);
const loading = ref(false);
const error = ref("");

const api_url = "http://localhost:3003/api/antrian";
const socket_url = "http://localhost:3003";
const token = localStorage.getItem("token");

const getAntrianSekarang = async () => {
    loading.value = true;
    try {
        const res = await axios.get(`${api_url}/sekarang`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        antrianList.value = res.data.data || [];
    } catch (err) {
        console.error(err);
        error.value = err.response?.data?.message || "Gagal memuat data antrian";
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: error.value,
        });
    } finally {
        loading.value = false;
    }
};

const socket = io(socket_url, { auth: { token } });
onMounted(() => {
    getAntrianSekarang();

    socket.on("antrian:update", (data) => {
        console.log("Realtime data diterima:", data);

        if (Array.isArray(data)) {
            antrianList.value = data.map((item) => ({
                poli_id: item.poli_id,
                nama_poli: item.nama_poli,
                nomor_antrian: item.nomor_antrian,
                nama_pasien: item.nama_pasien,
            }));
        } else {
            const index = antrianList.value.findIndex(
                (p) => p.poli_id === data.poli_id
            );
            if (index !== -1) {
                antrianList.value[index] = data;
            } else {
                antrianList.value.push(data);
            }
        }
    });
});

onUnmounted(() => {
    socket.disconnect();
});

onUnmounted(() => {
    socket.disconnect();
});
</script>
