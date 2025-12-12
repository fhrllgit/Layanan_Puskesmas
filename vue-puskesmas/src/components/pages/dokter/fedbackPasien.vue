<template>
    <div class="fixed inset-0 bg-gradient-to-br from-gray-50 to-red-50">
        <div class="flex h-full w-full">
            <div :class="selectedKonsultasi ? 'hidden md:flex' : 'flex'"
                class="w-full md:w-80 lg:w-96 xl:w-[420px] bg-white border-r border-gray-200 flex-col shadow-lg">
                <div class="bg-gradient-to-r from-[#d34341] to-[#b83331] text-white px-4 py-5">
                    <div class="flex items-center justify-between mb-4">
                        <svg @click="$router.push('/dokter/dashboard')" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            class="w-6 h-6 cursor-pointer hover:bg-white/20 rounded-lg p-1 transition-colors">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        <div class="flex-1 text-center">
                            <h2 class="text-xl font-bold tracking-wide">Konsultasi Aktif</h2>
                        </div>
                    </div>
                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="Cari konsultasi..."
                            class="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 px-4 py-2.5 pl-10 rounded-xl text-sm focus:outline-none focus:bg-white/30 transition-all border border-white/30" />
                        <svg class="w-5 h-5 text-white/80 absolute left-3 top-2.5" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>

                <div class="bg-white border-b border-gray-200">
                    <div class="flex justify-between">
                        <button @click="filterTab = 'all'"
                            :class="filterTab === 'all' ? 'text-[#d34341] border-[#d34341]' : 'text-gray-500 border-transparent hover:text-gray-700'"
                            class="py-3 px-1 flex-1 text-sm font-medium transition-all duration-200 border-b-2 relative">
                            All
                            <span v-if="konsultasiAktif.filter(k => k.unread > 0).length > 0"
                                class="ml-1.5 bg-[#d34341] text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                                {{konsultasiAktif.filter(k => k.unread > 0).length}}
                            </span>
                        </button>
                        <button @click="filterTab = 'unread'"
                            :class="filterTab === 'unread' ? 'text-[#d34341] border-[#d34341]' : 'text-gray-500 border-transparent hover:text-gray-700'"
                            class="py-3 px-1 text-sm font-medium flex-1 transition-all duration-200 border-b-2">
                            Unread
                        </button>
                        <button @click="filterTab = 'read'"
                            :class="filterTab === 'read' ? 'text-[#d34341] border-[#d34341]' : 'text-gray-500 border-transparent hover:text-gray-700'"
                            class="py-3 px-1 text-sm font-medium flex-1 transition-all duration-200 border-b-2">
                            Read
                        </button>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto bg-gray-50">
                    <div v-for="k in filteredKonsultasi" :key="k.konsultasi_id"
                        @click="selectKonsultasi(k.konsultasi_id)"
                        :class="selectedKonsultasi === k.konsultasi_id ? 'bg-red-50 border-l-4 border-[#d34341]' : 'hover:bg-gray-100 border-l-4 border-transparent'"
                        class="p-4 cursor-pointer flex justify-between items-center border-b border-gray-200 transition-all duration-200">
                        <div class="flex items-center gap-3 flex-1 min-w-0">
                            <div
                                class="w-12 h-12 rounded-full bg-gradient-to-br from-[#d34341] to-[#b83331] flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                                {{ k.pasien_nama.charAt(0).toUpperCase() }}
                            </div>

                            <div class="flex-1 min-w-0">
                                <p class="font-semibold text-gray-800 truncate text-base">
                                    {{ k.pasien_nama }}
                                </p>
                                <p class="text-xs text-gray-500 truncate">
                                    Klik untuk membuka chat
                                </p>
                            </div>
                        </div>
                        <span v-if="k.unread > 0"
                            class="bg-[#d34341] text-white px-2.5 py-1 rounded-full text-xs font-semibold ml-2 flex-shrink-0 shadow-sm">
                            {{ k.unread }}
                        </span>
                    </div>

                    <div v-if="filteredKonsultasi.length === 0" class="p-8 text-center">
                        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-10 h-10 text-[#d34341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <p class="text-gray-500 text-sm font-medium">Tidak ada konsultasi ditemukan</p>
                    </div>
                </div>
            </div>

            <div :class="!selectedKonsultasi ? 'hidden md:flex' : 'flex'" class="flex-1 flex-col bg-white relative">
                <div v-if="selectedKonsultasi"
                    class="bg-gradient-to-r from-[#d34341] to-[#b83331] text-white p-4 shadow-lg flex items-center gap-3">
                    <button @click="selectedKonsultasi = null"
                        class="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                            </path>
                        </svg>
                    </button>
                    <div
                        class="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {{(konsultasiAktif.find(k => k.konsultasi_id === selectedKonsultasi)?.pasien_nama ||
                            '?').charAt(0).toUpperCase()}}
                    </div>
                    <div class="flex-1">
                        <h3 class="font-bold text-base md:text-lg">
                            {{konsultasiAktif.find(k => k.konsultasi_id === selectedKonsultasi)?.pasien_nama}}
                        </h3>
                        <p class="text-xs text-white/80 flex items-center gap-1">
                            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Online
                        </p>
                    </div>

                    <button class="p-2 hover:bg-white/20 cursor-pointer rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </button>
                </div>

                <div v-if="!selectedKonsultasi"
                    class="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-red-50">
                    <div class="text-center">
                        <div
                            class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg class="w-12 h-12 text-[#d34341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                </path>
                            </svg>
                        </div>
                        <p class="text-lg font-semibold text-gray-700 mb-1">Selamat Datang!</p>
                        <p class="text-sm text-gray-500">Pilih konsultasi untuk memulai chat</p>
                    </div>
                </div>

                <div v-if="selectedKonsultasi"
                    class="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-gray-50 to-red-50" ref="chatBox">
                    <div v-for="msg in chatMessages[selectedKonsultasi] || []" :key="msg.id"
                        :class="msg.sender === 'dokter' ? 'justify-end' : 'justify-start'"
                        class="flex items-end gap-2 animate-fade-in">
                        <div :class="msg.sender === 'dokter'
                            ? 'bg-gradient-to-br from-[#d34341] to-[#b83331] text-white rounded-tl-2xl rounded-tr-md rounded-bl-2xl rounded-br-2xl ml-auto shadow-md'
                            : 'bg-white text-gray-800 rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-md border border-gray-200'"
                            class="max-w-[85%] md:max-w-md lg:max-w-lg px-4 py-3 break-words">
                            <span v-if="msg.type === 'resep' && msg.resep_id" @click="handleResepClick(msg.resep_id)"
                                class="text-blue-600 flex gap-1 font-semibold cursor-pointer">
                                <p>{{ msg.pesan }}</p> <span class="text-black font-normal text-white">Klik untuk
                                    melihat resep</span>
                            </span>

                            <p v-else class="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                {{ msg.pesan }}
                            </p>

                            <div class="flex items-center justify-end gap-1 mt-1">
                                <span :class="msg.sender === 'dokter' ? 'text-white/70' : 'text-gray-400'"
                                    class="text-xs">
                                    12:34
                                </span>
                                <svg v-if="msg.sender === 'dokter'" class="w-4 h-4 text-white/70" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="selectedKonsultasi" class="bg-white border-t border-gray-200 p-4 shadow-lg">
                    <div class="flex gap-3 items-center">
                        <button @click="openResepModal"
                            class="p-2.5 text-gray-400 hover:text-[#d34341] hover:bg-red-50 rounded-full transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                                </path>
                            </svg>
                        </button>

                        <input v-model="pesan" @keyup.enter="kirimPesan" placeholder="Ketik pesan..."
                            class="flex-1 bg-gray-100 text-gray-800 placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#d34341] p-3 rounded-xl text-sm md:text-base transition-all" />

                        <button @click="kirimPesan"
                            class="bg-gradient-to-r from-[#d34341] to-[#b83331] hover:from-[#b83331] hover:to-[#d34341] text-white p-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                            <!-- <span class="hidden md:inline">Kirim</span> -->
                        </button>
                    </div>
                </div>
                <div v-if="showResepModal"
                    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                        <div class="bg-gradient-to-r from-[#d34341] to-[#b83331] px-6 py-4">
                            <h2 class="text-xl font-bold text-white">Kirim Resep ke Pasien</h2>
                            <p class="text-white/90 text-sm mt-1">Tambahkan detail obat untuk pasien</p>
                        </div>
                        <div class="p-6">
                            <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                <div v-for="(obat, index) in obatList" :key="index"
                                    class="p-4 rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:border-[#d34341]/30 transition-all duration-200 shadow-sm">
                                    <div class="flex items-center justify-between mb-3">
                                        <span
                                            class="text-sm font-semibold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                                            Obat #{{ index + 1 }}
                                        </span>
                                        <button @click="hapusObat(index)"
                                            class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="space-y-3">
                                        <div>
                                            <label class="block text-xs font-medium text-gray-600 mb-1 ml-1">Nama
                                                Obat</label>
                                            <input v-model="obat.nama_obat"
                                                class="w-full rounded-lg px-3 py-2.5 border-2 border-gray-200 focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 outline-none transition-all duration-200"
                                                placeholder="Contoh: Paracetamol 500mg" />
                                        </div>

                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label
                                                    class="block text-xs font-medium text-gray-600 mb-1 ml-1">Dosis</label>
                                                <input v-model="obat.dosis"
                                                    class="w-full rounded-lg px-3 py-2.5 border-2 border-gray-200 focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 outline-none transition-all duration-200"
                                                    placeholder="Contoh: 3x1" />
                                            </div>
                                            <div>
                                                <label
                                                    class="block text-xs font-medium text-gray-600 mb-1 ml-1">Jumlah</label>
                                                <input v-model="obat.jumlah" type="number"
                                                    class="w-full rounded-lg px-3 py-2.5 border-2 border-gray-200 focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 outline-none transition-all duration-200"
                                                    placeholder="10" />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                class="block text-xs font-medium text-gray-600 mb-1 ml-1">Keterangan</label>
                                            <textarea v-model="obat.keterangan" rows="2"
                                                class="w-full rounded-lg px-3 py-2.5 border-2 border-gray-200 focus:border-[#d34341] focus:ring-2 focus:ring-[#d34341]/20 outline-none transition-all duration-200 resize-none"
                                                placeholder="Contoh: Diminum setelah makan"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="obatList.length === 0"
                                    class="text-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-xl">
                                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p class="text-gray-500 font-medium">Belum ada obat ditambahkan</p>
                                    <p class="text-gray-400 text-sm mt-1">Klik tombol "Tambah Obat" untuk memulai</p>
                                </div>
                            </div>
                            <div
                                class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 pt-6 border-t-2 border-gray-100">
                                <button @click="tambahObat"
                                    class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 order-2 sm:order-1">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Tambah Obat
                                </button>

                                <div class="flex gap-3 order-1 sm:order-2">
                                    <button @click="closeResepModal"
                                        class="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200">
                                        Batal
                                    </button>
                                    <button @click="kirimResep"
                                        class="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d34341] to-[#b83331] hover:from-[#b83331] hover:to-[#a02927] text-white font-medium shadow-lg shadow-red-500/30 transition-all duration-200 flex items-center justify-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Kirim Resep
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div v-if="detailResepDo"
                class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-slide-up">

                    <div class="bg-gradient-to-r from-[#d34341] to-[#b83331] px-6 py-4">
                        <h2 class="text-xl font-bold text-white">Detail Resep Pasien</h2>
                        <p class="text-white/90 text-sm mt-1">Dokter hanya dapat melihat detail resep</p>
                    </div>

                    <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar mb-6">
                        <div v-for="(item, index) in resepItems" :key="index"
                            class="border-2 border-gray-200 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white transition-all duration-200 shadow-sm">

                            <div class="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                                <div
                                    class="bg-gradient-to-br from-[#d34341] to-[#b83331] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                                    {{ index + 1 }}
                                </div>
                                <h3 class="text-lg font-bold text-gray-800">{{ item.nama_obat }}</h3>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div class="flex items-start gap-3">
                                    <div class="bg-blue-100 p-2 rounded-lg">
                                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-xs font-medium text-gray-500 mb-0.5">Dosis</p>
                                        <p class="text-sm font-semibold text-gray-800">{{ item.dosis }}</p>
                                    </div>
                                </div>

                                <div class="flex items-start gap-3">
                                    <div class="bg-green-100 p-2 rounded-lg">
                                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-xs font-medium text-gray-500 mb-0.5">Jumlah</p>
                                        <p class="text-sm font-semibold text-gray-800">{{ item.jumlah }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-3 pt-3 border-t border-gray-200">
                                <div class="flex items-start gap-3">
                                    <div class="bg-purple-100 p-2 rounded-lg">
                                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-xs font-medium text-gray-500 mb-0.5">Keterangan</p>
                                        <p class="text-sm text-gray-700 leading-relaxed">{{ item.keterangan }}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="p-4 border-t border-gray-200 text-right">
                        <button @click="detailResepDo = false"
                            class="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-700">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "@/utils/axios";
import { ref, onMounted, nextTick, watch, computed } from "vue";
import { io } from "socket.io-client";
import { storeToRefs } from "pinia";
import { useChatStore } from "@/stores/chat";
import router from "@/router";


const chatStore = useChatStore();
const { konsultasiAktif, chatMessages } = storeToRefs(chatStore);
const socket = io("http://localhost:3003");

const selectedKonsultasi = ref(null);
const pesan = ref("");
const chatBox = ref(null);
const searchQuery = ref("");
const filterTab = ref("all")
const detailResepDo = ref(false);
const resepItems = ref([]);
const resepId = ref(null);


const showResepModal = ref(false);

const openResepModal = () => {
    showResepModal.value = true;
};

const closeResepModal = () => {
    showResepModal.value = false;
};

const obatList = ref([
    { nama_obat: "", dosis: "", jumlah: "", keterangan: "" }
]);

const tambahObat = () => {
    obatList.value.push({ nama_obat: "", dosis: "", jumlah: "", keterangan: "" });
};

const hapusObat = (i) => {
    obatList.value.splice(i, 1);
};


const handleResepClick = async (id) => {
    try {
        const res = await axios.get(`/api/konsultasi/${id}`);
        resepItems.value = res.data.items;
        resepId.value = id;
        detailResepDo.value = true;
    } catch (err) {
        console.error(err);
    }
};

const kirimResep = async () => {
    try {
        const pasien_id = konsultasiAktif.value.find(
            k => k.konsultasi_id === selectedKonsultasi.value
        )?.pasien_id;

        console.log("DEBUG FRONTEND:", {
            konsultasi_id: selectedKonsultasi.value,
            pasien_id,
            obat_list: obatList.value
        });

        const res = await axios.post("/api/konsultasi/kirim-resep", {
            konsultasi_id: selectedKonsultasi.value,
            pasien_id,
            obat_list: obatList.value
        });

        console.log("=== RESPONSE BACKEND ===");
        console.log(res.data);

        closeResepModal();
        obatList.value = [{ nama_obat: "", dosis: "", jumlah: "", keterangan: "" }];

    } catch (err) {
        console.log("=== ERROR KIRIM RESEP ===");
        console.log(err.response?.data || err);
    }
};

const filteredKonsultasi = computed(() => {
    let result = konsultasiAktif.value;

    if (filterTab.value === "unread") {
        result = result.filter(k => k.unread > 0);
    } else if (filterTab.value === "read") {
        result = result.filter(k => k.unread === 0);
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(k =>
            k.pasien_nama.toLowerCase().includes(query)
        );
    }

    return result;
});

const scrollBottom = () => {
    nextTick(() => {
        if (chatBox.value) {
            chatBox.value.scrollTop = chatBox.value.scrollHeight;
        }
    });
};

const getKonsultasiAktif = async () => {
    const res = await axios.get("/api/konsultasi/aktif");

    konsultasiAktif.value = res.data.data.map((k) => ({
        ...k,
        unread: k.unread_count,
    }));
};

const selectKonsultasi = async (id) => {
    selectedKonsultasi.value = id;
    socket.emit("join_room", `konsultasi_${id}`);
    const res = await axios.get(`/api/konsultasi/chat/${id}`);
    chatMessages.value[id] = res.data.data;
    const item = konsultasiAktif.value.find((x) => x.konsultasi_id === id);
    if (item) item.unread = 0;
    scrollBottom();
    await axios.post(`/api/konsultasi/read/${id}`);
};

const kirimPesan = async () => {
    if (!pesan.value.trim() || !selectedKonsultasi.value) return;

    await axios.post("/api/konsultasi/kirim", {
        konsultasi_id: selectedKonsultasi.value,
        pesan: pesan.value,
    });
    pesan.value = "";
};

onMounted(async () => {
    await getKonsultasiAktif();
    socket.on("new_message", (msg) => {
        console.log("📨 Dokter menerima pesan:", msg);

        if (!chatMessages.value[msg.konsultasi_id]) {
            chatMessages.value[msg.konsultasi_id] = [];
        }
        chatMessages.value[msg.konsultasi_id].push(msg);
        const k = konsultasiAktif.value.find(
            (k) => k.konsultasi_id === msg.konsultasi_id
        );
        if (k && selectedKonsultasi.value !== msg.konsultasi_id) {
            k.unread++;
        }

        scrollBottom();
    });
});

watch(
    konsultasiAktif,
    (list) => {
        list.forEach((k) => {
            socket.emit("join_room", `konsultasi_${k.konsultasi_id}`);
            console.log("Dokter JOIN via watcher:", `konsultasi_${k.konsultasi_id}`);
        });
    },
    { deep: true }
);
</script>


<style>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}

[ref="chatBox"] {
    scroll-behavior: smooth;
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #14b8a6;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #0d9488;
}

@media (max-width: 768px) {
    body {
        overflow: hidden;
    }
}
</style>
