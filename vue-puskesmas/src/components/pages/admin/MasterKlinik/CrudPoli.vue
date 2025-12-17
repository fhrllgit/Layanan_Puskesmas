<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-12 h-12 bg-gradient-to-br from-[#039ae59b] to-[#039BE5] rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Manajemen Poli</h1>
            <p class="text-sm text-gray-500">Kelola data poli klinik Anda</p>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSubmit"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
        <div class="bg-gradient-to-r from-[#039ae5c2] to-[#039BE5] px-6 py-4">
          <h2 class="text-lg font-semibold text-white flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ form.id ? "Edit Data Poli" : "Tambah Poli Baru" }}
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Nama Poli <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <input v-model="form.nama_poli" type="text"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  placeholder="Contoh: Poli Umum" required />
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Deskripsi
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <input v-model="form.deskripsi" type="text"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  placeholder="Deskripsi singkat tentang poli" />
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end">
            <button type="submit"
              class="bg-gradient-to-r from-[#039ae5c2] to-[#039BE5] cursor-pointer hover:from-[#027fbd] hover:to-[#016191] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ form.id ? "Update Poli" : "Tambah Poli" }}
            </button>
          </div>
        </div>
      </form>
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Daftar Poli
            </h2>
            <div class="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
              Total: <span class="font-bold text-[#039BE5]">{{ daftarPoli.length }}</span>
            </div>
          </div>
        </div>
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">No</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nama Poli</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Deskripsi</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(poli, index) in daftarPoli" :key="poli.id" class="hover:bg-blue-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="flex items-center justify-center w-8 h-8 bg-blue-100 text-[#039BE5] rounded-lg font-semibold text-sm">
                    {{ index + 1 }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-br from-[#039ae5c2] to-[#039BE5] rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span class="font-semibold text-gray-900">{{ poli.nama_poli }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-600">{{ poli.deskripsi || "-" }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ poli.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button @click="editPoli(poli)"
                      class="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow hover:shadow-md flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button @click="hapusPoli(poli.id)"
                      class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow hover:shadow-md flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- mobile jalan jalan-->
        <div class="md:hidden divide-y divide-gray-200">
          <div v-for="(poli, index) in daftarPoli" :key="poli.id" class="p-4 hover:bg-blue-50 transition-colors">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ poli.nama_poli }}</h3>
                  <p class="text-xs text-gray-500">No. {{ index + 1 }}</p>
                </div>
              </div>
              <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {{ poli.status }}
              </span>
            </div>

            <div class="mb-4 pl-13">
              <p class="text-sm text-gray-600">{{ poli.deskripsi || "-" }}</p>
            </div>

            <div class="flex gap-2 pl-13">
              <button @click="editPoli(poli)"
                class="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-2 rounded-lg font-medium transition-all shadow text-sm flex items-center justify-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button @click="hapusPoli(poli.id)"
                class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg font-medium transition-all shadow text-sm flex items-center justify-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>

        <div v-if="daftarPoli.length === 0" class="p-12 text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Belum Ada Data Poli</h3>
          <p class="text-gray-500">Mulai tambahkan data poli menggunakan form di atas</p>
        </div>
      </div>
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
