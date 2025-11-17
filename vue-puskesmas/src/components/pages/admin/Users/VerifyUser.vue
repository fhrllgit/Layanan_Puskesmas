<template>
  <div class="p-4 sm:p-6 lg:p-8 border">
    <h2 class="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Verifikasi Pendaftaran Pasien</h2>
    <div class="block lg:hidden space-y-4">
      <div v-for="user in users" :key="user.id" class="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div class="space-y-3">
          <div>
            <p class="text-xs text-gray-500 mb-1">Nama</p>
            <p class="font-medium text-gray-800">{{ user.nama }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Email</p>
            <p class="text-sm text-gray-700">{{ user.email }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Status</p>
            <select v-model="user.status"
              class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button @click="updateStatus(user)"
            class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Simpan
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white min-w-max  rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div class="w-262 scrollbar-hide overflow-x-auto relative">
        <table class="min-w-[1200px] w-full border-collapse divide-y divide-gray-200">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Nama</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Jenis Kelamin</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Email</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">No HP</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Alamat</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Kecamatan</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Kota</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Provinsi</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">NIK</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">No BPJS</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">KTP</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
              <th
                class="p-4 text-left text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap sticky right-0 bg-gray-700 z-10">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
              <td class="p-4 text-gray-800 whitespace-nowrap">{{ user.nama }}</td>
              <td class="p-4 text-gray-800 whitespace-nowrap">{{ user.jenis_kelamin }}</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ user.email }}</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ user.no_hp }}</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ user.alamat_lengkap }}</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ user.kecamatan }}</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ user.kota }}</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ user.provinsi }}</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ user.nik }}</td>
              <td class="p-4 text-gray-700 whitespace-nowrap">{{ user.no_bpjs }}</td>
              <td @click="showImage(user.ktp_file)" class="p-4 text-gray-700 whitespace-nowrap cursor-pointer">
                <img :src="`http://localhost:3003/uploads/tmp/${user.ktp_file}`" :alt="user.ktp_file"
                  class="w-24 h-auto rounded border" />
              </td>
              <td class="p-4 whitespace-nowrap">
                <select v-model="user.status"
                  class="border border-gray-300 cursor-pointer rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white">
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td class="p-4 sticky right-0 bg-white shadow-lg z-10 whitespace-nowrap border-l border-gray-200">
                <button @click="updateStatus(user)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Simpan
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 class="font-semibold text-lg mb-4 text-gray-800">Alasan Penolakan</h3>
        <textarea v-model="alasan" rows="4" placeholder="Masukkan alasan penolakan..."
          class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"></textarea>
        <div class="flex justify-end gap-3 mt-5">
          <button @click="showModal = false"
            class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            Batal
          </button>
          <button @click="submitRejection"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'
import Swal from 'sweetalert2'

const users = ref([])
const showModal = ref(false)
const alasan = ref('')
const selectedUser = ref(null)
const api_url = "http://localhost:3003"
const socket = io(api_url)


// onMounted(async () => {
//   const res = await axios.get(`${api_url}/api/users/pending`)
//   users.value = res.data
// })

const fetchPendingUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api_url}/api/users/pending`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    users.value = res.data;
  } catch (err) {
    console.error("Error fetching pending users:", err);
    if (err.response && err.response.status === 401) {
      alert("Token tidak valid atau sudah logout, silakan login kembali");
      window.location.href = "/login";
    }
  }
};

const showImage = (imgPath) => {
  Swal.fire({
    title: 'Foto KTP',
    html: `
      <div style="
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        gap: 10px;
      ">
        <img src="http://localhost:3003/uploads/tmp/${imgPath}"  alt="KTP" 
          style="
            max-width: 50vw; 
            max-height: 30vh; 
            border-radius: 10px;
            object-fit: contain;
            box-shadow: #fff;
          "
        />
        <button 
          id="closeBtn" 
          style="
            background-color: red;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
          "
        >
          Tutup
        </button>
      </div>
    `,
    showConfirmButton: false,
    background: "rgba(0,0,0,0.8)",
    backdrop: "rgba(0,0,0,0.8)",
    width: "auto",
    didOpen: () => {
      document.getElementById("closeBtn").addEventListener("click", () => {
        Swal.close();
      });
    }
  });
};

const updateStatus = async (user) => {
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire({
      icon: "error",
      title: "Token tidak ditemukan",
      text: "Silakan login ulang",
    });
    return;
  }
  if (user.status === 'rejected') {
    selectedUser.value = user;
    showModal.value = true;
  } else {
    try {
      await axios.put(
        `${api_url}/api/users/status/${user.id}`,
        { status: user.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Status berhasil diperbarui',
        confirmButtonColor: '#10B981'
      });
      fetchPendingUsers();
    } catch (err) {
      console.error("Gagal update status:", err);
      if (err.response && err.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Token tidak valid",
          text: "Silakan login ulang",
        });
        window.location.href = "/login";
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal update status",
          text: err.response?.data?.message || "Terjadi kesalahan",
        });
      }
    }
  }
};

const submitRejection = async () => {
  const token = localStorage.getItem("token") 

  try {
    await axios.put(
      `${api_url}/api/users/status/${selectedUser.value.id}`,
      {
        status: 'rejected',
        rejected_alasan: alasan.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }
    )

    showModal.value = false
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Penolakan berhasil dikirim',
      confirmButtonColor: '#10B981'
    })

  } catch (err) {
    console.error("Gagal kirim penolakan:", err)

    if (err.response && err.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Token tidak valid',
        text: 'Silakan login ulang',
      })
      window.location.href = '/login'
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal mengirim penolakan',
        text: err.response?.data?.message || 'Terjadi kesalahan',
      })
    }
  }
}

onMounted(() => {
  fetchPendingUsers()

  socket.on("user_pending_update", (data) => {
    console.log("User baru pending:", data)
    fetchPendingUsers()
  })

  socket.on("user_status_update", (data) => {
    console.log("Status user berubah:", data)
    fetchPendingUsers()
  })
})
</script>
