/**
 * es6继承
 * 
 * class 相当于es5中构造函数
 * class中定义方法时，全部定义在class的protopyte属性中
 * class中只能定义方法，不能定义对象、变量等
 * class和方法内默认都是严格模式
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

/**
 * 继承父类
 */
class ColorPoint extends Point {
    constructor(x, y, color) {
        // 继承父类的属性
        super(x, y);
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 继承父类的toString()方法
    }
}

const colorPoint = new ColorPoint(1, 2, 'red');
console.log(colorPoint.toString());
