<!-- <template>
	<div id="app">
	  <div class="player-container" style="width: 65%; margin-top: 60px;">
	    <vue-core-video-player src="http://124.71.27.112:9163/video/1G1BL52P7TR11666_20210813210246_2_1.mov"></vue-core-video-player>
	  </div>
	</div>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getVideo } from '../../api/api';
	export default {
		data() {
			return {
				url: '',
				listLoading: false,
				event_id: ''
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
			getParams() {
				this.event_id = this.$route.query.event_id;
				console.log("事件ID", this.event_id);
			},
			getVideos() {
				let para = {
					vin: "1G1BL52P7TR11555",
					event_id:"1",
					session_id:"2",
					time:"20210813215328"
				};
				this.listLoading = true;
				getVideo(para).then((res) => {
					console.log(res.data)
					this.url = res.data.video_file;
					this.listLoading = false;
				});
			},
		}
	}
</script>

<style>
</style>

<template>
    <div>
      <video width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4">
      </video>
    </div>
</template>

<script>
export default {
  name: 'Video',
  data () {
    return {
      videoSrc: 'http://124.71.27.112:9163/video/1G1BL52P7TR11666_20210813210246_2_1.mov',
      videoImg: '',
      playStatus: '',
      muteStatus: '',
      isMute: true,
      isPlay: false,
      width: '820', // 设置视频播放器的显示宽度（以像素为单位）
      height: '500', // 设置视频播放器的显示高度（以像素为单位）
      preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      autoplay: ''
    }
  }

  // 自动播放属性,muted:静音播放
  // autoplay: 'muted',

}
</script>

<style scoped >

</style> -->