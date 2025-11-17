<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Manajemen Jadwal Dokter</h2>
    <form @submit.prevent="isEditing ? updateJadwal() : addJadwal()" class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block font-medium mb-1">Dokter</label>
          <select v-model="form.dokter_id" class="border p-2 rounded w-full">
            <option value="">-- Pilih Dokter --</option>
            <option v-for="dok in dokterList" :key="dok.id" :value="dok.id">
              {{ dok.nama }}
            </option>
          </select>
        </div>
        <div>
          <label class="block font-medium mb-1">Poli</label>
          <select v-model="form.poli_id" class="border p-2 rounded w-full">
            <option value="">-- Pilih Poli --</option>
            <option v-for="p in poliList" :key="p.id" :value="p.id">
              {{ p.nama_poli }}
            </option>
          </select>
        </div>
        <div>
          <label class="block font-medium mb-1">Hari</label>
          <select v-model="form.hari" class="border p-2 rounded w-full">
            <option value="">-- Pilih Hari --</option>
            <option>Senin</option>
            <option>Selasa</option>
            <option>Rabu</option>
            <option>Kamis</option>
            <option>Jumat</option>
            <option>Sabtu</option>
          </select>
        </div>
        <div>
          <label class="block font-medium mb-1">Jam Mulai</label>
          <input type="time" v-model="form.jam_mulai" class="border p-2 rounded w-full" />
        </div>
        <div>
          <label class="block font-medium mb-1">Jam Selesai</label>
          <input type="time" v-model="form.jam_selesai" class="border p-2 rounded w-full" />
        </div>
      </div>
      <div class="mt-4">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          {{ isEditing ? 'Update Jadwal' : 'Tambah Jadwal' }}
        </button>
        <button v-if="isEditing" type="button" @click="resetForm" class="ml-2 bg-gray-400 text-white px-4 py-2 rounded">
          Batal
        </button>
      </div>
    </form>
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-3">Daftar Jadwal Dokter</h3>
      <table class="w-full border">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2">No</th>
            <th class="border p-2">Nama Dokter</th>
            <th class="border p-2">Poli</th>
            <th class="border p-2">Hari</th>
            <th class="border p-2">Jam Mulai</th>
            <th class="border p-2">Jam Selesai</th>
            <th class="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in jadwalList" :key="item.id" class="text-center">
            <td class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">{{ item.nama_dokter }}</td>
            <td class="border p-2">{{ item.nama_poli }}</td>
            <td class="border p-2">{{ item.hari }}</td>
            <td class="border p-2">{{ item.jam_mulai }}</td>
            <td class="border p-2">{{ item.jam_selesai }}</td>
            <td class="border p-2">
              <button @click="editJadwal(item)" class="bg-yellow-400 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button @click="deleteJadwal(item.id)" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";


const api = axios.create({ baseURL: "http://localhost:3003/api" });
const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

const dokterList = ref([]);
const poliList = ref([]);
const jadwalList = ref([]);
const isEditing = ref(false);
const editId = ref(null);

const form = ref({
  dokter_id: "",
  poli_id: "",
  hari: "",
  jam_mulai: "",
  jam_selesai: "",
});

const getDokter = async () => {
  const res = await api.get("/dokter", config); 
  dokterList.value = res.data || [];
};

const getPoli = async () => {
  console.log("getPoli() dijalankan ✅");
  try {
    const res = await api.get("/poli", config);
    console.log("Response poli:", res.data);
    poliList.value = res.data.data || [];
  } catch (err) {
    console.error("Gagal ambil poli:", err.response?.data || err.message);
  }
};

const getJadwal = async () => {
  const res = await api.get("/dokter/jadwal", config);
  jadwalList.value = res.data.data || [];
};

const addJadwal = async () => {
  try {
    await api.post("/dokter/jadwal", form.value, config);
    await getJadwal();
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Jadwal dokter berhasil ditambahkan",
      timer: 1500,
      showConfirmButton: false,
    });
    resetForm();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menambah jadwal",
    });
  }
};

const editJadwal = (item) => {
  isEditing.value = true;
  editId.value = item.id;
  form.value = {
    dokter_id: item.dokter_id,
    poli_id: item.poli_id,
    hari: item.hari,
    jam_mulai: item.jam_mulai,
    jam_selesai: item.jam_selesai,
  };
};

const updateJadwal = async () => {
  try {
    await api.put(`/dokter/jadwal/${editId.value}`, form.value, config);
    await getJadwal();

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Jadwal dokter berhasil diperbarui",
      timer: 1500,
      showConfirmButton: false,
    });

    resetForm();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat mengupdate jadwal",
    });
  }
};


const deleteJadwal = async (id) => {
  const confirmDelete = await Swal.fire({
    title: "Hapus Jadwal?",
    text: "Data yang dihapus tidak bisa dikembalikan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e53e3e",
    cancelButtonColor: "#718096",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (confirmDelete.isConfirmed) {
    try {
      await api.delete(`/dokter/jadwal/${id}`, config);
      await getJadwal();

      Swal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Jadwal dokter berhasil dihapus.",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menghapus jadwal",
      });
    }
  }
};


const resetForm = () => {
  form.value = { dokter_id: "", poli_id: "", hari: "", jam_mulai: "", jam_selesai: "" };
  isEditing.value = false;
  editId.value = null;
};

onMounted(() => {
  getDokter();
  getPoli();
  getJadwal();
});
</script>
