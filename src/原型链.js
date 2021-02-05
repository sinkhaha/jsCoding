Function.prototype.a = () => console.log(1); 
Object.prototype.b = () => console.log(2);

function C() {

}

const c = new C();
c.a(); // 报错，因为C方法里没有a,会去C.prototype上找，找不到会去Object.prototype找
c.b(); // 输出2


