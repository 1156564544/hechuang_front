<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                //   title: { text: 'Column Chart' },
                //   tooltip: {},
                //   xAxis: {
                //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                //   },
                //   yAxis: {},
                //   series: [{
                //       name: '销量',
                //       type: 'bar',
                //       data: [5, 20, 36, 10, 10, 20]
                //     }]
				tooltip: {
				    trigger: 'axis',
				    axisPointer: {
				      type: 'shadow'
				    }
				  },
				  legend: {},
				  grid: {
				    left: '3%',
				    right: '4%',
				    bottom: '3%',
				    containLabel: true
				  },
				  xAxis: [
				    {
				      type: 'category',
				      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				    }
				  ],
				  yAxis: [
				    {
				      type: 'value'
				    }
				  ],
				  series: [
				    {
				      name: 'Direct',
				      type: 'bar',
				      emphasis: {
				        focus: 'series'
				      },
				      data: [320, 332, 301, 334, 390, 330, 320]
				    },
				    {
				      name: 'Email',
				      type: 'bar',
				      stack: 'Ad',
				      emphasis: {
				        focus: 'series'
				      },
				      data: [120, 132, 101, 134, 90, 230, 210]
				    },
				    {
				      name: 'Union Ads',
				      type: 'bar',
				      stack: 'Ad',
				      emphasis: {
				        focus: 'series'
				      },
				      data: [220, 182, 191, 234, 290, 330, 310]
				    },
				    {
				      name: 'Video Ads',
				      type: 'bar',
				      stack: 'Ad',
				      emphasis: {
				        focus: 'series'
				      },
				      data: [150, 232, 201, 154, 190, 330, 410]
				    },
				    {
				      name: 'Search Engine',
				      type: 'bar',
				      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
				      emphasis: {
				        focus: 'series'
				      },
				      markLine: {
				        lineStyle: {
				          type: 'dashed'
				        },
				        data: [[{ type: 'min' }, { type: 'max' }]]
				      }
				    },
				    {
				      name: 'Baidu',
				      type: 'bar',
				      barWidth: 5,
				      stack: 'Search Engine',
				      emphasis: {
				        focus: 'series'
				      },
				      data: [620, 732, 701, 734, 1090, 1130, 1120]
				    },
				    {
				      name: 'Google',
				      type: 'bar',
				      stack: 'Search Engine',
				      emphasis: {
				        focus: 'series'
				      },
				      data: [120, 132, 101, 134, 290, 230, 220]
				    },
				    {
				      name: 'Bing',
				      type: 'bar',
				      stack: 'Search Engine',
				      emphasis: {
				        focus: 'series'
				      },
				      data: [60, 72, 71, 74, 190, 130, 110]
				    },
				    {
				      name: 'Others',
				      type: 'bar',
				      stack: 'Search Engine',
				      emphasis: {
				        focus: 'series'
				      },
				      data: [62, 82, 91, 84, 109, 110, 120]
				    }
				  ]
                });
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                this.chartBar.setOption({
                    // title: {
                    //     text: 'Bar Chart',
                    //     subtext: '数据来自网络'
                    // },
                    // tooltip: {
                    //     trigger: 'axis',
                    //     axisPointer: {
                    //         type: 'shadow'
                    //     }
                    // },
                    // legend: {
                    //     data: ['2011年', '2012年']
                    // },
                    // grid: {
                    //     left: '3%',
                    //     right: '4%',
                    //     bottom: '3%',
                    //     containLabel: true
                    // },
                    // xAxis: {
                    //     type: 'value',
                    //     boundaryGap: [0, 0.01]
                    // },
                    // yAxis: {
                    //     type: 'category',
                    //     data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
                    // },
                    // series: [
                    //     {
                    //         name: '2011年',
                    //         type: 'bar',
                    //         data: [18203, 23489, 29034, 104970, 131744, 630230]
                    //     },
                    //     {
                    //         name: '2012年',
                    //         type: 'bar',
                    //         data: [19325, 23438, 31000, 121594, 134141, 681807]
                    //     }
                    // ]
					tooltip: {
					    trigger: 'axis',
					    axisPointer: {
					      // Use axis to trigger tooltip
					      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
					    }
					  },
					  legend: {},
					  grid: {
					    left: '3%',
					    right: '4%',
					    bottom: '3%',
					    containLabel: true
					  },
					  xAxis: {
					    type: 'value'
					  },
					  yAxis: {
					    type: 'category',
					    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					  },
					  series: [
					    {
					      name: 'Direct',
					      type: 'bar',
					      stack: 'total',
					      label: {
					        show: true
					      },
					      emphasis: {
					        focus: 'series'
					      },
					      data: [320, 302, 301, 334, 390, 330, 320]
					    },
					    {
					      name: 'Mail Ad',
					      type: 'bar',
					      stack: 'total',
					      label: {
					        show: true
					      },
					      emphasis: {
					        focus: 'series'
					      },
					      data: [120, 132, 101, 134, 90, 230, 210]
					    },
					    {
					      name: 'Affiliate Ad',
					      type: 'bar',
					      stack: 'total',
					      label: {
					        show: true
					      },
					      emphasis: {
					        focus: 'series'
					      },
					      data: [220, 182, 191, 234, 290, 330, 310]
					    },
					    {
					      name: 'Video Ad',
					      type: 'bar',
					      stack: 'total',
					      label: {
					        show: true
					      },
					      emphasis: {
					        focus: 'series'
					      },
					      data: [150, 212, 201, 154, 190, 330, 410]
					    },
					    {
					      name: 'Search Engine',
					      type: 'bar',
					      stack: 'total',
					      label: {
					        show: true
					      },
					      emphasis: {
					        focus: 'series'
					      },
					      data: [820, 832, 901, 934, 1290, 1330, 1320]
					    }
					  ]
                });
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    // title: {
                    //     text: 'Line Chart'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                });
            },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    // title: {
                    //     text: 'Pie Chart',
                    //     subtext: '纯属虚构',
                    //     x: 'center'
                    // },
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: "{a} <br/>{b} : {c} ({d}%)"
                    // },
                    // legend: {
                    //     orient: 'vertical',
                    //     left: 'left',
                    //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    // },
                    // series: [
                    //     {
                    //         name: '访问来源',
                    //         type: 'pie',
                    //         radius: '55%',
                    //         center: ['50%', '60%'],
                    //         data: [
                    //             { value: 335, name: '直接访问' },
                    //             { value: 310, name: '邮件营销' },
                    //             { value: 234, name: '联盟广告' },
                    //             { value: 135, name: '视频广告' },
                    //             { value: 1548, name: '搜索引擎' }
                    //         ],
                    //         itemStyle: {
                    //             emphasis: {
                    //                 shadowBlur: 10,
                    //                 shadowOffsetX: 0,
                    //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //             }
                    //         }
                    //     }
                    // ]
					angleAxis: {},
					radiusAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu'],
					z: 10
					},
					polar: {},
					series: [
						{
						  type: 'bar',
						  data: [1, 2, 3, 4],
						  coordinateSystem: 'polar',
						  name: 'A',
						  stack: 'a',
						  emphasis: {
							focus: 'series'
						  }
						},
						{
						  type: 'bar',
						  data: [2, 4, 6, 8],
						  coordinateSystem: 'polar',
						  name: 'B',
						  stack: 'a',
						  emphasis: {
							focus: 'series'
						  }
						},
						{
						  type: 'bar',
						  data: [1, 2, 3, 4],
						  coordinateSystem: 'polar',
						  name: 'C',
						  stack: 'a',
						  emphasis: {
							focus: 'series'
						  }
						}
					],
					legend: {
					show: true,
					data: ['A', 'B', 'C']
					}
                });
            },
            drawCharts() {
                this.drawColumnChart()
                this.drawBarChart()
                this.drawLineChart()
                this.drawPieChart()
            },
        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
