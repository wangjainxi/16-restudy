class A {
    constructor(){
        console.log(new.target.name)
        this.a = 2
    }
    testA(){

    }
}
A.prototype.a = 3

class B extends A {
    constructor(){
        super()
        this.test()
        console.log(this.a)
    }

    test(){
        console.log('B super', super.a)
    }
    // testB2(){
    //     console.log('B2 super', super().testA)
    // }
}
new A()
new B()