var twice = {
    applay(target, ctx, args){
        console.log('arguments',arguments)
        return Reflect.apply(...arguments)
    }
}

function sum(left, right){
    return left + right
}

var proxy = new Proxy(sum, twice)
 console.log('proxy(1,2)', proxy(1,2))
 const b = proxy.call(null, 5, 6)
 console.log('b', b)
 const c = proxy.apply(null, [7, 8])
 console.log('c', c)
