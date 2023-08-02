import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"//javascript 和 html 结合
import postcsspxtoviewport from "postcss-px-to-viewport";//px 适配
import Pages from "vite-plugin-pages"; //路由配置 vue-plugin-pages 基于文件系统的路由生成器 根据 pages 文件夹下的文件组织结构自动生成一个路由数组，输入到 Vue Router 实例中，文件组件结构决定你的路由层级，每次在 pages 目录下新增一个.vue 文件后，即可自动为你创建路由，无需其他配置！
import Layouts from "vite-plugin-vue-layouts";//页面可以自由组合布局，可以在页面加载指定的layout
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		Pages({
			dirs: "src/views",
			exclude: ['**/components/*.vue']  // 排除在外的目录，即不将所有 components 目录下的 .vue 文件生成路由
		}),
		Layouts({
			layoutsDirs: "src/layout",//默认读取的文件夹名字是 layouts，所以要使用的话，要在自己创建一个 src/layouts 文件夹
			// defaultLayout: "default",//默认读取的文件是 src/layouts/default.vue 所以第一个文件 最好创建叫做 default.vue，这样比较容易理解、上手
		}),
	],
	define: {
		"process.env": {},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
		},
	},
	base: './',//打包路径
	server: {
		host: "0.0.0.0",
		// port: 8888, // 设置服务启动端口号
		open: true, // 设置服务启动时是否自动打开浏览器
		cors: true, // 允许跨域

		// 设置代理，根据我们项目实际情况配置
		// proxy: {
		// 	'/^': {
		// 		target: 'http://localhost:3000/',
		// 		changeOrigin: true,
		// 		secure: false,
		// 		pathRewrite: {
		// 			'/^': ''
		// 		}
		// 	}
		// }
	},
	// postcsspxtoviewport h5 px适配
	css: {
		postcss: {
			plugins: [
				postcsspxtoviewport({
					unitToConvert: 'px',//默认值'px'，需要转换的单位
					viewportWidth: 375,//视窗的宽度，对应设计稿的宽度
					viewportHeight: 667,//视窗的高度，根据375设备的宽度来指定，一般是667，也可不配置
					unitPrecision: 3,//指定'px'转换为视窗单位值的小数位数
					propList: ["*"], // 转化为vw的属性列表
					viewportUnit: "vw", // 指定需要转换成视窗单位
					fontViewportUnit: "vw", // 字体使用的视窗单位
					selectorBlaskList: [".ignore-"], // 指定不需要转换为视窗单位的类
					mediaQuery: false, // 允许在媒体查询中转换`px`
					minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
					replace: true, // 是否直接更换属性值而不添加备用属性
					exclude: [], // 忽略某些文件夹下的文件或特定文件
					landscape: false, // 是否添加根据landscapeWidth生成的媒体查询条件 @media (orientation: landscape)
					landscapeUnit: "vw", // 横屏时使用的单位
					landscapeWidth: 1134 // 横屏时使用的视窗宽度
				})
			]
		}
	},

})
