<template>
  <div>
    <div
      class="bg-[url('@/assets/img/bgUtama.png')] bg-cover bg-no-repeat bg-center min-h-screen md:flex items-center justify-center md:p-4">
      <div class="absolute md:flex hidden top-0 right-0 p-3">
        <div class="p-3 overflow-hidden bg-white rounded-full">
          <img src="../../../assets/img/logoP.png" class="w-15 h-15" alt="">
        </div>
      </div>
      <!-- mobile -->
      <div
        class="w-full h-64 bg-[url('@/assets/img/bgUtama.png')] bg-cover bg-center flex justify-center items-center md:hidden">
        <div class="bg-white p-3 rounded-full shadow-lg">
          <img src="../../../assets/img/logoP.png" alt="Logo" class="w-16 h-16">
        </div>
      </div>
      <div
        class="bg-white rounded-t-3xl -mt-10 md:mt-0 md:rounded-md  w-full max-w-6xl h-auto md:h-[70vh] shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div class="flex-1 flex flex-col items-center scrollbar-hide justify-start px-5 py-10 md:py-15 md:px-6 overflow-y-auto">
          <div class="w-full max-w-4xl">
            <h1 class="text-red-700 text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-center">Registrasi</h1>
            <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Nama Lengkap
                  </label>
                  <input v-model="form.nama" type="text" placeholder="Nama" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                      </path>
                    </svg>
                    Email
                  </label>
                  <input v-model="form.email" type="email" placeholder="Email" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                    </path>
                  </svg>
                  Jenis Kelamin
                </label>
                <select v-model="form.jenis_kelamin" required
                  class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200">
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                      </path>
                    </svg>
                    No HP
                  </label>
                  <input v-model="form.no_hp" type="text" placeholder="No HP" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2">
                      </path>
                    </svg>
                    NIK
                  </label>
                  <input v-model="form.nik" type="text" placeholder="NIK" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                    </path>
                  </svg>
                  Alamat Lengkap
                </label>
                <input v-model="form.alamat_lengkap" type="text" placeholder="Contoh: Jl. Muria No.05 RT03/RW05"
                  required
                  class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Kecamatan
                  </label>
                  <input v-model="form.kecamatan" type="text" placeholder="Kecamatan" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                      </path>
                    </svg>
                    Kota
                  </label>
                  <input v-model="form.kota" type="text" placeholder="Kota" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                    Provinsi
                  </label>
                  <input v-model="form.provinsi" type="text" placeholder="Provinsi" required
                    class="w-full px-4 py-3 border-2  border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                  </svg>
                  No BPJS
                  <span class="text-gray-500 text-xs">(opsional)</span>
                </label>
                <input v-model="form.no_bpjs" type="text" placeholder="No BPJS (opsional)"
                  class="w-full px-4 py-3 border-2  border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                      </path>
                    </svg>
                    Password
                  </label>
                  <input v-model="form.password" type="password" placeholder="Password minimal 8 karakter" required
                    class="w-full px-4 py-3 border-2  border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Konfirmasi Password
                  </label>
                  <input v-model="form.confirm_password" type="password" placeholder="Konfirmasi Password" required
                    class="w-full px-4 py-3 border-2  border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                    </path>
                  </svg>
                  Upload KTP (wajib)
                </label>
                <div
                  class="relative border-2 border-dashed  border-red-500 rounded-xl p-4 hover:border-red-500 transition duration-200">
                  <input type="file" @change="handleFileUpload" accept="image/*" required
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

                  <div class="text-center pointer-events-none" v-if="!previewUrl">
                    <svg class="mx-auto h-8 w-8 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-600">Klik untuk upload KTP</p>
                    <p class="mt-1 text-xs text-gray-500">PNG, JPG, JPEG (Max 5MB)</p>
                  </div>

                  <div v-else class="flex flex-col items-center">
                    <img :src="previewUrl" alt="Preview KTP" class="rounded-lg shadow-md max-h-48 object-contain" />
                  </div>
                </div>
                <button v-if="previewUrl" type="button" @click="removePreview"
                  class="mt-3 text-red-700 font-bold bg-white shadow-2xl px-5 py-2.5 text-sm hover:underline cursor-pointer rounded-2xl">
                  Hapus Foto
                </button>
              </div>
              <div class="w-full flex items-center justify-center pt-2">
                <button type="submit"
                  class="border-2 border-red-700 text-white bg-red-700 w-full md:w-auto font-semibold py-3 px-16 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition duration-200 hover:scale-105 hover:bg-red-800">
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="hidden md:flex flex-1 overflow-hidden">
          <img src="../../../assets/img/imageLogin.png" class="w-full h-full object-cover" alt="Login Image">
        </div>
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
