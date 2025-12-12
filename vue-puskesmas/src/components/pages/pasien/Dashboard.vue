<template>
  <div>
    <div class="px-4 sm:px-6 md:px-20 min-h-screen h-full">
      <div class="flex flex-col lg:flex-row relative">
        <div class="flex-1 flex flex-col h-auto lg:h-screen justify-center py-10 lg:py-0">
          <div class="flex flex-col mt-10 space-y-2.5">
            <h1 v-if="user" class="font-semibold text-lg sm:text-xl">Halo, {{ user.nama }} 👋</h1>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl text-[#d34341]" style="font-weight: 800;">
              Selamat datang <span class="text-black">di<br> Sisma <br> Siap Melayani <br> Masyarakat</span>
            </h1>
            <p class="text-sm mt-7 text-[#626262]">
              Perawatan cerdas kami siap membantu anda. <span class="hidden sm:inline">Hubungi kami untuk mendapatkan
                <br class="hidden lg:inline"> perawatan kesehatan yang lebih baik</span>
              <span class="inline sm:hidden">Hubungi kami untuk mendapatkan perawatan kesehatan yang lebih baik</span>
            </p>
            <RouterLink to="/pasien/konsultasi">
              <button
                class="flex w-max items-center gap-2 bg-[#d34341] rounded-xl text-white px-5 py-2 cursor-pointer mt-7 hover:bg-[#c7201d] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                <span class="text-sm font-semibold">Konsultasi</span>
              </button>
            </RouterLink>
            <div class="border-l-2 mt-10 border-l-[#6e6e6e4c] space-y-1 px-2.5 w-max">
              <div class="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  class="w-8 h-8 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                  alt="">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  class="w-8 h-8 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                  alt="">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  class="w-8 h-8 object-cover bg-no-repeat bg-center overflow-hidden rounded-full border-2 border-white"
                  alt="">
              </div>
              <span class="text-md font-semibold">100.000+</span>
              <p class="text-sm text-[#626262]">Pasien kami di seluruh jepara</p>
            </div>
          </div>
        </div>

        <div class="flex-1 flex relative overflow-hidden min-h-[400px] lg:min-h-0">
          <div class="relative w-full h-full">
            <div class="w-full flex items-center justify-center h-full">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=1000&fit=crop"
                class="rounded-xl w-full h-150 object-cover mt-10 bg-center bg-no-repeat" alt="">
            </div>
          </div>
        </div>
        <div
          class="bg-white shadow-2xl border border-gray-100 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 absolute z-10 left-1/2 -translate-x-1/2 bottom-10 lg:left-auto lg:translate-x-0 lg:top-1/3 lg:bottom-auto lg:right-10 xl:right-20 w-[90%] sm:w-[80%] md:w-[70%] lg:w-auto lg:max-w-sm backdrop-blur-sm bg-opacity-95">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="">
                <img src="../../../assets/img/logoS.png" class="w-12 h-12 object-cover bg-no-repeat rounded-full"
                  alt="">
              </div>
              <div class="flex flex-col -space-y-1">
                <h3 class="font-bold text-lg text-gray-800">Layanan 24/7</h3>
                <p class="text-sm text-[#626262]">Kami siap melayani Anda</p>
              </div>
            </div>

            <div class="space-y-3 pt-2">
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-5 text-[#d34341] mt-0.5 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p class="text-sm text-[#626262]">Konsultasi cepat dan mudah</p>
              </div>
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-5 text-[#d34341] mt-0.5 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p class="text-sm text-[#626262]">Poli umum, gigi, KIA, kandungan</p>
              </div>
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-5 text-[#d34341] mt-0.5 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p class="text-sm text-[#626262]">Antrian lebih mudah, Daftar poli sekarang</p>
              </div>
            </div>

            <!-- route bawah alamat mo sisma -->
            <button
              class="bg-[#d34341] hover:bg-[#c7201d] text-white font-semibold py-3 px-6 rounded-xl transition-colors w-full mt-2 flex items-center justify-center gap-2">
              <span>Hubungi Kami</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="relative h-full min-h-screen bg-white overflow-hidden ">
      <div class="absolute top-0 left-0 right-0 w-full h-full">
        <svg viewBox="0 0 1440 900" class="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fff" stop-opacity="0.05" />
              <stop offset="25%" stop-color="#fde3e3" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#fde3e3" stop-opacity="0.2" />
              <stop offset="75%" stop-color="#fde3e3" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#d34341c4" stop-opacity="0.2" />
            </linearGradient>
          </defs>
          <g transform="scale(1,-1) translate(0,-900)">
            <path fill="url(#waveGradient)" class="hidden sm:block" d="
            M0,800
            Q390,950 720,830
            T1540,900
            L1440,0
            L0,0
            Z
          " />
            <path fill="url(#waveGradient)" class="block sm:hidden" d="
            M0,800
            Q390,860 720,830
            T1540,850
            L1440,0
            L0,0
            Z
          " />
          </g>
        </svg>
      </div>

      <div class="relative z-10 px-4 sm:px-6 md:px-20 mt- py-12  ">
        <div class="flex flex-col lg:flex-row gap-8 mb-8">
          <div class="lg:w-1/3">
            <h1 class="lg:text-2xl text-gray-900 mb-3 leading-tight" style="font-weight: 700;">
              Mulai Akses Layanan Kesehatan <br> di <span class="text-[#d34341]">SISMA</span>
            </h1>
            <p class="text-base text-gray-600 leading-relaxed">Pilih layanan yang Anda butuhkan untuk memulai <br>
              kesehatan.</p>
          </div>
          <div class="flex-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div @click="goTo(item)" v-for="(item, index) in ctasection" :key="item.id"
                class="bg-[#d34341] cursor-pointer rounded-lg shadow-md overflow-hidden border border-[#d34341] hover:shadow-lg transition-shadow">
                <div class="pb-1 flex bg-[#d34341]">
                  <div class="flex bg-white w-full rounded-b-lg items-center p-5">
                    <div
                      class="w-12 h-12 bg-[#f9ebeb] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <component :is="item.icon" class="w-6 h-6 text-[#d34341]" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-gray-800 mb-1 line-clamp-1">{{ item.nama }}</h3>
                      <p class="text-sm text-gray-600 line-clamp-1">{{ item.ktr }}</p>
                    </div>
                    <component :is="ChevronRightIcon" class="w-4 h-4 text-[#d34341]" stroke-width="3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-20">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1 h-8 bg-gradient-to-b from-[#d34341] to-[#e67876] rounded-full"></div>
            <h2 class="text-2xl lg:text-3xl text-gray-900" style="font-weight: 700;">
              Informasi Hari Ini
            </h2>
          </div>

          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-10 backdrop-blur-sm">
            <ul class="space-y-5 text-gray-700">
              <li
                class="flex flex-col sm:flex-row sm:items-start group hover:bg-gray-50 -mx-4 px-4 py-3 rounded-xl transition-colors">
                <span class="font-semibold text-gray-800 sm:w-48 mb-1 sm:mb-0 flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#d34341] rounded-full"></span>
                  Jam Operasional
                </span>
                <span class="sm:ml-4 text-gray-600">08:00 – 17:00 | <span class="text-red-700">Minggu - Tanggal merah
                    libur</span></span>
              </li>

              <li
                class="flex flex-col sm:flex-row sm:items-start group hover:bg-gray-50 -mx-4 px-4 py-3 rounded-xl transition-colors">
                <span class="font-semibold text-gray-800 sm:w-48 mb-1 sm:mb-0 flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#d34341] rounded-full"></span>
                  Poli Buka
                </span>
                <div>
                  <span v-if="loading" class="text-gray-600">Memuat jadwal...</span>
                  <span v-else-if="error" class="text-red-600">{{ err }}</span>
                  <div v-else-if="jadwalDokter.length === 0" class="text-gray-500 sm:ml-4">
                    Tidak ada poli untuk hari ini / libur.
                  </div>
                  <div v-else v-for="item in jadwalDokter" class="flex">
                    <span class="sm:ml-4 text-gray-600">{{ item.nama_poli }}</span>
                  </div>
                </div>
              </li>

              <li
                class="flex flex-col sm:flex-row sm:items-start group hover:bg-gray-50 -mx-4 px-4 py-3 rounded-xl transition-colors">
                <span class="font-semibold text-gray-800 sm:w-48 mb-1 sm:mb-0 flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#d34341] rounded-full"></span>
                  Dokter Hari Ini
                </span>
                <div>
                  <span v-if="loading" class="text-gray-600">Memuat jadwal...</span>
                  <span v-else-if="error" class="text-red-600">{{ err }}</span>
                  <div v-else-if="jadwalDokter.length === 0" class="text-gray-500 sm:ml-4">
                    Tidak ada jadwal untuk hari ini / libur.
                  </div>
                  <div v-else v-for="item in jadwalDokter" class="flex">
                    <span class="sm:ml-4 text-gray-600">Dr. {{ item.nama_dokter }}</span>
                  </div>
                </div>
              </li>
              <li
                class="flex flex-col sm:flex-row sm:items-start group hover:bg-gray-50 -mx-4 px-4 py-3 rounded-xl transition-colors">
                <span class="font-semibold text-gray-800 sm:w-48 mb-1 sm:mb-0 flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#d34341] rounded-full"></span>
                  Estimasi Antrian
                </span>
                <span class="sm:ml-4 text-gray-600">12 – 15 menit</span>
              </li>

              <li
                class="flex flex-col sm:flex-row sm:items-start group hover:bg-gray-50 -mx-4 px-4 py-3 rounded-xl transition-colors">
                <span class="font-semibold text-gray-800 sm:w-48 mb-1 sm:mb-0 flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#d34341] rounded-full"></span>
                  Pengumuman
                </span>
                <span class="sm:ml-4 text-gray-600">Hari ini tidak ada layanan vaksinasi.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-15 mb-20 py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="inline-block">
              <p class="text-red-500 text-sm font-semibold mb-1">Sismahealth</p>
              <h1 class="text-red-500 text-2xl font-bold">Board of Medical<br>Excellence</h1>
            </div>

            <div>
              <h2 class="text-gray-800 text-3xl md:text-4xl font-bold mb-4">
                Diawasi oleh Board of Medical Excellence
              </h2>
              <p class="text-gray-600 text-lg leading-relaxed">
                Seluruh prosedur medis dan tenaga kesehatan di Sisma dipastikan memenuhi standar regulasi dan etika
                layanan kesehatan tertinggi.
              </p>
            </div>
          </div>

          <div class="relative flex justify-center items-end gap-4">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-96 h-96 bg-[#d34341] opacity-40 rounded-full blur-3xl"></div>
            </div>
            <div class="relative z-10 transform hover:scale-105 transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop" alt="Dr. Novi"
                class="w-48 h-64 object-cover rounded-lg shadow-xl" />
              <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-max">
                <div class="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <p class="font-bold text-sm">Dr. Novi</p>
                </div>
                <div
                  class="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-semibold mt-1 text-center">
                  Medical Advisor
                </div>
              </div>
            </div>
            <div class="relative z-20 transform hover:scale-105 transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=550&fit=crop"
                alt="Dr. Irwan Heriyanto" class="w-52 h-72 object-cover rounded-lg shadow-2xl" />
              <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-max">
                <div class="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <p class="font-bold text-sm">Dr. Stevanus Firiri</p>
                </div>
                <div
                  class="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-semibold mt-1 text-center">
                  Chief Medical Officer
                </div>
              </div>
            </div>

            <div class="relative z-10 transform hover:scale-105 transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop"
                alt="Wawan Setiawan" class="w-48 h-64 object-cover rounded-lg shadow-xl" />
              <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-max">
                <div class="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <p class="font-bold text-sm">Anang Setiawan</p>
                </div>
                <div
                  class="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-semibold mt-1 text-center whitespace-nowrap">
                  Chief of Patient Care & Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full bg-white min-h-screen">
      <!-- buat card setiap poli dan di route ke halaman artikel/eduk setiap poli -->
      <div class="mt-15">
        <div class="flex flex-col lg:flex-row w-full px-4 sm:px-6 md:px-20">
          <div class="flex-1 flex relative overflow-hidden lg:min-h-0">
            <div class="relative w-full h-full">
              <div class="w-full flex items-center justify-center h-full">
                <img :src="imgPoli" class="w-full h-64 sm:h-80 md:h-96 lg:h-110 object-cover bg-center bg-no-repeat"
                  alt="" style="border-radius: 3em;">
              </div>
            </div>
          </div>
          <div class="flex-1 lg:flex-1 flex justify-center flex-col px-4 sm:px-6 lg:px-10 mt-6 lg:mt-0">
            <div class="flex flex-col space-y-2">
              <p class="text-sm text-[#d34341]" style="font-weight: 600;">Layanan Kami</p>
              <h1 class="text-2xl sm:text-3xl -tracking-wide" style="font-weight: 500;">Layanan Premium Untuk Anda</h1>
              <p class="text-xs text-[#6e6e6e] mt-3">SISMA membantu Anda mendapatkan pelayanan medis lebih efisien,
                transparan, dan nyaman melalui sistem antrian dan pemeriksaan modern.</p>
            </div>
            <div class="flex flex-col space-y-4 mt-5">
              <div v-for="item in ourServices" class="flex items-center gap-3">
                <component :is="item.icon" class="w-5 h-5 p-1 bg-[#d34341] border rounded-full text-white" />
                <span class="text-sm" style="font-weight: 600;">{{ item.service }}</span>
              </div>
            </div>
            <div
              class="py-2.5 flex items-center mt-5 cursor-pointer gap-2 bg-[#d34341] hover:bg-[#a92523] rounded-3xl w-max px-1.5">
              <p class="text-white text-sm ml-3">Read More</p>
              <span class="p-1 bg-white/60  rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                  stroke="currentColor" class="size-3 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap px-4 sm:px-6 md:px-20 gap-4 sm:gap-5 lg:gap-7 mt-10">
          <div v-for="item in cardSisma" :key="item.id"
            :class="['flex shadow-xl rounded-2xl py-3 px-3 justify-between overflow-hidden w-full sm:w-[calc(50%-0.625rem)] lg:w-auto lg:flex-1 flex-col h-55', item.bg || 'bg-white']">
            <component :is="item.icons" :class="['w-12 h-12', item.color || 'text-[#d34341]']" />
            <div :class="['flex flex-col gap-1 mt-1', item.color || 'text-black']">
              <span class="font-semibold text-md">{{ item.nama }}</span>
              <span class="text-xs font-light">{{ item.ktr }}</span>
            </div>
            <div
              :class="['py-2.5 flex items-center mt-5 cursor-pointer gap-2 rounded-3xl w-max px-1.5', item.bgBt || 'bg-[#d34341] hover:bg-[#a92523]']">
              <p :class="['text-sm ml-3', item.colorBt || 'text-white']" style="font-weight: 500;">Read More</p>
              <span :class="['p-1 rounded-full', item.bgIcons || 'bg-white/60 ']">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                  stroke="currentColor" :class="['size-3', item.colorBt || 'text-white']">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full sm:px-6 md:px-20">
      <h1 class="text-2xl font-semibold">Education</h1>
      <div v-if="education.length === 0" class="text-gray-500 text-center py-10">Belum ada berita.</div>
      <div v-else class="flex flex-wrap w-full gap-6 mt-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div @click="toDetail(b.id)" v-for="b in education" :key="b.id"
            class="bg-white cursor-pointer flex-1/5 border border-[#bebcbca1] rounded-md shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
            <div class="w-full h-44 overflow-hidden bg-gray-200">
              <img class="w-full h-full object-cover" :src="`http://localhost:3003/uploads/tmp/${b.gambar}`"
                :alt="b.gambar">
            </div>
            <div class="p-4 flex flex-col flex-grow">
              <h2 style="font-weight: 600;" class="text-gray-800 text-md mb-2 line-clamp-2">{{ b.judul }}</h2>
              <div class="flex gap-5 items-center">
                <p style="font-size: 11px;" class="text-xs p-0.5 rounded-2xl px-5  bg-blue-100/60 text-[#646363] mb-2">{{ b.nama_tipe }}</p>
                <p class="text-xs text-[#787878] cursor-text font-medium mb-2">{{ formatDate(b.created_at) }}</p>
              </div>
              <p style="font-size: 12px;" class="tracking-tight leading-[15px] text-[#5e5d5d] mb-4 line-clamp-3 flex-grow">{{ b.isi }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { UserGroupIcon, HeartIcon, SparklesIcon, UserIcon, BuildingLibraryIcon, QueueListIcon, DocumentTextIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { CheckIcon } from '@heroicons/vue/24/solid'
import router from "@/router";
import { useRouter } from "vue-router";
import imgPoli from "../../../assets/img/ImageLandingPoli.jpg"


const ctasection = ref([])
const ourServices = ref([])
const jadwalDokter = ref([])
const loading = ref(true)
const err = ref(null)
const routId = useRouter()
const error = ref(false)
const education = ref([])
const cardSisma = ref([])
const user = ref(null);
const api_url = "http://localhost:3003"
const apiJadwal = "http://localhost:3003/api/pasien/jadwal/hari-ini";
const token = localStorage.getItem("token")


const dataCTA = () => {
  ctasection.value = [
    { id: 1, nama: "Daftar Poli Sekarang", ktr: "Daftar poli tanpa harus antri.", icon: BuildingLibraryIcon, route: "/pasien/daftar-poli" },
    { id: 2, nama: "Status Antrian", ktr: "Lihat status antrian sekarang.", icon: QueueListIcon, route: "/pasien/status-antrian" },
    { id: 3, nama: "Riwayat Kunjungan", ktr: "Lihat riwayat pemeriksaan, diagnosa dan obat.", icon: DocumentTextIcon, route: "/pasien/riwayat-kunjungan" },
    { id: 4, nama: "Jadwal Dokter", ktr: "Cek jadwal dokter berdasarkan poli.", icon: CalendarDaysIcon, route: "/pasien/dokter-pasien" },
    { id: 5, nama: "Konsultasi Online", ktr: "Konsultasi dengan dokter yang sedang online.", icon: ChatBubbleLeftRightIcon, route: "/pasien/konsultasi" },
    { id: 6, nama: "Resep Obat", ktr: "Lihat status resep: wei status obat realtime.", icon: ClipboardDocumentListIcon, route: "/pasien/status-resep" }
  ]
}

const services = () => {
  ourServices.value = [
    { id: 1, service: "Tim Yang Berpengalaman", icon: CheckIcon },
    { id: 2, service: "Teknologi Terkini", icon: CheckIcon },
    { id: 3, service: "Layanan Komparatif", icon: CheckIcon },
    { id: 4, service: "Layanan Darurat Sisma", icon: CheckIcon },
  ]
}

const cardHealth = () => {
  cardSisma.value = [
    { id: 1, nama: "Perawatan Sisma Umum", ktr: "Layanan pemeriksaan kesehatan umum yang cepat, nyaman, dan mudah diakses untuk semua pasien.", icons: UserIcon, bgBt: "bg-[#fff]", bg: "bg-[#d34341]", color: "text-[#fff]", colorBt: "text-[#d34341]", bgIcons: "bg-[#d3434171]" },
    { id: 2, nama: "Perawatan Sisma Gigi", ktr: "Perawatan gigi yang aman dan profesional untuk menjaga kesehatan serta kenyamanan senyum Anda.", icons: SparklesIcon },
    { id: 3, nama: "Perawatan Sisma Kandungan", ktr: "Layanan kesehatan ibu dan kandungan dengan pendekatan ramah, aman, dan penuh perhatian.", icons: HeartIcon },
    { id: 4, nama: "Perawatan Sisma KIA", ktr: "Pendampingan kesehatan ibu dan anak agar tumbuh kembang selalu terpantau dengan baik.", icons: UserGroupIcon },
  ]
}

const goTo = (item) => {
  router.push(`${item.route}`)
}

const toDetail = (id) => {
  routId.push(`/education/${id}`)
}

const getJadwal = async () => {
  error.value = false
  loading.value = true
  err.value = null
  try {
    const token = localStorage.getItem("token")
    const res = await axios.get(apiJadwal, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    jadwalDokter.value = res.data.data
  } catch (err) {
    error.value = true
    console.log("Error get jadwal dokter!", err)
  } finally {
    loading.value = false
  }
}

const getBerita = async () => {
  try {
    const res = await axios.get("http://localhost:3003/api/berita", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    education.value = res.data.data
    console.log(education.value)
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api_url}/api/pasien/profil`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = res.data;
  } catch (err) {
    console.error("Gagal mengambil profil pasien:", err);
  }

  dataCTA()
  services()
  cardHealth()
  getJadwal()
  getBerita()
});

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};

</script>

<style>
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #111b21;
}

::-webkit-scrollbar-thumb {
    background: #374045;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #4a5358;
}
</style>