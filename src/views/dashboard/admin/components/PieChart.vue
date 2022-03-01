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
		created() {},
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
					this.event_id_1 = res.data.event_id_1;
					this.event_id_2 = res.data.event_id_2;
					this.listLoading = false;
					console.log(this.event_id_2[0]);
					this.chart = echarts.init(this.$el, 'macarons')
					this.chart.setOption({
						title: {
							show: true,
							text: '事件类型累计占比图',
							x: 'center',
							y: 'top',
							textStyle: {
								fontSize: 16,
								color: 'rgba(0, 0, 0, 0.45)',
								fontWeight: 'bolder'
							},
						},
						tooltip: {
							trigger: 'item',
							formatter: '{a} <br/>{b} : {c} ({d}%)'
						},
						// legend: {
						//   left: 'center',
						//   bottom: '10',
						//   data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
						// },
						legend: {
							left: 'center',
							bottom: '10',
							data: ['EventID:' + this.event_id_1[0], 'EventID:' + this.event_id_1[1]]
						},
						calculable: true,
						series: [{
							name: '事件类型分布情况',
							type: 'pie',
							roseType: 'radius',
							radius: [15, 95],
							center: ['50%', '38%'],
							// data: [
							//   { value: 320, name: '第一类' },
							//   { value: 240, name: '第二类' },
							//   { value: 149, name: '第三类' },
							//   { value: 100, name: '第四类' },
							//   { value: 59, name: '第五类' }
							// ],
							data: [{
									value: this.event_id_2[0],
									name: 'EventID:' + this.event_id_1[0]
								},
								{
									value: this.event_id_2[1],
									name: 'EventID:' + this.event_id_1[1]
								},
							],
							animationEasing: 'cubicInOut',
							animationDuration: 2600
						}]
					})
				});
			}
		}
	}
</script>
