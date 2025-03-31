import {
	defineConfig
} from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default async () => {
	const UnoCSS = (await import('unocss/vite')).default
	return defineConfig({
		plugins: [
			UnoCSS({
				mode:'vue-scoped'
			}),
			Uni()

		]
	})
}