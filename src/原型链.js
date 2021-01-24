Function.prototype.a = () => console.log(1); 
Object.prototype.b = () => console.log(2);
function C() {} 
const c = new C();
c.a(); // 报错
c.b(); // 输出2

