let Vue
class Store {
    constructor(options){
        console.log('store options', options)
        this._vm = new Vue({
            data: {
                $$state: options.state
            }
        })

        this._mutations = options.mutations
        this._actions = options.actions
    }

    get state(){
        console.log('this._vm', this._vm)
        return this._vm._data.$$state
    }

    set state(){
        console.error('please use replaceState to reset state')
    }

    commit(type, payload){
        // 执行mutation
        console.log('commit type', type)
        console.log('commit paload', paload)
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