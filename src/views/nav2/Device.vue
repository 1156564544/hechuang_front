<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.vin" placeholder="vin号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="设备名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getDevices">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<!--列表-->
		<el-table :data="devices" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="vin" label="vin号" width="180" sortable>
			</el-table-column>
			<el-table-column prop="name" label="车型" width="180" sortable>
			</el-table-column>
			<el-table-column prop="uploaddate" label="上传时间" width="260" sortable>
			</el-table-column>
			<el-table-column prop="uploadtimes" label="上传次数" width="120" sortable>
			</el-table-column>
			<el-table-column prop="devicecert" label="是否认证" width="120" :formatter="formatCert" sortable>
			</el-table-column>
			<el-table-column prop="deviceauth" label="上传权限" width="120" :formatter="formatAuth" sortable>
			</el-table-column>
			<el-table-column prop="download_deviceauth" label="下载权限" width="120" :formatter="formatDownload" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">流量控制</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="primary" @click="handleBatch">批量流量控制</el-button>
			<el-button type="primary" @click="handleDownload">下载权限控制</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
		<!--编辑界面-->
		<el-dialog title="流量控制" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="上传权限">
					<el-radio-group v-model="editForm.deviceauth">
						<el-radio class="radio" :label="1">打开</el-radio>
						<el-radio class="radio" :label="0">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		
		<!--批量流量控制界面-->
		<el-dialog title="批量流量控制" v-model="batchFormVisible" :close-on-click-modal="false">
			<el-form :model="batchForm" label-width="80px" ref="batchForm">
				<el-form-item label="上传权限">
					<el-radio-group v-model="batchForm.trafficcontrol">
						<el-radio class="radio" :label="1">全部打开</el-radio>
						<el-radio class="radio" :label="0">全部关闭</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="batchFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="batchSubmit" :loading="batchLoading">提交</el-button>
			</div>
		</el-dialog>
		
		<!--下载权限修改界面-->
		<el-dialog title="下载权限修改" v-model="downloadFormVisible" :close-on-click-modal="false">
			<el-form :model="downloadForm" label-width="80px" ref="downloadForm">
				<el-form-item label="下载权限">
					<el-radio-group v-model="downloadForm.downloadcontrol">
						<el-radio class="radio" :label="1">全部打开</el-radio>
						<el-radio class="radio" :label="0">全部关闭</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="downloadFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="downloadSubmit" :loading="downloadLoading">提交</el-button>
			</div>
		</el-dialog>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getDeviceListPage, editDevice, trafficControl, downloadControl } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: '',
					vin: ''
				},
				devices: [],
				total: 0,
				page: 1,
				listLoading: false,
				
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
					id: 0,
					deviceauth: -1
				},
				
				batchFormVisible: false, //批量流量控制界面是否显示
				batchLoading: false,
				//批量流量控制界面数据
				batchForm: {
					trafficcontrol: -1
				},
				
				downloadFormVisible: false, //下载控制界面是否显示
				downloadLoading: false,
				//下载权限控制界面数据
				downloadForm: {
					downloadcontrol: -1
				}
			}
		},
		
		methods: {
			//设备认证显示转换
			formatCert: function (row, column) {
				return row.devicecert == 1 ? '是' : row.devicecert == 0 ? '否' : '未知';
			},
			//设备授权显示转换
			formatAuth: function (row, colomn) {
				return row.deviceauth == 1 ? '打开' : row.deviceauth == 0 ? '关闭' : '未知';
			},
			//下载控制显示转换
			formatDownload: function (row, colomn) {
				return row.download_deviceauth== 1 ? '打开' : row.download_deviceauth == 0 ? '关闭' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getDevices();
			},
			//获取设备列表
			getDevices() {
				let para = {
					page: this.page,
					name: this.filters.name,
					vin: this.filters.vin
				};
				console.log(para)
				this.listLoading = true;
				//NProgress.start();
				getDeviceListPage(para).then((res) => {
					console.log('device')
					console.log(res)
					this.total = res.data.total;
					this.devices = res.data.devices;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				console.log("he")
				console.log(this.editForm)
				console.log(this.editFormVisible)
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							editDevice(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getDevices();
							});
						});
					}
				});
			},
			//显示批量流量控制界面
			handleBatch: function () {
				this.batchFormVisible = true;
			},
			//批量流量控制
			batchSubmit: function () {
				this.$refs.batchForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.batchLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.batchForm);
							console.log("liuliangkongzhi");
							console.log(para);
							trafficControl(para).then((res) => {
								this.batchLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['batchForm'].resetFields();
								this.batchFormVisible = false;
								this.getDevices();
							});
						});
					}
				});
			},
			//显示下载权限控制界面
			handleDownload: function () {
				this.downloadFormVisible = true;
			},
			//下载权限控制
			downloadSubmit: function () {
				this.$refs.downloadForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.downloadLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.downloadForm);
							console.log("xiazaiquanxian");
							console.log(para);
							downloadControl(para).then((res) => {
								console.log(res.data)
								this.downloadLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['downloadForm'].resetFields();
								this.downloadFormVisible = false;
								this.getDevices();
							});
						});
					}
				});
			},
		},
		
		mounted() {
			this.getDevices();
		}
	}

</script>

<style scoped>

</style>