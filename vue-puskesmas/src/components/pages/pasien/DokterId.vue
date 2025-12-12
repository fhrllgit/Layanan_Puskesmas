<template>
    <div class="h-full">
        <div class="mt-25 px-4 sm:px-6 md:px-10">
            <div class="flex items-center gap-3 text-xs">
                <button @click="$router.push('/pasien/dashboard')" class="text-[#d34341] cursor-pointer">Home</button>
                <span>></span>
                <p @click="$router.push('/pasien/konsultasi')" class="text-[#d34341] cursor-pointer">Tanya Dokter</p>
                <span>></span>
                <p>{{ dataPoliId.nama_poli }}</p>
            </div>
            <div class="flex mt-10 h-full min-h-screen overflow-hidden">
                <div class="flex-1">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-center text-xl font-semibold">Chat Dokter di Sisma</h1>
                        <p class="text-md text-[#5d5c5c] text-center">Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iusto dolorem dolorum non tenetur?</p>
                    </div>
                    <div class="w-70 mt-10 mx-auto overflow-hidden relative">
                        <div class="flex transition-transform duration-500"
                            :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                            <div v-for="(item, index) in slides" :key="index"
                                class="flex-shrink-0 w-full justify-center items-center flex">
                                <img :src="item.img" :alt="item.text" class="w-40 h-auto object-cover" />
                            </div>
                        </div>
                        <div class="mt-5 text-center font-semibold">
                            {{ slides[currentIndex].text }}
                        </div>
                        <div class="flex justify-center gap-2 mt-5">
                            <span v-for="(item, index) in slides" :key="index"
                                class="w-2 h-2 rounded-full cursor-pointer"
                                :class="currentIndex === index ? 'bg-[#d34341]' : 'bg-gray-300'"
                                @click="goToSlide(index)"></span>
                        </div>
                    </div>
                    <div class="mt-6">
                        <h1 style="font-weight: 500;" class="text-lg text-[#474646]">Mengapa Chat Dokter di Sisma?</h1>
                        <div class="flex flex-col gap-5 mt-5">
                            <div v-for="item in chatSisma" :key="item.id" class="flex items-center gap-3">
                                <img :src="item.img" class="w-10 bg-blue-100 h-auto rounded-full object-cover" alt="">
                                <p class="">{{ item.nama }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1/5 border-l border-l-[#a7a6a6] py-3">
                    <div class="">
                        <div class="flex px-3 items-center gap-2 border-b border-b-[#c6c5c5] py-2">
                            <span @click="$router.push('/pasien/konsultasi')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                                    stroke="currentColor" class="w-4 cursor-pointer h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                            </span>
                            <span class="text-sm text-[#5e5d5d]">{{ fakeName(dataPoliId.nama_poli) }}</span>
                        </div>
                    
                        <div v-if="loading">Memuat dokter...</div>
                        <div v-else-if="dokter.length === 0">Tidak ada dokter.</div>
                        <div v-else class="grid grid-cols-1 px-3 mt-5 md:grid-cols-2 gap-4">
                            <div v-for="d in dokter" :key="d.id"
                                class="p-6 bg-white">
                                <div class="flex gap-4 mb-4">
                                    <div class="flex-shrink-0">
                                        <div v-if="d.avatar"
                                            class="w-20 h-20 rounded-lg overflow-hidden border border-[#cacaca]">
                                            <img :src="d.avatar" :alt="d.nama" class="w-full h-full object-cover">
                                        </div>
                                        <div v-else
                                            class="w-20 h-20 rounded-lg flex items-center justify-center border border-[#cacaca]">
                                            <span class="text-[#d34341] text-2xl font-bold uppercase">
                                                {{ d.nama.charAt(0) }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="flex-1">
                                        <h3 class="font-bold text-lg text-gray-800 mb-1">
                                            Dr. {{ d.nama }}
                                        </h3>
                                        <p class="text-gray-600 text-sm mb-3">{{ dataPoliId.nama_poli }}</p>
                                        <div class="flex items-center gap-4 text-sm">
                                            <div class="flex items-center gap-1 text-gray-600">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 9.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                                <span>{{ d.pengalaman || '7' }} tahun</span>
                                            </div>
                                            <div class="flex items-center gap-1 text-gray-600">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                                </svg>
                                                <span>{{ d.rating || '98' }}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center justify-between pt-4 border-t">
                                    <div class="flex items-center gap-2">
                                        <span
                                            :class="['w-2.5 h-2.5 rounded-full', d.status === 'online' ? 'bg-green-500' : 'bg-gray-400']"></span>
                                        <span
                                            :class="['text-sm font-medium', d.status === 'online' ? 'text-green-600' : 'text-gray-500']">
                                            {{ d.status === 'online' ? 'Online' : 'Offline' }}
                                        </span>
                                    </div>

                                    <!-- <button @click="mulaiKonsultasi(d.id)" :disabled="d.status !== 'online'" :class="[
                                        'px-6 py-2 rounded-lg font-medium text-sm transition-colors',
                                        d.status === 'online'
                                            ? 'bg-gradient-to-r cursor-pointer from-[#d34341] to-[#d34341ea] text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    ]">
                                        Chat
                                    </button> -->
                                    <button @click="mulaiKonsultasi(d.id)" class="px-6 py-2 rounded-lg font-medium text-sm transition-colors bg-gradient-to-r cursor-pointer from-[#d34341] to-[#d34341ea] text-white">Chat</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// import router from "@/router";
import axios from "@/utils/axios";
import ori from "../../../assets/img/logoS.png"
import imgKandungan from "../../../assets/img/Dkandungan.png"
import imgUmum from "../../../assets/img/Dumum.png"
import imgGigi from "../../../assets/img/Dgigi.png"
import imgKia from "../../../assets/img/Dkia.png"
import slide1 from "../../../assets/img/slide1.png"
import slide2 from "../../../assets/img/slide2.png"
import slide3 from "../../../assets/img/slide3.png"
import healthapp from "../../../assets/img/healthapp.png"
import gedung from "../../../assets/img/gedung.png"

const router = useRouter();
const route = useRoute()
const poliId = route.params.id
const dokter = ref([])
const loading = ref(true)

const chatSisma = ref("")
const dataPoliId = ref("")
const currentIndex = ref(0);
let interval = null;

const slides = ref([
    { img: slide1, text: "Ini Slide 1" },
    { img: slide2, text: "Ini Slide 2" },
    { img: slide3, text: "Ini Slide 3" },
]);

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

const goToSlide = (index) => {
    currentIndex.value = index;
};

const onMoupoli = async () => {
    try {
        const res = await axios(`/api/poli/${poliId}`)
        dataPoliId.value = res.data.data
    } catch (e) {
        console.log(e)
    }
}

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
        router.push(`/pasien/chat/${konsultasi_id}?dokter=${dokter_id}`);
    } catch (err) {
        console.error(err);
    }
};

const filteredImg = (img) => {
    const i = img.toLowerCase()
    if (i.includes("poli umum")) return imgUmum;
    if (i.includes("poli gigi")) return imgGigi;
    if (i.includes("poli kandungan")) return imgKandungan;
    if (i.includes("poli kia")) return imgKia;
    return ori
}

const fakeName = (item) => {
    const map = {
        "Poli Umum": "Dokter Umum",
        "Poli Gigi": "Dokter Gigi",
        "Poli Kangungan": "Dokter Kangungan",
        "Poli KIA": "Dokter Kesehatan Ibu & Anak",
    }
    return map[item] || item
}

const onMouchat = () => {
    chatSisma.value = [
        { id: 1, nama: "Bisa berbicara langsung dengan dokter tanpa harus datang ke puskesmas.", img: healthapp },
        { id: 2, nama: "Semua informasi dan riwayat kesehatan Anda dijaga kerahasiaannya.", img: gedung },
        { id: 3, nama: "Mendapatkan rekomendasi dan saran medis sesuai kondisi Anda.", img: ori }
    ]
}


onMounted(() => {
    interval = setInterval(nextSlide, 3000);
    onMouchat()
    onMoupoli()
})

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<style>
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: #111b21;
}

::-webkit-scrollbar-thumb {
    background: #374045;
    border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
    background: #4a5358;
}
</style>