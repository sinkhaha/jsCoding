/**
 * 原型式继承
 * @param {*} obj 
 */
function create(obj) {
    function F(){};
    F.prototype = obj;
    return new F();
}

var person = {
    name: 'Nicholas',
    friends: ['Lee', 'Luvy']
};
var anotherPerson = create(person);

anotherPerson.name; // Nicholas
anotherPerson.friends.push('Rob');
person.friends; // ['Lee', 'Luvy', 'Rob']