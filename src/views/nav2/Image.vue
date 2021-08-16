<template>
	<div>
		<el-carousel trigger="click" :height="bannerHeight + 'px'" style="width: 65%; margin: auto">
			<!-- <el-carousel-item v-for="item in imgwrap"> -->
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
					</table>
					<!-- <img :src=""data:image/jpeg;base64," + item.img" style="width: 70%;margin-right:auto"/> -->
					<img :src="item.img" style="width: 70%;margin-right:auto"/>
				</div>
			</el-carousel-item>
		</el-carousel>

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
			<!-- <el-table-column prop="soc_ver_Maj" label="soc_ver_Maj" width="150">
			</el-table-column>
			<el-table-column prop="soc_ver_Min" label="soc_ver_Min" width="150">
			</el-table-column> -->
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
	</div>
</template>
<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getPicture } from '../../api/api';
	export default {
		data() {
			return {
				bannerHeight: 200,
				imgs: [],
				listLoading: false,
				imgwrap: [
					{
						url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
						"width": 1080,
						"height": 1920,
						"imgIndex": 0,
						"img_stage": 0,
						"size": 762903,
					},
					{
						url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
						"width": 1080,
						"height": 1920,
						"imgIndex": 1,
						"img_stage": 0,
						"size": 767921,
					},
					{
						url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
						"width": 1080,
						"height": 1920,
						"imgIndex": 2,
						"img_stage": 0,
						"size": 774638,
					},
					{
						url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
						"width": 1080,
						"height": 1920,
						"imgIndex": 3,
						"img_stage": 0,
						"size": 777462,
					},
					{
						url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
						"width": 1080,
						"height": 1920,
						"imgIndex": 4,
						"img_stage": 0,
						"size": 779027,
					},
					{
						url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
						"width": 1080,
						"height": 1920,
						"imgIndex": 5,
						"img_stage": 0,
						"size": 245342,
					},
					{
						url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
						"width": 1080,
						"height": 1920,
						"imgIndex": 6,
						"img_stage": 0,
						"size": 245704,
					},
					{
						url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
						"width": 1080,
						"height": 1920,
						"imgIndex": 7,
						"img_stage": 0,
						"size": 245556,
					},
				],
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
					"width": 1080
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
			getParams() {
				this.details[0].event_id = this.$route.query.event_id;
				console.log("事件ID", this.details[0].event_id);
			},
			getImages() {
				let para = {
					event_id: this.details[0].event_id
				};
				this.listLoading = true;
				getPicture(para).then((res) => {
					console.log(res.data)
					this.imgs = res.data.imgs;
					// this.imgs[0].img = "data:image/jpeg;base64," + this.imgs[0].img;
					// this.imgs[1].img = "data:image/jpeg;base64," + this.imgs[1].img;
					// this.imgs[2].img = "data:image/jpeg;base64," + this.imgs[2].img;
					// this.imgs[3].img = "data:image/jpeg;base64," + this.imgs[3].img;
					// this.imgs[4].img = "data:image/jpeg;base64," + this.imgs[4].img;
					// this.imgs[5].img = "data:image/jpeg;base64," + this.imgs[5].img;
					// this.imgs[6].img = "data:image/jpeg;base64," + this.imgs[6].img;
					// this.imgs[7].img = "data:image/jpeg;base64," + this.imgs[7].img;
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
