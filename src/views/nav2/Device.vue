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
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<!--列表-->
		<el-table :data="devices" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="vin" label="vin号" width="240" sortable>
			</el-table-column>
			<el-table-column prop="name" label="名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="uploaddate" label="上传时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="uploadtimes" label="上传次数" width="120" sortable>
			</el-table-column>
			<el-table-column prop="devicecert" label="是否认证" width="120" :formatter="formatCert" sortable>
			</el-table-column>
			<el-table-column prop="deviceauth" label="是否授权" width="120" :formatter="formatAuth" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="vin号" prop="vin">
					<el-input v-model="editForm.vin" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="设备名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否认证">
					<el-radio-group v-model="editForm.devicecert">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="是否授权">
					<el-radio-group v-model="editForm.deviceauth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		
		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="vin号" prop="vin">
					<el-input v-model="addForm.vin" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上传日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.uploaddate"></el-date-picker>
				</el-form-item>
				<el-form-item label="上传次数">
					<el-input-number v-model="addForm.uploadtimes" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="是否认证">
					<el-radio-group v-model="addForm.devicecert">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="是否授权">
					<el-radio-group v-model="addForm.deviceauth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getDeviceListPage, editDevice, addDevice } from '../../api/api';

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
				sels: [], //列表选中列
				
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入设备名称', trigger: 'blur' }
					],
					vin: [
						{ required: true, message: '请输入vin号', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					vin: '',
					name: '',
					devicecert: -1,
					deviceauth: -1
				},
				
				addFormVisible: false, //新增页面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					vin: [
						{ required: true, message: '请输入vin号', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					vin: '',
					uploaddate: '',
					uploadtimes: 0,
					devicecert: -1,
					deviceauth: -1
				},
				
			}
		},
		
		methods: {
			//设备认证显示转换
			formatCert: function (row, column) {
				return row.devicecert == 1 ? '是' : row.devicecert == 0 ? '否' : '未知';
			},
			//设备授权显示转换
			formatAuth: function (row, colomn) {
				return row.deviceauth == 1 ? '是' : row.deviceauth == 0 ? '否' : '未知';
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
					console.log(res)
					this.total = res.data.total;
					this.devices = res.data.devices;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {
			
				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					vin: '',
					uploaddate: '',
					uploadtimes: 0,
					devicecert: -1,
					deviceauth: -1
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							console.log(para)
							// para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
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
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.uploaddate = (!para.uploaddate || para.uploaddate == '') ? '' : util.formatDate.format(new Date(para.uploaddate), 'yyyy-MM-dd');
							addDevice(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getDevices();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {
			
				});
			}
		},
		
		mounted() {
			this.getDevices();
		}
	}

</script>

<style scoped>

</style>