function defineReactive(target, key, val){
        Object.defineProperty(target, key, {
            get () {
                console.log('get key :', key)
                return val
            },
            set (newVal){
                if(newVal !== val){
                    console.log('set newVal',key, newVal)
                    val = newVal
                }
            }
        })

}
const obj = {}
defineReactive(obj, 'foo', 'foo')
obj.foo
obj.foo = '1111'