<template>
  <div class="min-h-screen h-full  overflow-hidden">
    <Navbar />
    <!-- route bawah alamat mo sisma -->
    <button 
    @click="goToRegister"
      class="fixed bottom-6 text-sm cursor-pointer right-6 z-50 bg-[#039BE5] text-white px-5 py-3 rounded-full shadow-2xl hover:bg-[#039BE5] transition-all duration-300 flex items-center gap-2 font-semibold hover:scale-110">
      <Phone class="w-5 h-5" />
      Hubungi Kami
    </button>
    <!-- beranda -->
    <div id="beranda" class="px-4 sm:px-6 md:px-20 min-h-screen h-full">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-40 right-20 w-32 h-32 border-2 border-[#00A6FD]/10 rounded-2xl rotate-45 animate-float">
        </div>
        <div
          class="absolute bottom-30 rotate-90 left-1/3  w-32 h-32 border-2 border-[#00A6FD]/10 rounded-2xl rotate-45 animate-float">
        </div>
        <div class="water-bubble" style="animation-delay: 0s; top: 200px; left: 40px;"></div>
      </div>
      <div class="flex  flex-col lg:flex-row relative">
        <div class="flex-1 flex flex-col h-auto lg:h-screen justify-center py-10 lg:py-0">
          <div class="flex relative flex-col  space-y-2.5">
            <div class="grid-bg"></div>
            <div class="flex mb-10 -mt-4 items-center gap-4 px-3 py-2 rounded-2xl bg-white shadow-lg w-max">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-5 text-[#00A6FD] overflow-hidden">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span class="text-sm font-semibold text-[#039BE5]">Platform Kesehatan Digital</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl text-[#039BE5]" style="font-weight: 800;">
              Selamat datang <span class="text-black">di<br> Sisma <br> Siap Melayani <br> Masyarakat</span>
            </h1>
            <p class="text-sm mt-7 text-[#626262]">
              Perawatan cerdas kami siap membantu anda. <span class="hidden sm:inline">Hubungi kami untuk mendapatkan
                <br class="hidden lg:inline"> perawatan kesehatan yang lebih baik</span>
              <span class="inline sm:hidden">Hubungi kami untuk mendapatkan perawatan kesehatan yang lebih baik</span>
            </p>
            <div class="flex gap-2 mt-15 w-max py-2 border-t border-t-[#cacaca7c] border-b border-b-[#cacaca7c]">
              <div class="border-r border-r-[#cacaca7c] w-40">
                <p class="text-3xl font-bold ">10+</p>
                <span class="text-sm text-[#706f6f]">Skil Dokter</span>
              </div>
              <div class="border-r border-r-[#cacaca7c] w-40 ">
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
        <div class="absolute z-10 left-1/2 ml-8 bottom-1/6 shadow-md">
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
        <div class="absolute z-10 right-1/3 mr-35 overflow-hidden rounded-2xl mt-50 shadow-md">
          <div class="bg-white gap-1.5 p-3.5  w-max flex items-center">
            <div class="bg-[#00a4fd94] p-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-5 text-[#fff]">
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
            <div class="bg-[#00a4fd94] p-2.5 rounded-md">
              <svg class="text-[#fff] size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
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
    <section id="layanan" 
      class="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden bg-gradient-to-b from-white via-gray-100/30 to-white">
      <div class="absolute inset-0 pointer-events-none
            bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)]
            bg-[size:4rem_4rem]
            [mask-image:linear-gradient(to_bottom,transparent_2%,black_70%,transparent_98%)]">
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_3px,transparent_3px),linear-gradient(to_bottom,#8080800a_3px,transparent_3px)] bg-[size:2.5rem_2.5rem]">
        </div>
        <div
          class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#039BE5]/10 to-transparent rounded-3xl rotate-12 blur-3xl animate-float">
        </div>
        <div
          class="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-float-delayed">
        </div>
        <div
          class="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl -rotate-12 blur-3xl animate-float-slow">
        </div>
        <div class="absolute top-32 right-1/4 w-20 h-20 border-2 border-[#039BE5]/20 rounded-lg rotate-45"></div>
        <div class="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-purple-500/20 rounded-lg -rotate-12"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#039BE5]/10 via-purple-500/10 to-blue-500/10 rounded-full mb-6 backdrop-blur-sm border border-white/50 shadow-sm">
            <div class="w-2 h-2 bg-[#039BE5] rounded-full animate-pulse"></div>
            <span class="text-[#039BE5] font-semibold text-sm tracking-wide">LAYANAN KAMI</span>
          </div>

          <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Layanan di
            <span class="relative inline-block">
              <span
                class="relative z-10 bg-gradient-to-r from-[#039BE5] to-[#039BE5]/80 bg-clip-text text-transparent">SiSMA</span>
              <div
                class="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#039BE5]/30 to-transparent blur-sm">
              </div>
            </span>
          </h2>

          <p style="font-weight: 400;" class="text-sm md:text-lg text-[#504f4f] max-w-3xl mx-auto leading-relaxed">
            Kemudahan akses layanan kesehatan berkualitas kapan saja dan di mana saja dengan teknologi modern
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div v-for="(service, idx) in services" :key="idx" @mouseenter="hovered = idx" @mouseleave="hovered = null"
            class="group relative" :style="{ animationDelay: `${idx * 0.1}s` }">
            <div class="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8
            border border-gray-200/50 shadow-lg hover:shadow-2xl
            transition-all duration-500 cursor-pointer" :class="hovered === idx ? '-translate-y-2' : ''">
              <div class="absolute inset-0 rounded-3xl transition-opacity duration-500" :style="{
                opacity: hovered === idx ? 0.05 : 0,
                background: `linear-gradient(to bottom right, var(--c1), var(--c2))`,
                '--c1': service.colors[0],
                '--c2': service.colors[1]
              }"></div>

              <div class="relative z-10">
                <div class="mb-6 relative inline-block">
                  <div class="w-16 h-16 rounded-2xl flex items-center justify-center
                  transition-all duration-500 shadow-lg" :class="[
                    'group-hover:scale-110 group-hover:rotate-6',
                    service.bg]">
                    <component :is="service.icon" class="w-8 h-8 text-white" />
                  </div>
                  <div class="absolute inset-0 rounded-2xl animate-ping transition-opacity duration-500"
                    :class="service.bg" :style="{ opacity: hovered === idx ? 0.3 : 0 }"></div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300"
                  :class="hovered === idx ? 'text-[#d34341]' : ''">
                  {{ service.title }}
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">
                  {{ service.desc }}
                </p>
                <div class="flex items-center gap-2 text-[#d34341] font-semibold text-sm">
                  <span class="relative group-hover:underline">Selengkapnya</span>
                  <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl opacity-20 -z-10 transition-all duration-500"
              :class="service.bg" :style="{ opacity: hovered === idx ? 0.2 : 0 }"></div>
          </div>
        </div>
        <!-- <div class="bg-[#d34341] w-max text-white px-4 py-3 shadow-xl rounded-3xl cursor-pointer">
          <div class="flex items-center gap-4">
            <span class="text-sm">Lihat Semua Layanan</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>

          </div>
        </div> -->
      </div>
    </section>
    <!-- edukasi -->
    <div id="edukasi">
      <Education />
    </div>
    <!-- contact -->
    <div id="contact">
      <Contact />
    </div>
    <!-- regis -->
    <div id="register">
      <Register />
    </div>
    <!-- footer -->
   <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  Stethoscope,
  Calendar,
  FileText,
  Video,
  Phone
} from "lucide-vue-next";
import Navbar from './Navbar.vue'
import Education from '../views/components/Education.vue';
import Contact from './components/Contact.vue';
import Register from '../views/components/register.vue'
import Footer from './components/footer.vue';
import { useRouter } from "vue-router";


const hovered = ref(null);
const isVisible = reactive({})
const router = useRouter();

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

const goToRegister = () => {
  router.push({
    path: "/",
    hash: "#register"
  });
};

const services = [
  {
    icon: Stethoscope,
    title: "Konsultasi Online",
    desc: "Konsultasi dengan dokter profesional kapan saja",
    bg: "bg-gradient-to-br from-red-500 to-orange-500",
    colors: ["#ef4444", "#f97316"]
  },
  {
    icon: Calendar,
    title: "Booking Appointment",
    desc: "Jadwalkan kunjungan Anda dengan cepat",
    bg: "bg-gradient-to-br from-purple-500 to-pink-500",
    colors: ["#a855f7", "#ec4899"]
  },
  {
    icon: FileText,
    title: "Rekam Medis Digital",
    desc: "Akses riwayat kesehatan Anda di mana saja",
    bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    colors: ["#3b82f6", "#06b6d4"]
  },
  {
    icon: Video,
    title: "Telemedicine",
    desc: "Layanan kesehatan jarak jauh modern",
    bg: "bg-gradient-to-br from-green-500 to-emerald-500",
    colors: ["#22c55e", "#10b981"]
  },
];
</script>


<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(12deg);
  }

  50% {
    transform: translateY(-20px) rotate(12deg);
  }
}

@keyframes float-delayed {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-30px);
  }
}

@keyframes float-slow {

  0%,
  100% {
    transform: translateY(0px) rotate(-12deg);
  }

  50% {
    transform: translateY(-15px) rotate(-12deg);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(45deg);
  }

  50% {
    transform: translateY(-20px) rotate(45deg);
  }
}

@keyframes float-delayed {

  0%,
  100% {
    transform: translateY(0px) rotate(-12deg);
  }

  50% {
    transform: translateY(-30px) rotate(-12deg);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
}


.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}
</style>