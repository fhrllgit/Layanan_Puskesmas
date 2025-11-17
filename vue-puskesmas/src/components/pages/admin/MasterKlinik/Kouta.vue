<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Manajemen Kuota Poli</h2>
        <form @submit.prevent="isEditing ? updateKuota() : addKuota()" class="bg-white p-4 rounded-lg shadow mb-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <label class="block font-medium mb-1">Tanggal</label>
                    <input type="date" v-model="form.tanggal" class="border p-2 rounded w-full" />
                </div>

                <div>
                    <label class="block font-medium mb-1">Jumlah Kuota</label>
                    <input type="number" v-model="form.max_antrian" class="border p-2 rounded w-full" min="1" />
                </div>
            </div>

            <div class="mt-4">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {{ isEditing ? "Update Kuota" : "Tambah Kuota" }}
                </button>
                <button v-if="isEditing" type="button" @click="resetForm"
                    class="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                    Batal
                </button>
            </div>
        </form>
        <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-3">Daftar Kuota Poli</h3>
            <table class="w-full border">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="border p-2">No</th>
                        <th class="border p-2">Poli</th>
                        <th class="border p-2">Tanggal</th>
                        <th class="border p-2">Jam Mulai</th>
                        <th class="border p-2">Jam Selesai</th>
                        <th class="border p-2">Kuota</th>
                        <th class="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in kuotaList" :key="item.id" class="text-center">
                        <td class="border p-2">{{ index + 1 }}</td>
                        <td class="border p-2">{{ item.nama_poli }}</td>
                        <td class="border p-2">{{ item.tanggal }}</td>
                        <td class="border p-2">{{ item.jam_mulai }}</td>
                        <td class="border p-2">{{ item.jam_selesai }}</td>
                        <td class="border p-2">{{ item.max_antrian }}</td>
                        <td class="border p-2">
                            <button @click="editKuota(item)"
                                class="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500">
                                Edit
                            </button>
                            <button @click="deleteKuota(item.id)"
                                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                Hapus
                            </button>
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

const api = axios.create({
    baseURL: "http://localhost:3003/api",
});
const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

const kuotaList = ref([]);
const poliList = ref([]);

const form = ref({
    poli_id: "",
    tanggal: "",
    max_antrian: "",
});

const isEditing = ref(false);
const editId = ref(null);

const getKuota = async () => {
    const res = await api.get("/kuota", config);
    kuotaList.value = res.data.data || [];
};

const getPoli = async () => {
    const res = await api.get("/poli", config);
    poliList.value = res.data.data || [];
};

const addKuota = async () => {
    try {
        await api.post("/kuota", form.value, config);
        await getKuota();
        Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Kouta berhasil di tambahkan",
            timer: 1500,
            showConfirmButton: false
        })
        resetForm();
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Gagal",
            text: `Gagal menambah kouta, ${err.response?.data?.message || err.message}`
        })
        // console.error("Gagal menambah kouta:", err.response?.data?.message || err.message);
    }
};


const editKuota = (item) => {
    isEditing.value = true;
    editId.value = item.id;
    form.value = {
        poli_id: item.poli_id,
        tanggal: item.tanggal,
        max_antrian: item.max_antrian,
    };
};

const updateKuota = async () => {
    await api.put(`/kuota/${editId.value}`, form.value, config);
    await getKuota();
    resetForm();
};

const deleteKuota = async (id) => {
    if (confirm("Yakin ingin menghapus kuota ini?")) {
        await api.delete(`/kuota/${id}`, config);
        await getKuota();
    }
};

const resetForm = () => {
    form.value = {
        poli_id: "",
        tanggal: "",
        max_antrian: "",
    };
    isEditing.value = false;
    editId.value = null;
};

onMounted(() => {
    getKuota();
    getPoli();
});
</script>
