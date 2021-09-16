
<template>
    <div class="app-container" style="text-align: -webkit-center;">
      <el-card style="width: 98%;height:1000">
        <el-row :gutter="24">
          <el-form :inline="true" style="text-align:-webkit-left;">
            <el-form-item label="SQL:  ">
              <el-input v-model="sqls" placeholder="请输入sql" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getSql1()">执行</el-button>
            </el-form-item>
            <el-form-item label="返回信息:">
              <el-input v-model="msgs"></el-input>
            </el-form-item>
          </el-form>
        </el-row>

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
                            width="160">
          </el-table-column>
        </el-table>

        <el-pagination style="float: right"
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-card>
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
            pageIndex: 1,
            pageSize: 50,
            totalPage: 0,
            sqls:undefined,
            tableData:[],
            tableData1:[],
            msgs:"",
            loading: true,
          }
      },
      components :{
      },
      created() {
      },
      methods:{
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
          getSqlRes({sql:this.sqls,current: this.pageIndex,
            size: this.pageSize}).then(response => {
			console.log(response.data)
            if (response) {
              this.msgs = response.data.msg
              this.tableData = response.data.table
              this.tableData1 = response.data.data
              this.totalPage = response.data.totalPage

            } else {
              this.msgs = response.data.msg
              this.tableData=[]
              this.tableData1 = []
              this.totalPage = 0
            }
			console.log(this.msgs)
			console.log(this.tableData)
			console.log(this.tableData1)
			console.log(this.totalPage)
          })
        },
        getSql1() {
          getSqlRes({sql:this.sqls,current: 1,
            size: 10}).then(response => {
			console.log(response.data)
            if (response) {
              this.msgs = response.data.msg
              this.tableData = response.data.table
              this.tableData1 = response.data.data
              this.totalPage = response.data.totalPage
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
			console.log(this.totalPage)
          })
        },
      }
    }
</script>
