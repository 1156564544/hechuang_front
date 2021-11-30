<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.user_id" placeholder="user_id号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.user_name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getusers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="user_id" label="user_id" width="120" sortable>
			</el-table-column>
			<el-table-column prop="user_name" label="名称" width="120" sortable>
			</el-table-column>
			<!-- <el-table-column prop="user_certificate" label="用户认证" width="120" :formatter="formatCert" sortable>
			</el-table-column>
			<el-table-column prop="user_auth" label="用户授权" width="120" :formatter="formatAuth" sortable>
			</el-table-column> -->
			<el-table-column prop="data_download_auth" label="数据下载权限" width="150" :formatter="formatDownload" sortable>
			</el-table-column>
			<el-table-column prop="data_browse_auth" label="数据浏览权限" width="150" :formatter="formatbrowse" sortable>
			</el-table-column>
			<el-table-column prop="device_manage_auth" label="设备管理权限" width="150" :formatter="formatDevice" sortable>
			</el-table-column>
			<el-table-column prop="user_manage_auth" label="用户管理权限" width="150" :formatter="formatUser" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
				<el-form-item label="user_id号" prop="user_id">
					<el-input v-model="editForm.user_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="user_name">
					<el-input v-model="editForm.user_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass_word">
					<el-input v-model="editForm.pass_word" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="用户认证">
					<el-radio-group v-model="editForm.user_certificate">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="用户授权">
					<el-radio-group v-model="editForm.user_auth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item> -->

				<el-form-item label="数据下载权限">
					<el-radio-group v-model="editForm.data_download_auth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="数据浏览权限">
					<el-radio-group v-model="editForm.data_browse_auth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="设备管理权限">
					<el-radio-group v-model="editForm.device_manage_auth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="用户管理权限">
					<el-radio-group v-model="editForm.user_manage_auth">
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
				<el-form-item label="姓名" prop="user_name">
					<el-input v-model="addForm.user_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="user_id号" prop="user_id">
					<el-input v-model="addForm.user_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass_word">
					<el-input v-model="addForm.pass_word" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="上传日期">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.uploaddate"></el-date-picker>
				</el-form-item> -->
				<!-- <el-form-item label="上传次数">
					<el-input-number v-model="addForm.uploadtimes" :min="0" :max="200"></el-input-number>
				</el-form-item> -->
				<!-- <el-form-item label="用户认证">
					<el-radio-group v-model="addForm.user_certificate">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="用户授权">
					<el-radio-group v-model="addForm.user_auth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item> -->

				<el-form-item label="数据下载权限">
					<el-radio-group v-model="addForm.data_download_auth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="数据浏览权限">
					<el-radio-group v-model="addForm.data_browse_auth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="设备管理权限">
					<el-radio-group v-model="addForm.device_manage_auth">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="用户管理权限">
					<el-radio-group v-model="addForm.user_manage_auth">
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
	import { getUserListPage, editUser, addUser, removeUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					user_name: '',
					user_id: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [], //列表选中列
				
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					user_name: [
						{ required: true, message: '请输入用户名称', trigger: 'blur' }
					],
					user_id: [
						{ required: true, message: '请输入user_id号', trigger: 'blur' }
					],
					pass_word: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					user_id: '',
					user_name: '',
					pass_word: '',
					user_certificate:-1,
					user_auth:-1,
					data_download_auth: -1,
					data_browse_auth: -1,
					device_manage_auth:-1,
					user_manage_auth:-1
				},
				
				addFormVisible: false, //新增页面是否显示
				addLoading: false,
				addFormRules: {
					user_name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					user_id: [
						{ required: true, message: '请输入user_id号', trigger: 'blur' }
					],
					pass_word: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					user_name: '',
					user_id: '',
					pass_word: '',
					uploaddate: '',
					uploadtimes: 0,
					user_certificate:-1,
					user_auth:-1,
					data_download_auth: -1,
					data_browse_auth: -1,
					device_manage_auth:-1,
					user_manage_auth:-1
				},
				
			}
		},
		
		methods: {
			//设备认证显示转换
			formatCert: function (row, column) {
				return row.user_certificate == 1 ? '是' : row.user_certificate == 0 ? '否' : '未知';
			},
			//设备授权显示转换
			formatAuth: function (row, colomn) {
				return row.user_auth == 1 ? '是' : row.user_auth == 0 ? '否' : '未知';
			},
			
			//数据下载权限显示转换
			formatDownload: function (row, column) {
				return row.data_download_auth == 1 ? '是' : row.data_download_auth == 0 ? '否' : '未知';
			},
			//数据浏览权限显示转换
			formatbrowse: function (row, colomn) {
				return row.data_browse_auth == 1 ? '是' : row.data_browse_auth == 0 ? '否' : '未知';
			},
			//设备管理权限显示转换
			formatDevice: function (row, column) {
				return row.device_manage_auth == 1 ? '是' : row.device_manage_auth == 0 ? '否' : '未知';
			},
			//用户管理权限显示转换
			formatUser: function (row, colomn) {
				return row.user_manage_auth == 1 ? '是' : row.user_manage_auth == 0 ? '否' : '未知';
			},

			handleCurrentChange(val) {
				this.page = val;
				this.getusers();
			},
			//获取设备列表
			getusers() {
				let para = {
					page: this.page,
					user_name: this.filters.user_name,
					user_id: this.filters.user_id
				};
				console.log(para)
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					console.log(res)
					this.total = res.data.total;
					this.users = res.data.users;
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
					let para = { user_id: row.user_id };
					console.log(para)
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
					user_name: '',
					user_id: '',
					uploaddate: '',
					uploadtimes: 0,
					user_certificate:-1,
					user_auth:-1,
					data_download_auth: -1,
					data_browse_auth: -1,
					device_manage_auth:-1,
					user_manage_auth:-1
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
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getusers();
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
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getusers();
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
			this.getusers();
		}
	}

</script>

<style scoped>

</style>