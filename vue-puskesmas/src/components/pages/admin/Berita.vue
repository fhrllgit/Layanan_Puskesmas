<template>
  <div class="p-5">
    <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="showAddModal = true">
      Tambah Berita
    </button>
    <hr class="my-4" />
    <div v-if="beritaList.length === 0" class="text-gray-500 text-center py-10">Belum ada berita.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <div v-for="b in beritaList" :key="b.id"
        class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">

        <div class="w-full h-48 overflow-hidden bg-gray-200">
          <img class="w-full h-full object-cover" :src="`http://localhost:3003/uploads/tmp/${b.gambar}`"
            :alt="b.gambar">
        </div>

        <div class="p-4 flex flex-col flex-grow">
          <h2 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{{ b.judul }}</h2>
          <div class="flex gap-5 items-center">
            <p class="text-xs text-blue-600 font-medium mb-2">{{ b.nama_tipe }}</p>
            <p class="text-xs text-[#787878] font-medium mb-2">{{ formatDate(b.created_at) }}</p>
          </div>
          <p class="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">{{ b.isi }}</p>
          <div class="flex gap-2 mt-auto">
            <button
              class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white font-medium transition-colors duration-200 flex-1"
              @click="bukaEdit(b.id)">
              Edit
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-medium transition-colors duration-200 flex-1"
              @click="deleteBerita(b.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal show tambahh -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h2>Tambah Berita</h2>
        <input v-model="form.judul" placeholder="Judul" class="input" />
        <textarea v-model="form.isi" placeholder="Isi berita" class="input"></textarea>
        <input type="date" v-model="form.tanggal" class="input" />
        <select v-model="form.tipe_id" class="input">
          <option disabled value="">-- pilih tipe --</option>
          <option v-for="t in tipeList" :value="t.id">{{ t.nama_tipe }}</option>
        </select>
        <label>Pilih Poli:</label>
        <div class="flex flex-wrap gap-2">
          <label v-for="p in poliList" :key="p.id">
            <input type="checkbox" :value="p.id" v-model="form.poli_ids" />
            {{ p.nama_poli }}
          </label>
        </div>
        <input type="file" @change="onFileChange" />
        <img v-if="previewImage" :src="previewImage" class="w-32 mt-3 rounded" />
        <div class="mt-4 flex justify-end gap-2">
          <button class="bg-gray-400 px-3 py-1 rounded" @click="showAddModal = false">Batal</button>
          <button class="bg-blue-600 text-white px-3 py-1 rounded" @click="tambahBerita">Simpan</button>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Edit Berita</h2>

        <input v-model="form.judul" class="input" />
        <textarea v-model="form.isi" class="input"></textarea>

        <input type="date" v-model="form.tanggal" class="input" />

        <select v-model="form.tipe_id" class="input">
          <option v-for="t in tipeList" :value="t.id">{{ t.nama_tipe }}</option>
        </select>

        <label>Pilih Poli:</label>
        <div class="flex flex-wrap gap-2">
          <label v-for="p in poliList" :key="p.id">
            <input type="checkbox" :value="p.id" v-model="form.poli_ids" />
            {{ p.nama_poli }}
          </label>
        </div>

        <input type="file" @change="onFileChange" />
        <img v-if="previewImage" :src="previewImage" class="w-32 mt-3 rounded" />

        <div class="mt-4 flex justify-end gap-2">
          <button class="bg-gray-400 px-3 py-1 rounded" @click="showEditModal = false">Batal</button>
          <button class="bg-yellow-600 text-white px-3 py-1 rounded" @click="updateBerita">Update</button>
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
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 450px;
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
