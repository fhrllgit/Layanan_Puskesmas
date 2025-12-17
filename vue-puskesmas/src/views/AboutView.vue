<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-[#d34341] rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">P</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">Puskesmas Jepara</h1>
            <p class="text-xs text-gray-500">Melayani dengan Hati</p>
          </div>
        </div>
        <button
          class="flex items-center space-x-2 text-gray-600 hover:text-[#d34341] transition-colors"
          @click="goBack"
        >
          <ArrowLeft :size="20" />
          <span class="hidden sm:inline">Kembali</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Article -->
        <div class="lg:col-span-2">
          <article class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="p-6 sm:p-8">
              <!-- Category -->
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#d34341] text-white mb-4"
              >
                <Tag :size="14" class="mr-1" />
                {{ newsDetail.category }}
              </span>

              <!-- Title -->
              <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {{ newsDetail.title }}
              </h1>

              <!-- Meta -->
              <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
                <div class="flex items-center gap-2">
                  <Calendar :size="16" class="text-[#d34341]" />
                  {{ newsDetail.date }}
                </div>
                <div class="flex items-center gap-2">
                  <User :size="16" class="text-[#d34341]" />
                  {{ newsDetail.author }}
                </div>
                <div class="flex items-center gap-2">
                  <Clock :size="16" class="text-[#d34341]" />
                  {{ newsDetail.readTime }} baca
                </div>
              </div>

              <!-- Image -->
              <div class="mb-8 rounded-xl overflow-hidden">
                <img
                  :src="newsDetail.image"
                  :alt="newsDetail.title"
                  class="w-full object-cover"
                />
              </div>

              <!-- Content -->
              <div class="prose prose-lg max-w-none text-gray-700" v-html="newsDetail.content"></div>

              <!-- Share -->
              <div class="mt-8 pt-6 border-t">
                <p class="text-sm text-gray-600 mb-3">Bagikan berita ini:</p>
                <div class="flex gap-3">
                  <button class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:opacity-90 transition">
                    Facebook
                  </button>
                  <button class="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm hover:opacity-90 transition">
                    Twitter
                  </button>
                  <button class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:opacity-90 transition">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#d34341]">
              Berita Lainnya
            </h2>

            <div class="space-y-4">
              <div
                v-for="news in relatedNews"
                :key="news.id"
                class="group cursor-pointer hover:bg-gray-50 rounded-xl p-3 transition border"
              >
                <div class="flex gap-3">
                  <img
                    :src="news.image"
                    :alt="news.title"
                    class="w-20 h-20 object-cover rounded-lg"
                  />
                  <div class="flex-1">
                    <span
                      class="inline-block px-2 py-1 text-xs font-medium text-[#d34341] bg-red-50 rounded mb-1"
                    >
                      {{ news.category }}
                    </span>
                    <h3
                      class="text-sm font-semibold text-gray-900 group-hover:text-[#d34341] line-clamp-2"
                    >
                      {{ news.title }}
                    </h3>
                    <p class="text-xs text-gray-500 flex items-center">
                      <Calendar :size="12" class="mr-1" />
                      {{ news.date }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button class="w-full mt-6 px-4 py-3 bg-[#d34341] text-white rounded-lg hover:bg-[#b83533]">
              Lihat Semua Berita
            </button>
          </div>
        </aside>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-12">
      <div class="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
        © 2024 Puskesmas Jepara. Semua hak dilindungi.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Calendar, User, Tag, Clock, ArrowLeft } from 'lucide-vue-next'

const goBack = () => window.history.back()

const newsDetail = ref({
  id: 1,
  title: 'Program Vaksinasi COVID-19 Booster Tahap 2 Dibuka untuk Semua Kalangan',
  date: '12 Desember 2024',
  category: 'Vaksinasi',
  author: 'Dr. Siti Nurhaliza',
  image: 'https://images.unsplash.com/photo-1632053002928-e5d95cf1e534?w=800&h=500&fit=crop',
  readTime: '5 menit',
  content: `<p>Puskesmas Jepara dengan bangga mengumumkan pembukaan program vaksinasi COVID-19 booster tahap 2...</p>`
})

const relatedNews = ref([
  {
    id: 2,
    title: 'Tips Menjaga Kesehatan di Musim Hujan',
    date: '10 Desember 2024',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    category: 'Tips Kesehatan'
  },
  {
    id: 3,
    title: 'Pentingnya Pemeriksaan Kesehatan Rutin untuk Lansia',
    date: '8 Desember 2024',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop',
    category: 'Lansia'
  }
])
</script>
