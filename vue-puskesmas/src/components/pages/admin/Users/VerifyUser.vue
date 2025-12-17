<template>
  <div class="relative min-h-screen ">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 opacity-[0.03]"
        style="background-image: linear-gradient(#039BE5 1px, transparent 1px), linear-gradient(90deg, #039BE5 1px, transparent 1px); background-size: 50px 50px;">
      </div>
      <div class="absolute top-40 right-20 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float">
      </div>
      <div
        class="absolute bottom-30 rotate-90 left-1/3 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float"
        style="animation-delay: 2s;">
      </div>
      <div class="absolute top-1/2 left-10 w-24 h-24 border-2 border-[#039BE5]/10 rounded-2xl rotate-12 animate-float"
        style="animation-delay: 4s;">
      </div>
    </div>

    <div class="relative max-w-[66rem] mx-auto">
      <div
        class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-6 sm:p-8 mb-6 backdrop-blur-sm border border-[#039BE5]/10">
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-[#039BE5] to-[#0288D1] p-3 rounded-2xl shadow-lg shadow-[#039BE5]/30">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Verifikasi Pendaftaran Pasien</h2>
            <p class="text-gray-500 text-sm mt-1">Review dan verifikasi data pendaftaran pasien baru</p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div class="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200">
            <div class="flex items-center gap-3">
              <div class="bg-amber-500 p-2 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-600 font-medium">Menunggu</p>
                <p class="text-xl font-bold text-gray-800">{{users.filter(u => u.status === 'pending').length}}</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200">
            <div class="flex items-center gap-3">
              <div class="bg-emerald-500 p-2 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-600 font-medium">Disetujui</p>
                <p class="text-xl font-bold text-gray-800">{{users.filter(u => u.status === 'active').length}}</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-4 border border-red-200">
            <div class="flex items-center gap-3">
              <div class="bg-red-500 p-2 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                  </path>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-600 font-medium">Ditolak</p>
                <p class="text-xl font-bold text-gray-800">{{users.filter(u => u.status === 'rejected').length}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="block lg:hidden space-y-4">
        <div v-for="user in users" :key="user.id"
          class="bg-white border border-[#039BE5]/20 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 backdrop-blur-sm">
          <div class="space-y-4">
            <div class="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div
                class="w-14 h-14 rounded-full bg-gradient-to-br from-[#039BE5] to-[#0288D1] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {{ user.nama.charAt(0).toUpperCase() }}
              </div>
              <div class="flex-1">
                <p class="font-bold text-gray-800 text-lg">{{ user.nama }}</p>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-1">Jenis Kelamin</p>
                <p class="font-medium text-gray-800">{{ user.jenis_kelamin }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-1">No HP</p>
                <p class="font-medium text-gray-800">{{ user.no_hp }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-1">NIK</p>
                <p class="font-medium text-gray-800">{{ user.nik }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-1">No BPJS</p>
                <p class="font-medium text-gray-800">{{ user.no_bpjs || '-' }}</p>
              </div>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-500 mb-1">Alamat Lengkap</p>
              <p class="text-sm text-gray-700">{{ user.alamat_lengkap }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ user.kecamatan }}, {{ user.kota }}, {{ user.provinsi }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-500 mb-2">Foto KTP</p>
              <img @click="showImage(user.ktp_file)" :src="`http://localhost:3003/uploads/tmp/${user.ktp_file}`"
                :alt="user.ktp_file"
                class="w-full h-32 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#039BE5] transition-all" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Status Verifikasi</label>
              <select v-model="user.status"
                class="w-full border-2 border-gray-200 rounded-xl p-3 text-sm focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all bg-white">
                <option value="pending">⏳ Pending</option>
                <option value="active">✅ Active</option>
                <option value="rejected">❌ Rejected</option>
              </select>
            </div>
            <button @click="updateStatus(user)"
              class="w-full bg-gradient-to-r from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#039BE5]/30 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4">
                </path>
              </svg>
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>

      <div class="hidden lg:block">
        <div
          class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 overflow-hidden backdrop-blur-sm border border-[#039BE5]/10">
          <div class="overflow-x-auto scrollbar-hide">
            <table class="w-full min-w-[1400px]">
              <thead>
                <tr class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] text-white">
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">Nama</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">Jenis Kelamin</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">Email</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">No HP</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">Alamat</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">Kecamatan</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">Kota</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">Provinsi</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">NIK</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">No BPJS</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">KTP</th>
                  <th class="px-4 py-4 text-left font-semibold whitespace-nowrap">Status</th>
                  <th
                    class="px-4 py-4 text-left font-semibold whitespace-nowrap sticky right-0 bg-gradient-to-r from-[#0288D1] to-[#0277BD] z-10 shadow-lg">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="user in users" :key="user.id"
                  class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-[#039BE5]/5 hover:to-transparent transition-all duration-200">
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-[#039BE5] to-[#0288D1] flex items-center justify-center text-white font-semibold shadow-lg">
                        {{ user.nama.charAt(0).toUpperCase() }}
                      </div>
                      <span class="font-medium text-gray-800">{{ user.nama }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap">
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm">
                      <span v-if="user.jenis_kelamin === 'L'">👨</span>
                      <span v-else>👩</span>
                      {{ user.jenis_kelamin }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap">{{ user.email }}</td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap">{{ user.no_hp }}</td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap max-w-xs truncate">{{ user.alamat_lengkap }}
                  </td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap">{{ user.kecamatan }}</td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap">{{ user.kota }}</td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap">{{ user.provinsi }}</td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap">{{ user.nik }}</td>
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap">{{ user.no_bpjs || '-' }}</td>
                  <td @click="showImage(user.ktp_file)" class="px-4 py-4 whitespace-nowrap cursor-pointer">
                    <div class="relative group">
                      <img :src="`http://localhost:3003/uploads/tmp/${user.ktp_file}`" :alt="user.ktp_file"
                        class="w-24 h-16 object-cover rounded-lg border-2 border-gray-200 group-hover:border-[#039BE5] transition-all shadow-sm" />
                      <div
                        class="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <select v-model="user.status"
                      class="border-2 border-gray-200 cursor-pointer rounded-xl px-3 py-2 text-sm focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all bg-white">
                      <option value="pending">⏳ Pending</option>
                      <option value="active">✅ Active</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>
                  </td>
                  <td
                    class="px-4 py-4 sticky right-0 bg-white hover:bg-gradient-to-r hover:from-[#039BE5]/5 z-10 whitespace-nowrap border-l border-gray-200 shadow-lg">
                    <button @click="updateStatus(user)"
                      class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] hover:from-[#0288D1] hover:to-[#039BE5] text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#039BE5]/30">
                      Simpan
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="users.length === 0" class="text-center py-16">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <p class="text-gray-400 text-lg font-medium mb-2">Tidak ada pendaftaran baru</p>
            <p class="text-gray-400 text-sm">Semua pendaftaran telah diverifikasi</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 transform animate-scale-in border-2 border-red-200">
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-red-100 p-3 rounded-2xl">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
              </path>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-xl text-gray-800">Alasan Penolakan</h3>
            <p class="text-sm text-gray-500">Jelaskan mengapa pendaftaran ditolak</p>
          </div>
        </div>

        <textarea v-model="alasan" rows="5" placeholder="Masukkan alasan penolakan secara detail..."
          class="w-full border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 px-4 py-3 rounded-xl outline-none transition-all resize-none bg-gray-50 hover:bg-white"></textarea>

        <div class="flex gap-3 mt-6">
          <button @click="showModal = false"
            class="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-all duration-300 border-2 border-gray-200">
            Batal
          </button>
          <button @click="submitRejection"
            class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30">
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
