import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  const konsultasiAktif = ref([]); // daftar konsultasi aktif dokter
  const chatMessages = ref({}); // { konsultasi_id: [messages...] }

  return { konsultasiAktif, chatMessages };
});
