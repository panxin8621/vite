import { createRouter, createWebHashHistory } from "vue-router";
// import routes from "~pages";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const routes = setupLayouts(generatedRoutes);
console.log('router', routes)
const router = createRouter({
	history: createWebHashHistory(),
	// routes,
	routes,
});

router.afterEach((to, from, failure) => {
	// console.log(to)
	document.title = to.meta.title ?? 'viteTest';
});

export default router;
