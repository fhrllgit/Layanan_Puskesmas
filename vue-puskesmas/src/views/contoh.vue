<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Daftar Dokter</h2>

        <div v-if="loading">Memuat dokter...</div>
        <div v-else-if="dokter.length === 0">Tidak ada dokter.</div>

        <div v-else>
            <div v-for="d in dokter" :key="d.id" class="p-3 border rounded flex justify-between items-center mb-2">
                <div class="flex items-center gap-3">
                    <span
                        :class="['w-3 h-3 rounded-full', d.status === 'online' ? 'bg-green-500' : 'bg-gray-400']"></span>
                    <p class="font-semibold">{{ d.nama }}</p>
                </div>

                <button @click="mulaiKonsultasi(d.id)" class="bg-blue-600 text-white px-3 py-1 rounded">
                    Mulai Konsultasi
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios";

const route = useRoute();
const router = useRouter();

const poliId = route.params.id;
const dokter = ref([]);
const loading = ref(true);

onMounted(async () => {
    loading.value = true;
    try {
        const res = await axios.get(`/api/dokter/by-poli/${poliId}`);
        const dokterList = res.data.data;

        for (const d of dokterList) {
            try {
                const statusRes = await axios.get(`/api/dokter/status/${d.id}`);
                d.status = statusRes.data[0].payload.status;
            } catch (e) {
                d.status = "offline";
            }
        }

        dokter.value = dokterList;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
});

const mulaiKonsultasi = async (dokter_id) => {
    try {
        const res = await axios.post("/api/konsultasi/mulai", {
            dokter_id,
            keluhan: "-"
        });
        const konsultasi_id = res.data.konsultasi_id;
        router.push(`/pasien/chat/${konsultasi_id}`);
    } catch (err) {
        console.error(err);
    }
};
</script>
