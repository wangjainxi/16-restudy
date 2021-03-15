class Point {

}

class ColorPoint extends Point{
    constructor(x, y, color){
        super(x, y)
        this.color = color
    }

    toString(){
        // console.log('super', super())
        return this.color + ' ' + super.toString()
    }
}

let cp = new ColorPoint()
