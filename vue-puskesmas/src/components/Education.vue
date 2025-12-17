<template>
    <div class="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div class="px-4 sm:px-6 lg:px-8 xl:px-20 max-w-[1400px] mx-auto">
            <div class="flex items-center gap-2.5 text-sm pt-6 pb-8">
                <button @click="$router.push('/pasien/dashboard')"
                    class="text-sm cursor-pointer text-gray-600 hover:text-[#d34341] transition-colors duration-200 font-medium">
                    Home
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <button
                    class="text-sm cursor-pointer text-gray-600 hover:text-[#d34341] transition-colors duration-200 font-medium">
                    Education
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <span class="text-sm text-gray-900 font-semibold truncate">{{ dataDetail.judul }}</span>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-20">
                <div class="lg:col-span-8">
                    <article
                        class="bg-white rounded-3xl shadow-lg shadow-gray-200/50 overflow-hidden border border-gray-100">
                        <div class="aspect-[21/10] w-full overflow-hidden bg-gray-100">
                            <img class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                :src="`http://localhost:3003/uploads/tmp/${dataDetail.gambar}`" :alt="dataDetail.judul">
                        </div>
                        <div class="p-6 sm:p-8 lg:p-12">
                            <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                <span class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p class="text-xs font-medium text-gray-600">{{ formatDate(dataDetail.created_at) }}
                                    </p>
                                </span>
                            </div>
                            <h1
                                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                                {{ dataDetail.judul }}
                            </h1>
                            <div class="prose prose-lg max-w-none">
                                <p v-for="(p, i) in formattedIsi" :key="i"
                                    class="mb-6 text-gray-700 leading-relaxed text-justify indent-8 text-base sm:text-lg">
                                    {{ p }}
                                </p>
                            </div>
                            <div class="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
                                <span
                                    class="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-[#d34341] rounded-xl text-sm font-semibold hover:shadow-md transition-shadow duration-200">
                                    Healthcare
                                </span>
                                <span
                                    class="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-[#d34341] rounded-xl text-sm font-semibold hover:shadow-md transition-shadow duration-200">
                                    Education
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="lg:col-span-4">
                    <div class="sticky top-6 space-y-5">
                        <div class="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
                            <h3 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <svg class="w-5 h-5 text-[#d34341]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share Artikel
                            </h3>
                            <div class="grid grid-cols-4 gap-3">
                                <a href="#"
                                    class="aspect-square rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg group">
                                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#"
                                    class="aspect-square rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg group">
                                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a href="#"
                                    class="aspect-square rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg group">
                                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </a>
                                <a href="#"
                                    class="aspect-square rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg group">
                                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
                            <h3 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <svg class="w-5 h-5 text-[#d34341]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                Artikel Terkait
                            </h3>
                            <div
                                class="space-y-4 max-h-[500px] scrollbar-hide overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                <div @click="toDetail(item.id)" :key="item.id" v-for="item in education"
                                    class="group block cursor-pointer hover:bg-gray-50 rounded-xl p-3 transition-all duration-200 -mx-3">
                                    <div class="flex gap-4">
                                        <div
                                            class="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0 overflow-hidden ring-1 ring-gray-200">
                                            <img :src="`http://localhost:3003/uploads/tmp/${item.gambar}`"
                                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                :alt="item.judul">
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <h4
                                                class="font-semibold text-sm text-gray-900 group-hover:text-[#d34341] transition-colors line-clamp-2 mb-2 leading-snug">
                                                {{ item.judul }}
                                            </h4>
                                            <p class="text-xs text-gray-500 font-medium">{{ formatDate(item.created_at)
                                                }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="bg-gradient-to-br from-[#d34341] via-[#c13634] to-[#a83432] rounded-2xl shadow-xl shadow-red-500/20 p-6 text-white overflow-hidden relative">
                            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12">
                            </div>
                            <div class="relative z-10">
                                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 class="text-xl font-bold mb-2">Dapatkan Update</h3>
                                <p class="text-sm text-red-50 mb-5 leading-relaxed">Dapatkan tips dan artikel kesehatan terbaru yang dikirimkan ke kotak masuk Anda.</p>
                                <input type="email" placeholder="Your email address"
                                    class="w-full px-4 py-3 rounded-xl text-gray-900 mb-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400 shadow-sm">
                                <button
                                    class="w-full px-4 py-3 bg-white text-[#d34341] rounded-xl font-bold hover:bg-red-50 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import router from '@/router';
import { watch, nextTick } from 'vue'

const dataDetail = ref([])
const education = ref([])
const token = localStorage.getItem("token")
const route = useRoute()
const idBerita = route.params.id
const detailRout = useRouter()

watch(() => route.params.id, (newId) => {
    if (newId) getIdEducation(newId)
})


const getIdEducation = async (id) => {
    try {
        const beritaID = id || route.params.id
        const res = await axios.get(`http://localhost:3003/api/berita/${beritaID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dataDetail.value = res.data
        nextTick(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })
    } catch (err) {
        console.log(err)
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

const formattedIsi = computed(() => {
    if (!dataDetail.value.isi) return [];
    return dataDetail.value.isi.split(/\n+/).filter(Boolean);
});

const toDetail = (id) => {
    detailRout.push(`/education/${id}`)
}


const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
};

onMounted(() => {
    getIdEducation()
    getBerita()
})
</script>
