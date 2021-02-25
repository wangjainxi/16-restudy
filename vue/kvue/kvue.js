// 代理data中的数据
function proxy(vm){
    console.log('vm.$data', vm.$data)
    Object.keys(vm.$data).forEach(key =>{
        Object.defineProperty(vm, key, {
            get(){
                // 这样的话，在页面中访问data中的值，可以直接转发vm.$data中的值
                console.log('vm.$data[key]', vm.$data[key])
                return vm.$data[key]
            },
            set(v){
                console.log('vm.$data[key] set', vm.$data[key])
                vm.$data[key] = v
            }
        })
    })
}



// 响应式操作
class KVue {
    constructor(options) {
        // 保存选项
        // 响应化处理
        this.$options = options
        this.$data = options.data
        console.log('aa', this)
        observer(this.$data)
        proxy(this)
        // 编译器
        new Compiler('#app', this)
    }
}


function defineReactive(obj, key, val){
    // 闭包，val函数作用域内的一个变量，
    // 用get方式将这个变量暴露出去让外界可以访问
    // 这时在内存中就会保存下来这个变量
    observer(val)
    Object.defineProperty(obj, key, {
        get(){
            console.log('get key', key)
            return val
        },
        set(newVal){
            if(newVal !== val){
                observer(newVal)
                val = newVal
                // update 更新函数
                update()
            }
        }
    })
}

function update(){

}

function observer(obj){
    if(typeof obj !== 'object' || obj === null){
        return
    }
    // 创建observer实例，以后出现一个对象，就会有一个Observer实例
    // __ob__
    new Observer(obj)

}


// 数据响应化
class Observer{
    constructor(value){
        this.value = value
        this.walk(value)
    }

    // 遍历对象做响应式
    walk(obj){
        Object.keys(obj).forEach(key =>{
            defineReactive(obj, key, obj[key])
        })
    }
}

// compiler : 解析模板，收集依赖， 并和之前拦截的属性关联起来
// new Compiler('#app', vm) 找到宿主元素,kvue 实例

class Compiler{
    constructor(el, vm){
        this.$el = document.querySelector(el)
        this.$vm = vm
        this.compile(this.$el )
    }

    compile(el){
        // 递归遍历这棵树
        // childNodes 能拿到所有节点
        el.childNodes.forEach(node =>{
            if(node.nodeType === 1){
                console.log('编译元素', node.nodeName)
                this.compileElement(node)
            } else if (this.isInter(node)) {
                console.log('编译文本', node.textContent)
                this.compileText(node)
            }
            if(node.childNodes){
                this.compile(node)
            }
        })
    }

    isInter(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    // 编译元素
    compileElement(node){
        // 处理元素上面的属性，典型的是 k- @ 开头
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
            // attr: {name: 'k-text', value: counter}
            console.log('attrs', attrs)
            const attrName = attr.name
            const exp = attr.value
            if(attrName.indexOf('k-') === 0){
                // 获取指令名称 text
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, exp)
            }
            // 处理事件
        })
    }


    // k-text
    text(node, exp){
        // node.textContent = this.$vm[exp]
        update(node, exp, 'text')
    }

    // k-html
    html(node, exp){
        node.innerHtml = this.$vm[exp]
    }

    // 凡是有动态值的时候，都得执行一次update更新函数，
    // 在update更新函数里面除了初始化，还要把更新的watcher去创建
    // 要做的指令名称
    update(node, exp, dir){
        // 初始化
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])
        // 更新
    }

    // k-text
    textUpdater(node, val) {
        node.textContent = val
    }

    // 解析绑定表达式
    compileText(node){
        // 获取正则表达式，从vm里面拿出来做替换
        node.textContent = this.$vm[RegExp.$1]
        // console.log()
    }
}


// 管理某一个依赖，未来执行更新
class Watcher{
    constructor(vm, key, updateFn){
        this.updateFn = updateFn
        this.vm = vm
        this.key = key
    }

    // 未来会被dep调用

    update(){
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

class Dep{

}