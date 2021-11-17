<template>
	<div style="width: 90%;margin:0px auto">
		<video :src="video_file" width="100%" height="500" id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered vjs-4-3" controls preload="none" poster="https://azure-upms.obs.cn-south-1.myhuaweicloud.com/hycan-huaweicloud/backendUpload/20210629113440613-web_pic_007@2x.jpg" data-setup="{}">
			<!-- <source src="http://124.71.27.112:9162/video/1G1BL52P7TR11666_20210813210246_2_1.mp4" type="video/MP4"> -->
			<source type="video/MP4">
		</video>
		<el-table :data="details" highlight-current-row v-loading="listLoading" style="width: 89%; margin: auto;">
			<el-table-column prop="frame_num" label="车架号" width="240">
			</el-table-column>
			<el-table-column prop="event_id" label="事件ID" width="120">
			</el-table-column>
			<el-table-column prop="event_name_len" label="事件名称长度" width="120">
			</el-table-column>
			<el-table-column prop="event_name" label="事件名称" width="120">
			</el-table-column>
			<el-table-column prop="event_time" label="事件触发日期时间" width="240">
			</el-table-column>
			<el-table-column prop="etl" label="型号名称长度" width="160">
			</el-table-column>
			<el-table-column prop="et" label="型号名称" width="160">
			</el-table-column>
			<el-table-column prop="Data_Mile_Info" label="Data_Mile_Info" width="270">
			</el-table-column>
			<el-table-column prop="mag_num" label="mag_num" width="120">
			</el-table-column>
		</el-table>
		<el-table :data="details" highlight-current-row v-loading="listLoading" style="width: 89%; margin: auto;">
			<el-table-column prop="speed" label="车速" width="120">
			</el-table-column>
			<el-table-column prop="altitude" label="高程" width="120">
			</el-table-column>
			<el-table-column prop="latitude" label="纬度" width="120">
			</el-table-column>
			<el-table-column prop="longitude" label="经度" width="120">
			</el-table-column>
			<el-table-column prop="position_sign" label="定位标识" width="120">
			</el-table-column>
			<el-table-column prop="hard_ver" label="硬件版本" width="120">
			</el-table-column>
			<el-table-column prop="soft_ver" label="软件版本" width="120">
			</el-table-column>
			<el-table-column prop="head_ver" label="头版本" width="80">
			</el-table-column>
			<el-table-column prop="head_len" label="头长度" width="80">
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
	import { getVideo } from '../../api/api';
	export default {
		data() {
			return {
				listLoading: false,
				video_file: "http://124.71.13.39:9163/video/1G1BL52P7TR11666_20210813210246_2_1.mp4",
				details: [{
					"Data_Mile_Info": "1981-05-27 12:04:00.000000",
					"altitude": 99,
					"data_seg_len": 4602787,
					"data_seg_protocol": "8",
					"et": "IFVS-611 Plus",
					"etl": 13,
					"event_id": "33317",
					"event_name": "adas_event",
					"event_name_len": 10,
					"event_time": "Tue, 29 Jun 2021 23:08:46 GMT",
					"frame_num": "1G1BL52P7TR116666",
					"hard_ver": "H.A32",
					"head_info_crc": "E9155932",
					"head_len": 87,
					"head_ver": 0,
					"height": 1920,
					"id": 161,
					"imgIndex": "0,1,2,3,4,5,6,7",
					"img_stage": "0,0,0,0,0,0,0,0",
					"latitude": 31.023777,
					"longitude": 121.00421,
					"mag_num": 68,
					"position_sign": "11110010",
					"size": "762903,767921,774638,777462,779027,245342,245704,245556",
					"soc_ver_Maj": 0,
					"soc_ver_Min": 1,
					"soft_ver": "S.A25",
					"speed": 86,
					"timestamps": "0,0,0,0,0,0,0,0",
					"width": 1080,
					"bin_name": "",
				}]
			}
		},
		created() {
			this.getParams();
			this.getVideos();
		},
		mounted() {
			this.getVideos();
		},
		methods: {
			//退出跳转
			handleExit() {
				this.$router.push({
					path:'/log',
				})
			},
			getParams() {
				this.details[0].bin_name = this.$route.query.bin_name;
				console.log("bin_name", this.details[0].bin_name);
			},
			getVideos() {
				let para = {
					bin_name: this.details[0].bin_name
				};
				this.listLoading = true;
				getVideo(para).then((res) => {
					console.log(res.data)
					this.video_file = res.data.video_file;
					this.listLoading = false;
				});
			},
		}
	}
</script>

<style scoped >
	
</style>