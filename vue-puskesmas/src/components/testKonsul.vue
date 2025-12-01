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
                <p class="font-semibold text-base md:text-lg text-[#e9edef] truncate">
                    {{ dokter.nama || "Dokter" }}
                </p>
                <p class="text-xs text-[#8696a0]">
                    {{ dokter.status || "Online" }}
                </p>
            </div>

            <div class="flex gap-2">
                <button class="hidden md:block p-2 hover:bg-[#2a3942] rounded-full transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                        </path>
                    </svg>
                </button>
                <button class="p-2 hover:bg-[#2a3942] rounded-full transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3" ref="chatBox"
            style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23182229\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');">
            <div v-for="msg in messages" :key="msg.id"
                :class="msg.sender === 'pasien' ? 'justify-end' : 'justify-start'"
                class="flex items-end gap-2 animate-fade-in">
                <div :class="msg.sender === 'pasien'
                    ? 'bg-[#005c4b] text-[#e9edef] rounded-tl-lg rounded-tr-sm rounded-bl-lg rounded-br-lg ml-auto'
                    : 'bg-[#202c33] text-[#e9edef] rounded-tl-sm rounded-tr-lg rounded-bl-lg rounded-br-lg'"
                    class="max-w-[85%] md:max-w-xs lg:max-w-md px-3 py-2 md:px-4 md:py-3 break-words shadow-md">
                    <p class="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                        {{ msg.pesan }}
                    </p>
                    <span class="text-[#8696a0] text-xs mt-1 block text-right">
                        12:34
                    </span>
                </div>
            </div>
        </div>

        <div class="bg-[#202c33] border-t border-[#2a3942] p-3 md:p-4 flex-shrink-0">
            <div class="flex gap-2 md:gap-3 items-center max-w-5xl mx-auto">
                <button class="p-2 text-[#8696a0] hover:text-[#e9edef] transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                    </svg>
                </button>

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

const dokter = ref({
    nama: "",
    foto: "",
    status: "Online",
});

const scrollBottom = () => {
    nextTick(() => {
        chatBox.value.scrollTop = chatBox.value.scrollHeight;
    });
};

onMounted(async () => {
    try {
        const dokterRes = await axios.get(`/api/konsultasi/detail/${id}`);
        dokter.value = dokterRes.data.dokter;

        const res = await axios.get(`/api/konsultasi/chat/${id}`);
        messages.value = res.data.data;

    } catch (err) {
        console.error("Error:", err);
    }

    scrollBottom();

    socket.emit("join_room", `konsultasi_${id}`);

    socket.on("new_message", (msg) => {
        messages.value.push(msg);
        scrollBottom();
    });
});

const kirimPesan = async () => {
    if (!pesan.value.trim()) return;

    await axios.post("/api/konsultasi/kirim", {
        konsultasi_id: id,
        pesan: pesan.value,
    });

    pesan.value = "";
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