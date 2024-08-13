# 查找一个 json 树结构的某个节点，并输出从根节点到该节点的路径

在 JavaScript 中，查找一个 JSON 树结构中的某个节点并输出从根节点到该节点的路径，可以通过递归函数来实现。这个函数将遍历树结构，当找到匹配的节点时，将构建并返回从根到该节点的路径。

以下是一个示例函数，它接受 JSON 对象（树的根节点）、要查找的键名、一个可选的当前路径数组（用于递归调用），并返回从根到目标节点的路径数组（如果找到的话）：

```javascript
function findPathInJson(obj, targetKey, currentValue, path = []) {
  // 如果当前对象是数组，则遍历数组元素
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      // 使用索引作为“键”
      const result = findPathInJson(obj[i], targetKey, currentValue, [
        ...path,
        i,
      ]);
      if (result) return result;
    }
  }
  // 如果当前对象是对象，则遍历对象的键值对
  else if (obj !== null && typeof obj === "object") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 如果当前键是我们正在查找的键，并且值也匹配（如果提供了值）
        if (
          key === targetKey &&
          (currentValue === undefined || obj[key] === currentValue)
        ) {
          return [...path, key]; // 返回路径
        }
        // 否则，递归查找
        const result = findPathInJson(obj[key], targetKey, currentValue, [
          ...path,
          key,
        ]);
        if (result) return result;
      }
    }
  } else if (obj === currentValue) {
    return path; // 返回路径
  }
  // 如果没有找到，返回null
  return null;
}

// 示例JSON树
const jsonTree = {
  name: "John",
  age: 30,
  children: [
    { name: "Jane", age: 25, hobbies: ["reading", "swimming"] },
    {
      name: "Doe",
      age: 28,
      address: { city: "New York", street: "123 Elm St" },
    },
  ],
};

// 查找节点
const path = findPathInJson(jsonTree, "city", "New York");
console.log(path); // 输出: ['children', 1, 'address', 'city']

// 如果你只想通过键名查找，不关心值，可以省略currentValue参数
const pathByNameOnly = findPathInJson(jsonTree, "name");
// 注意：这将返回第一个找到的"name"键的路径，即['name']
// 如果需要找到所有匹配的路径，则需要对函数进行更复杂的修改以收集所有路径
```

请注意，上面的函数假设当你指定了`currentValue`时，你需要找到同时匹配`targetKey`和`currentValue`的节点。如果你只想通过键名查找节点，而不关心其值，你可以简单地调用函数时省略`currentValue`参数。

此外，由于 JSON 对象中的键是唯一的（在同一层级中），这个函数在找到第一个匹配的节点时就会停止搜索并返回路径。如果你需要找到所有匹配的路径，你需要对函数进行更复杂的修改，以便在找到匹配项时不是立即返回，而是将它们收集起来，并在遍历完成后返回这些路径的列表。
