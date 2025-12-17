<template>
<div class="relative min-h-screen">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-40 right-20 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float">
      </div>
      <div
        class="absolute bottom-30 rotate-90 left-1/3 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float"
        style="animation-delay: 2s;">
      </div>
      <div
        class="absolute top-1/2 left-10 w-24 h-24 border-2 border-[#039BE5]/10 rounded-2xl rotate-12 animate-float"
        style="animation-delay: 4s;">
      </div>
      <div
        class="absolute bottom-40 right-1/4 w-28 h-28 border-2 border-[#039BE5]/10 rounded-2xl -rotate-12 animate-float"
        style="animation-delay: 6s;">
      </div>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Laporan Layanan</h1>
        <p class="text-gray-500">Kelola dan export data rekam medis pasien</p>
      </div>

      <div class="flex justify-end items-center gap-3 mb-6">
        <button @click="downloadPDF"
          class="bg-gradient-to-r cursor-pointer from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 font-semibold flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z">
            </path>
          </svg>
          Export PDF
        </button>
        <button @click="downloadExcel"
          class="bg-gradient-to-r cursor-pointer from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 font-semibold flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
          Export Excel
        </button>
      </div>

      <div
        class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-6 mb-6 backdrop-blur-sm border border-[#039BE5]/10">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-4 flex-wrap flex-1">
            <div
              class="bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-3 rounded-xl border border-gray-200">
              <select v-model="filter.poli"
                class="outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent text-gray-700 font-medium cursor-pointer">
                <option value="">Semua Poli</option>
                <option v-for="p in poliList" :key="p.id" :value="p.id">
                  {{ p.nama_poli }}
                </option>
              </select>
            </div>

            <div
              class="bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-3 rounded-xl border border-gray-200">
              <select v-model="filter.dokter"
                class="outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent text-gray-700 font-medium cursor-pointer">
                <option value="">Semua Dokter</option>
                <option v-for="d in dokterList" :key="d.id" :value="d.id">
                  {{ d.nama }}
                </option>
              </select>
            </div>
            <div
              class="bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-3 rounded-xl border border-gray-200">
              <input type="date" v-model="filter.from"
                class="outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent text-gray-700 font-medium cursor-pointer" />
            </div>
            <div
              class="bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-3 rounded-xl border border-gray-200">
              <input type="date" v-model="filter.to"
                class="outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent text-gray-700 font-medium cursor-pointer" />
            </div>
          </div>
          <button @click="getLaporan"
            class="bg-gradient-to-r cursor-pointer from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white px-6 py-3 rounded-xl shadow-lg shadow-[#039BE5]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#039BE5]/40 hover:-translate-y-0.5 font-semibold flex items-center gap-2">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z">
              </path>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div
        class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 overflow-hidden backdrop-blur-sm border border-[#039BE5]/10">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] text-white">
                <th class="p-4 text-left font-semibold whitespace-nowrap">Tanggal</th>
                <th class="p-4 text-left font-semibold whitespace-nowrap">Poli</th>
                <th class="p-4 text-left font-semibold whitespace-nowrap">Dokter</th>
                <th class="p-4 text-left font-semibold whitespace-nowrap">Keluhan</th>
                <th class="p-4 text-left font-semibold whitespace-nowrap">Diagnosis</th>
                <th class="p-4 text-left font-semibold whitespace-nowrap">Tindakan</th>
                <th class="p-4 text-left font-semibold whitespace-nowrap">Obat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in laporan" :key="row.rekam_id"
                class="border-b border-gray-100 hover:bg-[#039BE5]/5 transition-colors">
                <td class="p-4 text-gray-700 whitespace-nowrap">{{ formatDate(row.tanggal_kunjungan) }}</td>
                <td class="p-4 text-gray-800 font-medium">{{ row.poli }}</td>
                <td class="p-4 text-gray-800">{{ row.dokter }}</td>
                <td class="p-4 text-gray-700">{{ row.keluhan }}</td>
                <td class="p-4 text-gray-700">{{ row.diagnosis }}</td>
                <td class="p-4 text-gray-700">{{ row.tindakan }}</td>
                <td class="p-4">
                  <div v-if="row.obat.length" class="max-h-40 scrollbar-hide overflow-y-auto">
                    <div v-for="(ob, i) in row.obat" :key="i"
                      class="mb-3 pb-3 border-b border-gray-200 last:border-b-0">
                      <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200">
                        <div class="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div class="text-xs font-semibold text-[#039BE5] mb-1">Nama Obat</div>
                            <div class="text-gray-800 font-medium">{{ ob.nama_obat }}</div>
                          </div>
                          <div>
                            <div class="text-xs font-semibold text-[#039BE5] mb-1">Dosis</div>
                            <div class="text-gray-700">{{ ob.dosis }}</div>
                          </div>
                          <div>
                            <div class="text-xs font-semibold text-[#039BE5] mb-1">Jumlah</div>
                            <div class="text-gray-700">{{ ob.jumlah }}</div>
                          </div>
                          <div>
                            <div class="text-xs font-semibold text-[#039BE5] mb-1">Keterangan</div>
                            <div class="text-gray-700">{{ ob.keterangan }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-else class="text-gray-400 text-sm italic">Tidak ada obat</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="laporan.length === 0" class="text-center py-16">
          <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
          <p class="text-gray-400 text-lg font-medium mb-2">Tidak ada data ditemukan</p>
          <p class="text-gray-400 text-sm">Silakan pilih filter untuk menampilkan data laporan</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const filter = ref({
  poli: "",
  dokter: "",
  from: "",
  to: "",
});

const poliList = ref([]);
const dokterList = ref([]);
const laporan = ref([]);

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};

const loadDropdown = async () => {
  try {
    const token = localStorage.getItem("token");

    const p = await axios.get("http://localhost:3003/api/admin/poli", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const d = await axios.get("http://localhost:3003/api/admin/dokter", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    poliList.value = p.data;
    dokterList.value = d.data;

  } catch (err) {
    console.error("Error loadDropdown:", err);

    if (err.response && err.response.status === 401) {
      alert("Sesi login sudah habis, silakan login kembali");
      window.location.href = "/login";
    }
  }
};

const getLaporan = async () => {
  try {
    const token = localStorage.getItem("token");
    let periode = "all";
    let tanggal = "";
    let bulan = "";
    let tahun = "";

    if (filter.value.from && !filter.value.to) {
      periode = "harian";
      tanggal = filter.value.from;
    }
    if (filter.value.from && filter.value.to) {
      periode = "range";
    }

    const params = {
      poli_id: filter.value.poli || "",
      dokter_id: filter.value.dokter || "",
      periode,
      tanggal,
      from: filter.value.from || "",
      to: filter.value.to || "",
      bulan,
      tahun
    };

    const res = await axios.get(
      "http://localhost:3003/api/admin/laporan/layanan-",
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      }
    );

    laporan.value = res.data.data;

  } catch (err) {
    console.error("Error getLaporan:", err);
  }
};

onMounted(() => {
  loadDropdown();
  getLaporan()
})

// laporannnnnn
const downloadPDF = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:3003/api/admin/laporan/export-pdf",
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          poli_id: filter.value.poli,
          dokter_id: filter.value.dokter,
          from: filter.value.from,
          to: filter.value.to
        }
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "laporan_layanan.pdf");
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error("Gagal download PDF:", err);
  }
};

const downloadExcel = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:3003/api/admin/laporan/export-excel",
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          poli_id: filter.value.poli,
          dokter_id: filter.value.dokter,
          from: filter.value.from,
          to: filter.value.to
        }
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "laporan_layanan.xlsx");
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error("Gagal download Excel:", err);
  }
};

</script>

<style>
    @keyframes float {
      0%,
      100% {
        transform: translateY(0) rotate(45deg);
      }

      50% {
        transform: translateY(-20px) rotate(45deg);
      }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  </style>