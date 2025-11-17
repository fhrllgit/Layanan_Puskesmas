<template>
  <div>
    <div>
      <!-- navbar -->
      <div class="px-20 bg-white  justify-between items-center flex border py-3 fixed w-full z-20">
        <div class="flex items-center gap-2">
          <img src="../assets/img/logoP.png" class="w-7 h-auto object-cover" alt="">
          <div class="flex flex-col -space-y-0.5">
            <span class="flex text-xs tracking-wide text-red-600 font-semibold">SISMA <p class="text-red-800">Health</p>
            </span>
            <p class="text-xs tracking-widest text-pink-600">Information</p>
          </div>
        </div>
        <div class="flex items-center gap-5" style="font-weight: 500;">
          <button class="cursor-pointer">Beranda</button>
          <button class="cursor-pointer">Tentang Kami</button>
          <button class="cursor-pointer">Layanan</button>
          <button class="cursor-pointer">Edukasi Kesehatan</button>
          <button class="cursor-pointer">Kontak</button>
        </div>
        <RouterLink to="/login"
          class="flex items-center cursor-pointer gap-2 text-white rounded-2xl bg-[#ca3535d0] px-3.5 py-2">
          <button class="font-semibold text-sm cursor-pointer">Login</button>
          <svg class="size-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M10 11V8L15 12L10 16V13H1V11H10ZM2.4578 15H4.58152C5.76829 17.9318 8.64262 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9H2.4578C3.73207 4.94289 7.52236 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C7.52236 22 3.73207 19.0571 2.4578 15Z">
            </path>
          </svg>
        </RouterLink>
      </div>
    </div>
    <!-- section -->
    <div class="border h-full bg-white">
      <div class="flex mt-10 min-h-screen border px-20 bg-white">
        <div class="flex-1 flex flex-col justify-center border">
          <div class="px-4 border-l-2 border-l-amber-600">
            <p class="text-3xl font-semibold">Selamat Datang di SISMA</p>
          </div>
        </div>
        <div class="flex-1 border items-end justify-center overflow-hidden flex">
          <div class="items-end justify-center px-25 rounded-3xl bg-pink-200 flex">
            <img src="../assets/img/rightuser.png" class="w-80 object-cover h-auto pt-15" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>