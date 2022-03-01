<template>
	<div :class="className" :style="{height:height,width:width}" />
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme
	import {
		debounce
	} from '@/utils'
	import {
		getStatistics
	} from '../../../../api/api'

	const animationDuration = 6000

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '300px'
			}
		},
		data() {
			return {
				chart: null,
				listLoading: false,
			}
		},
		created() {

		},
		mounted() {
			this.initChart()
			this.__resizeHandler = debounce(() => {
				if (this.chart) {
					this.chart.resize()
				}
			}, 100)
			window.addEventListener('resize', this.__resizeHandler)
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			window.removeEventListener('resize', this.__resizeHandler)
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			initChart() {
				let para = {
					api_version: "1.0"
				};
				console.log(para)
				this.listLoading = true;
				getStatistics(para).then((res) => {
					console.log(res.data);
					this.event_distri_1 = res.data.event_distri_1;
					this.event_distri_2 = res.data.event_distri_2;
					this.listLoading = false;
					console.log(this.event_distri_2);

					this.chart = echarts.init(this.$el, 'macarons')

					this.chart.setOption({
						title: {
							show: true,
							text: '近7日事件数量分布图',
							x: 'center',
							y: 'top',
							textStyle: { 
								fontSize: 16,
								color: 'rgba(0, 0, 0, 0.45)',
								fontWeight: 'bolder'
							},
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							top: 10,
							left: '2%',
							right: '2%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: this.event_distri_1,
							// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value',
							axisTick: {
								show: false
							}
						}],
						series: [{
								name: '事件数量',
								type: 'bar',
								stack: 'vistors',
								barWidth: '60%',
								data: this.event_distri_2,
								// data: [79, 52, 200, 334, 390, 330, 220],
							},
							// {
							//         name: 'pageB',
							//         type: 'bar',
							//         stack: 'vistors',
							//         barWidth: '60%',
							//         data: [80, 52, 200, 334, 390, 330, 220],
							//         animationDuration
							//       }, {
							//         name: 'pageC',
							//         type: 'bar',
							//         stack: 'vistors',
							//         barWidth: '60%',
							//         data: [30, 52, 200, 334, 390, 330, 220],
							//         animationDuration
							//       },
						]
					});
				})
			}
		}
	}
</script>
