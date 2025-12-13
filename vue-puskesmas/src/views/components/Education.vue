<template>
    <section class="relative py-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50/30 overflow-hidden">
        <div
            class="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white via-white/70 to-transparent z-20">
        </div>
        <div
            class="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/70 to-transparent z-20">
        </div>
        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute top-10 -left-10 w-72 h-72 bg-gradient-to-br from-[#039BE5]/10 to-cyan-400/10 rounded-full blur-3xl">
            </div>
        </div>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-12">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#039BE5]/10 to-cyan-400/10 rounded-full mb-4 border border-[#039BE5]/20">
                    <div class="w-2 h-2 bg-[#039BE5] rounded-full animate-pulse"></div>

                    <span
                        class="text-sm font-semibold bg-gradient-to-r from-[#039BE5] to-cyan-600 bg-clip-text text-transparent">
                        SISMA EDUCATION
                    </span>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                    Edukasi
                    <span class="bg-gradient-to-r from-[#039BE5] to-cyan-500 bg-clip-text text-transparent">
                        Kesehatan
                    </span>
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Tingkatkan pengetahuan kesehatan Anda dan keluarga dengan artikel berbasis riset medis terkini
                </p>
                <div class="flex justify-center gap-4 flex-wrap mb-10">
                    <div v-for="(stat, idx) in stats" :key="idx"
                        class="flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div
                            :class="`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`">
                            <component :is="stat.icon" class="w-4 h-4 text-white" />
                        </div>
                        <div class="text-left">
                            <div class="text-xl font-bold text-gray-900">{{ stat.value }}</div>
                            <div class="text-xs text-gray-500">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center gap-2.5 mb-10 flex-wrap">
                <button v-for="btn in buttons" :key="btn.id" @click="selectPoli(btn.id)"
                    class="px-5 py-2.5 rounded-xl cursor-pointer font-medium transition-all duration-300 flex items-center gap-2"
                    :class="selected === btn.id
                        ? 'bg-gradient-to-r from-[#039BE5] to-[#0288D1] text-white shadow-lg shadow-[#039BE5]/25 scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'">
                    <component :is="btn.icon" class="w-4 h-4" />
                    <span class="text-sm">{{ btn.name }}</span>
                </button>
            </div>

            <div v-if="loading" class="text-center py-12">
                <div
                    class="inline-block w-8 h-8 border-4 border-[#039BE5]/30 border-t-[#039BE5] rounded-full animate-spin">
                </div>
                <p class="text-gray-500 mt-3">Memuat artikel...</p>
            </div>

            <div v-else class="flex justify-center items-center">
                <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-7xl mx-auto place-content-center">
                    <div v-for="b in filteredBerita" :key="b.id"
                        class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#039BE5]/30">
                        <div class="relative h-44 bg-gradient-to-br from-[#039BE5]/5 to-cyan-50 overflow-hidden">
                            <div
                                class="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-semibold text-[#039BE5] shadow-sm">
                                {{ b.nama_poli }}
                            </div>
                            <img v-if="b.gambar" :src="`http://localhost:3003/uploads/tmp/${b.gambar}`"
                                alt="gambar berita"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <div class="text-5xl opacity-30">🩺</div>
                            </div>
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            </div>
                        </div>
                        <div class="p-5">
                            <p class="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                    </path>
                                </svg>
                                {{ new Date(b.tanggal).toLocaleDateString("id-ID") }}
                            </p>
                            <h3
                                class="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#039BE5] transition-colors line-clamp-2 leading-snug">
                                {{ b.judul }}
                            </h3>
                            <p class="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                {{ b.isi }}
                            </p>
                            <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                                <span
                                    class="text-[#039BE5] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Baca Selengkapnya
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </span>
                                <button
                                    class="w-9 h-9 rounded-full bg-gray-50 hover:bg-[#039BE5] flex items-center justify-center transition-colors group/btn">
                                    <span
                                        class="p-2 cursor-pointer rounded-full bg-gray-100 flex items-center justify-center">
                                        <Heart size="17" class="text-[#888686]" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-12 text-center">
                <button
                    class="px-8 cursor-pointer py-3.5 bg-gradient-to-r from-[#039BE5] to-[#0288D1] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#039BE5]/30 hover:scale-105 transition-all duration-300">
                    Lihat Semua Artikel
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import {
    Users,
    Heart,
    Apple,
    Baby,
    Sparkles,
    TrendingUp,
    Award,
    Brain,
} from "lucide-vue-next";


const buttons = [
    { id: "all", name: "Semua", icon: Sparkles },
    { id: 1, name: "Umum", icon: Heart },
    { id: 2, name: "Gigi", icon: Baby },
    { id: 4, name: "KIA", icon: Apple },
    { id: 3, name: "Kandungan", icon: Brain },
];

const selected = ref("all");
const data = ref([]);
const loading = ref(false);
const maxCard = 2

const stats = [
    { icon: Users, label: 'Pembaca Aktif', value: '10K+', color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Artikel Tersedia', value: '20+', color: 'from-purple-500 to-pink-500' },
    { icon: Award, label: 'Trusted Sources', value: '100%', color: 'from-green-500 to-emerald-500' },
]

const selectPoli = (id) => {
    selected.value = id;
};

const fetchBerita = async () => {
    loading.value = true;
    try {
        const res = await axios.get("http://localhost:3003/api/berita/by-poli", {
            params: { limit: 2 }
        });
        data.value = res.data.data;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

const flatBerita = computed(() =>
    data.value.flatMap(poli =>
        poli.berita.map(b => ({
            ...b,
            poli_id: poli.id,
            nama_poli: poli.nama_poli
        }))
    )
);

const filteredBerita = computed(() => {
    let list = flatBerita.value;

    if (selected.value !== "all") {
        list = list.filter(b => b.poli_id === selected.value);
    }
    return list.slice(0, maxCard);
});

onMounted(fetchBerita);
</script>

<style>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
