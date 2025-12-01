<template>
  <div class="">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Manajemen Antrian Hari Ini</h2>
      <button @click="openSearchPopup" class="bg-pink-600 text-white px-4 py-2 rounded">+ Tambah Antrian</button>
    </div>
    <div class="flex gap-4 mb-4">
      <select v-model="poliId" class="border p-2 rounded">
        <option value="">Semua Poli</option>
        <option v-for="p in listPoli" :key="p.id" :value="p.id">
          {{ p.nama_poli }}
        </option>
      </select>
      <input type="date" v-model="tanggal" class="border p-2 rounded" />
      <button @click="applyFilter" class="bg-blue-600 text-white px-3 py-2 rounded">Filter</button>
      <button @click="loadToday" class="bg-green-600 text-white px-3 py-2 rounded">Hari Ini</button>
    </div>

    <table class="w-full border">
      <thead class="bg-gray-200">
        <tr>
          <th class="border p-2">No</th>
          <th class="border p-2">Nomor Antrian</th>
          <th class="border p-2">Nama Pasien</th>
          <th class="border p-2">Poli</th>
          <th class="border p-2">Status</th>
          <th class="border p-2">Keterangan</th>
          <th class="border p-2">Tanggal</th>
          <th class="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(a, i) in antrian" :key="a.id">
          <td class="border p-2">{{ i + 1 }}</td>
          <td class="border p-2">{{ a.nomor_antrian }}</td>
          <td class="border p-2">{{ a.pasien_nama }}</td>
          <td class="border p-2">{{ a.nama_poli }}</td>
          <td class="border p-2">{{ a.status }}</td>
          <td class="border p-2">{{ a.keterangan || '-' }}</td>
          <td class="border p-2">{{ a.tanggal }}</td>
          <td class="border p-2">
            <button @click="deleteAntrian(a.id)" class="bg-red-600 text-white px-2 py-1 rounded">Hapus</button>
          </td>
        </tr>
        <tr v-if="antrian.length === 0">
          <td colspan="7" class="text-center p-4">Tidak ada data</td>
        </tr>
      </tbody>
    </table>

    <div v-if="showSearch" class="popup">
      <div class="popup-card">
        <h3 class="font-bold mb-3">Cari Pasien</h3>
        <input type="text" v-model="search" placeholder="Cari NIK / Nama" class="border p-2 w-full mb-3" />
        <button @click="doSearch" class="bg-blue-600 text-white w-full p-2 rounded">Cari</button>
        <ul v-if="searchResult.length > 0" class="mt-3">
          <li v-for="p in searchResult" :key="p.id" @click="selectPasien(p)"
            class="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-100">
            {{ p.nama }} — {{ p.nik }}
          </li>
        </ul>
        <div class="text-center mt-3">
          <button @click="openAddPasien" class="text-pink-600 underline">+ Tambah Pasien Baru</button>
        </div>
        <button @click="closeAll" class="mt-4 w-full bg-gray-300 p-2 rounded">
          Tutup
        </button>
      </div>
    </div>

    <div v-if="showAddPasien" class="popup">
      <div class="popup-card">
        <h3 class="font-bold mb-3">Tambah Pasien Baru</h3>
        <input v-model="newPasien.nik" class="input" placeholder="NIK" />
        <input v-model="newPasien.nama" class="input" placeholder="Nama" />
        <select v-model="newPasien.jenis_kelamin" class="input">
          <option value="">Pilih Jenis Kelamin</option>
          <option value="L">Laki-Laki</option>
          <option value="P">Perempuan</option>
        </select>
        <input v-model="newPasien.no_hp" class="input" placeholder="No HP" />
        <input v-model="newPasien.alamat_lengkap" class="input" placeholder="Alamat Lengkap" />
        <input v-model="newPasien.kecamatan" class="input" placeholder="Kecamatan" />
        <input v-model="newPasien.kota" class="input" placeholder="Kota" />
        <input v-model="newPasien.provinsi" class="input" placeholder="Provinsi" />
        <button @click="savePasien" class="bg-green-600 text-white w-full p-2 rounded">
          Simpan Pasien
        </button>
        <button @click="closeAll" class="mt-3 w-full bg-gray-300 p-2 rounded">
          Tutup
        </button>
      </div>
    </div>

    <div v-if="showAddAntrian" class="popup">
      <div class="popup-card">
        <h3 class="font-bold mb-3">Tambah Antrian</h3>
        <input class="input" :value="selectedPasien.nama" disabled />
        <input class="input" :value="selectedPasien.nik" disabled />
        <select v-model="antrianForm.poli_id" class="input">
          <option value="">Pilih Poli</option>
          <option v-for="p in listPoli" :key="p.id" :value="p.id">
            {{ p.nama_poli }}
          </option>
        </select>
        <textarea v-model="antrianForm.keluhan" class="input" placeholder="Keluhan"></textarea>
        <select v-model="antrianForm.dokter_id" class="input">
          <option value="">Pilih Dokter</option>
          <option v-for="d in listDokter" :key="d.id" :value="d.id">
            {{ d.nama }}
          </option>
        </select>
        <button @click="saveAntrian" class="bg-blue-600 text-white w-full p-2 rounded">
          Daftar
        </button>
        <button @click="closeAll" class="mt-3 w-full bg-gray-300 p-2 rounded">
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

onMounted(() => {
  loadPoli(); 
  // setInterval(() => {
  //   loadToday();
  // }, 1000);
  loadToday();
});
</script>

<style>
.popup {
  position: fixed;
  inset: 0;
  background: #00000070;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-card {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 10px;
}

.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
