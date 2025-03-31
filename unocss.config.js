import presetWeapp from 'unocss-preset-weapp'
import {
	extractorAttributify,
	transformerClass
} from 'unocss-preset-weapp/transformer'
import {
	presetIcons
} from 'unocss'

import transformerDirectives from '@unocss/transformer-directives'

const {
	presetWeappAttributify,
	transformerAttributify
} = extractorAttributify()

export default {
	content: {
		pipeline: {
			include: [
				// 默认
				/\.(vue|nvue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/
				// 包括 js/ts 文件
			]
			// 排除文件
			// exclude: []
		}
	},
	presets: [
		// https://github.com/MellowCo/unocss-preset-weapp
		presetWeapp(),
		// attributify autocomplete
		presetWeappAttributify(),
		presetIcons(),
	],
	shortcuts: [{
		'border-base': 'border border-gray-500_10',
		'center': 'flex justify-center items-center',
	}, ],
	transformers: [
		transformerDirectives({
			enforce: 'pre',
		}),

		// https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
		transformerAttributify(),

		// https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
		transformerClass(),
	],
	rules: [
		[/^lh-(\d+)$/, ([, d]) => ({
			'line-height': `${d}rpx`
		})],
		[/^m-(\d+)$/, ([, d]) => ({
			margin: `${d}rpx`
		})],

		[/^mt-(\d+)$/, ([, d]) => ({
			'margin-top': `${d}rpx`
		})],
		[/^mb-(\d+)$/, ([, d]) => ({
			'margin-bottom': `${d}rpx`
		})],
		[/^ml-(\d+)$/, ([, d]) => ({
			'margin-left': `${d}rpx`
		})],
		[/^mr-(\d+)$/, ([, d]) => ({
			'margin-right': `${d}rpx`
		})],


		[/^p-(\d+)$/, ([, d]) => ({
			padding: `${d}rpx`
		})],
		[/^pt-(\d+)$/, ([, d]) => ({
			'padding-top': `${d}rpx`
		})],
		[/^pb-(\d+)$/, ([, d]) => ({
			'padding-bottom': `${d}rpx`
		})],
		[/^pl-(\d+)$/, ([, d]) => ({
			'padding-left': `${d}rpx`
		})],
		[/^pr-(\d+)$/, ([, d]) => ({
			'padding-right': `${d}rpx`
		})],
		[/^rd-(\d+)$/, ([, d]) => ({
			'border-radius': `${d}rpx`
		})],
		[/^border-rd-(\d+)$/, ([, d]) => ({
			'border-radius': `${d}rpx`
		})],
	]

}