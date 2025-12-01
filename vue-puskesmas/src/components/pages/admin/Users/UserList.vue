<template>
    <div>
        <div>
            <h1 class="text-4xl font-semibold mb-4">Data Pengguna</h1>
        </div>
        <div class="flex gap-3 mb-4">
            <div class="bg-white  shadow-xl py-2 px-5 rounded-3xl">
                <input v-model="search" @input="fetchUsers"
                    class="outline-none ring-0 focus:outline-none focus:ring-0 placeholder:text-sm"
                    placeholder="Cari nama...">
            </div>
            <div class="bg-white  shadow-xl py-2 px-5 rounded-3xl">
                <select v-model="role" @change="fetchUsers" class="outline-none ring-0 focus:outline-none focus:ring-0">
                    <option value="">Semua Role</option>
                    <option value="admin">Admin</option>
                    <option value="dokter">Dokter</option>
                    <option value="apoteker">Apoteker</option>
                    <option value="pasien">Pasien</option>
                </select>
            </div>
        </div>
        <div class="bg-white p-2 shadow-xl">
            <table class="min-w-full border border-gray-300">
                <thead class="bg-gray-100">
                    <tr class="text-md">
                        <th class="border border-gray-300 px-4 py-2 text-left">Nama</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Role</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 text-sm">
                        <td class="border border-gray-300 px-4 py-2">{{ user.nama }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
                        <td class="border border-gray-300 px-4 py-2">
                            <div :style="{ background: hexToRgba(colorRole(user.status), 0.2) }"
                                class="w-20 flex items-center justify-center rounded-2xl text-sm py-0.5">
                                <span :style="{ color: colorRole(user.status), fontWeight: '600' }">{{ user.status
                                    }}</span>
                            </div>
                        </td>
                        <td class="border border-gray-300 px-4 py-2">{{ user.role }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ formatDate(user.created_at) }}</td>
                    </tr>
                </tbody>
            </table>
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
