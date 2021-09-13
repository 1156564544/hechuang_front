<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.vin" placeholder="vin号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.head_ver" placeholder="头版本"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.event_id" placeholder="事件ID"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.event_time" placeholder="触发时间"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.latitude" placeholder="纬度"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.hard_ver" placeholder="硬件版本"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.soft_ver" placeholder="软件版本"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.et" placeholder="型号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getLogs">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="batchDownload">批量下载</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<!--列表-->
		<el-table :stripe="false" :data="logs" highlight-current-row v-loading="listLoading" style="width: 100%;">
		<!-- <el-table :stripe="false" :row-class-name="tableRowClassName" :data="logs" highlight-current-row v-loading="listLoading" style="width: 100%;"> -->
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="frame_num" label="vin号" width="180" sortable>
			</el-table-column>
			<el-table-column prop="head_ver" label="头版本" width="120" sortable>
			</el-table-column>
			<el-table-column prop="event_id" label="事件ID" width="120" sortable>
			</el-table-column>
			<el-table-column prop="event_time" label="触发时间" width="280" sortable>
			</el-table-column>
			<el-table-column prop="latitude" label="纬度" width="120" sortable>
			</el-table-column>
			<el-table-column prop="hard_ver" label="硬件版本" width="120" sortable>
			</el-table-column>
			<el-table-column prop="soft_ver" label="软件版本" width="120" sortable>
			</el-table-column>
			<el-table-column prop="et" label="型号" width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="225">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="handleImage(scope.$index, scope.row)">图片</el-button>
					<el-button type="primary" size="small" @click="handleVideo(scope.$index, scope.row)">视频</el-button>
					<el-button type="primary" size="small" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import jszip from '../../common/js/jszip'
	import axios from 'axios'
	//import NProgress from 'nprogress'
	import { getLogListPage, getBinDownload } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					vin: '',
					head_ver: '',
					event_id: '',
					event_time: '',
					latitude: '',
					hard_ver: '',
					soft_ver: '',
					et: ''
				},
				logs: [],
				logsView: [],
				total: 0,
				page: 1,
				listLoading: false,
			}
		},
		
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getLogs();
			},
			// tableRowClassName({row, rowIndex}) {
			//     if (rowIndex === 1) {
			//       return 'warning-row';
			//     } else if (rowIndex === 3) {
			//       return 'success-row';
			//     }
			//     return 'warning-row';
		 //    },
			//获取日志列表
			getLogs() {
				let para = {
					page: this.page,
					frame_num: this.filters.vin,
					head_ver: this.filters.head_ver,
					event_id: this.filters.event_id,
					event_time: this.filters.event_time,
					latitude: this.filters.latitude,
					hard_ver: this.filters.hard_ver,
					soft_ver: this.filters.soft_ver,
					et: this.filters.et
				};
				console.log(para)
				this.listLoading = true;
				//NProgress.start();
				getLogListPage(para).then((res) => {
					console.log(res.data);
					this.total = res.data.total;
					this.logs = res.data.users;
					
					// var begin = (this.page - 1) * 20;
					// var end = this.page * 20;
					// this.logsView = this.logs.slice(begin, end);
					
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//图片界面跳转
			handleImage: function (index, row) {
				console.log(row.bin_name)
				this.$router.push({
					path:'/image',
					query:{
						bin_name: row.bin_name
					}
				})
			},
			//视频界面跳转
			handleVideo: function (index, row) {
				console.log(row.bin_name)
				this.$router.push({
					path:'/video',
					query:{
						bin_name: row.bin_name
					}
				})
			},
			//下载bin文件
			handleDownload: function (index, row) {
				console.log(row)
				let para = {
					event_id: row.event_id,
					head_ver: row.head_ver.toString(),
					vin: row.frame_num,
					event_time: "2005-11-02 12:58:08",
					latitude: row.latitude.toString(),
					hard_ver: row.hard_ver,
					soft_ver: row.soft_ver,
					et: row.et,
				};
				console.log(para)
				this.listLoading = true;
				getBinDownload(para).then((res) => {
					// 1.打印res
					console.log(res);
					// // 2.获取请求返回的response对象中的blob设置文件类型，bin的type是"application/octet-stream"
					// let blob = new Blob([res.data], {
					// 	type: "application/octet-stream",
					// });
					// // 3.创建一个临时的url指向blob对象
					// let url = window.URL.createObjectURL(blob);
					let url = res.data.bin_file[0].file_url;
					// // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
					let a = document.createElement("a");
					a.href = url;
					a.download = "LNAN1AB31L5000301_26.bin";
					a.click();
					// 5.释放这个临时的对象url
					// window.URL.revokeObjectURL(url);
					// this.diaShow = !this.diaShow;
					this.listLoading = false;
				});
			},
			async getDowloadFile(url){
				return new Promise((resolve, reject) => {
				  axios({
				   method:'get',
				   url,
				   responseType: 'arraybuffer'
				  }).then(data => {
				   resolve(data.data)
				  }).catch(error => {
				   reject(error.toString())
				  })
				  })
			},
			//批量下载
			batchDownload: function () {
				let para = {
					event_id: this.filters.event_id,
					head_ver: this.filters.head_ver.toString(),
					vin: this.filters.vin,
					event_time: this.filters.event_time,
					latitude: this.filters.latitude.toString(),
					hard_ver: this.filters.hard_ver,
					soft_ver: this.filters.soft_ver,
					et: this.filters.et,
				};
				console.log(para)
				this.listLoading = true;
				var that = this;
				getBinDownload(para).then((res) => {
					console.log(res);
					let total = res.data.total;
					// const zip = new jszip()
					// const cache = {}
					// const promises = []
					res.data.bin_file.forEach(function(item, index) {
						setTimeout(()=>{		
								let a = document.createElement('a'); // 创建a标签					
								let e = document.createEvent('MouseEvents'); // 创建鼠标事件对象
								e.initEvent('click', false, false); // 初始化事件对象
								a.href = item.file_url; // 设置下载地址
								a.download = ''; // 设置下载文件名
								a.dispatchEvent(e);
								console.log(index);
						}, 1000 * index)
						// const promise = that.getDowloadFile(item.file_url).then(data => { // 下载文件, 并存成ArrayBuffer对象
						// 	const arr_name = item.file_url.split("/")
						// 	const file_name = arr_name[arr_name.length - 1] // 获取文件名
						// 	zip.file(file_name, data, { binary: true }) // 逐个添加文件
						// 	cache[file_name] = data
						// })
						// promises.push(promise)
					})
					// console.log(promises)
					// Promise.all(promises).then(() => {
					// 	zip.generateAsync({type:"blob"}).then(content => { // 生成二进制流
					// 		saveAs.saveAs(content, `${name}.zip`) // 利用file-saver保存文件
					// 	})
					// })
					this.listLoading = false;
				});
			},
		},
		
		mounted() {
			this.getLogs();
		}
	}

</script>

<style scoped>
	/* @import "../../styles/table.css"; */
<style>