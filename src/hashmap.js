// 实现hashmap
class HashMap {
    constructor(size) {
        this.table = new Array(size);
        this.size = 0;
    }

    /**
     * 哈希函数
     * @param {*} value 
     */
    hashConversion(value) {
        let keyCode = 0;
        for (let item of value) {
            keyCode += item.charCodeAt(0);
        }
        // 哈希函数
        let key = keyCode % this.table.length;
        return key;
    }

    /**
     * 
     * @param {*} value 
     */
    set(value) {
        let key = this.hashConversion(value);
        this.size++;
        this.table[key] = value;
    }

    /**
     * 
     * @param {*} value 
     */
    get(value) {
        let key = this.hashConversion(value);
        return this.table[key];
    }

    /**
     * 
     * @param {*} value 
     */
    delete(value) {
        let key = this.hashConversion(value);
        if (this.table[key] !== undefined) {
            this.table[key] = undefined;
            this.size--;
            return true;
        } else {
            return false;
        }
    }

    has(value) {
        let key = this.hashConversion(value);
        return this.table[key] !== undefined ? true : false;
    }

    getAllData() {
        let result = [];
        for (let item of this.table) {
            if (item !== undefined) result.push(item);
        }
        return result;
    }
}

let hashTable = new HashMap(10);
hashTable.set('aa');
hashTable.set('bb');
console.log(hashTable.size); // 2
console.log(hashTable.getAllData()); // [ 'aa', 'bb' ]
