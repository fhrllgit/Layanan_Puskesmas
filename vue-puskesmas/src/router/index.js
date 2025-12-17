import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import register from '../components/pages/auth/register.vue'
import login from '../components/pages/auth/login.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PasienLayout from '@/components/pages/pasien/layout/PasienLayout.vue'
import DokterLayout from '@/components/pages/dokter/layout/DokterLayout.vue'
import ApotekerLayout from '@/components/pages/apoteker/layout/ApotekerLayout.vue'
import Education from '@/components/Education.vue'
import testKonsul from '@/components/pages/pasien/testKonsul.vue'
import fedbackPasien from '@/components/pages/dokter/fedbackPasien.vue'
import DokterId from '@/components/pages/pasien/DokterId.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), },
    { path: '/register', name: 'register', component: register, },
    { path: '/login', name: 'login', component: login, },
    {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'dashboard', component: () => import('@/components/pages/admin/Dashboard.vue') },
      { path: 'man-antrian', component: () => import('@/components/pages/admin/ManajemenAntrian.vue') },
      { path: 'rekam-medis', component: () => import('@/components/pages/admin/RekamMedis.vue') },
      // manaje pengguna
      { path: 'users/list', component: () => import('@/components/pages/admin/Users/UserList.vue')},
      { path: 'users/verify', component: () => import('@/components/pages/admin/Users/VerifyUser.vue') },
      { path: 'users/add', component: () => import('@/components/pages/admin/Users/UserForm.vue') },
      // data master klinik
      { path: 'poli', component: () => import('@/components/pages/admin/MasterKlinik/CrudPoli.vue') },
      { path: 'obat', component: () => import('@/components/pages/admin/MasterKlinik/DataObat.vue') },
      { path: 'data-dokter', component: () => import('@/components/pages/admin/MasterKlinik/DataDokter.vue') },
      { path: 'jadwal-dokter', component: () => import('@/components/pages/admin/MasterKlinik/JadwalDokter.vue') },
      { path: 'kouta', component: () => import('@/components/pages/admin/MasterKlinik/Kouta.vue') },
      { path: 'berita-input', component: () => import('@/components/pages/admin/Berita.vue') },
    ]
    },
    // dokter page
    { 
    path: '/dokter', component: DokterLayout,
    meta: { requiresAuth: true, role: 'dokter' },
    children: [
      { path: 'dashboard', component: () => import('@/components/pages/dokter/Dashboard.vue') },
      { path: 'jadwal-dokter', component: () => import('@/components/pages/dokter/JadwalSaya.vue') },
      { path: 'dokter-pasien', component: () => import('@/components/pages/dokter/AntrianPasien.vue') },
      { path: 'rekam-medis', component: () => import('@/components/pages/dokter/RekamMedis.vue') },
      { path: 'profil', component: () => import('@/components/pages/dokter/Profil.vue') },
    ]
    },
    // pasien
    { 
    path: '/pasien', 
    component: PasienLayout,
    meta: { requiresAuth: true, role: 'pasien' },
    children: [
      { path: 'dashboard', component: () => import('@/components/pages/pasien/Dashboard.vue') },
      { path: 'daftar-poli', component: () => import('@/components/pages/pasien/DaftarPoli.vue') },
      { path: 'status-antrian', component: () => import('@/components/pages/pasien/StatusAntrian.vue') },
      { path: 'riwayat-kunjungan', component: () => import('@/components/pages/pasien/RiwayatKunjungan.vue') },
      { path: 'status-resep', component: () => import('@/components/pages/pasien/StatusResep.vue') },
      { path: 'dokter-pasien', component: () => import('@/components/pages/pasien/JadwalDokter.vue') },
      { path: 'konsultasi', component: () => import('@/components/pages/pasien/KonsultasiOnline.vue') },
      { path: 'resep-konsultasi', component: () => import('@/components/pages/pasien/resepKonsultasi.vue') },
      // { path: 'dokter/:id/poli', component: () => import('@/components/pages/pasien/DokterId.vue') },
      // { path: 'test-kosul', component: () => import('@/components/pages/pasien/testKonsul.vue') },
    ]
    },
    // apoteker
    { 
    path: '/apoteker', 
    component: ApotekerLayout,
    meta: { requiresAuth: true, role: 'apoteker' },
    children: [
      { path: 'dashboard', component: () => import('@/components/pages/apoteker/Dashboard.vue') },
      { path: 'berobat-resep', component: () => import('@/components/pages/apoteker/BerobatResep.vue') },
      { path: 'konsultasi-resep', component: () => import('@/components/pages/apoteker/KonsultasiResep.vue') },
      // { path: 'daftar-poli', component: () => import('@/components/pages/pasien/DaftarPoli.vue') },
      // { path: 'status-antrian', component: () => import('@/components/pages/pasien/StatusAntrian.vue') },
      // { path: 'antrian', component: () => import('@/components/pages/pasien/Antrian.vue') },
    ]
    },
    {
      path: '/education/:id',
      name: 'DetailBerita',
      component: Education
    },
    {
      path: '/pasien/chat/:id',
      name: 'testKonsul',
      component: testKonsul
    },
    {
      path: '/feedback-pasien',
      name: 'feedbackPasien',
      component: fedbackPasien
    },
    {
      path: '/dokter/:id/poli',
      name: 'dokterId',
      component: DokterId
    }
    ],
 scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.path === "/" && !to.hash) {
    return { top: 0 };
  }
  if (to.hash) {
    return {
      el: to.hash,
      behavior: "smooth"
    };
  }

  return { top: 0 };
}

})

function getUserFromLocalStorage() {
  const userString = localStorage.getItem("user");
  try {
    return userString ? JSON.parse(userString) : null;
  } catch (err) {
    console.warn("LocalStorage user invalid:", userString);
    localStorage.removeItem("user"); 
    return null;
  }
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const user = getUserFromLocalStorage();

  if (to.meta.requiresAuth) {
    if (!token || !user) {
      return next("/login");
    }
    if (to.meta.role && user.role !== to.meta.role) {
      return next("/login");
    }
  }

  next();
});


export default router
