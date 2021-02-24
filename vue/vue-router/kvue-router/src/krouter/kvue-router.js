let Vue;

class VueRouter {
// 1. 监听事件
    constructor(options){
        console.log('options', options)
        this.options = options
        this.routerMap = {}
        this.options.routes.forEach(route =>{
            this.routerMap[route.path] = route
        })

        Vue.util.defineReactive(this, 'current', '/')
        window.addEventListener('hashchange',this.hashchange.bind(this))
    }
    // Vue.util.defineReactive(this, )
    hashchange(onhashchange){
        const hash = window.location.hash.slice(1)
        this.current = hash

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
            const { current, routerMap } = this.$router;
            console.log(' this.$router',  this.$router)
            const component = routerMap[current].component || null
            return h(component)
        }
    })
}

export default VueRouter