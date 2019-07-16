/* main pages */
const Layout = resolve => { require(['@/views/layout/Layout'], resolve) }

const Template = resolve => { require(['@/views/layout/template'], resolve) }

// 合同管理
const Contract = resolve => { require(['@/views/contract/index'], resolve) }
// const Manager = resolve => { require(['@/views/contract/newIndex'], resolve) }
const Create = resolve => { require(['@/views/contract/create'], resolve) }
// const Add = resolve => { require(['@/views/contract/newCreate'], resolve) }


export const contract = [
    {
        path: '/soa',
        component: Layout,
        redirect: { name:'Template' },
        alwaysShow:true,
        meta: { title: '康越合同管理', icon: 'table',permission:{ pCheck:1,pId:'2000001'}},
        children: [
            {
                path:'/soa/',
                component:Template,
                redirect: { name:'Contract' },
                meta: { title: '康越共享空间合同', icon: '', noCache: true, affix: false,permission:{ pCheck:1,pId:'2000002' } },
                children: [
                    {
                        path:'contract',
                        name:'Contract',
                        hidden:true,
                        component:Contract,
                        meta: { title: '合同列表', icon: '', noCache: true, affix: false }
                    },
                    {
                        path:'create',
                        name:'Create',
                        hidden:true,
                        component:Create,
                        meta: { title: '创建合同', icon: '', noCache: true, affix: false }
                    }
                ]
            }

        ]
    }
]

export default contract
