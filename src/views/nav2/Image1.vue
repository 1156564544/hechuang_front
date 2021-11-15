<template>
	<div>
		<video :src="imgs[0].img" width="100%" height="500" id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered vjs-4-3" controls preload="none" poster="https://azure-upms.obs.cn-south-1.myhuaweicloud.com/hycan-huaweicloud/backendUpload/20210629113440613-web_pic_007@2x.jpg" data-setup="{}">
			<source type="video/MP4">
		</video>
	</div>
</template>
<script>
	import util from '../../common/js/util'
	import { getPicture } from '../../api/api';
	export default {
		data() {
			return {
				bannerHeight: 200,
				imgs: [
					{
						"img": "http://124.71.13.39:9163/video/1G1BL52P7TR11666_20210813210246_2_1.mp4"
					}
				],
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
			getParams() {
				this.details[0].bin_name = this.$route.query.bin_name;
				console.log("bin_name", this.details[0].bin_name);
				this.details[0] = this.$route.query.row;
				console.log("detail", this.details[0]);
			},
			getImages() {
				let para = {
					bin_name: this.details[0].bin_name
				};
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