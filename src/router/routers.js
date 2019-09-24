import Main from '@/base/main'

export default [
    {
        path: '/',
        name: '/',
        redirect: '/login',
        meta: {
            hideInMenu: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '欢迎登录',
            hideInMenu: true
        },
        component: () => import('@/view/login')
    },
    {
        path: '/home',
        name: 'Home',
        component: Main,
        meta: {
            notCache: true
        },
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '首页',
                    icon: 'md-home'
                },
                component: () => import('@/view/home')
            }
        ]
    },
    {
        path: '/goods',
        name: 'Goods',
        meta: {
            title: '商品管理',
            icon: 'md-archive'
        },
        component: Main,
        children: [
            {
                path: '/goods/category',
                name: 'goodsCategory',
                meta: {
                  title: '商品分类'
                },
                component: () => import('@/view/category')
            },
            {
                path: '/goods/list',
                name: 'goodsList',
                meta: {
                  title: '商品列表'
                },
                component: () => import('@/view/goods')
            }
        ]
    },
    {
        path: '/stock',
        name: 'Stock',
        meta: {
            title: '库存管理',
            icon: 'md-filing'
        },
        component: Main,
        children: [
            {
                path: '/stock/list',
                name: 'stockList',
                meta: {
                    title: '库存列表'
                },
                component: () => import('@/view/stock')
            },
            {
                path: '/inventory/list',
                name: 'inventoryList',
                meta: {
                    title: '进货记录'
                },
                component: () => import('@/view/inventory')
            }
        ]
    },
    {
        path: '/order',
        name: 'Order',
        meta: {
            title: '订单管理'
        },
        component: Main,
        children: [
            {
                path: '/order/list',
                name: 'orderList',
                meta: {
                    title: '订单列表',
                    icon: 'ios-list-box'
                },
                component: () => import('@/view/order')
            }
        ]
    },
    {
        path: '/supplier',
        name: 'Supplier',
        meta: {
            title: '供应商管理'
        },
        component: Main,
        children: [
            {
                path: '/supplier/list',
                name: 'supplierList',
                meta: {
                    title: '供应商管理',
                    icon: 'md-people'
                },
                component: () => import('@/view/supplier')
            }
        ]
    }
]
