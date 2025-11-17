 <template>
  <div>
    <h1 class="text-[#d34341] font-semibold text-3xl mb-5">Tambah Pengguna Baru</h1>
    <form @submit.prevent="handleAddUser" class="space-y-3">
  
      <input v-model="nama" placeholder="Nama" class="border p-2 rounded w-full" />
      <input v-model="email" placeholder="Email" class="border p-2 rounded w-full" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded w-full" />
  
      <select v-model="role" class="border p-2 rounded w-full">
        <option value="dokter">Dokter</option>
        <option value="apoteker">Apoteker</option>
      </select>

      <select v-if="role === 'dokter'" v-model="poli_id" class="border p-2 rounded w-full">
        <option disabled value="">Pilih Poli</option>
        <option v-for="p in poliList" :key="p.id" :value="p.id">
          {{ p.nama_poli }}
        </option>
      </select>
  
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Tambah
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const nama = ref("");
const email = ref("");
const password = ref("");
const role = ref("dokter");
const poli_id = ref("");

const poliList = ref([]);

const api_url = "http://localhost:3003";

const getPoli = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${api_url}/api/poli`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    poliList.value = res.data.data;

  } catch (err) {
    console.error("Gagal memuat poli:", err.response?.data);
  }
};


const handleAddUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (role.value === "dokter" && !poli_id.value) {
      Swal.fire({ icon: "warning", title: "Pilih Poli!", text: "Dokter wajib memilih poli." });
      return;
    }

    const res = await axios.post(
      `${api_url}/api/users/add-user`,
      {
        nama: nama.value,
        email: email.value,
        password: password.value,
        role: role.value,
        poli_id: role.value === "dokter" ? poli_id.value : null
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: res.data.message,
      timer: 1500,
      showConfirmButton: false
    });

    nama.value = "";
    email.value = "";
    password.value = "";
    role.value = "dokter";
    poli_id.value = "";

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: err.response?.data?.message || "Terjadi kesalahan"
    });
  }
};

onMounted(() => {
  getPoli();
});
</script>
