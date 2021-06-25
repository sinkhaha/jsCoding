
/**
 * 可以递归的类型
 */
const canTraverse = {
    '[object Map]': true,
    '[object Set]': true,
    '[object Array]': true,
    '[object Object]': true,
    '[object Arguments]': true,
};
const mapTag = '[object Map]';
const setTag = '[object Set]';
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

/**
 * 获取类型
 * @param {*} obj 
 */
const getType = obj => Object.prototype.toString.call(obj);

/**
 * 判断是否是对象
 * @param {*} target 
 */
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

/**
 * 处理正则对象
 */
const handleRegExp = (target) => {
    const { source, flags } = target;
    return new target.constructor(source, flags);
}

/**
 * 处理方法对象
 * @param {*} func 
 */
const handleFunc = (func) => {
    // 箭头函数直接返回自身
    if (!func.prototype) {
        return func;
    }

    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    // 分别匹配 函数参数 和 函数体
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (!body) {
        return null;
    }

    if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
    } else {
        return new Function(body[0]);
    }
}

/**
 * 处理不可以递归的对象
 * @param {*} target 
 * @param {*} tag 
 */
const handleNotTraverse = (target, tag) => {
    const Ctor = target.constructor;
    switch (tag) {
        case boolTag:
            return new Object(Boolean.prototype.valueOf.call(target));
        case numberTag:
            return new Object(Number.prototype.valueOf.call(target));
        case stringTag:
            return new Object(String.prototype.valueOf.call(target));
        case symbolTag:
            return new Object(Symbol.prototype.valueOf.call(target));
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag:
            return handleRegExp(target);
        case funcTag:
            return handleFunc(target);
        default:
            return new Ctor(target);
    }
}

/**======================================================= */
/**
 * 完美的深度克隆
 * @param {*} target 
 * @param {*} map 
 */
const deepClone = (target, map = new WeakMap()) => {
    if (!isObject(target)) {
        return target;
    }

    let type = getType(target);
    let cloneTarget;
    if (!canTraverse[type]) {
        // 处理不能遍历的对象
        return handleNotTraverse(target, type);
    } else {
        // 重点：可以保证对象的原型不丢失
        let ctor = target.constructor;
        cloneTarget = new ctor();
    }

    if (map.get(target)) {
        return target;
    }

    map.set(target, true);

    // 处理Map
    if (type === mapTag) {
        target.forEach((item, key) => {
            cloneTarget.set(deepClone(key, map), deepClone(item, map));
        });
    }

    // 处理Set
    if (type === setTag) {
        target.forEach(item => {
            cloneTarget.add(deepClone(item, map));
        });
    }

    // 处理数组和对象
    for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop], map);
        }
    }

    return cloneTarget;
}
