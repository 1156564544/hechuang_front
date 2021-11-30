<template>
	<div>
		<el-slider
		     v-model="value1" 
			 :step="1"
			 :min = "0"
			 :max = "9"
			 @change="SetPos()">
		</el-slider>
		
		<el-carousel ref="remarkCaruse" trigger="click" :autoplay=false :height="bannerHeight + 'px'" style="width: 65%; margin: auto">
			<el-carousel-item v-for="item in imgs">
				<div class="pic_item">
					<table class="mailTable"  cellspacing="0" cellpadding="0">
					        <tr>
					            <td class="column">img_width</td>
					            <td><span>{{ item.width }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">img_height</td>
					            <td ><span>{{ item.height }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">img_index</td> 
					            <td>{{ item.imgIndex }}</td>
					        </tr>
					        <tr>
					            <td class="column">img_stage</td>
					            <td>{{ item.img_stage }}</td>
					        </tr>
							<tr>
							    <td class="column">img_size</td>
							    <td>{{ item.size }}</td>
							</tr>
							<tr>
							    <td class="column">img_timestamps</td>
							    <td>{{ item.timestamps }}</td>
							</tr>
					</table>
					<!-- <img :src=""data:image/jpeg;base64," + item.img" style="width: 70%;margin-right:auto"/> -->
					<img :src="item.img" style="width: 70%;margin-right:auto"/>
				</div>
			</el-carousel-item>
		</el-carousel>

		<el-table :data="details" highlight-current-row v-loading="listLoading" style="width: 81%; margin: auto;">
			<!-- 1320 -->
			<el-table-column prop="frame_num" label="车架号" width="200">
			</el-table-column>
			<el-table-column prop="event_id" label="事件ID" width="120">
			</el-table-column>
			<el-table-column prop="event_name_len" label="事件名称长度" width="120">
			</el-table-column>
			<el-table-column prop="event_name" label="事件名称" width="180">
			</el-table-column>
			<el-table-column prop="event_time" label="事件触发日期时间" width="260">
			</el-table-column>
			<el-table-column prop="etl" label="型号名称长度" width="160">
			</el-table-column>
			<el-table-column prop="et" label="型号名称" width="160">
			</el-table-column>
			<!-- <el-table-column prop="Data_Mile_Info" label="Data_Mile_Info" width="270">
			</el-table-column> -->
			<!-- <el-table-column prop="mag_num" label="mag_num" width="120">
			</el-table-column> -->
			<el-table-column prop="speed" label="车速" width="120">
			</el-table-column>
		</el-table>
		<el-table :data="details" highlight-current-row v-loading="listLoading" style="width: 81%; margin: auto;">
			<el-table-column prop="altitude" label="高程" width="120">
			</el-table-column>
			<el-table-column prop="latitude" label="纬度" width="120">
			</el-table-column>
			<el-table-column prop="longitude" label="经度" width="120">
			</el-table-column>
			<!-- <el-table-column prop="position_sign" label="定位标识" width="120">
			</el-table-column> -->
			<el-table-column prop="hard_ver" label="硬件版本" width="120">
			</el-table-column>
			<el-table-column prop="soft_ver" label="软件版本" width="120">
			</el-table-column>
			<el-table-column prop="head_ver" label="头版本" width="85">
			</el-table-column>
			<el-table-column prop="head_len" label="头长度" width="85">
			</el-table-column>
			<el-table-column prop="head_info_crc" label="头信息CRC32校验" width="160">
			</el-table-column>
			<el-table-column prop="data_seg_protocol" label="数据段封装协议" width="150">
			</el-table-column>
			<el-table-column prop="data_seg_len" label="数据段长度" width="120">
			</el-table-column>
			<el-table-column prop="id" label="id" width="120">
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar" align="center">
			<el-button type="primary" @click="handleExit()">退出</el-button>
		</el-col>
	</div>
</template>
<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getPicture } from '../../api/api';
	export default {
		data() {
			return {
				page: 1,
				value1: 0,
				bannerHeight: 200,
				imgs: [],
				listLoading: false,
				details: [{
					"frame_num": "1G1BL52P7TR116666",
					"event_id": "33317",
					"event_name_len": 10,
					"event_name": "adas_event",
					"event_time": "Tue, 29 Jun 2021 23:08:46 GMT",
					"etl": 13,
					"et": "IFVS-611 Plus",
					"Data_Mile_Info": "1981-05-27 12:04:00.000000",
					"mag_num": 68,
					"speed": 86,
					"altitude": 99,
					"latitude": 31.023777,
					"longitude": 121.00421,
					"position_sign": "11110010",
					"hard_ver": "H.A32",
					"soft_ver": "S.A25",
					"head_ver": 0,
					"head_len": 87,
					"head_info_crc": "E9155932",
					"data_seg_protocol": "8",
					"data_seg_len": 4602787,
					"id": 161,
					"bin_name": ""
				}]
			}
		},
		created() {
			this.getParams();
			this.getImages();
		},
		mounted() {
			this.setSize();
			window.addEventListener('resize', () => {
				this.setSize();
			}, false);
			this.getImages();
		},
		methods: {
			SetPos() {
				console.log(this.value1)
				this.$refs.remarkCaruse.setActiveItem(this.value1);
			},
			//退出跳转
			handleExit() {
				this.$router.push({
					path:'/log',
					query:{
						page: this.page
					}
				})
			},
			getParams() {
				this.details[0].bin_name = this.$route.query.bin_name;
				console.log("bin_name", this.details[0].bin_name);
				this.details[0] = this.$route.query.row;
				console.log("detail", this.details[0]);
				this.page = this.$route.query.page;
			},
			getImages() {
				let para = {
					bin_name: this.details[0].bin_name
				};
				console.log(para)
				this.listLoading = true;
				getPicture(para).then((res) => {
					console.log(res.data)
					this.imgs = res.data.imgs;
					this.listLoading = false;
				});
			},
			setSize() {
				this.bannerHeight = document.body.clientWidth / 4
			},
		}
	}
</script>
<style>
	.bannerimg {
		width: 100%;
		height: inherit;
	}
	.pic_item {
	    display: -webkit-flex;
	    display: flex;
	    -webkit-align-items: center;
	    align-items: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	.mailTable{
	    width: 100%;
	    border-top: 1px solid #E6EAEE;
	    border-left: 1px solid #E6EAEE;
	}
	.mailTable tr td{
	    width: 200px;
	    height: 35px;
	    line-height: 35px;
	    box-sizing: border-box;
	    padding: 0 10px;
	    border-bottom: 1px solid #E6EAEE;
	    border-right: 1px solid #E6EAEE;
	}
	.mailTable tr td.column {
	    background-color: #EFF3F6;
	    color: #393C3E;
	    width: 30%;
	}
</style>
