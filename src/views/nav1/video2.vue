<template>
	<div style="width: 90%;margin:0px auto">
		<video :src="video_file" 
		        ref="media" 
				id="video1" 
				controls="controls1" 
				width="100%" 
				height="500" 
				class="video-js vjs-default-skin vjs-big-play-centered vjs-4-3" 
				preload="none" 
				poster="https://azure-upms.obs.cn-south-1.myhuaweicloud.com/hycan-huaweicloud/backendUpload/20210629113440613-web_pic_007@2x.jpg" 
				data-setup="{}">
			<source type="video/MP4">
		</video>
		
		<el-col :span="24" class="toolbar" align="center">
			<el-button type="primary" @click="handleExit()">退出</el-button>
			<el-button v-if="!isPlay" type="primary" v-on:click="handlePlay">播放</el-button>
			<el-button v-if="isPlay" type="primary" v-on:click="handlePause">暂停</el-button>
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
				isPlay: false,
				video_file: "http://124.71.13.39:9163/video/1G1BL52P7TR11666_20210813210246_2_1.mp4",
			}
		},
		created() {
		},
		mounted() {
			this.$refs.media.addEventListener('play', this.handlePlay);
			this.$refs.media.addEventListener('pause', this.handlePause);
			this.$refs.media.addEventListener('timeupdate', this.timeUpdate);
		},
		methods: {
			handlePlay() {
			    this.$refs.media.play();
			    this.isPlay = true
			},
			handlePause() {
			    this.$refs.media.pause();
			    this.isPlay = false
			},
			timeUpdate() {
				var timeDisplay;
				var duration;
				//用秒数来显示当前播放进度
				// timeDisplay = Math.floor(this.$refs.media.currentTime);
				// duration = Math.floor(this.$refs.media.duration);
				console.log("当前时间", this.$refs.media.currentTime);
				console.log("总时长", this.$refs.media.duration);
			},
		}
	}
</script>

<style scoped >
	
</style>