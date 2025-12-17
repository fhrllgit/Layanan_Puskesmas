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
      <div class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-8 mb-6 backdrop-blur-sm border border-[#039BE5]/10">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Manajemen Antrian</h2>
            <p class="text-gray-500">Kelola antrian pasien hari ini</p>
          </div>
          <button @click="openSearchPopup"
            class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white px-6 py-3 rounded-xl shadow-lg shadow-[#039BE5]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#039BE5]/40 hover:-translate-y-0.5 font-medium flex items-center gap-2">
            <span class="text-xl">+</span> Tambah Antrian
          </button>
        </div>
      </div>
      <div class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-6 mb-6 backdrop-blur-sm border border-[#039BE5]/10">
        <div class="flex gap-4 flex-wrap">
          <select v-model="poliId"
            class="flex-1 min-w-[200px] border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white">
            <option value="">Semua Poli</option>
            <option v-for="p in listPoli" :key="p.id" :value="p.id">
              {{ p.nama_poli }}
            </option>
          </select>
          <input type="date" v-model="tanggal"
            class="flex-1 min-w-[200px] border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white" />
          <button @click="applyFilter"
            class="bg-[#039BE5] hover:bg-[#0288D1] text-white px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#039BE5]/30 font-medium">
            Filter
          </button>
          <button @click="loadToday"
            class="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 font-medium">
            Hari Ini
          </button>
        </div>
      </div>
      <div class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 overflow-hidden backdrop-blur-sm border border-[#039BE5]/10">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] text-white">
                <th class="p-4 text-left font-semibold">No</th>
                <th class="p-4 text-left font-semibold">Nomor Antrian</th>
                <th class="p-4 text-left font-semibold">Nama Pasien</th>
                <th class="p-4 text-left font-semibold">Poli</th>
                <th class="p-4 text-left font-semibold">Status</th>
                <th class="p-4 text-left font-semibold">Keterangan</th>
                <th class="p-4 text-left font-semibold">Tanggal</th>
                <th class="p-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(a, i) in antrian" :key="a.id"
                class="border-b border-gray-100 hover:bg-[#039BE5]/5 transition-colors">
                <td class="p-4 text-gray-700">{{ i + 1 }}</td>
                <td class="p-4">
                  <span class="font-semibold text-[#039BE5]">{{ a.nomor_antrian }}</span>
                </td>
                <td class="p-4 text-gray-800 font-medium">{{ a.pasien_nama }}</td>
                <td class="p-4 text-gray-700">{{ a.nama_poli }}</td>
                <td class="p-4">
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium bg-[#039BE5]/10 text-[#039BE5]">{{ a.status }}</span>
                </td>
                <td class="p-4 text-gray-600">{{ a.keterangan || '-' }}</td>
                <td class="p-4 text-gray-700">{{ formatDate(a.tanggal) }}</td>
                <td class="p-4">
                  <button @click="deleteAntrian(a.id)"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 font-medium">
                    Hapus
                  </button>
                </td>
              </tr>
              <tr v-if="antrian.length === 0">
                <td colspan="8" class="text-center p-8 text-gray-400">
                  <div class="flex flex-col items-center gap-2">
                    <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4">
                      </path>
                    </svg>
                    <span class="text-lg font-medium">Tidak ada data</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="showSearch"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 transform animate-scale-in border-2 border-[#039BE5]/20">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Cari Pasien</h3>
        <input type="text" v-model="search" placeholder="Cari NIK / Nama"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all" />
        <button @click="doSearch"
          class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white w-full p-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#039BE5]/30 font-medium mb-4">
          Cari
        </button>
        <ul v-if="searchResult.length > 0" class="mt-4 space-y-2 max-h-60 overflow-y-auto">
          <li v-for="p in searchResult" :key="p.id" @click="selectPasien(p)"
            class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#039BE5] hover:bg-[#039BE5]/5 transition-all duration-300">
            <div class="font-medium text-gray-800">{{ p.nama }}</div>
            <div class="text-sm text-gray-500">{{ p.nik }}</div>
          </li>
        </ul>
        <div class="text-center mt-6">
          <button @click="openAddPasien" class="text-[#039BE5] hover:text-[#0288D1] underline font-medium">
            + Tambah Pasien Baru
          </button>
        </div>
        <button @click="closeAll"
          class="mt-6 w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-xl transition-all duration-300 font-medium text-gray-700">
          Tutup
        </button>
      </div>
    </div>

    <div v-if="showAddPasien"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div
        class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 transform animate-scale-in border-2 border-[#039BE5]/20 my-8">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Tambah Pasien Baru</h3>
        <input v-model="newPasien.nik"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all"
          placeholder="NIK" />
        <input v-model="newPasien.nama"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all"
          placeholder="Nama" />
        <select v-model="newPasien.jenis_kelamin"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all">
          <option value="">Pilih Jenis Kelamin</option>
          <option value="L">Laki-Laki</option>
          <option value="P">Perempuan</option>
        </select>
        <input v-model="newPasien.no_hp"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all"
          placeholder="No HP" />
        <input v-model="newPasien.alamat_lengkap"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all"
          placeholder="Alamat Lengkap" />
        <input v-model="newPasien.kecamatan"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all"
          placeholder="Kecamatan" />
        <input v-model="newPasien.kota"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all"
          placeholder="Kota" />
        <input v-model="newPasien.provinsi"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all"
          placeholder="Provinsi" />
        <button @click="savePasien"
          class="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white w-full p-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 font-medium mb-3">
          Simpan Pasien
        </button>
        <button @click="closeAll"
          class="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-xl transition-all duration-300 font-medium text-gray-700">
          Tutup
        </button>
      </div>
    </div>

    <div v-if="showAddAntrian"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 transform animate-scale-in border-2 border-[#039BE5]/20">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Tambah Antrian</h3>
        <input
          class="border-2 border-gray-200 bg-gray-50 p-3 w-full mb-4 rounded-xl outline-none text-gray-600"
          :value="selectedPasien.nama" disabled />
        <input
          class="border-2 border-gray-200 bg-gray-50 p-3 w-full mb-4 rounded-xl outline-none text-gray-600"
          :value="selectedPasien.nik" disabled />
        <select v-model="antrianForm.poli_id"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all">
          <option value="">Pilih Poli</option>
          <option v-for="p in listPoli" :key="p.id" :value="p.id">
            {{ p.nama_poli }}
          </option>
        </select>
        <textarea v-model="antrianForm.keluhan"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all resize-none"
          placeholder="Keluhan" rows="3"></textarea>
        <select v-model="antrianForm.dokter_id"
          class="border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 w-full mb-4 rounded-xl outline-none transition-all">
          <option value="">Pilih Dokter</option>
          <option v-for="d in listDokter" :key="d.id" :value="d.id">
            {{ d.nama }}
          </option>
        </select>
        <button @click="saveAntrian"
          class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white w-full p-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#039BE5]/30 font-medium mb-3">
          Daftar
        </button>
        <button @click="closeAll"
          class="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-xl transition-all duration-300 font-medium text-gray-700">
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const api = "http://localhost:3003/api/admin";

const antrian = ref([]);
const listPoli = ref([]);
const poliId = ref("");
const tanggal = ref("");
const showSearch = ref(false);
const showAddPasien = ref(false);
const showAddAntrian = ref(false);
const search = ref("");
const searchResult = ref([]);
const selectedPasien = ref(null);
const newPasien = ref({
  nik: "",
  nama: "",
  jenis_kelamin: "",
  no_hp: "",
  alamat_lengkap: "",
  kecamatan: "",
  kota: "",
  provinsi: "",
});

const antrianForm = ref({
  poli_id: "",
  keluhan: "",
});

const listDokter = ref([]);
const selectedDokter = ref("");

const loadDokter = async (poli_id) => {
  if (!poli_id) {
    listDokter.value = [];
    antrianForm.value.dokter_id = "";
    return;
  }
  try {
    const res = await axios.get(`${api}/users/dokter?poli_id=${poli_id}`, headers());
    listDokter.value = res.data.data;
    console.log("Dokter:", res.data.data);
  } catch (err) {
    console.error("Gagal load dokter:", err.response?.data || err.message);
  }
};


watch(() => antrianForm.value.poli_id, (newVal) => {
  loadDokter(newVal);
  antrianForm.value.dokter_id = "";
});

const headers = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const loadToday = async () => {
  const res = await axios.get(`${api}/antrian/today`, headers());
  antrian.value = res.data.data || [];
};

const loadPoli = async () => {
  const res = await axios.get("http://localhost:3003/api/poli", headers());
  listPoli.value = res.data.data;
};

const applyFilter = async () => {
  let url = `${api}/antrian/filter?`;
  if (tanggal.value) url += `tanggal=${tanggal.value}&`;
  if (poliId.value) url += `poli_id=${poliId.value}`;

  const res = await axios.get(url, headers());
  antrian.value = res.data.data || [];
};

const openSearchPopup = () => {
  showSearch.value = true;
};

const doSearch = async () => {
  const res = await axios.get(`${api}/pasien/search?query=${search.value}`, headers());
  searchResult.value = res.data.data || [];
};

const selectPasien = (p) => {
  selectedPasien.value = p;
  showSearch.value = false;
  showAddAntrian.value = true;
};


const openAddPasien = () => {
  showSearch.value = false;
  showAddPasien.value = true;
};

const savePasien = async () => {
  try {
    const res = await axios.post(
      `${api}/pasien`,
      newPasien.value,
      headers()
    );
    selectedPasien.value = {
      id: res.data.pasien_id,
      nama: newPasien.value.nama,
      nik: newPasien.value.nik,
    };
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: `Pasien ${newPasien.value.nama} berhasil ditambahkan. NIK: ${newPasien.value.nik}`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });

    showAddPasien.value = false;
    showAddAntrian.value = true;
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: error.response?.data?.message || 'Terjadi kesalahan saat menambahkan pasien',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Tutup'
    });
  }
};


const saveAntrian = async () => {
  try {
    const res = await axios.post(
      `${api}/antrian`,
      {
        pasien_id: selectedPasien.value.id,
        poli_id: antrianForm.value.poli_id,
        dokter_id: antrianForm.value.dokter_id,
        keluhan: antrianForm.value.keluhan,
      },
      headers()
    );

    const nomorAntrian = res.data.nomor_antrian;

    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: `Antrian berhasil ditambahkan. Nomor antrian: ${nomorAntrian}`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });

    closeAll();
    loadToday();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: error.response?.data?.message || 'Terjadi kesalahan',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Tutup'
    });
  }
};

const deleteAntrian = async (id) => {
  const result = await Swal.fire({
    title: 'Apakah kamu yakin?',
    text: "Antrian ini akan dihapus!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${api}/antrian/${id}`, headers());
      Swal.fire('Terhapus!', 'Antrian berhasil dihapus.', 'success');
      loadToday(); 
    } catch (error) {
      console.error(error);
      Swal.fire('Gagal!', error.response?.data?.message || 'Terjadi kesalahan', 'error');
    }
  }
};

const closeAll = () => {
  showSearch.value = false;
  showAddPasien.value = false;
  showAddAntrian.value = false;

  search.value = "";
  searchResult.value = [];
};

const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
};

onMounted(() => {
  loadPoli(); 
  // setInterval(() => {
  //   loadToday();
  // }, 1000);
  loadToday();
});
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

    @keyframes fade-in {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes scale-in {
      from {
        transform: scale(0.9);
        opacity: 0;
      }

      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }

    .animate-scale-in {
      animation: scale-in 0.3s ease-out;
    }
  </style>
