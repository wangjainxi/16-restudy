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
    Object.keys(obj).forEach(key =>{
        defineReactive(obj, key, obj[key])
    })
}

function set(obj, key, val){
    defineReactive(obj, key, val)
}

const obj = {
    name: '111',
    age: 222,
    info: {
        height: 222
    }
}


// 1. 直接属性
// 2. 多个属性
// 3. 子属性是对象（递归）
// 4. 修改子属性对象的值（set observel）
// 5. 新增属性 $set/$delete
observer(obj)
// obj.name
// obj.name = '222'
// obj.age
// obj.info.height
obj.info = {height: 333 }
 console.log(obj.info.height)
set(obj, 'new', 888)
console.log(obj.new)