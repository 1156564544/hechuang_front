<!-- <template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="活动名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="活动区域">
			<el-select v-model="form.region" placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="活动时间">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="即时配送">
			<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
		</el-form-item>
		<el-form-item label="活动性质">
			<el-checkbox-group v-model="form.type">
				<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
				<el-checkbox label="地推活动" name="type"></el-checkbox>
				<el-checkbox label="线下主题活动" name="type"></el-checkbox>
				<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="特殊资源">
			<el-radio-group v-model="form.resource">
				<el-radio label="线上品牌商赞助"></el-radio>
				<el-radio label="线下场地免费"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="活动形式">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script> -->

<template>
	<section>
	
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-col :span="16" class="toolbar" style="padding-bottom: 0px;">
				<el-input v-model="sql_command" placeholder="请输入sql语句"></el-input>
			</el-col>
			<el-col :span="4" class="toolbar" style="padding-bottom: 0px;">
				<el-button type="primary" v-on:click="getSqlValue">查询</el-button>
			</el-col>
			<el-col :span="4" class="toolbar" style="padding-bottom: 0px;">
				<a href="http://127.0.0.1:8085/treesoft/treesoft/index">数据库管理系统</a>
			</el-col>
		</el-col>

		
		<!--列表-->
		<el-tabs v-model="activeName" @tab-click="handleClick">
    		<el-tab-pane label="日志表" name="first">
				<el-table :data="log" highlight-current-row style="width: 100%;">
					<el-table-column prop="id" label="id" width="90">
					</el-table-column>
					<el-table-column prop="man_num" label="man_num" width="90">
					</el-table-column>
					<el-table-column prop="head_ver" label="head_ver" width="90">
					</el-table-column>
					<el-table-column prop="head_len" label="head_len" width="90">
					</el-table-column>
					<el-table-column prop="etl" label="etl" width="90">
					</el-table-column>
					<el-table-column prop="et" label="et" width="90">
					</el-table-column>
					<el-table-column prop="hard_ver" label="hard_ver" width="90">
					</el-table-column>
					<el-table-column prop="soft_ver" label="soft_ver" width="90">
					</el-table-column>
					<el-table-column prop="frame_num" label="frame_num" width="90">
					</el-table-column>
					<el-table-column prop="event_id" label="event_id" width="90">
					</el-table-column>
					<el-table-column prop="event_name_len" label="event_name_len" width="90">
					</el-table-column>
					<el-table-column prop="event_name" label="event_name" width="90">
					</el-table-column>
					<el-table-column prop="event_time" label="event_time" width="90">
					</el-table-column>
					<el-table-column prop="position_sign" label="position_sign" width="90">
					</el-table-column>
					<el-table-column prop="latitude" label="latitude" width="90">
					</el-table-column>
					<el-table-column prop="longitude" label="longitude" width="90">
					</el-table-column>
					<el-table-column prop="altitude" label="altitude" width="90">
					</el-table-column>
					<el-table-column prop="speed" label="speed" width="90">
					</el-table-column>
					<el-table-column prop="data_seg_protocal" label="data_seg_protocal" width="90">
					</el-table-column>
					<el-table-column prop="data_seg_len" label="data_seg_len" width="90">
					</el-table-column>
					<el-table-column prop="head_info_crc" label="head_info_crc" width="90">
					</el-table-column>
					<el-table-column prop="soc_ver_Maj" label="soc_ver_Maj" width="90">
					</el-table-column>
					<el-table-column prop="soc_ver_Min" label="soc_ver_Min" width="90">
					</el-table-column>
					<el-table-column prop="height" label="height" width="90">
					</el-table-column>
					<el-table-column prop="width" label="width" width="90">
					</el-table-column>
					<el-table-column prop="Data_Mile_Info" label="Data_Mile_Info" width="90">
					</el-table-column>
					<el-table-column prop="imgIndex" label="imgIndex" width="90">
					</el-table-column>
					<el-table-column prop="img_stage" label="img_stage" width="90">
					</el-table-column>
					<el-table-column prop="size" label="size" width="90">
					</el-table-column>
					<el-table-column prop="timestamps" label="timestamps" width="90">
					</el-table-column>
				</el-table>
			</el-tab-pane>
    		<el-tab-pane label="用户表" name="second">
				<el-table :data="user" highlight-current-row style="width: 100%;">
					<el-table-column prop="user_id" label="user_id" width="240">
					</el-table-column>
					<el-table-column prop="pwd" label="pwd" width="240">
					</el-table-column>
				</el-table>
			</el-tab-pane>
   		 	<el-tab-pane label="用户登录表" name="third">
				<el-table :data="userlogin" highlight-current-row style="width: 100%;">
					<el-table-column prop="id" label="id" width="180">
					</el-table-column>
					<el-table-column prop="username" label="username" width="180">
					</el-table-column>
					<el-table-column prop="password" label="password" width="180">
					</el-table-column>
					<el-table-column prop="avatar" label="avatar" width="180">
					</el-table-column>
					<el-table-column prop="name" label="name" width="180">
					</el-table-column>
				</el-table>
			</el-tab-pane>
    		<el-tab-pane label="用户管理表" name="fourth">
				<el-table :data="user_manage" highlight-current-row style="width: 100%;">
					<el-table-column prop="id" label="id" width="150">
					</el-table-column>
					<el-table-column prop="user_id" label="user_id" width="150">
					</el-table-column>
					<el-table-column prop="user_name" label="user_name" width="150">
					</el-table-column>
					<el-table-column prop="user_certificate" label="user_certificate" width="150">
					</el-table-column>
					<el-table-column prop="user_auth" label="user_auth" width="150">
					</el-table-column>
					<el-table-column prop="data_download_auth" label="data_download_auth" width="150">
					</el-table-column>
					<el-table-column prop="data_browse_auth" label="data_browse_auth" width="150">
					</el-table-column>
					<el-table-column prop="device_manage_auth" label="device_manage_auth" width="150">
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="设备表" name="fiveth">
				<el-table :data="device" highlight-current-row style="width: 100%;">
					<el-table-column prop="id" label="id" width="180">
					</el-table-column>
					<el-table-column prop="vin" label="vin" width="180">
					</el-table-column>
					<el-table-column prop="name" label="name" width="180">
					</el-table-column>
					<el-table-column prop="uploaddate" label="uploaddate" width="180">
					</el-table-column>
					<el-table-column prop="uploadtimes" label="uploadtimes" width="180">
					</el-table-column>
					<el-table-column prop="devicecert" label="devicecert" width="180">
					</el-table-column>
					<el-table-column prop="deviceauth" label="deviceauth" width="180">
					</el-table-column>
				</el-table>
			</el-tab-pane>
  		</el-tabs>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getSqlService,getUserListPage, editUser, addDevice } from '../../api/api';

	export default {
		data() {
			return {
				activeName: 'second',
				sql_command: "",
				sql_table: "",
				users: [],
				user: [],
				userlogin: [],
				log: [],
				user_manage: [],
				device: [],
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
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					user_id: '',
					user_name: '',
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
					]
				},
				//新增界面数据
				addForm: {
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
				},
				
			}
		},
		
		methods: {
			handleClick(tab, event) {
        		console.log(tab, event);
      		},
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
			getSqlValue(){
				if (this.activeName=="first")
				{
					this.sql_table="test_adas_header";
				}
				if (this.activeName=="second")
				{
					this.sql_table="user";
				}
				if (this.activeName=="third")
				{
					this.sql_table="userlogin";
				}
				if (this.activeName=="fourth")
				{
					this.sql_table="user_manage";
				}
				if (this.activeName=="fiveth")
				{
					this.sql_table="devices";
				}
				let para = {
					sql_sentence:this.sql_command,
					sql_table:this.sql_table
				};
				console.log(para);
				getSqlService(para).then((res) => {
					console.log(res.data)
					this.user = res.data.user;
					this.userlogin = res.data.userlogin;
					this.log = res.data.log;
					this.user_manage = res.data.user_manage;
					this.device = res.data.device;
				});
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
							addDevice(para).then((res) => {
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
	
	}

</script>

<style scoped>

</style>