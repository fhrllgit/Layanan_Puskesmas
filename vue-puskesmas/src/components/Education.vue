<template>
    <div>
        <div class="px-4 sm:px-6  md:px-20 min-h-screen h-full">
            <div class="flex items-center gap-5 text-xs mt-20">
                <button @click="$router.push('/pasien/dashboard')" class="text-[#d34341] cursor-pointer">Home</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                    stroke="currentColor" class="size-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <button class="text-[#d34341] cursor-pointer">Education</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                    stroke="currentColor" class="size-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <button>{{ dataDetail.judul }}</button>
            </div>
            <div class="mt-20">
                <div class="flex gap-5">
                    <div class="flex flex-col flex-1/5">
                        <div class="max-h-100">
                            <img class="w-full h-full rounded-3xl object-cover bg-center"
                                :src="`http://localhost:3003/uploads/tmp/${dataDetail.gambar}`"
                                :alt="`${dataDetail.gambar}`">
                        </div>
                        <div>
                            <h1 class="text-3xl font-semibold mb-10 mt-5">{{ dataDetail.judul }}</h1>
                            <p style="font-weight: 300; font-size: 14px;" v-for="(p, i) in formattedIsi" :key="i"
                                class="mb-4 text-justify indent-8 leading-relaxed">
                                {{ p }}
                            </p>
                        </div>
                    </div>
                    <div class="flex-1 border">
                        <h1>pending</h1>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const dataDetail = ref([])
const token = localStorage.getItem("token")
const route = useRoute()
const id = route.params.id

const getIdEducation = async () => {
    try {
        const res = await axios.get(`http://localhost:3003/api/berita/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dataDetail.value = res.data
    } catch (err) {
        console.log(err)
    }
}

const formattedIsi = computed(() => {
    if (!dataDetail.value.isi) return [];
    return dataDetail.value.isi.split(/\n+/).filter(Boolean);
});

onMounted(() => {
    getIdEducation()
})
</script>
