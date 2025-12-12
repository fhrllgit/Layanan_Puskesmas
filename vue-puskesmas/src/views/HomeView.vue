<template>
  <div class="min-h-screen h-full  overflow-hidden">
    <Navbar />
    <!-- route bawah alamat mo sisma -->
    <button
      class="fixed bottom-6 text-sm cursor-pointer right-6 z-50 bg-[#d34341] text-white px-5 py-3 rounded-full shadow-2xl hover:bg-[#b53634] transition-all duration-300 flex items-center gap-2 font-semibold hover:scale-110">
      <Phone class="w-5 h-5" />
      Hubungi Kami
    </button>
    <div class="px-4 sm:px-6 md:px-20 min-h-screen h-full">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-20 -left-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style="animation-duration: 4s"></div>
        <!-- <div
          class="absolute top-40 right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style="animation-duration: 6s; animation-delay: 2s"></div> -->
        <!-- <div
          class="absolute -bottom-20 left-40 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style="animation-duration: 5s; animation-delay: 1s"></div> -->
      </div>
      <div class="flex flex-col lg:flex-row relative">
        <div class="flex-1 flex flex-col h-auto lg:h-screen justify-center py-10 lg:py-0">
          <div class="flex flex-col  space-y-2.5">
            <div class="flex mb-10 items-center gap-4 px-3 py-2 rounded-2xl bg-white shadow-lg w-max">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-5 text-[#d34341] overflow-hidden">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span class="text-sm font-semibold text-[#d34341]">Platform Kesehatan Digital</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl text-[#d34341]" style="font-weight: 800;">
              Selamat datang <span class="text-black">di<br> Sisma <br> Siap Melayani <br> Masyarakat</span>
            </h1>
            <p class="text-sm mt-7 text-[#626262]">
              Perawatan cerdas kami siap membantu anda. <span class="hidden sm:inline">Hubungi kami untuk mendapatkan
                <br class="hidden lg:inline"> perawatan kesehatan yang lebih baik</span>
              <span class="inline sm:hidden">Hubungi kami untuk mendapatkan perawatan kesehatan yang lebih baik</span>
            </p>
            <!-- <div class="flex gap-5 mt-7 items-center">
              <div
                class="w-50 cursor-pointer gap-3.5 text-white bg-[#d34341] rounded-xl justify-center py-2.5 flex items-center">
                <p class="text-sm font-semibold">Dapatkan Layanan</p>
                <span>></span>
              </div>
              <div
                class="w-50 cursor-pointer gap-3.5 rounded-xl bg-white text-[#d34341] border-[#d34341] justify-center py-2.5 flex items-center border">
                <p class="text-sm font-semibold">Dapatkan Layanan</p>
                <span>></span>
              </div>
            </div> -->
            <div class="flex gap-2 mt-10 w-max py-2 border-t border-t-[#cacaca] border-b border-b-[#cacaca]">
              <div class="border-r border-r-[#cacaca] w-40">
                <p class="text-3xl font-bold ">10+</p>
                <span class="text-sm text-[#706f6f]">Skil Dokter</span>
              </div>
              <div class="border-r border-r-[#cacaca] w-40 ">
                <p class="text-3xl font-bold ">99%</p>
                <span class="text-sm text-[#706f6f]">Patient Statification</span>
              </div>
              <div class=" w-40 ">
                <p class="text-3xl font-bold ">200K+</p>
                <span class="text-sm text-[#706f6f]">Appointment Booked</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 flex relative overflow-hidden min-h-[400px] lg:min-h-0">
          <div class="relative w-full h-full">
            <div class="w-full flex items-center justify-center h-full">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=1000&fit=crop"
                class="rounded-3xl w-full h-150 object-cover mt-10 bg-center bg-no-repeat" alt="">
            </div>
          </div>
        </div>
        <div class="absolute z-10 left-165  bottom-0 mb-25 shadow-md">
          <div class="bg-white gap-1.5 py-2 rounded-lg px-2.5 w-max flex items-center">
            <div class="flex -space-x-2 ">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                class="w-10 h-10 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                alt="">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                class="w-10 h-10 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                alt="">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                class="w-10 h-10 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                alt="">
            </div>
            <div class="flex flex-col -space-y-1">
              <p class="text-sm" style="font-weight: 500;">Dipercaya</p>
              <span class="text-xs text-[#626262]">100.000+ Pasien</span>
            </div>
          </div>
        </div>
        <div class="absolute z-10 left-150 overflow-hidden rounded-2xl mt-40 shadow-md">
          <div class="bg-white gap-1.5 p-3.5  w-max flex items-center">
            <div class="bg-[#d3434142] p-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-5 text-[#d34341]">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div class="flex flex-col  text-xs">
              <p style="font-weight: 500;">Booking <br> Online</p>
              <span class="text-[#4d4d4d]">Daftar Cepat</span>
            </div>
          </div>
        </div>
        <div class="absolute z-10 bottom-1/5 right-0 -mr-10 overflow-hidden rounded-2xl shadow-md">
          <div class="bg-white gap-1.5 p-3.5 w-max flex items-center">
            <div class="bg-[#d3434142] p-2.5 rounded-md">
              <svg class="text-[#d34341] size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M8 3V5H6V9C6 11.2091 7.79086 13 10 13C12.2091 13 14 11.2091 14 9V5H12V3H15C15.5523 3 16 3.44772 16 4V9C16 11.9727 13.8381 14.4405 11.0008 14.9169L11 16.5C11 18.433 12.567 20 14.5 20C15.9973 20 17.275 19.0598 17.7749 17.7375C16.7283 17.27 16 16.2201 16 15C16 13.3431 17.3431 12 19 12C20.6569 12 22 13.3431 22 15C22 16.3711 21.0802 17.5274 19.824 17.8854C19.2102 20.252 17.0592 22 14.5 22C11.4624 22 9 19.5376 9 16.5L9.00019 14.9171C6.16238 14.4411 4 11.9731 4 9V4C4 3.44772 4.44772 3 5 3H8ZM19 14C18.4477 14 18 14.4477 18 15C18 15.5523 18.4477 16 19 16C19.5523 16 20 15.5523 20 15C20 14.4477 19.5523 14 19 14Z">
                </path>
              </svg>
            </div>
            <div class="flex flex-col  text-xs">
              <p style="font-weight: 500;">Konsultasi</p>
              <span class="text-[#4d4d4d]">24/7 Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- layanan -->
<!-- Enhanced Services Section -->
<section id="services" class="animate-on-scroll py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" :style="animateStyle('services')">
  <!-- Decorative Background Elements -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-20 left-10 w-72 h-72 bg-[#d34341]/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#d34341]/5 rounded-full blur-3xl"></div>
  </div>

  <div class="container mx-auto px-6 relative z-10">
    <!-- Section Header -->
    <div class="text-center mb-20">
      <div class="inline-block">
        <span class="inline-block px-4 py-2 bg-[#d34341]/10 text-[#d34341] rounded-full text-sm font-semibold mb-4">
          Layanan Kami
        </span>
      </div>
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Layanan di <span class="text-[#d34341] relative">
          SiSMA
          <svg class="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
            <path d="M0 4C50 8 150 0 200 4" stroke="#d34341" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span>
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Kemudahan akses layanan kesehatan berkualitas di ujung jari Anda, kapan saja dan di mana saja
      </p>
    </div>

    <!-- Services Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      <div v-for="(service, idx) in services" :key="idx"
        class="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
        :style="{ animationDelay: `${idx * 0.1}s` }">
        
        <!-- Hover Effect Background -->
        <!-- <div class="absolute inset-0 bg-gradient-to-br from-[#d34341]/0 to-[#d34341]/0 group-hover:from-[#d34341]/5 group-hover:to-[#d34341]/10 transition-all duration-500 rounded-2xl"></div> -->
        
        <!-- Border Gradient on Hover -->
        <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style="background: linear-gradient(135deg, #d34341 0%, transparent 100%); padding: 2px; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;">
        </div>

        <div class="relative z-10">
          <!-- Icon Container -->
          <div class="mb-6 relative inline-block">
            <div class="w-16 h-16 bg-gradient-to-br from-[#d34341]/10 to-[#d34341]/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <component :is="service.icon"
                class="w-8 h-8 text-[#d34341] group-hover:scale-110 transition-all duration-300" />
            </div>
            <!-- Decorative dot -->
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-[#d34341] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Content -->
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#d34341] transition-colors duration-300">
            {{ service.title }}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed mb-6">
            {{ service.desc }}
          </p>

          <!-- CTA Link -->
          <div class="flex items-center text-[#d34341] font-semibold text-sm group-hover:gap-2 transition-all duration-300">
            <span>Selengkapnya</span>
            <svg class="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 transition-all duration-300" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        <!-- Decorative corner element -->
        <div class="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-[#d34341]/0 group-hover:border-[#d34341]/20 rounded-tr-2xl transition-all duration-500"></div>
      </div>
    </div>

    <!-- Optional: Bottom CTA -->
    <div class="text-center mt-16">
      <p class="text-gray-600 mb-6">Belum menemukan layanan yang Anda cari?</p>
      <button class="px-8 py-3 bg-white text-[#d34341] border-2 border-[#d34341] rounded-full font-semibold hover:bg-[#d34341] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl">
        Lihat Semua Layanan
      </button>
    </div>
  </div>
</section>

    <!-- Education -->
    <section id="education" class="animate-on-scroll py-24 bg-gradient-to-br from-gray-50 to-gray-100"
      :style="animateStyle('education')">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold text-gray-900 mb-4">
            Edukasi <span class="text-[#d34341]">Kesehatan</span>
          </h2>
          <p class="text-xl text-gray-600">Tingkatkan pengetahuan kesehatan Anda dan keluarga</p>
        </div>

        <!-- Category Filter -->
        <div class="flex justify-center gap-4 mb-12 flex-wrap">
          <button v-for="cat in categories" :key="cat.name" @click="activeCategory = cat.name"
            class="px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2" :class="activeCategory === cat.name
              ? 'bg-[#d34341] text-white shadow-xl scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100'">
            <component :is="cat.icon" class="w-5 h-5" />
            {{ cat.name }}
          </button>
        </div>

        <!-- Education Cards -->
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="(item, idx) in educationContent[activeCategory]" :key="idx"
            class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2">
            <div
              class="bg-gradient-to-br from-[#d34341]/20 to-[#d34341]/10 h-48 flex items-center justify-center text-8xl group-hover:scale-110 transition-all duration-500">
              {{ item.img }}
            </div>

            <div class="p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#d34341] transition-all duration-300">
                {{ item.title }}
              </h3>

              <p class="text-gray-600 mb-6">{{ item.desc }}</p>

              <div class="flex items-center text-[#d34341] font-semibold group-hover:gap-2 transition-all duration-300">
                Baca Selengkapnya
                <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Registration -->
    <section id="registration" class="animate-on-scroll py-24 bg-white" :style="animateStyle('registration')">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-5xl font-bold text-gray-900 mb-4">
              Daftar & Mulai Menggunakan <span class="text-[#d34341]">SiSMA</span>
            </h2>
            <p class="text-xl text-gray-600">Isi form di bawah dan tim kami akan segera menghubungi Anda</p>
          </div>

          <form @submit.prevent="handleSubmit"
            class="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-2xl space-y-6">

            <div>
              <label class="block text-gray-700 font-semibold mb-3 text-lg">Nama Lengkap</label>
              <input type="text" v-model="formData.nama" required
                class="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#d34341] outline-none transition-all duration-300 text-lg"
                placeholder="Masukkan nama lengkap Anda" />
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-3 text-lg flex items-center gap-2">
                <Mail class="w-5 h-5" /> Email
              </label>
              <input type="email" v-model="formData.email" required
                class="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#d34341] outline-none transition-all duration-300 text-lg"
                placeholder="contoh@email.com" />
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-3 text-lg flex items-center gap-2">
                <Phone class="w-5 h-5" /> No HP
              </label>
              <input type="tel" v-model="formData.noHp" required
                class="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#d34341] outline-none transition-all duration-300 text-lg"
                placeholder="08xxxxxxxxxx" />
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-3 text-lg flex items-center gap-2">
                <CreditCard class="w-5 h-5" /> Nomor BPJS
              </label>
              <input type="text" v-model="formData.noBpjs"
                class="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#d34341] outline-none transition-all duration-300 text-lg"
                placeholder="00xxxxxxxxxx (opsional)" />
            </div>

            <button type="submit"
              class="w-full bg-[#d34341] text-white px-8 py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-[#b53634] transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105">
              <CheckCircle class="w-6 h-6" />
              Daftar Sekarang
            </button>

            <p class="text-center text-gray-500 text-sm mt-4">
              Dengan mendaftar, Anda menyetujui syarat dan ketentuan layanan SiSMA
            </p>
          </form>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-24 bg-gradient-to-br from-[#d34341] to-[#b53634] text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-5xl font-bold mb-4">Apa Kata Mereka?</h2>
        <p class="text-xl opacity-90">Ribuan pasien telah merasakan kemudahan layanan SiSMA</p>

        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <div v-for="(t, idx) in testimonials" :key="idx" class="bg-white/10 backdrop-blur-sm p-8 rounded-3xl">
            <div class="text-6xl mb-4">⭐⭐⭐⭐⭐</div>
            <p class="text-lg mb-4 italic">"{{ t.text }}"</p>
            <p class="font-bold">- {{ t.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-6 text-center">
        <div class="text-4xl font-bold mb-4">
          <span class="text-[#d34341]">SiSMA</span>
        </div>
        <p class="text-gray-400 mb-6">
          Sistem Informasi Sehat Masyarakat - Puskesmas Modern
        </p>

        <div class="flex justify-center gap-6 text-sm text-gray-400">
          <a href="#" class="hover:text-[#d34341] transition-colors">Tentang Kami</a>
          <a href="#" class="hover:text-[#d34341] transition-colors">Layanan</a>
          <a href="#" class="hover:text-[#d34341] transition-colors">Kontak</a>
          <a href="#" class="hover:text-[#d34341] transition-colors">Kebijakan Privasi</a>
        </div>

        <div class="mt-8 text-gray-500 text-sm">© 2024 SiSMA. All rights reserved.</div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  Activity, Calendar, Users, Clock, Heart, Baby, Apple,
  User, Smile, ChevronRight, CheckCircle, Phone, Mail, CreditCard
} from 'lucide-vue-next'
import Navbar from './Navbar.vue'

// State
const activeCategory = ref('Umum')
const isVisible = reactive({})

// Scroll Animation
const animateStyle = (id) => ({
  opacity: isVisible[id] ? 1 : 0,
  transform: isVisible[id] ? 'translateY(0)' : 'translateY(30px)',
  transition: 'all 0.8s ease-out'
})

// Section Visibility (IntersectionObserver)
onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        isVisible[entry.target.id] = entry.isIntersecting
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
})

// Data
const services = [
  { icon: Activity, title: 'Lihat Poli', desc: 'Informasi lengkap poli tersedia' },
  { icon: Users, title: 'Konsultasi Online', desc: 'Chat dengan dokter kapan saja' },
  { icon: Calendar, title: 'Jadwal Dokter', desc: 'Cek jadwal praktik dokter' },
  { icon: Clock, title: 'Status Antrian', desc: 'Pantau antrian secara real-time' }
]

const categories = [
  { name: 'Umum', icon: Heart },
  { name: 'Gizi', icon: Apple },
  { name: 'KIA', icon: Baby },
  { name: 'Lansia', icon: User },
  { name: 'Gigi', icon: Smile }
]

const educationContent = {
  Umum: [
    { title: 'Tips Hidup Sehat di Era Modern', desc: 'Panduan praktis menjaga kesehatan dalam rutinitas harian', img: '🏥' },
    { title: 'Pentingnya Cek Kesehatan Rutin', desc: 'Deteksi dini untuk pencegahan penyakit lebih optimal', img: '🩺' }
  ],
  Gizi: [
    { title: 'Gizi Seimbang untuk Keluarga', desc: 'Menu sehat bergizi untuk seluruh anggota keluarga', img: '🥗' },
    { title: 'Nutrisi Optimal Anak Tumbuh Kembang', desc: 'Asupan penting untuk pertumbuhan anak', img: '🍎' }
  ],
  KIA: [
    { title: 'Perawatan Ibu Hamil Trimester Pertama', desc: 'Panduan lengkap kehamilan sehat', img: '🤰' },
    { title: 'Imunisasi Lengkap untuk Bayi', desc: 'Jadwal dan manfaat imunisasi wajib', img: '👶' }
  ],
  Lansia: [
    { title: 'Menjaga Kesehatan di Usia Lanjut', desc: 'Tips aktif dan sehat untuk lansia', img: '👴' },
    { title: 'Pencegahan Penyakit Degeneratif', desc: 'Strategi hidup sehat mencegah penyakit kronis', img: '💊' }
  ],
  Gigi: [
    { title: 'Cara Sikat Gigi yang Benar', desc: 'Teknik menyikat gigi untuk kesehatan optimal', img: '🦷' },
    { title: 'Mencegah Gigi Berlubang pada Anak', desc: 'Panduan menjaga kesehatan gigi anak', img: '😁' }
  ]
}

const formData = reactive({
  nama: '',
  email: '',
  noHp: '',
  noBpjs: ''
})

const handleSubmit = () => {
  alert('Pendaftaran berhasil! Tim kami akan menghubungi Anda segera.')
}

// Testimonials data
const testimonials = [
  { name: 'Ibu Siti', text: 'Sangat membantu! Tidak perlu antre lama lagi.' },
  { name: 'Bapak Budi', text: 'Layanan konsultasi online sangat responsif dan membantu.' },
  { name: 'Ibu Ani', text: 'Aplikasi yang user-friendly dan dokternya ramah!' }
]
</script>
