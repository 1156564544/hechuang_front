<template>
	<div>
		<el-slider
		     v-model="value1" 
			 :step="1"
			 :min = "1"
			 :max = "52"
			 @change="SetPos()">
		</el-slider>
		
		<el-row :gutter="24">
		  <el-col :span="24" align="center"><div class="grid-content bg-purple">
		  <el-carousel ref="remarkCaruse2" indicator-position="none" trigger="click" :loop=true :interval=1500 :autoplay=isPlay :height="bannerHeight + 'px'" style="width: 100%; margin: auto">
		  	<el-carousel-item v-for="item in imgs1">
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
		  			<img :src="item.img" style="width: 50%;margin-right:auto"/>
		  		</div>
		  	</el-carousel-item>
		  </el-carousel>
		  </div></el-col>
		</el-row>
		<el-col :span="24" class="toolbar" align="center">
			<el-button v-if="!isPlay" type="primary" v-on:click="handlePlay">播放</el-button>
			<el-button v-if="isPlay" type="primary" v-on:click="handlePause">暂停</el-button>
			<el-button type="primary" @click="handleDownload()">下载</el-button>
			<el-button type="primary" @click="handleExit()">退出</el-button>
		</el-col>
		
		<el-carousel ref="remarkCaruse3" indicator-position="none" :loop=true trigger="click" :interval=300 :autoplay=isPlay :height="bannerHeight + 'px'" style="width: 95%; margin: auto" @mouseenter.native="isclick = true" @mouseleave.native="isclick = false">
			<el-carousel-item v-for="item in imgs">
				<div class="pic_item">
				<table class="mailTable"  cellspacing="0" cellpadding="0">
							<tr>
							    <td>{{ item.Frame}}</td>
							</tr>	
					</table>
					<table class="mailTable"  cellspacing="0" cellpadding="0">
					        <tr>
					            <td class="column">ACC_Autonomous_Braking_Request_CAN_Bus_TX</td>
					            <td><span>{{ item.ACC_Autonomous_Braking_Request_CAN_Bus_TX }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">AEB_Autonomous_Braking_Request_CAN_Bus_TX</td>
					            <td ><span>{{ item.AEB_Autonomous_Braking_Request_CAN_Bus_TX }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">AEB_Customization_Settings_Pedestrian</td>
					            <td>{{ item.AEB_Customization_Settings_Pedestrian }}</td>
					        </tr>
					        <tr>
					            <td class="column">AEB_Customization_Settings_Vehicle</td>
					            <td>{{ item.AEB_Customization_Settings_Vehicle }}</td>
					        </tr>
							<tr>
							    <td class="column">img_size</td>
							    <td>{{ item.AEB_Time_to_Brake }}</td>
							</tr>
							<tr>
					            <td class="column">AEB_Time_to_Collision</td>
					            <td><span>{{ item.AEB_Time_to_Collision }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">AEB_Time_to_Turn</td>
					            <td ><span>{{ item.AEB_Time_to_Turn }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">AEB_VRU_Crossing</td>
					            <td>{{ item.AEB_VRU_Crossing }}</td>
					        </tr>
					        <tr>
					            <td class="column">AEB_VRU_LongMoving</td>
					            <td>{{ item.AEB_VRU_LongMoving }}</td>
					        </tr>
							<tr>
							    <td class="column">img_size</td>
							    <td>{{ item.AEB_VRU_Movable }}</td>
							</tr>
							<tr>
					            <td class="column">AEB_VRU_OC_Crossing</td>
					            <td><span>{{ item.AEB_VRU_OC_Crossing }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">AEB_VRU_Stop</td>
					            <td ><span>{{ item.AEB_VRU_Stop }}</span></td>
					        </tr>
					</table>

					<table class="mailTable"  cellspacing="0" cellpadding="0">
					        <tr>
					            <td class="column">BrakePedalStaus</td>
					            <td>{{ item.BrakePedalStaus }}</td>
					        </tr>
					        <tr>
					            <td class="column">Brake_Pedal_Position</td>
					            <td>{{ item.Brake_Pedal_Position }}</td>
					        </tr>
							<tr>
							    <td class="column">Construction_Zone_Detected</td>
							    <td>{{ item.Construction_Zone_Detected }}</td>
							</tr>
					        <tr>
					            <td class="column">Driver_Engagement</td>
					            <td>{{ item.Driver_Engagement }}</td>
					        </tr>
							<tr>
							    <td class="column">Driver_Steering_Wheel_Touch_Controller_Zone3</td>
							    <td>{{ item.Driver_Steering_Wheel_Touch_Controller_Zone3 }}</td>
							</tr>
							<tr>
					            <td class="column">Event_Number</td>
					            <td><span>{{ item.Event_Number }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">Hazard_Light_Switch</td>
					            <td ><span>{{ item.Hazard_Light_Switch }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">Host_AEB_Prefill_Request</td>
					            <td>{{ item.Host_AEB_Prefill_Request }}</td>
					        </tr>
					        <tr>
					            <td class="column">Host_AEB_Requested_Brake_Type</td>
					            <td>{{ item.Host_AEB_Requested_Brake_Type }}</td>
					        </tr>
							<tr>
							    <td class="column">Host_AEB_Requested_Deceleration_Value</td>
							    <td>{{ item.Host_AEB_Requested_Deceleration_Value }}</td>
							</tr>
							<tr>
					            <td class="column">Host_Brake_Pedal_Override</td>
					            <td><span>{{ item.Host_Brake_Pedal_Override }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">Host_GasPedal_Inhibit</td>
					            <td ><span>{{ item.Host_GasPedal_Inhibit }}</span></td>
					        </tr>
					</table>

					<table class="mailTable"  cellspacing="0" cellpadding="0">
					        <tr>
					            <td class="column">Host_Steering_Inhibit</td>
					            <td>{{ item.Host_Steering_Inhibit }}</td>
					        </tr>
					        <tr>
					            <td class="column">Host_Vehicle_Lateral_Acceleration</td>
					            <td>{{ item.Host_Vehicle_Lateral_Acceleration }}</td>
					        </tr>
							<tr>
							    <td class="column">Host_Vehicle_Longitudinal_Acceleration</td>
							    <td>{{ item.Host_Vehicle_Longitudinal_Acceleration }}</td>
							</tr>
					        <tr>
					            <td class="column">Host_Vehicle_Longitudinal_Speed</td>
					            <td>{{ item.Host_Vehicle_Longitudinal_Speed }}</td>
					        </tr>
							<tr>
							    <td class="column">Host_Vehicle_Steering_Wheel_Angle</td>
							    <td>{{ item.Host_Vehicle_Steering_Wheel_Angle }}</td>
							</tr>
							<tr>
					            <td class="column">Host_Vehicle_Steering_Wheel_Angle_Speed</td>
					            <td><span>{{ item.Host_Vehicle_Steering_Wheel_Angle_Speed }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">Host_Vehicle_Yaw_Rate</td>
					            <td ><span>{{ item.Host_Vehicle_Yaw_Rate }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">Master_Cylinder_Pressure</td>
					            <td>{{ item.Master_Cylinder_Pressure }}</td>
					        </tr>
					        <tr>
					            <td class="column">Permit_AEB</td>
					            <td>{{ item.Permit_AEB }}</td>
					        </tr>
							<tr>
							    <td class="column">Record_Number</td>
							    <td>{{ item.Record_Number }}</td>
							</tr>
							<tr>
					            <td class="column">Target_Classification</td>
					            <td><span>{{ item.Target_Classification }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">Target_Confidence_Level</td>
					            <td ><span>{{ item.Target_Confidence_Level }}</span></td>
					        </tr>
					</table>

					<table class="mailTable"  cellspacing="0" cellpadding="0">
					        <tr>
					            <td class="column">Target_Dynamic_Property</td>
					            <td>{{ item.Target_Dynamic_Property }}</td>
					        </tr>
					        <tr>
					            <td class="column">Target_Estimation_Lateral_position</td>
					            <td>{{ item.Target_Estimation_Lateral_position }}</td>
					        </tr>
							<tr>
							    <td class="column">Target_ID</td>
							    <td>{{ item.Target_ID }}</td>
							</tr>
					        <tr>
					            <td class="column">Target_Lateral_position</td>
					            <td>{{ item.Target_Lateral_position }}</td>
					        </tr>
							<tr>
							    <td class="column">Target_Longitudinal_position</td>
							    <td>{{ item.Target_Longitudinal_position }}</td>
							</tr>
							<tr>
					            <td class="column">Target_Range_Rate</td>
					            <td><span>{{ item.Target_Range_Rate }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">Target_Source</td>
					            <td ><span>{{ item.Target_Source }}</span></td>
					        </tr>
					        <tr>
					            <td class="column">Target_longitudinal_Acceleration</td>
					            <td>{{ item.Target_longitudinal_Acceleration }}</td>
					        </tr>
					        <tr>
					            <td class="column">Turn_Light_Switch</td>
					            <td>{{ item.Turn_Light_Switch }}</td>
					        </tr>
							<tr>
							    <td class="column">Virtual_Gas_Pedal_Position</td>
							    <td>{{ item.Virtual_Gas_Pedal_Position }}</td>
							</tr>
							<tr>
							    <td>{{ item.MCU_timestamps }}</td>
							</tr>
					</table>

					<table class="mailTable"  cellspacing="0" cellpadding="0">
							<tr>
							    <td>{{ item.Frame}}</td>
							</tr>	
					</table>

					<!-- <img :src=""data:image/jpeg;base64," + item.img" style="width: 70%;margin-right:auto"/> -->
					<img :src="item.img" style="width: 70%;margin-right:auto"/>
				</div>
			</el-carousel-item>
		</el-carousel>

		<el-table :data="details" highlight-current-row v-loading="listLoading" style="width: 100%; margin: auto;">
			<!-- 1320 -->
			<el-table-column prop="AEB_Algorithm_Version_Major" label="AEB_Algorithm_Version_Major"  >
			</el-table-column>
			<el-table-column prop="AEB_Algorithm_Version_Minor" label="AEB_Algorithm_Version_Minor"  >
			</el-table-column>
			<el-table-column prop="Data_Mileage_Information" label="Data_Mileage_Information"  >
			</el-table-column>
			<el-table-column prop="Front_Camer_Pitch" label="Front_Camer_Pitch"  >
			</el-table-column>
			<el-table-column prop="Front_Camer_Roll" label="Front_Camer_Roll"  >
			</el-table-column>
			<el-table-column prop="Front_Camer_State" label="Front_Camer_State"  >
			</el-table-column>
			<el-table-column prop="Front_Camer_Yaw" label="Front_Camer_Yaw"  >
			</el-table-column>
		</el-table>

		<el-table :data="details" highlight-current-row v-loading="listLoading" style="width: 100%; margin: auto;">
			<el-table-column prop="Front_Radar_Status" label="Front_Radar_Status" >
			</el-table-column>
			<el-table-column prop="Front_Radar_misalignment_azimuth" label="Front_Radar_misalignment_azimuth" >
			</el-table-column>
			<el-table-column prop="Front_Radar_misalignment_elevation" label="Front_Radar_misalignment_elevation" >
			</el-table-column>
			<el-table-column prop="Odometer" label="Odometer">
			</el-table-column>
			<el-table-column prop="Sensor_Misalignment" label="Sensor_Misalignment" >
			</el-table-column>
			<el-table-column prop="mcuSwVersionMajor" label="mcuSwVersionMajor" >
			</el-table-column>
			<el-table-column prop="mcuSwVersionMinor" label="mcuSwVersionMinor" >
			</el-table-column>
		</el-table>
		
		<el-table :data="details1" highlight-current-row v-loading="listLoading" style="width: 81%; margin: auto;">
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
		<el-table :data="details1" highlight-current-row v-loading="listLoading" style="width: 81%; margin: auto;">
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
		
		<!-- <el-row :gutter="24">
		  <el-col :span="10">
		  <div class="grid-content bg-purple" height="100px">
			  <video width="100%" height="100%" object-fit: fill id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered vjs-4-3" controls preload="none" poster="https://azure-upms.obs.cn-south-1.myhuaweicloud.com/hycan-huaweicloud/backendUpload/20210629113440613-web_pic_007@2x.jpg" data-setup="{}">
				<source src="http://124.71.13.39:9163/video/1G1BL52P7TR11666_20210813210246_2_1.mp4" type="video/MP4">
			  </video>
		  </div></el-col>
		  <el-col :span="24"><div class="grid-content bg-purple">
		  <el-carousel indicator-position="none" trigger="click" :loop=true :interval=1500 :autoplay=isPlay :height="bannerHeight + 'px'" style="width: 100%; margin: auto">
		  	<el-carousel-item v-for="item in imgs1">
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
		  			<img :src="item.img" style="width: 75%;margin-right:auto"/>
		  		</div>
		  	</el-carousel-item>
		  </el-carousel>
		  </div></el-col>
		</el-row>
		<el-col :span="24" class="toolbar" align="center">
			<el-button v-if="!isPlay" type="primary" v-on:click="handlePlay">播放</el-button>
			<el-button v-if="isPlay" type="primary" v-on:click="handlePause">暂停</el-button>
			<el-button type="primary" @click="handleExit()">退出</el-button>
		</el-col> -->
	</div>
</template>


<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getMCU, getPicture } from '../../api/api';
	export default {
		data() {
			return {
				value1: 0,
				page: 1,
				isPlay: false,
				isclick: false,
				bannerHeight: 200,
				imgs: [],
				imgs1: [],
				listLoading: false,
				frame: 0,
				details: [{
					"AEB_Algorithm_Version_Major": "",
					"AEB_Algorithm_Version_Minor": "",
					"Data_Mileage_Information": "",
					"Front_Camer_Pitch": "",
					"Front_Camer_Roll": "",
					"Front_Camer_State": "",
					"Front_Camer_Yaw": "",
					"Front_Radar_Status": "",
					"Front_Radar_misalignment_azimuth": "",
					"Front_Radar_misalignment_elevation": "",
					"Odometer": "",
					"Sensor_Misalignment": "",
					"mcuSwVersionMajor": "",
					"mcuSwVersionMinor": "",
				}],
				details1: [{
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
			this.getImages1();
		},
		mounted() {
			this.setSize();
			window.addEventListener('resize', () => {
				this.setSize();
			}, false);
			this.getImages();
			this.getImages1();
		},
		methods: {
			SetPos() {
				console.log(this.value1)
				this.$refs.remarkCaruse2.setActiveItem( this.value1 > 49 ? 9 : parseInt(this.value1/5) );
				this.$refs.remarkCaruse3.setActiveItem(this.value1-1);
			},
			handlePlay() {
			    this.isPlay = true
			},
			handlePause() {
			    this.isPlay = false
			},
			//批量下载
			handleDownload: function () {
				let a = document.createElement('a'); // 创建a标签
				let e = document.createEvent('MouseEvents'); // 创建鼠标事件对象
				e.initEvent('click', false, false); // 初始化事件对象
				a.href = this.imgs1[this.value1 > 49 ? 9 : parseInt(this.value1/5)].img; // 设置下载地址
				a.download = ''; // 设置下载文件名
				a.dispatchEvent(e);
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
			swiperchange(n,o) {
      			if(this.isclick){
       			console.log('我是点击触发的'+n)
      			}
    		},
			linkTo () {
				this.frame=this.frame + 1
				console.log(1234)
      			console.log(this.frame)
    		},
			getParams() {
				this.details[0].bin_name = this.$route.query.bin_name;
				console.log("bin_name", this.details[0].bin_name);
				this.details1[0] = this.$route.query.row;
				console.log("detail", this.details1[0]);
				this.page = this.$route.query.page;
			},
			getImages1() {
				let para = {
					bin_name: this.details[0].bin_name
				};
				console.log(para)
				this.listLoading = true;
				getPicture(para).then((res) => {
					console.log(res.data)
					this.imgs1 = res.data.imgs;
					this.listLoading = false;
				});
			},
			getImages() {
				let para = {
					bin_name: this.details[0].bin_name
				};
				console.log(para)
				this.listLoading = true;
				getMCU(para).then((res) => {
					console.log(res.data.AEB_Algorithm_Version_Major)
					console.log(res.data)

					this.details[0].AEB_Algorithm_Version_Major=res.data.AEB_Algorithm_Version_Major;
					this.details[0].AEB_Algorithm_Version_Minor=res.data.AEB_Algorithm_Version_Minor;
					this.details[0].Data_Mileage_Information=res.data.Data_Mileage_Information;
					this.details[0].Front_Camer_Pitch=res.data.Front_Camer_Pitch;
					this.details[0].Front_Camer_Roll=res.data.Front_Camer_Roll;
					this.details[0].Front_Camer_State=res.data.Front_Camer_State;
					this.details[0].Front_Camer_Yaw=res.data.Front_Camer_Yaw;
					this.details[0].Front_Radar_Status=res.data.Front_Radar_Status;
					this.details[0].Front_Radar_misalignment_azimuth=res.data.Front_Radar_misalignment_azimuth;
					this.details[0].Front_Radar_misalignment_elevation=res.data.Front_Radar_misalignment_elevation;
					this.details[0].Odometer=res.data.Odometer;
					this.details[0].Sensor_Misalignment=res.data.Sensor_Misalignment;
					this.details[0].mcuSwVersionMajor=res.data.mcuSwVersionMajor;
					this.details[0].mcuSwVersionMinor=res.data.mcuSwVersionMinor;

					this.imgs = res.data.MCU;
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
