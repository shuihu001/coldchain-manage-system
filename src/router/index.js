import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',

        },
        {
            path: '/login',
            component: () => import('../views/login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/',
            component: () => import('../views/main.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/companyHomePage',
                    component: () => import('../views/homePage/companyHomePage.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/goverHomePage',
                    component: () => import('../views/homePage/goverHomePage.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/homepage',
                    component: () => import('../views/homePage.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/processingOrdersSum',
                    component: () => import('../views/processingOrders/processingOrdersSum.vue'),
                    meta: { title: '执行中订单汇总' }
                },
                {
                    path: '/processingOrdersDetail',
                    component: () => import('../views/processingOrders/processingOrdersDetail.vue'),
                    meta: { title: '执行中订单详情' }
                },
                {
                    path: '/goodVideo',
                    component: () => import('../views/processingOrders/goodVideo.vue'),
                    meta: { title: '订单监控详情' }
                },
                {
                    path: '/errorOrdersSum',
                    component: () => import('../views/errorOrders/errorOrdersSum.vue'),
                    meta: { title: '异常订单汇总' }
                },
                {
                    path: '/errorOrdersDetail',
                    component: () => import('../views/errorOrders/errorOrdersDetail.vue'),
                    meta: { title: '异常订单详情' }
                },
                {
                    path: '/processedOrdersSum',
                    component: () => import('../views/processedOrders/processedOrdersSum.vue'),
                    meta: { title: '历史订单汇总' }
                },
                {
                    path: '/processedOrdersDetail',
                    component: () => import('../views/processedOrders/processedOrdersDetail.vue'),
                    meta: { title: '历史订单详情' }
                },
                {
                    path: '/accountManage',
                    component: () => import('../views/accountManage/accountManage.vue'),
                    meta: { title: "账号管理" }
                },
                {
                    path: '/profile',
                    component: () => import('../views/profile/profile.vue'),
                    meta: { title: "个人中心"}
                },
                // {
                //     path: '/driverCheck',
                //     component: () => import(/* webpackChunkName: "table" */ '../views/driverCheck.vue'),
                //     meta: { title: '司机注册审核' }
                // },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/common/404.vue'),
                    meta: { title: '404' }
                },
            ]
            //     {
            //         path: '/icon',
            //         component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
            //         meta: { title: '自定义图标' }
            //     },
                // {
                //     path: '/table',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                //     meta: { title: '基础表格' }
                // },
            //     {
            //         path: '/tabs',
            //         component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
            //         meta: { title: 'tab选项卡' }
            //     },
            //     {
            //         path: '/form',
            //         component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
            //         meta: { title: '基本表单' }
            //     },
            //     {
            //         // 富文本编辑器组件
            //         path: '/editor',
            //         component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
            //         meta: { title: '富文本编辑器' }
            //     },
            //     {
            //         // markdown组件
            //         path: '/markdown',
            //         component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
            //         meta: { title: 'markdown编辑器' }
            //     },
            //     {
            //         // 图片上传组件
            //         path: '/upload',
            //         component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
            //         meta: { title: '文件上传' }
            //     },
            //     {
            //         // vue-schart组件
            //         path: '/charts',
            //         component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
            //         meta: { title: 'schart图表' }
            //     },
            //     {
            //         // 拖拽列表组件
            //         path: '/drag',
            //         component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
            //         meta: { title: '拖拽列表' }
            //     },
            //     {
            //         // 拖拽Dialog组件
            //         path: '/dialog',
            //         component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
            //         meta: { title: '拖拽弹框' }
            //     },
            //     {
            //         // 国际化组件
            //         path: '/i18n',
            //         component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
            //         meta: { title: '国际化' }
            //     },
            //     {
            //         // 权限页面
            //         path: '/permission',
            //         component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
            //         meta: { title: '权限测试', permission: true }
            //     },
                // {
                //     path: '/404',
                //     component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                //     meta: { title: '404' }
                // },
            //     {
            //         path: '/403',
            //         component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
            //         meta: { title: '403' }
            //     },
            //     {
            //         path: '/donate',
            //         component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
            //         meta: { title: '支持作者' }
            //     }
            // ]
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
})

routes.beforeEach((to, from, next) => {
    if(to.path == '/login') return next()
    const tokenStr = localStorage.getItem("token")
    if(!tokenStr) return next('/login')
    next()
})

export default routes
