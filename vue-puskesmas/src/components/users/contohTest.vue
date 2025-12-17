
<template>
    <div class="fixed inset-0 flex flex-col bg-[#0b141a]">
        <div class="flex items-center gap-3 p-4 bg-[#202c33] text-[#e9edef] shadow-lg">
            <button @click="$router.back()" class="p-2 hover:bg-[#2a3942] rounded-full transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <img v-if="dokter.foto" :src="dokter.foto" class="w-11 h-11 rounded-full object-cover" />
            <div v-else
                class="w-11 h-11 rounded-full bg-[#6a7175] flex items-center justify-center text-[#111b21] font-bold text-lg flex-shrink-0">
                {{ dokter.nama?.charAt(0).toUpperCase() || "D" }}
            </div>

            <div class="flex-1 min-w-0">
                <p class="font-semibold text-base md:text-lg text-[#e9edef] truncate">{{ dokter.nama || "Dokter" }}</p>
                <p class="text-xs text-[#8696a0]">{{ dokter.status || "Online" }}</p>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3" ref="chatBox"
            style="background-image: url('data:image/svg+xml,...');">
            <div v-for="msg in messages" :key="msg.id"
                :class="msg.sender === 'pasien' ? 'justify-end' : 'justify-start'"
                class="flex items-end gap-2 animate-fade-in">
                <div :class="msg.sender === 'pasien'
                    ? 'bg-[#005c4b] text-[#e9edef] rounded-tl-lg rounded-tr-sm rounded-bl-lg rounded-br-lg ml-auto'
                    : 'bg-[#202c33] text-[#e9edef] rounded-tl-sm rounded-tr-lg rounded-bl-lg rounded-br-lg'"
                    class="max-w-[85%] md:max-w-xs lg:max-w-md px-3 py-2 md:px-4 md:py-3 break-words shadow-md">

                    <p class="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{{ msg.pesan }}</p>

                    <!-- <span v-if="msg.isResep" class="text-[#25d366] text-xs font-semibold block mt-1 cursor-pointer"
                        @click="lihatResep(msg.id)">
                        [Lihat Resep]
                    </span> -->
                    <span v-if="msg.isResep" class="text-[#25d366] text-xs font-semibold block mt-1 cursor-pointer"
                        @click="lihatResep">
                        [Lihat Resep]
                    </span>


                    <span class="text-[#8696a0] text-xs mt-1 block text-right">
                        {{ formatTime(msg.created_at) }}
                    </span>
                </div>
            </div>
        </div>

        <div class="bg-[#202c33] border-t border-[#2a3942] p-3 md:p-4 flex-shrink-0">
            <div class="flex gap-2 md:gap-3 items-center max-w-5xl mx-auto">
                <input v-model="pesan" @keyup.enter="kirimPesan" placeholder="Ketik pesan..."
                    class="flex-1 bg-[#2a3942] text-[#e9edef] placeholder-[#8696a0] border-none focus:outline-none p-2.5 md:p-3 rounded-lg text-sm md:text-base transition-all duration-200" />
                <button @click="kirimPesan"
                    class="bg-[#25d366] hover:bg-[#20bd5f] text-[#111b21] p-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </button>
            </div>
        </div>


        <div v-if="showResep" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-[#202c33] text-[#e9edef] p-4 rounded-md max-w-md w-full">
                <h3 class="font-bold mb-2">Daftar Resep</h3>
                <ul class="space-y-2 max-h-64 overflow-y-auto">
                    <li v-for="item in resepData" :key="item.resep_id" class="border-b border-[#2a3942] pb-2">
                        <p><strong>Obat:</strong> {{ item.nama_obat }}</p>
                        <p><strong>Dosis:</strong> {{ item.dosis }}</p>
                        <p><strong>Jumlah:</strong> {{ item.jumlah }}</p>
                        <p><strong>Keterangan:</strong> {{ item.keterangan }}</p>
                        <p><strong>Status:</strong> {{ item.status }}</p>
                        <p><strong>Tanggal:</strong> {{ item.tanggal }}</p>
                    </li>
                </ul>
                <button @click="showResep = false"
                    class="mt-3 bg-[#25d366] text-[#111b21] p-2 rounded-md">Tutup</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import axios from "@/utils/axios";
import { io } from "socket.io-client";
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;

const socket = io("http://localhost:3003");

const pesan = ref("");
const messages = ref([]);
const chatBox = ref(null);
const resepData = ref([]);
const showResep = ref(false);


const dokter = ref({ nama: "", foto: "", status: "Online" });

const scrollBottom = () => {
    nextTick(() => { if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight; });
};

const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

onMounted(async () => {
    try {
        // Ambil data dokter
        const dokterRes = await axios.get(`/api/konsultasi/detail/${id}`);
        dokter.value = dokterRes.data.dokter;

        // Ambil chat
        const res = await axios.get(`/api/konsultasi/chat/${id}`);
        messages.value = res.data.data.map(msg => ({
            ...msg,
            isResep: msg.pesan.toLowerCase().startsWith("resep:")
        }));
    } catch (err) {
        console.error(err);
    }

    scrollBottom();
    socket.emit("join_room", `konsultasi_${id}`);
    socket.on("new_message", (msg) => {
        messages.value.push({
            ...msg,
            isResep: msg.pesan.toLowerCase().startsWith("resep:")
        });
        scrollBottom();
    });
});

const kirimPesan = async () => {
    if (!pesan.value.trim()) return;
    const data = { konsultasi_id: id, pesan: pesan.value };
    await axios.post("/api/konsultasi/kirim", data);

    messages.value.push({
        id: Date.now(),
        konsultasi_id: id,
        sender: "pasien",
        pesan: pesan.value,
        created_at: new Date(),
        isResep: false
    });
    pesan.value = "";
    // scrollBottom();
};

const lihatResep = async () => {
    try {
        const res = await axios.get(`/api/konsultasi/resep/${id}`);
        resepData.value = res.data.data;
        showResep.value = true;
    } catch (err) {
        console.error(err);
        alert("Gagal memuat resep");
    }
};

</script>


<style>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}

/* Smooth scrolling */
[ref="chatBox"] {
    scroll-behavior: smooth;
}

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #111b21;
}

::-webkit-scrollbar-thumb {
    background: #374045;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #4a5358;
}

/* Mobile optimizations */
@media (max-width: 768px) {
    body {
        overflow: hidden;
    }
}
</style>