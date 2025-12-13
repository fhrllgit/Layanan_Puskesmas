<template>
    <div>
        <div
            class="w-full relative min-h-screen flex flex-col justify-center px-4 md:px-6 py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
            <div
                class="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white via-white/70 to-transparent z-20">
            </div>
            <div
                class="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/70 to-transparent z-20">
            </div>
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#039BE5]/20 to-cyan-400/10 rounded-full blur-3xl">
                </div>
                <div
                    class="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-tr from-blue-400/15 to-purple-400/10 rounded-full blur-3xl">
                </div>
                <div
                    class="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-2xl">
                </div>
            </div>

            <div class="text-center mb-12 relative z-10">
                <div
                    class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#039BE5]/10 to-cyan-400/10 border border-[#039BE5]/20 mb-6 backdrop-blur-sm">
                    <div class="w-2 h-2 bg-[#039BE5] rounded-full animate-pulse"></div>
                    <span
                        class="text-sm font-semibold bg-gradient-to-r from-[#039BE5] to-cyan-600 bg-clip-text text-transparent">
                        BERGABUNG DENGAN KAMI
                    </span>
                </div>

                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Daftar & Mulai Menggunakan
                    <span
                        class="bg-gradient-to-r from-[#039BE5] via-[#0288D1] to-cyan-500 bg-clip-text text-transparent">
                        SiSMA
                    </span>
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Isi form di bawah dan tim kami akan segera memverifikasi Anda
                </p>
            </div>

            <div
                class="bg-white/80 backdrop-blur-xl rounded-3xl w-full max-w-5xl mx-auto shadow-2xl border border-gray-100 overflow-hidden relative z-10">
                <div class="h-2 bg-gradient-to-r from-[#039BE5] via-cyan-500 to-blue-400"></div>
                <div class="flex flex-col items-center justify-start px-6 py-10 md:px-12 md:py-12 w-full">
                    <div class="w-full max-w-4xl">
                        <div class="text-center mb-10">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#039BE5] to-cyan-500 shadow-lg shadow-[#039BE5]/25 mb-4">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z">
                                    </path>
                                </svg>
                            </div>
                            <h1
                                class="text-3xl font-bold bg-gradient-to-r from-[#039BE5] to-cyan-600 bg-clip-text text-transparent mb-2">
                                Registrasi Akun
                            </h1>
                            <p class="text-sm text-gray-500">Lengkapi data diri Anda dengan benar</p>
                        </div>

                        <form @submit.prevent="handleRegister" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="group">
                                    <label
                                        class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                            </path>
                                        </svg>
                                        Nama Lengkap
                                    </label>
                                    <input v-model="form.nama" type="text" required
                                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all group-hover:border-gray-300"
                                        placeholder="Masukkan nama lengkap" />
                                </div>

                                <div class="group">
                                    <label
                                        class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        Email
                                    </label>
                                    <input v-model="form.email" type="email" required
                                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all group-hover:border-gray-300"
                                        placeholder="nama@email.com" />
                                </div>
                            </div>

                            <div class="group">
                                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                        </path>
                                    </svg>
                                    Jenis Kelamin
                                </label>
                                <select v-model="form.jenis_kelamin" required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all group-hover:border-gray-300 bg-white">
                                    <option value="" disabled>Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="group">
                                    <label
                                        class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        No HP
                                    </label>
                                    <input v-model="form.no_hp" type="text" required
                                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all group-hover:border-gray-300"
                                        placeholder="08xxxxxxxxxx" />
                                </div>

                                <div class="group">
                                    <label
                                        class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2">
                                            </path>
                                        </svg>
                                        NIK
                                    </label>
                                    <input v-model="form.nik" type="text" required
                                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all group-hover:border-gray-300"
                                        placeholder="16 digit NIK" />
                                </div>
                            </div>

                            <div class="group">
                                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                                        </path>
                                    </svg>
                                    Alamat Lengkap
                                </label>
                                <input v-model="form.alamat_lengkap" type="text" required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all group-hover:border-gray-300"
                                    placeholder="Jl. Contoh No. 123" />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <input v-model="form.kecamatan" placeholder="Kecamatan" required
                                    class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all hover:border-gray-300" />
                                <input v-model="form.kota" placeholder="Kota" required
                                    class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all hover:border-gray-300" />
                                <input v-model="form.provinsi" placeholder="Provinsi" required
                                    class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all hover:border-gray-300" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                        </path>
                                    </svg>
                                    No BPJS
                                    <span class="text-gray-500 text-xs">(opsional)</span>
                                </label>
                                <input v-model="form.no_bpjs" type="text" placeholder="No BPJS (opsional)"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all hover:border-gray-300" />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="group">
                                    <label
                                        class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                            </path>
                                        </svg>
                                        Password
                                    </label>
                                    <input v-model="form.password" type="password" required
                                        class="px-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all group-hover:border-gray-300"
                                        placeholder="Min. 8 karakter" />
                                </div>

                                <div class="group">
                                    <label
                                        class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Konfirmasi Password
                                    </label>
                                    <input v-model="form.confirm_password" type="password" required
                                        class="px-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:border-[#039BE5] focus:ring-4 focus:ring-[#039BE5]/10 outline-none transition-all group-hover:border-gray-300"
                                        placeholder="Ulangi password" />
                                </div>
                            </div>

                            <div class="group">
                                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <svg class="w-4 h-4 text-[#039BE5]" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Upload KTP <span class="text-red-500">*</span>
                                </label>
                                <div class="relative border-2 border-dashed rounded-2xl p-8 transition-all bg-gradient-to-br"
                                    :class="previewUrl
                                        ? 'border-[#039BE5] from-[#039BE5]/10 to-cyan-100/60'
                                        : 'border-gray-300 group-hover:border-[#039BE5] from-[#039BE5]/5 to-cyan-50/50'">

                                    <input type="file" accept="image/*" @change="handleFileUpload"
                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />

                                    <div v-if="previewUrl" class="flex flex-col items-center gap-4">
                                        <img :src="previewUrl" alt="Preview KTP"
                                            class="max-h-52 rounded-xl shadow-xl border object-contain bg-white p-2" />
                                    </div>

                                    <div v-else
                                        class="flex flex-col items-center gap-3 text-center pointer-events-none">
                                        <div
                                            class="w-14 h-14 rounded-xl bg-gradient-to-br from-[#039BE5] to-cyan-500 flex items-center justify-center shadow-lg">
                                            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>

                                        <div>
                                            <p class="text-sm font-semibold text-gray-700 mb-1">
                                                Klik atau drag file ke sini
                                            </p>
                                            <p class="text-xs text-gray-500">
                                                JPG, PNG, JPEG (Max 5MB)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button v-if="previewUrl" type="button" @click="removePreview"
                                    class="text-sm mt-2 cursor-pointer font-semibold text-red-600 hover:underline bg-white px-4 py-2 rounded-full shadow">
                                    Hapus Foto
                                </button>
                            </div>
                            <div class="pt-6 flex justify-center">
                                <button type="submit" class="group relative inline-flex items-center justify-center gap-3 px-12 py-4 rounded-full
                              bg-gradient-to-r from-[#039BE5] cursor-pointer to-blue-500
                            text-white font-bold text-lg
                              shadow-xl shadow-[#039BE5]/30
                              hover:scale-105 hover:shadow-2xl
                              transition-all duration-300
                              focus:outline-none focus:ring-4 focus:ring-[#039BE5]/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <span>Daftar Sekarang</span>
                                </button>
                            </div>

                            <p class="text-center text-xs text-gray-500 pt-4">
                                Dengan mendaftar, Anda menyetujui
                                <a href="#" class="text-[#039BE5] font-semibold hover:underline">Syarat & Ketentuan</a>
                                serta
                                <a href="#" class="text-[#039BE5] font-semibold hover:underline">Kebijakan Privasi</a>
                                kami
                            </p>

                        </form>
                    </div>
                </div>
            </div>

            <!-- Bottom Text -->
            <div class="text-center mt-8 relative z-10">
                <p class="text-gray-600">
                    Sudah punya akun?
                    <a href="#" class="text-[#039BE5] font-semibold hover:underline">Login di sini</a>
                </p>
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Swal from 'sweetalert2'

const form = ref({
    nama: "",
    jenis_kelamin: "",
    email: "",
    no_hp: "",
    alamat_lengkap: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    nik: "",
    no_bpjs: "",
    password: "",
    confirm_password: "",
    ktp_file: null
});

const message = ref("");
const previewUrl = ref(null);

const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        form.value.ktp_file = file;
        previewUrl.value = URL.createObjectURL(file);
    }
};

const removePreview = () => {
    form.value.ktp_file = null;
    previewUrl.value = null;
};

const handleRegister = async () => {
    try {
        if (
            !form.value.nama ||
            !form.value.jenis_kelamin ||
            !form.value.email ||
            !form.value.password ||
            !form.value.confirm_password ||
            !form.value.no_hp ||
            !form.value.alamat_lengkap ||
            !form.value.kecamatan ||
            !form.value.kota ||
            !form.value.provinsi ||
            !form.value.nik ||
            !form.value.ktp_file
        ) {
            message.value = "Lengkapi semua data yang wajib diisi.";
            return;
        }

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!validEmail.test(form.value.email)) {
            message.value = "Format email tidak valid. Gunakan email yang benar."
            return
        }

        if (!form.value.jenis_kelamin) {
            message.value = "Pilih jenis kelamin.";
            return;
        }

        if (form.value.password.length < 8) {
            message.value = "Password minimal 8 karakter."
            return
        }

        if (form.value.password !== form.value.confirm_password) {
            message.value = "Konfirmasi password tidak cocok."
            return
        }

        const formData = new FormData();
        for (const key in form.value) {
            formData.append(key, form.value[key]);
            console.log(key, form.value[key])
        }

        const res = await fetch("http://localhost:3003/api/users/register", {
            method: "POST",
            body: formData,
        });

        const result = await res.json();
        if (!res.ok) {
            message.value = result.message || "Registrasi gagal.";
            return;
        }
        message.value = "Registrasi berhasil. Akun sedang diproses oleh admin.";
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
    } catch (err) {
        message.value = "Terjadi kesalahan saat mendaftar.";
    }
};

watch(message, (newMessage) => {
    if (!newMessage) return
    if (newMessage.includes('berhasil')) {
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: newMessage,
            confirmButtonColor: '#10B981'
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: newMessage,
            confirmButtonColor: '#EF4444'
        })
    }
    setTimeout(() => {
        message.value = ''
    }, 2000)
})
</script>
