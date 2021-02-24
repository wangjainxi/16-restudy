let Vue;

class VueRouter {
// 1. 监听事件
    constructor(options){
        console.log('options', options)
        this.$options = options


        // Vue.util.defineReactive(this, 'current', '/')
        this.current =  window.location.hash.slice(1) ||  '/'
        window.addEventListener('hashchange',this.hashchange.bind(this))
        Vue.util.defineReactive(this, 'matched' , [])
        // match 方法可以递归遍历路由表，获得匹配关系的数组
        this.match()
        // this.routerMap = {}
        // this.options.routes.forEach(route =>{
        //     this.routerMap[route.path] = route
        // })
    }
    match(routes){
        routes  = routes || this.$options.routes
        // 递归遍历
        for(const route of routes){
            // 首页匹配了
            if(route.path === '/' && this.current === '/'){
                this.matched.push(route)
                return
            }

            // /about/info
            if(route.path !== '/' && this.current.indexOf(route.path) != -1){
                if(route.children){
                    this.match(route.children)
                }
                this.matched.push(route)
            }
        }
    }

    // Vue.util.defineReactive(this, )
    hashchange(onhashchange){
        const hash = window.location.hash.slice(1)
        this.current = hash
        this.matched = [] // matched 数组清空，重新匹配
        this.match()
        console.log('hash',hash)
    }
}

VueRouter.install = function(_Vue){
    // 保存构造函数
    Vue = _Vue // 保存一下vue，Vue-router是个独立的包，打包的时候不希望把vue也打包进去
    console.log('aaa Vue', Vue)


    // 1.挂载$router,实现this可以访问
    // 2.实现两个全局组件
    Vue.mixin({
        beforeCreate(){
            // 全局混入，在将来实例化的时候才执行
            // 此时，vue-router实例已经存在了
            // 在生命周期里面，this已经指的是vue组件实例
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    Vue.component('router-link',{
        props: {
            to: {
                type: String,
                default: ''
            }
        },
        render(h){
           return h('a', {
                attrs: {
                    href: '#' + this.to
                },
            },
            this.$slots.default
            )
        }
    })
    Vue.component('router-view',{

        render(h){
            // 1.标记当前router-view 的深度
            // 2.路由匹配时，获取代表深度层级的matched数组
            this.$vnode.data.routerView = true
            let depth = 0
            let parent = this.$parent
            while(parent){
                const vnodeData = parent.$vnode && parent.$vnode.data
                if(vnodeData){
                    if(vnodeData.routerView){
                        // 说明是当前的parent一个router-view
                        depth ++
                    }
                }
                parent = parent.$parent
            }
            // const { current, routerMap } = this.$router;
            // console.log(' this.$router',  this.$router)
            // const component = routerMap[current].component || null
            let component = null
            const route = this.$router.matched[depth]
            if(route){
                component = route.component
            }
            return h(component)
        }
    })
}

export default VueRouter