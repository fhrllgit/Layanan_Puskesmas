<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Antrian Pasien {{ namaPoli }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold">Total Pasien Hari Ini</h3>
        <p class="text-2xl font-bold mt-2">{{ totalPasien }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold">Nomor Giliran Berikutnya</h3>
        <p class="text-2xl font-bold mt-2">{{ nomorBerikutnya }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold">Pasien Dipanggil</h3>
        <p class="text-2xl font-bold mt-2">{{ pasienDipanggil?.nomor_antrian || '-' }}</p>
      </div>
    </div>
    <div class="space-y-4">
      <div v-for="a in antrian" :key="a.id" class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
        <div>
          <h4 class="font-semibold">{{ a.nomor_antrian }} - {{ a.pasien_nama }}</h4>
          <p class="text-sm text-gray-500">Status: {{ a.status }}</p>
        </div>
        <div class="flex gap-2">
          <button v-if="a.status === 'menunggu'" @click="panggilPasien(a)"
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            Panggil
          </button>
          <button v-if="a.status === 'menunggu'" @click="hapusAntrian(a)"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
            Batal
          </button>
          <button v-if="a.status === 'dipanggil'" @click="batalPasien(a)"
            class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Batal Panggil
          </button>
          <button v-if="a.status === 'dipanggil'" @click="openModal(a)"
            class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
            Selesai
          </button>
        </div>
      </div>
    </div>
    <!-- modal resep -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div class="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl">
        <h2 class="text-xl font-semibold mb-4">
          Input Rekam Medis & Resep
        </h2>
        <div class="space-y-3">
          <textarea v-model="form.keluhan" class="w-full border rounded p-2" placeholder="Keluhan"></textarea>
          <textarea v-model="form.diagnosis" class="w-full border rounded p-2" placeholder="Diagnosis"></textarea>
          <textarea v-model="form.tindakan" class="w-full border rounded p-2" placeholder="Tindakan"></textarea>
        </div>
        <hr class="my-4">
        <div>
          <h3 class="font-semibold mb-2">Resep Obat</h3>
          <div v-for="(obat, index) in form.obatList" :key="index" class="grid grid-cols-2 gap-2 mb-2">
            <input v-model="obat.nama_obat" placeholder="Nama Obat" class="border rounded p-1" />
            <input v-model="obat.dosis" placeholder="Dosis (cth: 3x1)" class="border rounded p-1" />
            <input type="number" v-model="obat.jumlah" placeholder="Jumlah" class="border rounded p-1" />
            <input v-model="obat.keterangan" placeholder="Keterangan" class="border rounded p-1" />
          </div>
          <button @click="addObat" class="text-blue-600 text-sm mt-2 hover:underline">
            + Tambah Obat
          </button>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button @click="showModal = false" class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">
            Batal
          </button>
          <button @click="submitForm" class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { io } from "socket.io-client";

// const user = JSON.parse(localStorage.getItem("user"));
// const dokterPoli = ref({
//   id: user.poli_id,
//   nama_poli: user.nama_poli
// });

const api = axios.create({ baseURL: "http://localhost:3003/api/dokter" });
const socket = io("http://localhost:3003", {
  transports: ["websocket"],
});
const showModal = ref(false);
const selectedPasien = ref(null);
const form = reactive({
  keluhan: "",
  diagnosis: "",
  tindakan: "",
  obatList: [
    { nama_obat: "", dosis: "", jumlah: 1, keterangan: "" }
  ]
});
const antrian = ref([]);
const namaPoli = ref([])
const pasienDipanggil = ref(null);

socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
socket.on("disconnect", () => console.log("❌ Socket disconnected"));
socket.on("antrian:baru", () => fetchAntrian());

const fetchAntrian = async () => {
  try {
    const res = await api.get("/antrian", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    antrian.value = res.data.data;
    namaPoli.value = res.data.nama_poli;
    pasienDipanggil.value = antrian.value.find(a => a.status === "dipanggil");
  } catch (err) {
    console.error("Gagal ambil antrian:", err);
  }
};

// const fetchAntrian = async () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const dokter_id = user.id; 

//     const res = await api.get(`/antrian/${dokter_id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });

//     antrian.value = res.data.data;
//     namaPoli.value = res.data.nama_poli;
//     pasienDipanggil.value = antrian.value.find(a => a.status === "dipanggil");
//   } catch (err) {
//     console.error("Gagal ambil antrian:", err);
//   }
// };


socket.on("antrian:update", () => fetchAntrian());
onMounted(() => fetchAntrian());

const totalPasien = computed(() => antrian.value.length);
const nomorBerikutnya = computed(() => {
  const menunggu = antrian.value.filter(a => a.status === 'menunggu');
  return menunggu.length ? menunggu[0].nomor_antrian : "-";
});

const panggilPasien = async (a) => {
  try {
    await api.post(`/antrian/panggil/${a.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    Swal.fire("Dipanggil!", `Pasien ${a.nomor_antrian} dipanggil`, "success");
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Gagal panggil pasien", "error");
  }
};

const batalPasien = async (a) => {
  try {
    await api.post(`/antrian/batal/${a.id}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    Swal.fire("Batal!", `Pasien ${a.nomor_antrian} dikembalikan ke menunggu`, "info");
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Gagal batal pasien", "error");
  }
};

const addObat = () => {
  form.obatList.push({ nama_obat: "", dosis: "", jumlah: 1, keterangan: "" });
};

const openModal = (pasien) => {
  selectedPasien.value = pasien;
  showModal.value = true;
};

const submitForm = async () => {
  if (!form.keluhan || !form.diagnosis || !form.tindakan) {
    Swal.fire("Peringatan", "Semua field rekam medis wajib diisi!", "warning");
    return;
  }
  if (form.obatList.filter(o => o.nama_obat.trim() !== "").length === 0) {
    Swal.fire("Peringatan", "Minimal satu obat harus diisi!", "warning");
    return;
  }

  try {
    await api.post(`/antrian/selesai/${selectedPasien.value.id}`, {
      keluhan: form.keluhan,
      diagnosis: form.diagnosis,
      tindakan: form.tindakan,
      items: form.obatList,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    Swal.fire("Selesai!", `Pasien ${selectedPasien.value.nomor_antrian} selesai diperiksa`, "success");
    showModal.value = false;
  } catch (err) {
    console.error("Error submitForm:", err.response || err);
    Swal.fire("Error", err.response?.data?.message || "Gagal update pasien", "error");
  }
};

// const selesaiPasien = async (a) => {
//   let obatList = [];

//   const addObatInput = () => {
//     const container = document.getElementById("obat-container");
//     const div = document.createElement("div");
//     div.classList.add("mb-2");
//     div.innerHTML = `
//       <input class="swal2-input" placeholder="Nama Obat" name="nama_obat">
//       <input class="swal2-input" placeholder="Dosis (cth: 3x1)" name="dosis">
//       <input class="swal2-input" type="number" placeholder="Jumlah" name="jumlah">
//       <input class="swal2-input" placeholder="Keterangan" name="keterangan">
//     `;
//     container.appendChild(div);
//   };

//   const { value: formValues } = await Swal.fire({
//     title: "Input Rekam Medis & Resep",
//     html: `
//       <textarea id="swal-keluhan" class="swal2-textarea" placeholder="Keluhan"></textarea>
//       <textarea id="swal-diagnosis" class="swal2-textarea" placeholder="Diagnosis"></textarea>
//       <textarea id="swal-tindakan" class="swal2-textarea" placeholder="Tindakan"></textarea>
//       <hr>
//       <div id="obat-container"></div>
//       <button type="button" id="add-obat-btn" class="swal2-confirm swal2-styled" style="background:#3085d6">+ Tambah Obat</button>
//     `,
//     didOpen: () => {
//       addObatInput(); 
//       document.getElementById("add-obat-btn").addEventListener("click", addObatInput);
//     },
//     preConfirm: () => {
//       const keluhan = document.getElementById("swal-keluhan").value;
//       const diagnosis = document.getElementById("swal-diagnosis").value;
//       const tindakan = document.getElementById("swal-tindakan").value;

//       const obatInputs = document.querySelectorAll("#obat-container div");
//       obatList = Array.from(obatInputs).map(div => ({
//         nama_obat: div.querySelector('[name="nama_obat"]').value,
//         dosis: div.querySelector('[name="dosis"]').value,
//         jumlah: div.querySelector('[name="jumlah"]').value || 1,
//         keterangan: div.querySelector('[name="keterangan"]').value,
//       })).filter(obat => obat.nama_obat.trim() !== "");

//       if (!keluhan || !diagnosis || !tindakan)
//         Swal.showValidationMessage("Semua field rekam medis wajib diisi");

//       if (obatList.length === 0)
//         Swal.showValidationMessage("Minimal satu obat harus diisi");

//       return { keluhan, diagnosis, tindakan, items: obatList };
//     },
//   });

//   if (!formValues) return;

//   try {
//     await api.post(`/antrian/selesai/${a.id}`, formValues, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     Swal.fire("Selesai!", `Pasien ${a.nomor_antrian} selesai diperiksa`, "success");
//   } catch (err) {
//     Swal.fire("Error", err.response?.data?.message || "Gagal update pasien", "error");
//   }
// };

const hapusAntrian = async (a) => {
  const konfirmasi = await Swal.fire({
    title: "Batalkan Antrian?",
    text: `Yakin ingin membatalkan antrian ${a.nomor_antrian}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya",
  });
  if (!konfirmasi.isConfirmed) return;
  const { value: keterangan } = await Swal.fire({
    title: "Alasan Pembatalan",
    input: "textarea",
    inputPlaceholder: "Masukkan alasan pembatalan...",
    inputLabel: "Keterangan",
    showCancelButton: true,
    confirmButtonText: "Simpan",
  });

  if (!keterangan || keterangan.trim() === "") {
    Swal.fire("Oops!", "Keterangan wajib diisi.", "warning");
    return;
  }

  try {
    await api.put(
      `/antrian/delete/${a.id}`,
      { keterangan },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    Swal.fire("Dibatalkan!", `Antrian ${a.nomor_antrian} telah dibatalkan.`, "success");
    fetchAntrian();
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Gagal membatalkan antrian", "error");
  }
};
</script>
