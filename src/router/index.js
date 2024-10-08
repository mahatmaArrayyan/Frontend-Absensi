import { createRouter, createWebHistory } from 'vue-router'
// import store from '../store'

const routes = [
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('../views/NotFound.vue')
	},
	{
		path: '/reset-password',
		name: 'reset-password',
		component: () => import('../views/ResetPassword.vue')
	},
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue')
	},
	// ? Login
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue')
	},
	{
		component: () => import('../shell/DashboardShell.vue'),
		meta: { requiresAuth: false },
		children: [
			// ? Dashboard
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('../views/Dashboard.vue'),
			},
			// ? User
			{
				path: '/user/profile',
				name: 'user-profile',
				component: () => import('../views/User/Profile.vue')
			},
			{
				path: '/user/settings',
				name: 'user-settings',
				component: () => import('../views/User/Settings.vue')
			},
			// ? Pegawai
			{
				path: '/pegawai',
				name: 'pegawai',
				component: () => import('../views/Perusahaan/Pegawai.vue')
			},
			// ? Gaji
			{
				path: '/gaji',
				name: 'gaji',
				component: () => import('../views/Perusahaan/Gaji.vue')
			},
			// ? Payroll
			{
				path: '/payroll',
				name: 'payroll',
				component: () => import('../views/Perusahaan/Payroll.vue')
			},
			// ? Absensi
			{
				path: '/kehadiran/qr-code',
				name: 'kehadiran-qr-code',
				component: () => import('../views/Kehadiran/QrCode.vue')
			},
			{
				path: '/kehadiran/absensi',
				name: 'kehadiran-absensi',
				component: () => import('../views/Kehadiran/Absensi.vue')
			},
			{
				path: '/kehadiran/shift-kerja',
				name: 'shift-kerja',
				component: () => import('../views/Kehadiran/ShiftKerja.vue')
			},
			// ? Kerjaan
			{
				path: '/kerjaan/workspaces',
				name: 'workspaces',
				component: () => import('../views/Kerjaan/Workspaces.vue')
			},
			{
				path: '/kerjaan/kanban/',
				name: 'kanban',
				component: () => import('../views/Kerjaan/Kanban.vue')
			},
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth && !store.getters['auth/auth']) {
		return next({ name: 'login' })
	}
	next()
})

export default router
