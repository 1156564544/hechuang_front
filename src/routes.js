import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Device from './views/nav2/Device.vue'
import Log from './views/nav2/Log.vue'
import Image from './views/nav2/Image.vue'
import Image1 from './views/nav2/Image1.vue'
import MCU from './views/nav2/mcu.vue'
import MCU1 from './views/nav2/mcu1.vue'
import Video from './views/nav2/Video.vue'
import Page6 from './views/nav3/Page6.vue'
import Cloudreve from './views/nav3/Cloudreve.vue'
import Database from './views/nav3/Database.vue'
import Can from './views/nav3/can.vue'
import echarts from './views/charts/echarts.vue'
import omnidb from './views/nav3/omnidb.vue'
import Video2 from './views/nav1/video2.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '用户与设备管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '用户管理' },
            { path: '/form', component: Form, name: 'SQL查询', hidden: true  },
            { path: '/user', component: user, name: '列表', hidden: true },
			{ path: '/device', component: Device, name: '设备管理' },
			// { path: '/video2', component: Video2, name: '视频' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据查询与管理',
        iconCls: 'el-icon-date',
        children: [
            { path: '/page4', component: Page4, name: 'vuex测试', hidden: true },
            { path: '/page5', component: Page5, name: '设备管理测试', hidden: true },
			// { path: '/device', component: Device, name: '设备管理' },
			{ path: '/log', component: Log, name: '日志查询' },
            { path: '/MCU', component: MCU, name: 'MCU', hidden: true },
			{ path: '/MCU1', component: MCU1, name: 'MCU', hidden: true },
			{ path: '/image', component: Image, name: 'SOC回放', hidden: true },
			{ path: '/image1', component: Image1, name: 'SOC回放', hidden: true },
			{ path: '/video', component: Video, name: '视频回放', hidden: true },
			{ path: '/database', component: Database, name: '数据库管理系统' },
            // { path: '/omnidb', component: omnidb, name: 'omnidb管理系统' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Can数据上传与解析',
        iconCls: 'el-icon-date',
        // leaf: true,//只有一个节点
        children: [
            // { path: '/page6', component: Page6, name: '导航三', hidden: true },
			{ path: '/cloudreve', component: Cloudreve, name: '离线Can数据上传' },
			// { path: '/database', component: Database, name: '数据库管理系统' },
			{ path: '/can', component: Can, name: 'Can数据解析' },
        ]
    },
	{
	    path: '/',
	    component: Home,
	    name: '数据统计与分析',
	    iconCls: 'el-icon-date',
	    leaf: true,//只有一个节点
	    children: [
			{
			  path: 'dashboard',
			  component: () => import('@/views/dashboard/index'),
			  name: '数据统计与分析',
			  meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
			}
	    ]
	},
	
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'el-icon-date',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;