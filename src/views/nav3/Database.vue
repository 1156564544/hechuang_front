
<template>
    <div class="app-container" style="text-align: -webkit-center;">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-row >
        <el-col :span="12">
        <el-autocomplete
        v-model="sqls"
        :fetch-suggestions="querySearch"
        style="width:100%"
        placeholder="请输入sql"
        :trigger-on-focus="false"
        @select="handleSelect"
        ><template slot="prepend" style="width:20%">sql语句：</template></el-autocomplete>
        </el-input></el-col>
        <el-col :span="2"><el-button type="primary" @click="getSql1()">执行</el-button></el-col>
        <el-col :span="2"><el-button type="primary" @click="showTables()">显示数据表</el-button></el-col>
        </el-row>
        <br>
        <el-row >
          <el-col :span="12"><el-input v-model="msgs"><template slot="prepend" style="width:20%">返回信息：</template></el-input></el-col>
        </el-row>
    </el-col>

        <el-table
          :data="tableData1"
          border
          loading
          height="800"
          highlight-current-row>

          <el-table-column  v-for="item in tableData"
                            :label="item"
                            :property="item"
                            :key = "item"
                            width=width>
          </el-table-column>
        </el-table>

        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
    </div>
</template>

<script>
  import { getSqlRes } from '../../api/api';

//   import { getSqlRes} from '@/api/platform/crds/companycreditinfo/webSql'
//   import {matchRating} from "../../../api/platform/crds/debt/runRating";
//   import {remote} from '@/api/admin/dict.js'
    export default {
        name: "index",
      data(){
          return{
            width:160,
            pageIndex: 1,
            pageSize: 50,
            totalPage: 0,
            sqls:undefined,
            page : 1,
            total : 0,
            tableData:["user","devices","token","userlogin"],
            tableData1:[
            {"user":"user_id","devices":"id","token":"token_id","userlogin":"id"},
            {"user":"pwd","devices":"vin","token":"user_id","userlogin":"username"},
            {"user":"","devices":"name","token":"random_number","userlogin":"password"},
            {"user":"","devices":"uploaddate","token":"","userlogin":"avatar"},
            {"user":"","devices":"uploadtimes","token":"","userlogin":"name"},
            {"user":"","devices":"devicecert","token":"","userlogin":""},
            {"user":"","devices":"deviceauth","token":"","userlogin":""},
            {"user":"","devices":"","token":"","userlogin":""},],
            table_name:["user","devices","token","userlogin"],
            table_value:[
            {"user":"user_id","devices":"id","token":"token_id","userlogin":"id"},
            {"user":"pwd","devices":"vin","token":"user_id","userlogin":"username"},
            {"user":"","devices":"name","token":"random_number","userlogin":"password"},
            {"user":"","devices":"uploaddate","token":"","userlogin":"avatar"},
            {"user":"","devices":"uploadtimes","token":"","userlogin":"name"},
            {"user":"","devices":"devicecert","token":"","userlogin":""},
            {"user":"","devices":"deviceauth","token":"","userlogin":""},
            {"user":"","devices":"","token":"","userlogin":""},],
            msgs:"",
            loading: true,
            commands: [],
          }
      },
      components :{
      },
      created() {
      },
      methods:{
        handleCurrentChange(val) {
				this.page = val;
				this.getSql1();
			},
        sizeChangeHandle(val) {
          this.pageSize = val
          this.pageIndex = 1
          this.getSql()
        },
        currentChangeHandle(val) {
          this.pageIndex = val
          this.getSql()
        },
        getSql() {
          getSqlRes({sql:this.sqls,current: this.page,
            size: this.pageSize}).then(response => {
			console.log(response.data)
            if (response) {
              this.msgs = response.data.msg
              this.tableData = response.data.table
              this.tableData1 = response.data.data
              this.total = response.data.totalPage

            } else {
              this.msgs = response.data.msg
              this.tableData=[]
              this.tableData1 = []
              this.totalPage = 0
            }
			console.log(this.msgs)
			console.log(this.tableData)
			console.log(this.tableData1)
			console.log(this.total)
          })
        },
        getSql1() {
          getSqlRes({sql:this.sqls,current: this.page,
            size: 20}).then(response => {
			console.log(response.data)
            if (response) {
              this.msgs = response.data.msg
              this.tableData = response.data.table
              this.tableData1 = response.data.data
              this.total = response.data.totalPage
              this.pageIndex = 1
              this.pageSize = 50

            } else {
              this.msgs = response.data.msg
              this.tableData=[]
              this.tableData1 = []
              this.pageSize = 0
            }
			console.log(this.msgs)
			console.log(this.tableData)
			console.log(this.tableData1)
			console.log(this.total)
          })
        },
        showTables(){
          this.tableData=this.table_name
          this.tableData1=this.table_value
        },
        querySearch(queryString, cb) {
        var commands = this.commands;
        var results = queryString ? commands.filter(this.createFilter(queryString)) : commands;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "select * from user"},
          { "value": "select user_id from user"},
          { "value": "select pwd from user"},
          { "value": "select id from devices"},
          { "value": "select vin from devices"},
          { "value": "select name from devices"},
          { "value": "select uploaddate from devices"},
          { "value": "select uploadtimes from devices"},
          { "value": "select devicecert from devices"},
          { "value": "select deviceauth from devices"},
          { "value": "select * from devices"},
          { "value": "select token_id from token"},
          { "value": "select user_id from token"},
          { "value": "select random_number from token"},
          { "value": "select * from token"},
          { "value": "select * from userlogin"},
          { "value": "select id from userlogin"},
          { "value": "select username from userlogin"},
          { "value": "select password from userlogin"},
          { "value": "select avatar from userlogin"},
          { "value": "select name from userlogin"},
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
      },
      mounted() {
      this.commands = this.loadAll();
    }
    }
</script>
