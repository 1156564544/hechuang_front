<template>
	<section>
		<!--工具条vin,head_ver,event_id,event_time,latitude,hard_ver,soft_ver,et-->
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
			</el-form>
		</el-col>
		
		<!--列表-->
		<el-table :data="logs" highlight-current-row v-loading="listLoading" style="width: 100%;">
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
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleImage(scope.$index, scope.row)">图片</el-button>
					<el-button size="small">下载</el-button>
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
	//import NProgress from 'nprogress'
	import { getLogListPage } from '../../api/api';

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
			//获取日志列表
			getLogs() {
				let para = {
					page: this.page,
					vin: this.filters.vin,
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
					console.log(res)
					this.total = res.data.total;
					this.logs = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//图片界面跳转
			handleImage: function (index, row) {
				this.editForm = Object.assign({}, row);
				console.log(row.event_id)
				this.$router.push({
					path:'/image',
					query:{
						event_id: row.event_id
					}
				})
			}
		},
		
		mounted() {
			this.getLogs();
		}
	}

</script>

<style scoped>

</style>