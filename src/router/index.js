import Vue from 'vue'
import VueRouter from 'vue-router'

const MainLayout = () => import('@/components/layouts/Main')
const Login = () => import('@/components/views/auth/login')

const PageNotFound = () =>
	import('@/components/views/pageNotFound/PageNotFound')

const Ingrediente = () => import('@/components/views/ingredientes/Index')
const IngredienteCreate = () => import('@/components/views/ingredientes/Create')

const Lanches = () => import('@/components/views/lanches/Index')
const LanchesCreate = () => import('@/components/views/lanches/Create')

const Promocao = () => import('@/components/views/promocao/Index')
const PromocaoCreate = () => import('@/components/views/promocao/Create')

const SubRoutes = [
	{
		path: '/ingredientes',
		component: Ingrediente,
		children: [
			{ path: '', name: 'ingredienteCreate', component: IngredienteCreate }
		]
	},
	{
		path: '/lanches',
		component: Lanches,
		children: [{ path: '', name: 'lancheCreate', component: LanchesCreate }]
	},
	{
		path: '/promocoes',
		component: Promocao,
		children: [{ path: '', name: 'promocaoCreate', component: PromocaoCreate }]
	}
]

const routes = [
	{
		path: '/home',
		component: MainLayout,
		children: SubRoutes
	},
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{ path: '*', component: PageNotFound }
]

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition
		else return { x: 0, y: 0 }
	},
	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
	mode: 'history'
})

// router.beforeEach(async (to, from, next) => {})

export default router
