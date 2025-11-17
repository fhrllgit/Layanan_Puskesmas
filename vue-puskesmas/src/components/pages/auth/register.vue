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
        <div
          class="flex-1 flex flex-col items-center scrollbar-hide justify-start px-5 py-10 md:py-15 md:px-6 overflow-y-auto">
          <div class="w-full max-w-4xl">
            <h1 class="text-red-700 text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-center">Registrasi</h1>
            <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input v-model="form.nama" type="text" placeholder="Nama" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input v-model="form.email" type="email" placeholder="Email" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                <select v-model="form.jenis_kelamin" required
                  class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200">
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">No HP</label>
                  <input v-model="form.no_hp" type="text" placeholder="No HP" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">NIK</label>
                  <input v-model="form.nik" type="text" placeholder="NIK" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                <input v-model="form.alamat_lengkap" type="text" placeholder="Contoh: Jl. Muria No.05 RT03/RW05"
                  required
                  class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
                  <input v-model="form.kecamatan" type="text" placeholder="Kecamatan" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kota</label>
                  <input v-model="form.kota" type="text" placeholder="Kota" required
                    class="w-full px-4 py-3 border-2 border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                  <input v-model="form.provinsi" type="text" placeholder="Provinsi" required
                    class="w-full px-4 py-3 border-2  border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">No BPJS
                  <span class="text-gray-500 text-xs">(opsional)</span></label>
                <input v-model="form.no_bpjs" type="text" placeholder="No BPJS (opsional)"
                  class="w-full px-4 py-3 border-2  border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input v-model="form.password" type="password" placeholder="Password minimal 8 karakter" required
                    class="w-full px-4 py-3 border-2  border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                  <input v-model="form.confirm_password" type="password" placeholder="Konfirmasi Password" required
                    class="w-full px-4 py-3 border-2  border-red-500 rounded-xl focus:ring-red-500 outline-none transition duration-200" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Upload KTP (wajib)</label>
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
