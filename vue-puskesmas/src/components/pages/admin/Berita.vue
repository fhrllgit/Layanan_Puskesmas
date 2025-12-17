<template>
  <div class="relative min-h-screen">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-40 right-20 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float">
      </div>
      <div
        class="absolute bottom-30 rotate-90 left-1/3 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float"
        style="animation-delay: 2s;">
      </div>
      <div class="absolute top-1/2 left-10 w-24 h-24 border-2 border-[#039BE5]/10 rounded-2xl rotate-12 animate-float"
        style="animation-delay: 4s;">
      </div>
      <div
        class="absolute bottom-40 right-1/4 w-28 h-28 border-2 border-[#039BE5]/10 rounded-2xl -rotate-12 animate-float"
        style="animation-delay: 6s;">
      </div>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <div
        class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-8 mb-6 backdrop-blur-sm border border-[#039BE5]/10">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Manajemen Berita</h1>
            <p class="text-gray-500">Kelola konten berita dan informasi SISMA</p>
          </div>
          <button @click="showAddModal = true"
            class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white px-6 py-3 rounded-xl shadow-lg shadow-[#039BE5]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#039BE5]/40 hover:-translate-y-0.5 font-medium flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Tambah Berita
          </button>
        </div>
      </div>
      <div v-if="beritaList.length === 0"
        class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-16 backdrop-blur-sm border border-[#039BE5]/10 text-center">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z">
          </path>
        </svg>
        <p class="text-gray-400 text-lg font-medium mb-2">Belum ada berita</p>
        <p class="text-gray-400 text-sm">Klik tombol "Tambah Berita" untuk membuat konten baru</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="b in beritaList" :key="b.id"
          class="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
          <div class="relative w-full h-56 overflow-hidden bg-gradient-to-br from-[#039BE5]/10 to-[#039BE5]/5">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              :src="`http://localhost:3003/uploads/tmp/${b.gambar}`" :alt="b.gambar">
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
            <div class="absolute top-4 right-4">
              <span class="bg-[#039BE5] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {{ b.nama_tipe }}
              </span>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <h2 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#039BE5] transition-colors">
              {{ b.judul }}
            </h2>
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="text-xs text-gray-500 font-medium">{{ formatDate(b.created_at) }}</p>
            </div>
            <p class="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">{{ b.isi }}</p>
            <div class="flex gap-3 mt-auto pt-4 border-t border-gray-100">
              <button @click="bukaEdit(b.id)"
                class="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                  </path>
                </svg>
                Edit
              </button>
              <button @click="deleteBerita(b.id)"
                class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        class="bg-white scrollbar-hide rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 transform animate-scale-in border-2 border-[#039BE5]/20">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Tambah Berita Baru</h2>
          <button @click="showAddModal = false"
            class="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Judul Berita</label>
            <input v-model="form.judul" placeholder="Masukkan judul berita"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Isi Berita</label>
            <textarea v-model="form.isi" placeholder="Tulis isi berita disini..." rows="5"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all resize-none"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal</label>
              <input type="date" v-model="form.tanggal"
                class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe Berita</label>
              <select v-model="form.tipe_id"
                class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all">
                <option disabled value="">-- Pilih Tipe --</option>
                <option v-for="t in tipeList" :key="t.id" :value="t.id">{{ t.nama_tipe }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Pilih Poli</label>
            <div class="flex flex-wrap gap-3">
              <label v-for="p in poliList" :key="p.id"
                class="flex items-center gap-2 bg-gray-50 hover:bg-[#039BE5]/5 px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-[#039BE5] cursor-pointer transition-all">
                <input type="checkbox" :value="p.id" v-model="form.poli_ids"
                  class="w-4 h-4 text-[#039BE5] rounded focus:ring-[#039BE5]" />
                <span class="text-sm font-medium text-gray-700">{{ p.nama_poli }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Gambar</label>
            <div
              class="border-2 border-dashed border-gray-300 hover:border-[#039BE5] rounded-xl p-6 text-center transition-all cursor-pointer">
              <input type="file" @change="onFileChange" class="hidden" id="fileInput" />
              <label for="fileInput" class="cursor-pointer">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="text-sm text-gray-600">Klik untuk upload gambar</p>
                <p class="text-xs text-gray-400 mt-1">PNG, JPG hingga 10MB</p>
              </label>
            </div>
            <img v-if="previewImage" :src="previewImage"
              class="w-full h-48 object-cover mt-4 rounded-xl border-2 border-gray-200" />
          </div>
        </div>

        <div class="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button @click="showAddModal = false"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-300">
            Batal
          </button>
          <button @click="tambahBerita"
            class="flex-1 bg-gradient-to-r from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#039BE5]/30">
            Simpan Berita
          </button>
        </div>
      </div>
    </div>

    <div v-if="showEditModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        class="bg-white scrollbar-hide rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 transform animate-scale-in border-2 border-[#039BE5]/20">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Edit Berita</h2>
          <button @click="showEditModal = false"
            class="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Judul Berita</label>
            <input v-model="form.judul"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Isi Berita</label>
            <textarea v-model="form.isi" rows="5"
              class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all resize-none"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal</label>
              <input type="date" v-model="form.tanggal"
                class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe Berita</label>
              <select v-model="form.tipe_id"
                class="w-full border-2 border-gray-200 focus:border-[#039BE5] focus:ring-2 focus:ring-[#039BE5]/20 p-3 rounded-xl outline-none transition-all">
                <option v-for="t in tipeList" :key="t.id" :value="t.id">{{ t.nama_tipe }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Pilih Poli</label>
            <div class="flex flex-wrap gap-3">
              <label v-for="p in poliList" :key="p.id"
                class="flex items-center gap-2 bg-gray-50 hover:bg-[#039BE5]/5 px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-[#039BE5] cursor-pointer transition-all">
                <input type="checkbox" :value="p.id" v-model="form.poli_ids"
                  class="w-4 h-4 text-[#039BE5] rounded focus:ring-[#039BE5]" />
                <span class="text-sm font-medium text-gray-700">{{ p.nama_poli }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Gambar Baru</label>
            <div
              class="border-2 border-dashed border-gray-300 hover:border-[#039BE5] rounded-xl p-6 text-center transition-all cursor-pointer">
              <input type="file" @change="onFileChange" class="hidden" id="fileInputEdit" />
              <label for="fileInputEdit" class="cursor-pointer">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="text-sm text-gray-600">Klik untuk upload gambar baru</p>
                <p class="text-xs text-gray-400 mt-1">PNG, JPG hingga 10MB</p>
              </label>
            </div>
            <img v-if="previewImage" :src="previewImage"
              class="w-full h-48 object-cover mt-4 rounded-xl border-2 border-gray-200" />
          </div>
        </div>
        <div class="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button @click="showEditModal = false"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-300">
            Batal
          </button>
          <button @click="updateBerita"
            class="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30">
            Update Berita
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const token = localStorage.getItem("token");
const beritaList = ref([]);
const tipeList = ref([]);
const poliList = ref([]);
const showAddModal = ref(false);
const showEditModal = ref(false);
const form = ref({
  judul: "",
  isi: "",
  tanggal: "",
  tipe_id: "",
  poli_ids: [],
  gambar: null
});
const editId = ref(null);
const previewImage = ref(null);

const getBerita = async () => {
  try {
    const res = await axios.get("http://localhost:3003/api/berita", {
      headers: { Authorization: `Bearer ${token}` }
    });
    beritaList.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const loadOptions = async () => {
  const tipeRes = await axios.get("http://localhost:3003/api/berita/tipe-berita", {
    headers: { Authorization: `Bearer ${token}` }
  });
  tipeList.value = tipeRes.data.data;

  const poliRes = await axios.get("http://localhost:3003/api/poli", {
    headers: { Authorization: `Bearer ${token}` }
  });
  poliList.value = poliRes.data.data;
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  form.value.gambar = file;

  previewImage.value = URL.createObjectURL(file);
};

const tambahBerita = async () => {
  try {
    const fd = new FormData();
    fd.append("judul", form.value.judul);
    fd.append("isi", form.value.isi);
    fd.append("tanggal", form.value.tanggal);
    fd.append("tipe_id", form.value.tipe_id);
    fd.append("poli_ids", JSON.stringify(form.value.poli_ids));

    if (form.value.gambar) fd.append("gambar", form.value.gambar);

    await axios.post("http://localhost:3003/api/berita", fd, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    Swal.fire("Berhasil", "Berita berhasil ditambahkan", "success");
    form.value = {
      judul: "",
      isi: "",
      tanggal: "",
      tipe_id: "",
      poli_ids: [],
      gambar: null
    };

    previewImage.value = null;

    showAddModal.value = false;
    getBerita();
  } catch (e) {
    console.log(e);
  }
};

const bukaEdit = async (id) => {
  editId.value = id;
  const res = await axios.get(`http://localhost:3003/api/berita/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const b = res.data;

  form.value = {
    judul: b.judul,
    isi: b.isi,
    tanggal: b.tanggal ? b.tanggal.split("T")[0] : "",
    tipe_id: b.tipe_id,
    poli_ids: b.poli.map(p => p.id),
    gambar: null
  };
  previewImage.value = b.gambar ? `http://localhost:3003/uploads/tmp/${b.gambar}` : null;
  showEditModal.value = true;
};

const updateBerita = async () => {
  try {
    const fd = new FormData();
    fd.append("judul", form.value.judul);
    fd.append("isi", form.value.isi);
    const dateOnly = form.value.tanggal.includes("T")
      ? form.value.tanggal.split("T")[0]
      : form.value.tanggal;

    fd.append("tanggal", dateOnly);
    fd.append("tipe_id", form.value.tipe_id);
    fd.append("poli_ids", JSON.stringify(form.value.poli_ids));
    if (form.value.gambar) fd.append("gambar", form.value.gambar);

    await axios.put(
      `http://localhost:3003/api/berita/${editId.value}`,
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    Swal.fire("Berhasil", "Berita berhasil diperbarui", "success");
    showEditModal.value = false;
    getBerita();
  } catch (e) {
    console.log(e);
  }
};

const deleteBerita = async (id) => {
  Swal.fire({
    title: "Hapus Berita?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.delete(`http://localhost:3003/api/berita/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire("Berhasil", "Berita berhasil dihapus", "success");
      getBerita();
    }
  });
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
  loadOptions();
  getBerita();
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
