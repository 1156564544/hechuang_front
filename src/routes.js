import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Form from './views/nav1/Form.vue'
import User from './views/nav1/User.vue'
import Device from './views/nav2/Device.vue'
import Log from './views/nav2/Log.vue'
import Page5 from './views/nav2/Page5.vue'
import Image from './views/nav2/Image.vue'
import Image1 from './views/nav2/Image1.vue'
import Mcu from './views/nav2/Mcu.vue'
import Mcu1 from './views/nav2/Mcu1.vue'
import Video from './views/nav2/Video.vue'
import Database from './views/nav3/Database.vue'
import Omnidb from './views/nav3/Omnidb.vue'
import Cloudreve from './views/nav3/Cloudreve.vue'
import Can from './views/nav3/Can.vue'
import Echarts from './views/charts/Echarts.vue'

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
    {
        path: '/',
        component: Home,
        name: '用户与设备管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/form', component: Form, name: 'SQL查询', hidden: true  },
            { path: '/user', component: User, name: '用户管理'},
			{ path: '/device', component: Device, name: '设备管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据查询与管理',
        iconCls: 'el-icon-date',
        children: [
			{ path: '/log', component: Log, name: '日志查询' },
            { path: '/page5', component: Page5, name: '设备管理测试', hidden: true },
			{ path: '/image', component: Image, name: 'SOC回放', hidden: true },
			{ path: '/image1', component: Image1, name: 'SOC回放', hidden: true },
            { path: '/mcu', component: Mcu, name: 'MCU', hidden: true },
			{ path: '/mcu1', component: Mcu1, name: 'MCU', hidden: true },
			{ path: '/video', component: Video, name: '视频回放', hidden: true },
			{ path: '/database', component: Database, name: '数据库管理系统' },
            { path: '/omnidb', component: Omnidb, name: 'omnidb管理系统', hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Can数据上传与解析',
        iconCls: 'el-icon-date',
        children: [
			{ path: '/cloudreve', component: Cloudreve, name: '离线Can数据上传' },
			{ path: '/can', component: Can, name: 'Can数据解析' },
        ]
    },
	{
	    path: '/',
	    component: Home,
	    name: '数据统计与分析',
	    iconCls: 'el-icon-date',
	    leaf: true,
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
            { path: '/echarts', component: Echarts, name: 'echarts' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;