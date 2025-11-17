<template>
  <div>
    <div class="px-4 sm:px-6 md:px-10 min-h-screen h-full mt-25">
      <h2 class="text-2xl font-bold mb-4">Riwayat Kunjungan</h2>
      <div v-if="loading" class="text-gray-500">Memuat data...</div>
      <div v-else>
        <div v-if="riwayat.length === 0" class="text-gray-500">Belum ada riwayat kunjungan.</div>
        <div class="flex gap-5 flex-wrap ">
          <div v-for="kunjungan in riwayat" :key="kunjungan.rekam_id" class="flex-1/4">
            <div class="bg-[#dbdbdb48] h-full min-h-80 rounded-3xl">
              <div class="flex flex-col space-y-2 p-5">
                <div class="flex items-center justify-between text-sm font-semibold text-[#575757]  w-full">
                  <span>Tanggal</span>
                  <span>{{ formatDate(kunjungan.tanggal_kunjungan) }}</span>
                </div>
                <div class="flex justify-between text-sm text-[#575757]">
                  <span>Poli:</span>
                  <span>{{ kunjungan.nama_poli }}</span>
                </div>
                <div class="flex justify-between text-sm text-[#575757]">
                  <span>Dokter:</span>
                  <span>{{ kunjungan.nama_dokter }}</span>
                </div>
                <div class="flex justify-between text-sm text-[#575757]">
                  <span>Keluhan:</span>
                  <span>{{ kunjungan.keluhan }}</span>
                </div>
                <div class="flex justify-between text-sm text-[#575757]">
                  <span>Diagnosis:</span>
                  <span>{{ kunjungan.diagnosis }}</span>
                </div>
                <div class="flex justify-between text-sm text-[#575757]">
                  <span>Tindakan:</span>
                  <span>{{ kunjungan.tindakan }}</span>
                </div>
              </div>
              <hr class="border border-[#bebebe]">
              <div class="p-5">
                <div class="flex justify-between">
                  <div class="flex flex-col items-start">
                    <span>Status:</span>
                    <span>{{ kunjungan.resep.status }}</span>
                  </div>
                  <div class="flex flex-col items-start">
                    <span>Tanggal:</span>
                    <span>{{ formatDate(kunjungan.resep.tanggal_resep) }}</span>
                  </div>
                </div>
                <table class="min-w-full border border-gray-300 rounded-xl overflow-hidden">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="p-3 border-b border-gray-300 text-left">Nama Obat</th>
                      <th class="p-3 border-b border-gray-300 text-left">Dosis</th>
                      <th class="p-3 border-b border-gray-300 text-left">Jumlah</th>
                      <th class="p-3 border-b border-gray-300 text-left">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="obat in kunjungan.resep.obat" :key="obat.nama_obat" class="hover:bg-gray-50">
                      <td class="p-3 border-b border-gray-200">{{ obat.nama_obat }}</td>
                      <td class="p-3 border-b border-gray-200">{{ obat.dosis }}</td>
                      <td class="p-3 border-b border-gray-200">{{ obat.jumlah }}</td>
                      <td class="p-3 border-b border-gray-200">{{ obat.keterangan }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const riwayat = ref([]);
const loading = ref(true);

const formatDate = (dateStr) => {
  if (!dateStr || dateStr === "-") return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
};

const fetchRiwayat = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3003/api/pasien/riwayat", {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("data backend:", res.data);
    riwayat.value = res.data;
  } catch (error) {
    console.error("ggal req riwayat:", error);
    riwayat.value = [];
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  fetchRiwayat();
});
</script>

<style scoped></style>
