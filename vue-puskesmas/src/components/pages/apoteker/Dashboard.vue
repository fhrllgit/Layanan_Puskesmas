<template>
  <div class="min-h-screen bg-slate-50">
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d34341d6] to-[#d34341]">
            Dashboard Apoteker
          </h1>
          <p class="text-gray-500 mt-1">Selamat datang di sistem apoteker</p>
        </div>
        <div class="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-md border border-gray-200">
          <div class="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <span class="text-sm font-semibold text-gray-700">{{ currentDate }}</span>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="(stat, index) in stats" :key="index"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">{{ stat.title }}</p>
              <p class="text-3xl font-bold text-gray-900">{{ stat.value }}</p>
            </div>
            <div :class="stat.bgColor + ' p-3 rounded-lg'">
              <component :is="stat.icon" :class="stat.iconColor" class="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">Resep Terbaru</h2>
              <button class="text-[#d34341] hover:text-[#b13330] text-sm font-semibold flex items-center gap-1">
                Lihat Semua
                <EyeIcon class="w-4 h-4" />
              </button>
            </div>

            <div class="overflow-x-auto max-h-100 scrollbar-hide">
              <!-- <span>OTWWWW KERJA</span> -->
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">No Resep</th>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama Pasien</th>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jenis Resep</th>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in resepGabungan" :key="i"
                    class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td class="py-3 px-4 text-sm font-medium text-gray-900">RS{{ item.id }}</td>
                    <td class="py-3 px-4 text-sm text-gray-700">
                      <div class="flex items-center">
                        <div
                          class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#d34341] to-[#b83735] rounded-full flex items-center justify-center">
                          <span class="text-white font-semibold">{{ item.pasien_nama.charAt(0)
                          }}</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ item.pasien_nama }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-700">{{ item.tipe }}</td>
                    <td class="py-3 px-4">
                         <span class="border w-23 items-center justify-center flex py-1.5 rounded-full text-xs font-semibold"
                    :class="colorStatus(item.status)">
                    {{ item.status }}
                  </span>
                      <!-- <span :class="['inline-flex px-3 py-1 rounded-full text-xs font-semibold border', getStatusBadge(prescription.status)]">
                        {{ getStatusText(prescription.status) }}
                      </span> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Akses Cepat</h2>
            <div class="space-y-4">
              <button @click="goTo(item.to)" v-for="item in quickActions" :key="index"
                class="w-full cursor-pointer group">
                <div
                  :class="`bg-gradient-to-r ${item.bgGradient} rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`">
                  <div class="flex items-start gap-3">
                    <div class="bg-white/20 p-2 rounded-lg">
                      <component :is="item.icon" class="text-white w-6 h-6" />
                    </div>
                    <div class="text-left flex-1">
                      <h3 class="text-white font-semibold text-sm mb-1">{{ item.title }}</h3>
                      <p class="text-white/90 text-xs">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md p-6 mt-6">
            <div class="flex items-center gap-2 mb-4">
              <TrendingUpIcon class="text-[#d34341] w-5 h-5" />
              <h2 class="text-lg font-bold text-gray-900">Statistik Mingguan</h2>
            </div>
            <div class="space-y-3">
              <div v-for="stat in weeklyStats" :key="stat.label">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">{{ stat.label }}</span>
                  <span class="font-semibold text-gray-900">{{ stat.value }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div :class="stat.color + ' h-2 rounded-full'" :style="{ width: stat.percentage }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Bell, Package, FileText, CheckCircle, Clock, TrendingUp, Plus, Eye } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { io } from "socket.io-client"

const router = useRouter()
const resepList = ref([])
// const gabungGetresep = ref([])
console.log(resepList)
const resepKonsul = ref([])
console.log(resepKonsul)
const token = localStorage.getItem("token")
const socket = io("http://localhost:3003")

// http://localhost:3003/api/apoteker/resep

socket.on("resepStatusUpdated", (data) => {
  console.log("Resep diperbarui:", data);
  const index = resepList.value.findIndex(r => r.id === data.id);
  if (index !== -1) {
    resepList.value[index].status = data.status;
    resepList.value[index].apoteker_id = data.apoteker_id;
  }
});

socket.on("resepKonsultasiStatusUpdated", (data) => {
  console.log("Realtime diterima:", data);

  const index = resepList.value.findIndex(r => r.id === data.id);
  if (index !== -1) {
    resepList.value[index].status = data.status;
  }
});

const getResep = async () => {
  try {
    const res = await axios.get(`http://localhost:3003/api/apoteker/resep`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    resepList.value = res.data
  } catch (err) {
    console.log(err)
  }
}

const fetchKonsultasi = async () => {
  try {
    const res = await axios.get(`http://localhost:3003/api/apoteker/resep-konsultasi`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    resepKonsul.value = res.data
    // debug
    // console.log(resepKonsul.value = res.data)
  } catch (err) {
    console.log(err)
  }
}

const resepGabungan = computed(() => {
  return [
    ...resepList.value.map(item => ({
      ...item,
      tipe: 'berobat',
      sumber_id: item.rekam_id
    })),
    ...resepKonsul.value.map(item => ({
      ...item,
      tipe: 'konsultasi',
      sumber_id: item.konsultasi_id
    }))
  ]
})


const currentDate = computed(() => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('id-ID', options);
});

const goTo = (path) => {
  router.push(path)
}

const stats = computed(() => [
  { title: 'Resep Berobat Hari Ini', value: resepList.value?.length || 0, icon: Package, bgColor: 'bg-red-50', iconColor: 'text-[#d34341]' },
  { title: 'Resep Konsultasi', value: resepKonsul.value?.length || 0, icon: FileText, bgColor: 'bg-red-50', iconColor: 'text-[#d34341]' },
  { title: 'Menunggu Proses', value: '7', icon: Clock, bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { title: 'Resep Selesai', value: '35', icon: CheckCircle, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' }
])


// status ENUM('menunggu','siap_diambil','tidak_tersedia','selesai', 'expired') DEFAULT 'menunggu',

const colorStatus = (status) => {
  const s = status.toLowerCase()
  if (s.includes("menunggu"))
    return "text-blue-600 bg-blue-100"

  if (s.includes("siap_diambil"))
    return "text-red-600 bg-red-100"

  if (s.includes("tidak_tersedia"))
    return "text-green-600 bg-green-100"

  if (s.includes("selesai"))
    return "text-yellow-600 bg-yellow-100"
  
  if (s.includes("expried"))
    return "text-red-600 bg-red-100"

  return "text-gray-500 bg-gray-100"
}

const quickActions = [
  { title: 'Dashboard', to: '/apoteker/dashboard', description: 'Lihat statistik total obat hari ini', icon: Plus, bgGradient: 'from-[#d34341] to-[#b13330]' },
  { title: 'Lihat Resep Berobat', to: '/apoteker/berobat-resep', description: 'Kelola resep pasien berobat', icon: Package, bgGradient: 'from-[#d34341] to-[#b13330]' },
  { title: 'Lihat Resep Konsultasi', to: '/apoteker/konsultasi-resep', description: 'Kelola resep konsultasi online', icon: FileText, bgGradient: 'from-[#d34341] to-[#b13330]' }
];

const getStatusBadge = (status) => {
  const styles = {
    menunggu: 'bg-amber-100 text-amber-700 border-amber-200',
    diproses: 'bg-blue-100 text-blue-700 border-blue-200',
    selesai: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  };
  return styles[status] || styles.menunggu;
};

const getStatusText = (status) => {
  const text = {
    menunggu: 'Menunggu',
    diproses: 'Diproses',
    selesai: 'Selesai'
  };
  return text[status] || status;
};

const weeklyStats = [
  { label: 'Resep Berobat', value: 156, percentage: '78%', color: 'bg-[#d34341]' },
  { label: 'Resep Konsultasi', value: 98, percentage: '49%', color: 'bg-[#d34341]' },
  { label: 'Total Diselesaikan', value: 245, percentage: '96%', color: 'bg-emerald-500' }
];

onMounted(() => {
  getResep()
  fetchKonsultasi()
})
</script>
