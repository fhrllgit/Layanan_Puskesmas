<template>
  <div class="fixed inset-0 bg-[#070c0f]">
    <div class="flex h-full w-full">
      <!-- Sidebar konsultasi -->
      <div :class="selectedKonsultasi ? 'hidden md:flex' : 'flex'"
           class="w-full md:w-80 lg:w-96 xl:w-[420px] bg-[#070c0f] border-r border-[#2a3942] flex-col">
        <div class="text-[#e9edef] px-4 py-5">
          <!-- Header & Search -->
          <div class="flex items-center justify-between mb-3">
            <svg @click="$router.push('/dokter/dashboard')" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            <div class="flex-1 text-center">
              <h2 class="text-xl font-semibold tracking-wide">Konsultasi Aktif</h2>
            </div>
          </div>

          <div class="relative mb-3">
            <input v-model="searchQuery" type="text" placeholder="Cari konsultasi..."
                   class="w-full bg-[#2c2c2c] text-[#e9edef] placeholder-[#8696a0] px-4 py-2.5 pl-10 rounded-3xl text-sm focus:outline-none focus:bg-[#1e2a31] transition-colors" />
            <svg class="w-5 h-5 text-[#8696a0] absolute left-3 top-2.5" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <!-- Tabs -->
          <div class="flex justify-between gap-6 border-b border-[#2a3942]">
            <button @click="filterTab = 'all'"
                    :class="filterTab === 'all' ? 'text-[#25d366] border-[#25d366]' : 'text-[#8696a0] border-transparent hover:text-[#e9edef]'"
                    class="py-3 px-1 flex-1 text-sm transition-all duration-200 border-b-2 relative">
              All
              <span v-if="konsultasiAktif.filter(k => k.unread > 0).length > 0"
                    class="ml-1.5 bg-[#25d366] text-[#111b21] px-1.5 py-0.5 rounded text-xs font-semibold">
                {{ konsultasiAktif.filter(k => k.unread > 0).length }}
              </span>
            </button>
            <button @click="filterTab = 'unread'"
                    :class="filterTab === 'unread' ? 'text-[#25d366] border-[#25d366]' : 'text-[#8696a0] border-transparent hover:text-[#e9edef]'"
                    class="py-3 px-1 text-sm flex-1 transition-all duration-200 border-b-2">
              Unread
            </button>
            <button @click="filterTab = 'read'"
                    :class="filterTab === 'read' ? 'text-[#25d366] border-[#25d366]' : 'text-[#8696a0] border-transparent hover:text-[#e9edef]'"
                    class="py-3 px-1 text-sm flex-1 transition-all duration-200 border-b-2">
              Read
            </button>
          </div>
        </div>

        <!-- List konsultasi -->
        <div class="flex-1 overflow-y-auto">
          <div v-for="k in filteredKonsultasi" :key="k.konsultasi_id"
               @click="selectKonsultasi(k.konsultasi_id)"
               :class="selectedKonsultasi === k.konsultasi_id ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]'"
               class="p-4 cursor-pointer flex justify-between items-center border-b border-[#2a3942] transition-all duration-200">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                class="w-12 h-12 rounded-full bg-[#6a7175] flex items-center justify-center text-[#111b21] font-bold text-lg flex-shrink-0">
                {{ k.pasien_nama.charAt(0).toUpperCase() }}
              </div>

              <div class="flex-1 min-w-0">
                <p class="font-semibold text-[#e9edef] truncate text-base">
                  {{ k.pasien_nama }}
                </p>
                <p class="text-xs text-[#8696a0] truncate">
                  Klik untuk membuka chat
                </p>
              </div>
            </div>
            <span v-if="k.unread > 0"
                  class="bg-[#25d366] text-[#111b21] px-2.5 py-1 rounded-full text-xs font-semibold ml-2 flex-shrink-0">
              {{ k.unread }}
            </span>
          </div>
          <div v-if="filteredKonsultasi.length === 0" class="p-8 text-center">
            <svg class="w-16 h-16 mx-auto mb-3 text-[#8696a0] opacity-50" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <p class="text-[#8696a0] text-sm">Tidak ada konsultasi ditemukan</p>
          </div>
        </div>
      </div>

      <!-- room chat -->
      <div :class="!selectedKonsultasi ? 'hidden md:flex' : 'flex'" class="flex-1 flex-col bg-[#070c0f] relative">
        <!-- header chat -->
        <div v-if="selectedKonsultasi"
             class="bg-[#202c33] text-[#e9edef] p-4 shadow-lg flex items-center gap-3">
          <button @click="selectedKonsultasi = null"
                  class="md:hidden p-2 hover:bg-[#2a3942] rounded-full transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div
            class="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center text-[#111b21] font-bold text-lg">
            {{ (currentPasien?.pasien_nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-base md:text-lg text-[#e9edef]">
              {{ currentPasien?.pasien_nama }}
            </h3>
            <p class="text-xs text-[#8696a0]">Online</p>
          </div>
        </div>

        <!-- chat messages -->
        <div v-if="selectedKonsultasi" class="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3" ref="chatBox"
             style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23182229\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');">
          <div v-for="msg in chatMessages[selectedKonsultasi] || []" :key="msg.id"
               :class="msg.sender === 'dokter' ? 'justify-end' : 'justify-start'"
               class="flex items-end gap-2 animate-fade-in">

            <div :class="msg.sender === 'dokter'
                ? 'bg-[#005c4b] text-[#e9edef] rounded-tl-lg rounded-tr-sm rounded-bl-lg rounded-br-lg ml-auto'
                : 'bg-[#202c33] text-[#e9edef] rounded-tl-sm rounded-tr-lg rounded-bl-lg rounded-br-lg'"
                 class="max-w-[85%] md:max-w-xs lg:max-w-md px-3 py-2 md:px-4 md:py-3 break-words shadow-md">

              <p class="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {{ msg.pesan }}
              </p>

              <!-- Lihat Resep -->
              <span v-if="msg.isResep"
                    class="text-[#25d366] text-xs font-semibold block mt-1 cursor-pointer"
                    @click="lihatResep(selectedKonsultasi)">
                [Lihat Resep]
              </span>

              <span class="text-[#8696a0] text-xs mt-1 block text-right">
                {{ new Date(msg.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }}
              </span>
            </div>
          </div>
        </div>

        <!-- input chat -->
        <div v-if="selectedKonsultasi" class="bg-[#202c33] border-t border-[#2a3942] p-3 md:p-4 flex items-center gap-2">
          <input v-model="pesan" @keyup.enter="kirimPesan" placeholder="Ketik pesan..."
                 class="flex-1 bg-[#2a3942] text-[#e9edef] placeholder-[#8696a0] p-2.5 md:p-3 rounded-lg text-sm md:text-base" />
          <button @click="kirimPesan" class="bg-[#25d366] hover:bg-[#20bd5f] text-[#111b21] p-3 rounded-full">
            Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { io } from "socket.io-client";
import { storeToRefs } from "pinia";
import { useChatStore } from "@/stores/chat";
import axios from "@/utils/axios";

const chatStore = useChatStore();
const { konsultasiAktif, chatMessages } = storeToRefs(chatStore);

const selectedKonsultasi = ref(null);
const pesan = ref("");
const chatBox = ref(null);
const searchQuery = ref("");
const filterTab = ref("all");

const currentPasien = computed(() =>
  konsultasiAktif.value.find(k => k.konsultasi_id === selectedKonsultasi.value)
);

const filteredKonsultasi = computed(() => {
  let result = konsultasiAktif.value || [];
  if (filterTab.value === "unread") result = result.filter(k => k.unread > 0);
  if (filterTab.value === "read") result = result.filter(k => k.unread === 0);
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(k => k.pasien_nama.toLowerCase().includes(q));
  }
  return result;
});

const socket = io("http://localhost:3003");

const scrollBottom = () => {
  nextTick(() => {
    if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight;
  });
};

const getKonsultasiAktif = async () => {
  const res = await axios.get("/api/konsultasi/aktif");
  konsultasiAktif.value = res.data.data.map(k => ({ ...k, unread: k.unread_count }));
};

const selectKonsultasi = async (id) => {
  selectedKonsultasi.value = id;
  socket.emit("join_room", `konsultasi_${id}`);
  const res = await axios.get(`/api/konsultasi/chat/${id}`);
  chatMessages.value[id] = res.data.data.map(msg => ({
    ...msg,
    isResep: msg.pesan.toLowerCase().startsWith("resep:")
  }));
  const item = konsultasiAktif.value.find(x => x.konsultasi_id === id);
  if (item) item.unread = 0;
  scrollBottom();
  await axios.post(`/api/konsultasi/read/${id}`);
};

const kirimPesan = async () => {
  if (!pesan.value.trim() || !selectedKonsultasi.value) return;

  chatMessages.value[selectedKonsultasi.value] ||= [];
  chatMessages.value[selectedKonsultasi.value].push({
    id: Date.now(),
    konsultasi_id: selectedKonsultasi.value,
    sender: "dokter",
    pesan: pesan.value,
    created_at: new Date(),
    isResep: pesan.value.toLowerCase().startsWith("resep:")
  });

  if (pesan.value.toLowerCase().startsWith("resep:")) {
    // Simpan resep ke server
    try {
      await axios.post("/api/resep", {
        konsultasi_id: selectedKonsultasi.value,
        resep: pesan.value.slice(6).trim() // hapus "resep:"
      });
    } catch (err) {
      console.log(err);
      alert("Gagal menyimpan resep");
    }
  } else {
    await axios.post("/api/konsultasi/kirim", {
      konsultasi_id: selectedKonsultasi.value,
      pesan: pesan.value,
    });
  }

  pesan.value = "";
  scrollBottom();
};

const lihatResep = async (konsultasi_id) => {
  try {
    const res = await axios.get(`/api/konsultasi/resep/${konsultasi_id}`);
    alert(res.data.data.map(i => `${i.nama_obat} - ${i.dosis} (${i.jumlah})`).join("\n"));
  } catch (err) {
    console.log(err);
    alert("Gagal memuat resep");
  }
};

onMounted(async () => {
  await getKonsultasiAktif();

  socket.on("new_message", (msg) => {
    if (!chatMessages.value[msg.konsultasi_id]) chatMessages.value[msg.konsultasi_id] = [];
    chatMessages.value[msg.konsultasi_id].push({
      ...msg,
      isResep: msg.pesan.toLowerCase().startsWith("resep:")
    });

    const k = konsultasiAktif.value.find(k => k.konsultasi_id === msg.konsultasi_id);
    if (k && selectedKonsultasi.value !== msg.konsultasi_id) k.unread++;
    scrollBottom();
  });
});

watch(konsultasiAktif, (list) => {
  list.forEach(k => socket.emit("join_room", `konsultasi_${k.konsultasi_id}`));
}, { deep: true });
</script>

