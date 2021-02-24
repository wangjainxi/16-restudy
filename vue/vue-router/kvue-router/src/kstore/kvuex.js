let Vue
class Store {
    constructor(options){
        console.log('store options', options)

        this._mutations = options.mutations
        this._actions = options.actions
        this._wrappedGetters = options.getters

         // 1.遍历用户传入的getter所有的key,动态的给getter赋值，其值应该是函数的执行结果
        // 2.确保结果是响应式的 Object.defineReactive(this,getters, key, {get() { }  })
        // 3.缓存结果，可以利用computed

        // 保存this到store 实例
        const store = this
        // this.commit = this.commit.bind(store)
        const {commit, action} = store
        this.commit = function boundCommit(type, payload){
           return commit.call(store, type, payload)
        }

        this.action = function boundAction(type, payload){
            // 保证内部commit的this指向的正确性
           return action.call(store, type, payload)
        }


        // 定义computed选项
        const computed = {}

        this.getters = {}

        // {doubleCounter(state){} }
        Object.keys(this._wrappedGetters).forEach(key => {
            // 获取用户定义的getter
            const fn = store._wrappedGetters[key]
            // 转换为computed 可以使用的无参函数
            computed[key] = function(){
                return fn(store.state)
            }
            // 为getter 定义只读属性
            Object.defineProperty(store.getters, key, {
                get: () =>{
                     return store._vm[key]
                }
            })
        })

        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed // 这样通过this._vm 可以访问到相关的key和方法
        })



    }

    get state(){
        console.log('this._vm', this._vm)
        return this._vm._data.$$state
    }

    set state(v){
        console.error('please use replaceState to reset state')
    }


    commit(type, payload){
        // 执行mutation
        console.log('commit type', type)
        console.log('commit paload', payload)
        // 1. 获取mutations
        const entry = this._mutations[type]
        console.log('commit entry', entry)
        if(!entry){
            console.log('mutations 不存在')
            return
        }
        entry(this.state, payload)
    }

    dispatch(type, payload){
        console.log('dispatch type', type)
        console.log('dispatch payload', payload)
        const entry = this._actions[type]
        console.log('dispatch entry', entry)
        if(!entry){
            console.log('action 不存在')
            return
        }
        return entry(this, payload)
    }

}

function install(_Vue){
    Vue = _Vue
    Vue.mixin({
        beforeCreate(){
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {Store, install}