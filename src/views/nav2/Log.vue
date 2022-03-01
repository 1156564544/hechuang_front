<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.vin" placeholder="vin号"></el-input>
				</el-form-item>
				<!-- <el-form-item>
					<el-input v-model="filters.car_name" placeholder="车型"></el-input>
				</el-form-item> -->
				<el-form-item>
					<el-input v-model="filters.head_ver" placeholder="头版本"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.event_id" placeholder="事件ID"></el-input>
				</el-form-item>
				<el-form-item>
					<!-- <el-input v-model="filters.event_time" placeholder="触发时间"></el-input> -->
					<el-date-picker v-model="filters.start_time" placeholder="开始时间" type="datetime" @change="timeChange1"></el-date-picker>
					<el-date-picker v-model="filters.end_time" placeholder="结束时间" type="datetime" @change="timeChange2"></el-date-picker>
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
				<el-form-item>
					<el-button type="primary" v-on:click="handleSort">时间排序</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<!--列表-->
		<el-table :stripe="false" :data="logs" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="frame_num" label="vin号" width="190" sortable>
			</el-table-column>
			<el-table-column prop="car_name" label="车型" width="100" sortable>
			</el-table-column>
			<el-table-column prop="head_ver" label="头版本" width="100" sortable>
			</el-table-column>
			<el-table-column prop="event_id" label="事件ID" width="100" sortable>
			</el-table-column>
			<el-table-column prop="event_name" label="触发事件" width="200" sortable>
			</el-table-column>
			<el-table-column prop="event_time" label="触发时间" width="200" sortable>
			</el-table-column>
			<el-table-column prop="latitude" label="纬度" width="100" sortable>
			</el-table-column>
			<el-table-column prop="hard_ver" label="硬件版本" width="115" sortable>
			</el-table-column>
			<el-table-column prop="soft_ver" label="软件版本" width="115" sortable>
			</el-table-column>
			<el-table-column prop="et" label="型号" width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="handleMCU(scope.$index, scope.row)">MCU</el-button>
					<el-button type="primary" size="small" @click="handleImage(scope.$index, scope.row)">图片</el-button>
					<!-- <el-button type="primary" size="small" @click="handleVideo(scope.$index, scope.row)">视频</el-button> -->
					<el-button type="primary" size="small" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--排序控制界面-->
		<el-dialog title="时间排序控制" v-model="sortFormVisible" :close-on-click-modal="false">
			<el-form :model="sortForm" label-width="80px" ref="sortForm">
				<el-form-item label="时间排序">
					<el-radio-group v-model="sortForm.sortcontrol">
						<el-radio class="radio" :label="1">顺序</el-radio>
						<el-radio class="radio" :label="0">逆序</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="sortFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="sortSubmit" :loading="sortLoading">提交</el-button>
			</div>
		</el-dialog>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page.sync="page" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import jszip from '../../common/js/jszip'
	import axios from 'axios'
	//import NProgress from 'nprogress'
	import { getLogListPage, getBinDownload, removeLog } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					vin: '',
					// car_name: '',
					head_ver: '',
					event_id: '',
					// event_time: '',
					start_time: '',
					end_time: '',
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
				
				sortFormVisible: false, //排序界面是否显示
				sortLoading: false,
				//排序界面数据
				sortForm: {
					sortcontrol: 0
				}
			}
		},
		
		methods: {
			timeChange1(val) {
				this.filters.start_time = val;
			},
			timeChange2(val) {
				this.filters.end_time = val;
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getLogs();
			},
			//获取日志列表
			getLogs() {
				let para = {
					page: this.page,
					frame_num: this.filters.vin,
					head_ver: this.filters.head_ver,
					event_id: this.filters.event_id,
					event_time: ((this.filters.start_time + '~' + this.filters.end_time) == '~') ? '' : (this.filters.start_time + '~' + this.filters.end_time),
					latitude: this.filters.latitude,
					hard_ver: this.filters.hard_ver,
					soft_ver: this.filters.soft_ver,
					et: this.filters.et,
					log_order: this.sortForm.sortcontrol
				};
				console.log("xin")
				console.log(para)
				this.listLoading = true;
				getLogListPage(para).then((res) => {
					console.log(res.data);
					this.total = res.data.total;
					this.logs = res.data.users;
					this.listLoading = false;
				});
			},
			//MCU界面跳转
			handleMCU: function (index, row) {
				console.log(row)
				if(row.event_id === '4') {
					this.$router.push({
						path:'/MCU1',
						query:{
							bin_name: row.bin_name,
							row: row,
							page: this.page
						}
					})
				} else {
					this.$router.push({
						path:'/MCU',
						query:{
							bin_name: row.bin_name,
							row: row,
							page: this.page
						}
					})
				}
			},
			//图片界面跳转
			handleImage: function (index, row) {
				console.log(row)
				if(row.event_id === '4') {
					this.$router.push({
						path:'/image1',
						query:{
							bin_name: row.bin_name,
							row: row,
							page: this.page
						}
					})
				} else {
					this.$router.push({
						path:'/image',
						query:{
							bin_name: row.bin_name,
							row: row,
							page: this.page
						}
					})
				}
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
					event_time: row.event_time,
					latitude: row.latitude.toString(),
					hard_ver: row.hard_ver,
					soft_ver: row.soft_ver,
					et: row.et,
				};
				console.log(para)
				this.listLoading = true;
				getBinDownload(para).then((res) => {
					console.log(res);
					let url = res.data.bin_file[0].file_url;
					let a = document.createElement("a");
					a.href = url;
					a.download = "LNAN1AB31L5000301_26.bin";
					a.click();
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
					event_time: ((this.filters.start_time + '~' + this.filters.end_time) == '~') ? '' : (this.filters.start_time + '~' + this.filters.end_time),
					latitude: this.filters.latitude,
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
					})
					this.listLoading = false;
				});
			},
			handleSort: function() {
				this.sortFormVisible = true;
			},
			sortSubmit: function() {
				this.$refs.sortForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.sortLoading = true;
							this.getLogs();
							this.sortLoading = false;
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['sortForm'].resetFields();
							this.sortFormVisible = false;
						});
					}
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { bin_name: row.bin_name };
					console.log(para)
					removeLog(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getLogs();
					});
				}).catch(() => {
			
				});
			},
		},
		
		mounted() {
			this.getLogs();
		},
		
		created() {
			this.page = this.$route.query.page ? this.$route.query.page : this.page;
			console.log("当前page", this.page);
		}
	}

</script>

<style scoped>
	/* @import "../../styles/table.css"; */
<style>