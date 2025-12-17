<template>
    <div class="relative min-h-screen">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute inset-0 opacity-[0.03]"
                style="background-image: linear-gradient(#039BE5 1px, transparent 1px), linear-gradient(90deg, #039BE5 1px, transparent 1px); background-size: 50px 50px;">
            </div>
            <div
                class="absolute top-40 right-20 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float">
            </div>
            <div class="absolute bottom-30 rotate-90 left-1/3 w-32 h-32 border-2 border-[#039BE5]/10 rounded-2xl rotate-45 animate-float"
                style="animation-delay: 2s;">
            </div>
            <div class="absolute top-1/2 left-10 w-24 h-24 border-2 border-[#039BE5]/10 rounded-2xl rotate-12 animate-float"
                style="animation-delay: 4s;">
            </div>
            <div class="absolute bottom-40 right-1/4 w-28 h-28 border-2 border-[#039BE5]/10 rounded-2xl -rotate-12 animate-float"
                style="animation-delay: 6s;">
            </div>
        </div>

        <div class="relative max-w-7xl mx-auto">
            <div
                class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-8 mb-6 backdrop-blur-sm border border-[#039BE5]/10">
                <div class="flex items-center gap-4">
                    <div
                        class="bg-gradient-to-br from-[#039BE5] to-[#0288D1] p-3 rounded-2xl shadow-lg shadow-[#039BE5]/30">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800">Data Pengguna</h1>
                        <p class="text-gray-500 text-sm mt-1">Kelola dan pantau semua pengguna sistem</p>
                    </div>
                </div>
            </div>
            <div
                class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 p-6 mb-6 backdrop-blur-sm border border-[#039BE5]/10">
                <div class="flex gap-4 flex-wrap">
                    <div class="flex-1 min-w-[250px]">
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input v-model="search" @input="fetchUsers"
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white"
                                placeholder="Cari nama pengguna...">
                        </div>
                    </div>
                    <div class="min-w-[200px]">
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z">
                                    </path>
                                </svg>
                            </div>
                            <select v-model="role" @change="fetchUsers"
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 rounded-xl outline-none transition-all bg-gray-50 hover:bg-white cursor-pointer appearance-none">
                                <option value="">Semua Role</option>
                                <option value="admin">👑 Admin</option>
                                <option value="dokter">🩺 Dokter</option>
                                <option value="apoteker">💊 Apoteker</option>
                                <option value="pasien">🏥 Pasien</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
                        <div class="flex items-center gap-3">
                            <div class="bg-blue-500 p-2 rounded-lg">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-gray-600 font-medium">Total Users</p>
                                <p class="text-xl font-bold text-gray-800">{{ users.length }}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200">
                        <div class="flex items-center gap-3">
                            <div class="bg-emerald-500 p-2 rounded-lg">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-gray-600 font-medium">Active</p>
                                <p class="text-xl font-bold text-gray-800">{{users.filter(u => u.status ===
                                    'active').length }}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200">
                        <div class="flex items-center gap-3">
                            <div class="bg-amber-500 p-2 rounded-lg">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-gray-600 font-medium">Pending</p>
                                <p class="text-xl font-bold text-gray-800">{{users.filter(u => u.status ===
                                    'pending').length }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-4 border border-red-200">
                        <div class="flex items-center gap-3">
                            <div class="bg-red-500 p-2 rounded-lg">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-gray-600 font-medium">Inactive</p>
                                <p class="text-xl font-bold text-gray-800">{{users.filter(u => u.status ===
                                    'rejected').length }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="bg-white rounded-3xl shadow-lg shadow-[#039BE5]/10 overflow-hidden backdrop-blur-sm border border-[#039BE5]/10">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gradient-to-r from-[#039BE5] to-[#0288D1] text-white">
                                <th class="px-6 py-4 text-left font-semibold">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                            </path>
                                        </svg>
                                        Nama
                                    </div>
                                </th>
                                <th class="px-6 py-4 text-left font-semibold">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        Email
                                    </div>
                                </th>
                                <th class="px-6 py-4 text-left font-semibold">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Status
                                    </div>
                                </th>
                                <th class="px-6 py-4 text-left font-semibold">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        Role
                                    </div>
                                </th>
                                <th class="px-6 py-4 text-left font-semibold">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        Tanggal Daftar
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id"
                                class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-[#039BE5]/5 hover:to-transparent transition-all duration-200 group">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-10 h-10 rounded-full bg-gradient-to-br from-[#039BE5] to-[#0288D1] flex items-center justify-center text-white font-semibold shadow-lg group-hover:scale-110 transition-transform">
                                            {{ user.nama.charAt(0).toUpperCase() }}
                                        </div>
                                        <span class="font-medium text-gray-800">{{ user.nama }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-gray-600">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                            </path>
                                        </svg>
                                        {{ user.email }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"
                                        :style="{ background: hexToRgba(colorRole(user.status), 0.15), color: colorRole(user.status) }">
                                        <span class="w-2 h-2 rounded-full animate-pulse"
                                            :style="{ background: colorRole(user.status) }"></span>
                                        {{ user.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium">
                                        <span v-if="user.role === 'admin'">👑</span>
                                        <span v-else-if="user.role === 'dokter'">🩺</span>
                                        <span v-else-if="user.role === 'apoteker'">💊</span>
                                        <span v-else>🏥</span>
                                        {{ user.role }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-gray-600 text-sm">
                                    {{ formatDate(user.created_at) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="users.length === 0" class="text-center py-16">
                    <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                        </path>
                    </svg>
                    <p class="text-gray-400 text-lg font-medium mb-2">Tidak ada data pengguna</p>
                    <p class="text-gray-400 text-sm">Coba ubah filter pencarian Anda</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"

const users = ref([])
const search = ref("")
const role = ref("")
const api_url = "http://localhost:3003"

const fetchUsers = async () => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${api_url}/api/admin/users/admin-filter`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                search: search.value,
                role: role.value,
            }
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

const colorRole = (role) => {
    const lower = role.toLowerCase()
    if (lower.includes("active")) return "#2563EB"
    if (lower.includes("pending")) return "#E53935"
    return "#cacaca"
}

const hexToRgba = (hex, opacity = 0.7) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

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

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #039BE5;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #0288D1;
}
</style>