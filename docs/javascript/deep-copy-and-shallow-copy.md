# 深拷贝和浅拷贝

在 JavaScript 中，理解深拷贝（Deep Copy）和浅拷贝（Shallow Copy）的区别是非常重要的，尤其是在处理复杂数据类型（如对象、数组等）时。这两种拷贝方式在处理引用类型数据时表现出不同的行为。

## 浅拷贝（Shallow Copy）

浅拷贝只复制对象的第一层属性，如果对象的属性值是基本类型（如数字、字符串、布尔值），则直接复制该值给新对象；如果属性值是引用类型（如对象、数组），则复制的是内存地址，即新对象和原对象共享这个引用类型的值。因此，如果原对象的引用类型属性被修改，那么浅拷贝得到的新对象的相应属性也会受到影响。

### 实现浅拷贝的方法

1. **Object.assign()**

   ```javascript
   let original = { a: 1, b: { c: 2 } };
   let copy = Object.assign({}, original);
   copy.b.c = 3; // 修改了原对象original的b.c
   console.log(original.b.c); // 输出: 3
   ```

2. **扩展运算符（...）**
   ```javascript
   let original = { a: 1, b: { c: 2 } };
   let copy = { ...original };
   copy.b.c = 3; // 修改了原对象original的b.c
   console.log(original.b.c); // 输出: 3
   ```

## 深拷贝（Deep Copy）

深拷贝会递归复制对象及其所有子对象，直到所有引用的对象都被复制了一份新的对象。这样，新对象和原对象完全独立，修改新对象不会影响到原对象。

### 实现深拷贝的方法

1. **JSON.parse(JSON.stringify())**
   这是最简单的一种深拷贝方法，但它有一些限制，比如无法复制函数、undefined、Symbol、循环引用等。

   ```javascript
   let original = { a: 1, b: { c: 2 } };
   let copy = JSON.parse(JSON.stringify(original));
   copy.b.c = 3;
   console.log(original.b.c); // 输出: 2
   ```

2. **手动实现深拷贝**
   通过递归函数手动实现深拷贝可以处理更多的数据类型和特殊情况，如循环引用等。

   ```javascript
   function deepClone(obj, hash = new WeakMap()) {
     if (obj === null) return null; // null 的情况
     if (obj instanceof Date) return new Date(obj); // 日期对象直接返回一个新的日期对象
     if (obj instanceof RegExp) return new RegExp(obj); // 正则对象直接返回一个新的正则对象
     // 如果循环引用了就用 weakMap 来解决
     if (hash.has(obj)) return hash.get(obj);

     let allDesc = Object.getOwnPropertyDescriptors(obj);
     let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
     hash.set(obj, cloneObj);

     for (let key of Reflect.ownKeys(obj)) {
       cloneObj[key] =
         typeof obj[key] === "object" && obj[key] !== null
           ? deepClone(obj[key], hash)
           : obj[key];
     }
     return cloneObj;
   }
   ```

## 总结

- **浅拷贝**只复制对象的第一层属性，如果属性是引用类型，则只复制引用地址，新旧对象共享这部分数据。
- **深拷贝**会递归复制对象及其所有子对象，新旧对象完全独立，修改新对象不会影响到原对象。
- 在选择拷贝方式时，需要根据实际需求和数据类型来决定使用哪种方式。
