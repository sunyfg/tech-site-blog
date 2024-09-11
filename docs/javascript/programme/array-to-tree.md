# 扁平数组转换为树形结构

实现一个函数 `arrayToTree`，用于将扁平数组转换为树形结构

**解题思路**：

- 根据数组中对象的 `parentId` 或类似的属性来确定父子关系。
- 创建一个映射（如 `Map` 或对象）来快速查找父节点。
- 遍历数组，为每个元素找到对应的父节点，并将其添加到父节点的子列表中。

```javascript
function arrayToTree(data, parentId = 0) {
  let map = {};
  let result = [];

  data.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  data.forEach((item) => {
    if (item.parentId === parentId) {
      result.push(map[item.id]);
      map[item.id].children = arrayToTree(data, item.id).map(
        (child) => map[child.id]
      );
    }
  });

  return result;
}

// 示例数据
const data = [
  { id: 1, parentId: 0, name: "Root" },
  { id: 2, parentId: 1, name: "Child 1" },
  { id: 3, parentId: 1, name: "Child 2" },
  { id: 4, parentId: 2, name: "Grandchild 1" },
  { id: 5, parentId: 2, name: "Grandchild 2" },
];

const tree = arrayToTree(data);
console.log(tree);
```
