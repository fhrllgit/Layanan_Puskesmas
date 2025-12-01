<template>
  <div class="">
    <h1 class="text-4xl font-bold mb-4">Laporan Layanan</h1>
    <div class="flex justify-end items-center gap-3 mb-4">
      <button @click="downloadPDF" class="bg-red-600 cursor-pointer hover:bg-red-700 text-white flex items-center justify-center w-40 h-10 text-sm  rounded-lg" style="font-weight: 600;">
        Export PDF
      </button>
      <button @click="downloadExcel" class="bg-green-600 cursor-pointer hover:bg-green-700 text-white flex items-center justify-center w-40 h-10 text-sm  rounded-lg" style="font-weight: 600;">
        Export Excel
      </button>
    </div>
    <div class="flex items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-5">
        <div class="bg-white  shadow-xl p-2 rounded-2xl">
          <!-- <label class="block text-sm mb-1 font-semibold">Poli</label> -->
          <select v-model="filter.poli" class="outline-none ring-0 focus:outline-none focus:ring-0">
            <option class="" style="font: 100;" value="">Semua Poli</option>
            <option class="ring-0 outline-0" v-for="p in poliList" :key="p.id" :value="p.id">
              {{ p.nama_poli }}
            </option>
          </select>
        </div>
  
        <div class="bg-white  shadow-xl p-2 rounded-2xl">
          <select v-model="filter.dokter" class="outline-none ring-0 focus:outline-none focus:ring-0">
            <option value="">Semua Dokter</option>
            <option value="">Semua Dokter</option>
            <option v-for="d in dokterList" :key="d.id" :value="d.id">
              {{ d.nama }}
            </option>
          </select>
        </div>
  
        <div class="bg-white  shadow-xl p-2 rounded-2xl">
          <input type="date" v-model="filter.from" class="outline-none ring-0 focus:outline-none focus:ring-0" />
        </div>
        <div class="bg-white  shadow-xl p-2 rounded-2xl">
          <input type="date" v-model="filter.to" class="outline-none ring-0 focus:outline-none focus:ring-0" />
        </div>
      </div>
      <div class="flex shadow-xl items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg" @click="getLaporan">
        <svg class="text-white size-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z"></path></svg>
        <button class="text-sm text-white cursor-pointer">Filter</button>
      </div>
    </div>
    <div class="mt-6">
      <div class="overflow-x-auto p-1 shadow-md rounded-lg">
        <table class="min-w-full border border-gray-300">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="p-3 border text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th class="p-3 border text-left text-sm font-semibold text-gray-700">Poli</th>
              <th class="p-3 border text-left text-sm font-semibold text-gray-700">Dokter</th>
              <th class="p-3 border text-left text-sm font-semibold text-gray-700">Keluhan</th>
              <th class="p-3 border text-left text-sm font-semibold text-gray-700">Diagnosis</th>
              <th class="p-3 border text-left text-sm font-semibold text-gray-700">Tindakan</th>
              <th class="p-3 border text-left text-sm font-semibold text-gray-700">Obat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in laporan" :key="row.rekam_id" class="border-b hover:bg-gray-50 transition">
              <td class="p-3 border text-sm">{{ formatDate(row.tanggal_kunjungan) }}</td>
              <td class="p-3 border text-sm">{{ row.poli }}</td>
              <td class="p-3 border text-sm">{{ row.dokter }}</td>
              <td class="p-3 border text-sm">{{ row.keluhan }}</td>
              <td class="p-3 border text-sm">{{ row.diagnosis }}</td>
              <td class="p-3 border text-sm">{{ row.tindakan }}</td>
              <td class="p-3 border">
                <div v-if="row.obat.length" class="max-h-15 overflow-y-auto">
                  <div v-for="(ob, i) in row.obat" :key="i" class="mb-2 pb-2 border-b last:border-b-0">
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-sm">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="px-2 py-1 text-left font-medium text-gray-600 text-xs">Nama Obat</th>
                            <th class="px-2 py-1 text-left font-medium text-gray-600 text-xs">Dosis</th>
                            <th class="px-2 py-1 text-left font-medium text-gray-600 text-xs">Jumlah</th>
                            <th class="px-2 py-1 text-left font-medium text-gray-600 text-xs">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="px-2 py-1 text-gray-700">{{ ob.nama_obat }}</td>
                            <td class="px-2 py-1 text-gray-700">{{ ob.dosis }}</td>
                            <td class="px-2 py-1 text-gray-700">{{ ob.jumlah }}</td>
                            <td class="px-2 py-1 text-gray-700">{{ ob.keterangan }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <span v-else class="text-gray-400 text-sm">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-if="laporan.length === 0" class="text-center mt-4 text-gray-500">
        Tidak ada data ditemukan.
      </p>
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
