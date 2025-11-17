<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Manajemen Poli</h1>
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md p-4 rounded-md mb-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nama Poli</label>
          <input v-model="form.nama_poli" type="text" class="w-full border rounded-md p-2 mt-1" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Deskripsi</label>
          <input v-model="form.deskripsi" type="text" class="w-full border rounded-md p-2 mt-1" />
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          {{ form.id ? "Update Poli" : "Tambah Poli" }}
        </button>
      </div>
    </form>

    <div class="bg-white shadow-md rounded-md overflow-hidden">
      <table class="min-w-full text-left border">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 border">No</th>
            <th class="px-4 py-2 border">Nama Poli</th>
            <th class="px-4 py-2 border">Deskripsi</th>
            <th class="px-4 py-2 border">Status</th>
            <th class="px-4 py-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(poli, index) in daftarPoli" :key="poli.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 border">{{ index + 1 }}</td>
            <td class="px-4 py-2 border">{{ poli.nama_poli }}</td>
            <td class="px-4 py-2 border">{{ poli.deskripsi || "-" }}</td>
            <td class="px-4 py-2 border">{{ poli.status }}</td>
            <td class="px-4 py-2 border text-center space-x-2">
              <button @click="editPoli(poli)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">Edit</button>
              <button @click="hapusPoli(poli.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPoli, addPoli, updatePoli, deletePoli } from "../../../../api/poliApi";

const daftarPoli = ref([]);
const form = ref({ id: null, nama_poli: "", deskripsi: "" });

const fetchPoli = async () => {
  try {
    const res = await getPoli();
    daftarPoli.value = res.data.data;
  } catch (err) {
    console.error("Gagal mengambil data poli:", err);
  }
};

const handleSubmit = async () => {
  try {
    if (form.value.id) {
      await updatePoli(form.value.id, form.value);
    } else {
      await addPoli(form.value);
    }
    await fetchPoli();
    resetForm();
  } catch (err) {
    console.error("Gagal menyimpan poli:", err);
  }
};

const editPoli = (poli) => {
  form.value = { ...poli };
};
const hapusPoli = async (id) => {
  if (confirm("Yakin ingin menghapus poli ini?")) {
    await deletePoli(id);
    await fetchPoli();
  }
};
const resetForm = () => {
  form.value = { id: null, nama_poli: "", deskripsi: "" };
};

onMounted(fetchPoli);
</script>

<style scoped>
table {
  width: 100%;
}
</style>
