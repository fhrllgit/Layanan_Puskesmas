<template>
  <div class="min-h-screen relative overflow-hidden">
    <div
      class="absolute top-20 right-20 w-64 h-64 border-2 border-[#039BE5]/5 rounded-3xl rotate-12 pointer-events-none">
    </div>
    <div
      class="absolute bottom-40 left-10 w-48 h-48 border-2 border-[#039BE5]/5 rounded-3xl -rotate-6 pointer-events-none">
    </div>
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#039BE5] to-[#0277BD]">
            Dashboard Admin
          </h1>
          <p class="text-gray-500 mt-1">Selamat datang di sistem manajemen klinik</p>
        </div>
        <div class="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-md border border-gray-200">
          <div class="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <span class="text-sm font-semibold text-gray-700">{{ currentDate }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in statistics" :key="stat.title"
        class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#039BE5]/30 group cursor-pointer">
        <div class="flex items-start justify-between mb-4">
          <div
            :class="`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`">
            <component :is="stat.icon" class="w-7 h-7 text-white" />
          </div>
          <span :class="`text-xs font-semibold px-3 py-1 rounded-full ${stat.badgeClass}`">
            {{ stat.change }}
          </span>
        </div>
        <h3 class="text-gray-500 text-sm font-medium mb-1">{{ stat.title }}</h3>
        <p class="text-3xl font-bold text-gray-800 mb-1">{{ stat.value }}</p>
        <p class="text-xs text-gray-400">{{ stat.subtitle }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#039BE5]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Antrian Hari Ini</h2>
          </div>
          <button
            class="px-4 py-2 bg-[#039BE5]/10 hover:bg-[#039BE5]/20 text-[#039BE5] rounded-xl text-sm font-semibold transition-all">
            Lihat Semua
          </button>
        </div>

        <div class="overflow-x-auto max-h-80 overflow-y-auto scrollbar-hide">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-100">
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">No Antrian</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">Nama Pasien</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">Poli</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">Waktu</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in antrian" :key="item.id" v-if="antrian.length > 0"
                class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td class="py-4 px-4">
                  <span class="font-bold text-[#039BE5] text-lg">{{ item.nomor_antrian }}</span>
                </td>
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-[#039BE5] to-[#0277BD] flex items-center justify-center text-white font-semibold">
                      {{ item.pasien_nama.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-medium text-gray-800 line-clamp-1">{{ item.pasien_nama }}</span>
                  </div>
                </td>
                <td class="py-4 px-4 text-gray-600">{{ item.nama_poli }}</td>
                <td class="py-4 px-4 text-gray-500 text-sm">{{ formatDate(item.tanggal) }}</td>
                <td class="py-4 px-4">
                  <span class="border w-23 items-center justify-center flex py-1.5 rounded-full text-xs font-semibold"
                    :class="colorStatus(item.status)">
                    {{ item.status }}
                  </span>
                </td>
              </tr>
              <tr v-else>
                <td colspan="5" class="py-16">
                  <div class="flex flex-col items-center justify-center">
                    <div class="relative mb-6">
                      <div class="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                      <div
                        class="relative w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200/50 shadow-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-12 h-12 text-blue-400">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                      </div>
                    </div>

                    <h3 class="text-gray-700 font-semibold text-lg mb-2">Belum Ada Antrian</h3>
                    <p class="text-gray-400 text-sm mb-6 max-w-md text-center px-4">
                      Saat ini belum ada antrian untuk hari ini. Data akan muncul ketika ada pasien yang mendaftar
                      antrian.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-[#039BE5]/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-800">Jadwal Dokter</h2>
        </div>

        <div class="space-y-4 overflow-y-auto max-h-80 scrollbar-hide">
          <div v-for="doctor in jadwalDokter" :key="doctor.id"
            class="p-4 rounded-xl border border-gray-100 hover:border-[#039BE5]/30 hover:shadow-md transition-all group cursor-pointer">
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-12 h-12 rounded-xl ring-2 ring-[#039BE5]/20 overflow-hidden flex items-center justify-center bg-[#039BE5] text-white font-bold">
                <img v-if="doctor.avatar" :src="doctor.avatar" :alt="doctor.nama_dokter"
                  class="w-full h-full object-cover" />
                <span v-else>
                  {{ doctor.nama_dokter.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 group-hover:text-[#039BE5] transition-colors">
                  {{ doctor.nama_dokter }}
                </h3>
                <p class="text-xs text-gray-500">
                  {{ doctor.nama_poli }}
                </p>
              </div>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ doctor.jam_mulai.slice(0, 5) }} - {{ doctor.jam_selesai.slice(0, 5) }}
              </div>

              <span class="text-xs font-semibold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                Aktif
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="mb-8">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-[#039BE5]/10 flex items-center justify-center">
          <svg class="w-5 h-5 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-800">Akses Cepat</h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <button @click="goTo(menu.to)" v-for="menu in quickAccess" :key="menu.title"
          class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#039BE5]/30 group cursor-pointer">
          <div
            :class="`w-14 h-14 rounded-xl bg-gradient-to-br ${menu.gradient} flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all mx-auto`">
            <component :is="menu.icon" class="w-7 h-7 text-white" />
          </div>
          <h3 class="text-center font-semibold text-gray-800 group-hover:text-[#039BE5] transition-colors text-sm">
            {{ menu.title }}
          </h3>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#039BE5]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Kunjungan Pasien</h2>
          </div>
          <select
            class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 focus:outline-none focus:border-[#039BE5]/30">
            <option>7 Hari Terakhir</option>
            <option>30 Hari Terakhir</option>
            <option>Bulan Ini</option>
          </select>
        </div>

        <div class="flex items-end justify-between gap-3 h-48">
          <div v-for="(day, index) in chartData" :key="index" class="flex-1 flex flex-col items-center gap-2">
            <div class="relative w-full bg-gray-100 rounded-t-xl overflow-hidden group cursor-pointer">
              <div :style="`height: ${day.height}px`"
                class="w-full bg-gradient-to-t from-[#039BE5] to-[#4FC3F7] transition-all duration-500 group-hover:from-[#0277BD] group-hover:to-[#039BE5] rounded-t-xl">
              </div>
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">{{ day.value }}</span>
              </div>
            </div>
            <span class="text-xs font-medium text-gray-600">{{ day.label }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-[#039BE5]/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-[#039BE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-800">Aktivitas Terbaru</h2>
        </div>

        <div class="space-y-4 max-h-64 scrollbar-hide overflow-y-auto pr-2">
          <div v-for="activity in recentActivities" :key="activity.id"
            class="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
            <div :class="`w-10 h-10 rounded-xl ${activity.iconBg} flex items-center justify-center flex-shrink-0`">
              <component :is="activity.icon" :class="`w-5 h-5 ${activity.iconColor}`" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 group-hover:text-[#039BE5] transition-colors">{{
                activity.title }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.description }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  Users,
  ClipboardList,
  UserPlus,
  Building2,
  Beaker,
  FileText,
  BookOpen,
  CheckCircle,
  Pencil,
  User,
  UserIcon
} from "lucide-vue-next"

const router = useRouter()
const users = ref([])
const api_url = "http://localhost:3003"
const token = localStorage.getItem("token")
const loading = ref(false)
const jadwalDokter = ref([])
const antrian = ref([])

const fetchUsers = async () => {
  try {
    const res = await axios.get(`${api_url}/api/admin/users/admin-filter`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    users.value = res.data.data
  } catch (err) {
    console.error("Error fetching users:", err)
    if (err.response && err.response.status === 401) {
      alert("Token tidak valid atau expired, silakan login kembali")
      window.location.href = "/login"
    }
  }
}

const fetchDokter = async () => {
  loading.value = true
  try {
    const res = await axios.get(`${api_url}/api/admin/jadwal-dokter`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    jadwalDokter.value = res.data.data
  } catch (err) {
    if (err.response?.status === 401) {
      alert("Token expired, silakan login ulang")
      router.push("/login")
    }
  } finally {
    loading.value = false
  }
}

const fetchAntrian = async () => {
  loading.value = true
  try {
    const res = await axios.get(`${api_url}/api/admin/dashboard-antrian`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    antrian.value = res.data.data || []
  } catch (err) {
    if (err.response?.status === 401) {
      alert("Token expired, silakan login ulang")
      router.push("/login")
    }
  } finally {
    loading.value = false
  }
}

const goTo = (path) => {
  router.push(path)
}

const currentDate = computed(() => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('id-ID', options);
});

const statistics = computed(() => [
  {
    title: 'Total Pengguna',
    value: users.value?.length || 0,
    subtitle: 'Pengguna terdaftar',
    change: '+12%',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    icon: Users,
    gradient: 'from-[#039BE5] to-[#0277BD]'
  },
  {
    title: 'Pasien Hari Ini',
    value: antrian.value?.length || 0,
    subtitle: 'Pasien terdaftar',
    change: '+8%',
    badgeClass: 'bg-blue-100 text-blue-700',
    icon: User,
    gradient: 'from-[#4FC3F7] to-[#039BE5]'
  },
  {
    title: 'Antrian Aktif',
    value: '12',
    subtitle: 'Sedang dilayani',
    change: '5 menunggu',
    badgeClass: 'bg-amber-100 text-amber-700',
    icon: ClipboardList,
    gradient: 'from-[#FFB74D] to-[#FF9800]'
  },
  {
    title: 'Poli Aktif',
    value: '4',
    subtitle: 'Dari 4 poli',
    change: 'Aktif',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    icon: Building2,
    gradient: 'from-[#66BB6A] to-[#43A047]'
  }
]);


const quickAccess = ref([
  { title: 'Tambah Pengguna', icon: Users, gradient: 'from-[#039BE5] to-[#0277BD]', to: '/admin/users/add' },
  { title: 'Tambah Poli', icon: Building2, gradient: 'from-[#4FC3F7] to-[#039BE5]', to: '/admin/poli' },
  { title: 'Tambah Kouta', icon: Beaker, gradient: 'from-[#66BB6A] to-[#43A047]', to: '/admin/kouta' },
  { title: 'Rekam Medis', icon: FileText, gradient: 'from-[#FFB74D] to-[#FF9800]', to: '/admin/rekam-medis' },
  { title: 'Input Artikel', icon: BookOpen, gradient: 'from-[#AB47BC] to-[#8E24AA]', to: '/admin/berita-input' }
]);

const chartData = ref([
  { label: 'Sen', value: 45, height: 120 },
  { label: 'Sel', value: 52, height: 140 },
  { label: 'Rab', value: 38, height: 100 },
  { label: 'Kam', value: 65, height: 170 },
  { label: 'Jum', value: 48, height: 130 },
  { label: 'Sab', value: 30, height: 80 },
  { label: 'Min', value: 25, height: 65 }
]);

const recentActivities = ref([
  { id: 1, title: 'Pasien Baru Terdaftar', description: 'Ahmad Ridwan mendaftar ke Poli Umum', time: '5 menit yang lalu', icon: User, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 2, title: 'Rekam Medis Diupdate', description: 'Dr. Hendra memperbarui rekam medis pasien', time: '15 menit yang lalu', icon: FileText, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { id: 3, title: 'Artikel Baru Dipublikasi', description: 'Tips Hidup Sehat di Musim Hujan', time: '1 jam yang lalu', icon: BookOpen, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 4, title: 'Antrian Selesai', description: 'Antrian A004 telah selesai dilayani', time: '2 jam yang lalu', icon: CheckCircle, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' }
]);

const colorStatus = (status) => {
  const s = status.toLowerCase()
  if (s.includes("menunggu"))
    return "text-blue-600 bg-blue-100"

  if (s.includes("batal"))
    return "text-red-600 bg-red-100"

  if (s.includes("selesai"))
    return "text-green-600 bg-green-100"

  if (s.includes("dipanggil"))
    return "text-yellow-600 bg-yellow-100"

  return "text-gray-500 bg-gray-100"
}

const formatDate = (date) => {
  if (!date) return "-";
  const parsed = new Date(date);
  if (isNaN(parsed)) return "-";

  return parsed.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

onMounted(() => {
  fetchUsers()
  fetchDokter()
  fetchAntrian()
})
</script>