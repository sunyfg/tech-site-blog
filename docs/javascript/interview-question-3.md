# 面试题 2

## 题目

数组转树形结构实现

## 解答

在 JavaScript 面试中，将数组转换为树形结构是一个常见的问题，尤其是在处理具有层级关系的数据时，如菜单项、组织架构等。这里提供一个基本的实现思路和代码示例，假设我们有一个包含 id 和 parentId 的数组，我们需要将其转换为一个树形结构。

### 示例数组

假设我们有以下数组，表示一个简单的组织架构：

```javascript
const items = [
  { id: 1, parentId: null, name: "CEO" },
  { id: 2, parentId: 1, name: "CTO" },
  { id: 3, parentId: 1, name: "CFO" },
  { id: 4, parentId: 2, name: "Frontend Team Lead" },
  { id: 5, parentId: 2, name: "Backend Team Lead" },
  { id: 6, parentId: 4, name: "Frontend Developer" },
  { id: 7, parentId: 4, name: "Frontend Developer 2" },
  { id: 8, parentId: 5, name: "Backend Developer" },
];
```

### 实现思路

1. 遍历数组，为每个元素创建一个以 id 为键，值为元素的映射（Map 或对象）。
2. 再次遍历数组，为每个元素找到其父节点（通过 parentId 查找），并将其添加到父节点的 children 数组中。
3. 如果某个元素的 parentId 为 null，则该元素为根节点。

### 示例代码

```javascript
function buildTree(items) {
  // 创建id到元素的映射
  const idMap = {};
  items.forEach((item) => {
    idMap[item.id] = { ...item, children: [] };
  });

  // 构建树形结构
  const tree = [];
  items.forEach((item) => {
    // 查找父节点
    const parentId = item.parentId;
    if (parentId === null) {
      // 没有parentId的项是根节点
      tree.push(idMap[item.id]);
    } else {
      // 否则，将其添加到父节点的children数组中
      if (!idMap[parentId].children) {
        idMap[parentId].children = [];
      }
      idMap[parentId].children.push(idMap[item.id]);
    }
  });

  return tree;
}

// 使用示例
const tree = buildTree(items);
console.log(tree);
```

### 输出结果

输出结果将是一个包含根节点的数组，每个节点可能有一个或多个子节点（children 数组）。

这种实现方法简单且高效，适用于大多数需要将数组转换为树形结构的情况。注意，在实际应用中，你可能需要根据具体的数据结构和需求进行调整。
