<template>
    <div class="min-h-screen bg-white p-4 flex md:px-6 w-full">
        <div class="w-full mt-15">
            <div class="mb-12">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-1 h-8 bg-gradient-to-b from-red-500 to-red-400 rounded-full"></div>
                    <h1
                        class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                </div>
                <p class="text-gray-500 ml-7 text-sm tracking-wide">
                    Selamat datang kembali, Monitor aktivitas konsultasi Anda
                </p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 w-full">
                <div
                    class="relative group overflow-hidden bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-400 transition-all duration-500 w-full">
                    <div class="absolute inset-0 bg-red-400/5 opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-6">
                            <div
                                class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-400/20">
                                <Users class="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold text-black">{{ totalPasien }}</div>
                            <div class="text-xs text-gray-500 uppercase">Pasien Hari Ini</div>
                        </div>
                    </div>
                </div>

                <div class="relative group overflow-hidden bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 transition-all duration-500">
                    <div class="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-6">
                            <div
                                class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-300/30">
                                <Calendar class="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold text-black">{{ konsulToday }}</div>
                            <div class="text-xs text-gray-500 uppercase">Total Konsultasi</div>
                        </div>
                    </div>
                </div>

                <div class="relative group overflow-hidden bg-white rounded-2xl p-6 border border-gray-200 hover:border-amber-400 transition-all duration-500">
                    <div class="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-6">
                            <div
                                class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-300/30">
                                <Clock class="w-6 h-6 text-white" />
                            </div>
                            <!-- <Sparkles class="w-4 h-4 text-amber-600" /> -->
                        </div>
                        <div>
                            <div class="text-xs text-gray-500 uppercase">Jadwal Tertunda</div>
                        </div>
                    </div>
                </div>

                <div class="relative group overflow-hidden bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-400 transition-all duration-500">
                    <div class="absolute inset-0 bg-emerald-300/10 opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-6">
                            <div
                                class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-300/30">
                                <TrendingUp class="w-6 h-6 text-white" />
                            </div>
                            <!-- <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div> -->
                        </div>
                        <div>
                            <div class="text-xs text-gray-500 uppercase">Selesai Hari Ini</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid lg:grid-cols-3 gap-6 w-full">
                <div class="lg:col-span-2 bg-white rounded-3xl border border-gray-200 p-8 w-full">
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <h2 class="text-2xl font-bold">Kontrol Konsultasi</h2>
                            <p class="text-gray-500 text-sm">Kelola ketersediaan layanan Anda</p>
                        </div>
                        <div
                            :class="status === 'online'
                                ? 'px-5 py-2 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600 border border-emerald-300'
                                : 'px-5 py-2 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-300'">
                            {{ status === 'online' ? 'ONLINE' : 'OFFLINE' }}
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-8">
                        <div class="rounded-xl p-4 border border-gray-200 bg-gray-50">
                            <div class="text-gray-500 text-xs mb-1">JAM PRAKTIK</div>
                            <div v-if="jadwalToday.length" class="font-bold text-black text-lg">
                                {{ formatJam(jadwalToday[0].jam_mulai) }} - {{ formatJam(jadwalToday[0].jam_selesai) }}
                            </div>
                        </div>

                        <div class="rounded-xl p-4 border border-gray-200 bg-gray-50">
                            <div class="text-gray-500 text-xs mb-1">DURASI</div>
                            <div v-if="jadwalToday.length" class="font-bold text-black text-lg">
                                {{ getDurasi(jadwalToday[0].jam_mulai, jadwalToday[0].jam_selesai) }}
                            </div>
                        </div>
                        <div class="rounded-xl p-4 border border-gray-200 bg-gray-50">
                            <div class="text-gray-500 text-xs mb-1">SLOT TERSEDIA</div>
                            <div class="font-bold text-black text-lg">4 slot</div>
                        </div>
                    </div>

                    <!-- buat fitur aktif/non chat -->
                    <button @click="toggleStatus"
                        class="group cursor-pointer w-full rounded-xl py-5 px-6 font-bold text-white transition"
                        :class="status === 'online'
                            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl hover:shadow-red-400/30'
                            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-xl hover:shadow-emerald-400/30'">
                        <span class="flex items-center justify-center gap-2">
                            {{ status === 'online' ? 'NONAKTIFKAN KONSULTASI' : 'AKTIFKAN KONSULTASI' }}
                            <ChevronRight class="w-5 h-5" />
                        </span>
                    </button>

                    <div v-if="status === 'offline'" class="mt-6 p-4 bg-amber-100 border border-amber-300 rounded-xl">
                        <p class="text-amber-700 text-sm flex items-center gap-2">
                            <Sparkles class="w-4 h-4" />
                            Konsultasi dinonaktifkan. Pasien tidak dapat konsultasi pada hari ini.
                        </p>
                    </div>
                </div>

                <div class="bg-white rounded-3xl border border-gray-200 p-6 w-full">
                    <h3 class="text-lg font-bold text-black mb-6">Jadwal Mendatang</h3>

                    <div class="space-y-3">
                        <div v-for="item in jadwalNext" :key="item.id"
                            class="cursor-pointer group p-4 rounded-xl border border-gray-200 bg-gray-50 hover:border-red-400 transition">
                            <div class="flex items-center justify-between mb-2">
                                <span class="font-semibold text-black text-sm">{{ item.nama_dokter }}</span>
                                <span class="text-xs text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full">
                                    {{ item.jam_mulai }}
                                </span>
                            </div>
                            <div class="text-xs text-gray-500">{{ item.nama_poli }}</div>
                            <div class="text-xs text-gray-500">{{ item.hari }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Users, Calendar, TrendingUp, Clock, ChevronRight, Sparkles, UserRound } from "lucide-vue-next";
import { useChatStore } from "@/stores/chat";
import axios from "axios";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const dokterId = user?.id;
const konsulToday = ref([])
const jadwalNext = ref([]);
const jadwalToday = ref([]);
const status = ref("");
const loading = ref(true);
const antrian = ref(0)
const totalPasien = computed(() => antrian.value.length)
const api = axios.create({ baseURL: "http://localhost:3003/api" });


const totalToday = async () => {
    try {
        const res = await axios.get(`http://localhost:3003/api/konsultasi/total-hari-ini/${dokterId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        konsulToday.value = res.data.total
    } catch (e) {
        console.log(e)

    }
}

const getStatus = async () => {
    const res = await axios.get("http://localhost:3003/api/dokter/status-saya", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    status.value = res.data.status;
};

const toggleStatus = async () => {
    const newStatus = status.value === "online" ? "offline" : "online";

    try {
        await axios.put(
            "http://localhost:3003/api/dokter/status",
            { status: newStatus },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        status.value = newStatus;
    } catch (e) {
        console.log("Gagal update:", e);
    }
};

const getJadwalHariIni = async () => {
    try {
        const res = await api.get("/dokter/jadwal-saya/hari-ini", {
            headers: { Authorization: `Bearer ${token}` }
        });
        jadwalToday.value = res.data.jadwal;
    } catch (err) {
        console.error("Gagal mengambil jadwal hari ini:", err.response || err);
    }
};

const getJadwalNext = async () => {
    const res = await api.get("/dokter/jadwal-saya/setelah-hari-ini", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    jadwalNext.value = res.data.jadwal;
};

const fetchAntrian = async () => {
    try {
        const res = await api.get("/dokter/antrian", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        antrian.value = res.data.data;
    } catch (err) {
        console.error("Gagal ambil antrian:", err);
    }
};

const getDurasi = (mulai, selesai) => {
    if (!mulai || !selesai) return "";

    const [hMulai, mMulai] = mulai.split(":").map(Number);
    const [hSelesai, mSelesai] = selesai.split(":").map(Number);
    const totalMulai = hMulai * 60 + mMulai;
    const totalSelesai = hSelesai * 60 + mSelesai;
    let selisih = totalSelesai - totalMulai;

    if (selisih < 0) selisih += 24 * 60;

    const jam = Math.floor(selisih / 60);
    return `${jam} jam`;
};

const formatJam = (time) => {
    if (!time) return "";
    return time.slice(0, 5);
};

onMounted(() => {
    fetchAntrian()
    totalToday()
    getJadwalHariIni()
    getJadwalNext()
    getStatus()
})
</script>

