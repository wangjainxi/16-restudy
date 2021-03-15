class A {
    constructor(){
        this.x = 1
    }
    print(){
        console.log('A x', this.x)
    }
}
A.prototype.x = 3

class B extends A {
    constructor(){
        super()
        this.x = 2
        console.log('super3', super.valueOf())
    }
    print(){
        // console.log('x', this.x)
        console.log('x', super.x)
    }
}

let b = new B()
b.print()