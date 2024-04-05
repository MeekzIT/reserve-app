import react from "@vitejs/plugin-react"
import dns from "dns"
import fs from "fs/promises"
import { resolve } from "path"
import { defineConfig } from "vite"

dns.setDefaultResultOrder("verbatim")

export default defineConfig({
	resolve: {
		alias: {
			src: resolve(__dirname, "src"),
		},
	},
	build: {
		outDir: "build",
		assetsDir: "assets",
		emptyOutDir: true,
	},
	server: {
		port: 4173,
		host: true,
		hmr: {
			clientPort: 4173,
		},
		// https:true,
		proxy: {
			"/api": {
				target: "http://154.49.137.44:5000",
				changeOrigin: true,
			},
		},
	},
	esbuild: {
		loader: "jsx",
		include: /src\/.*\.jsx?$/,
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			plugins: [
				{
					name: "load-js-files-as-jsx",
					setup(build) {
						build.onLoad({ filter: /src\\.*\.js$/ }, async args => ({
							loader: "jsx",
							contents: await fs.readFile(args.path, "utf8"),
						}))
					},
				},
			],
		},
	},
	plugins: [react()],
})
