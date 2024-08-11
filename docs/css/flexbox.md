# Flexbox

CSS3 的 Flexbox（Flexible Box Layout）是一种用于在容器中排列子元素的布局模式。它旨在提供一种更加高效的方式来布局、对齐和分配容器中项目的空间，即使它们的大小未知或是动态变化的。Flexbox 布局特别适合于一维布局，无论是水平还是垂直方向，都能提供极大的灵活性和控制力。

## Flexbox 的基本概念

1. **Flex Container（弹性容器）**：

   - 弹性容器是应用了 `display: flex;` 或 `display: inline-flex;` 属性的元素。
   - 它成为其子元素的直接父容器，并控制这些子元素（称为 flex 项目）的布局。

2. **Flex Items（弹性项目）**：
   - 弹性容器中的直接子元素自动成为弹性项目。
   - 这些项目可以使用 Flexbox 提供的各种属性来进行布局和对齐。

## Flexbox 的主要属性

### 弹性容器属性

- **flex-direction**：定义主轴的方向（即项目的排列方向），可以是 `row`（默认值，水平方向）、`row-reverse`、`column`（垂直方向）、或 `column-reverse`。
- **flex-wrap**：定义项目是否应该换行，可以是 `nowrap`（默认值，不换行）、`wrap`（换行）、或 `wrap-reverse`（反向换行）。
- **flex-flow**：`flex-direction` 和 `flex-wrap` 的简写形式。
- **justify-content**：定义项目在主轴上的对齐方式，如 `flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`space-evenly`。
- **align-items**：定义项目在交叉轴上的对齐方式，与 `justify-content` 类似，但方向垂直。
- **align-content**：当有多行时，定义行在交叉轴上的对齐方式。

### 弹性项目属性

- **flex-grow**：定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
- **flex-shrink**：定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
- **flex-basis**：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 `auto`，即项目的本来大小。
- **flex**：`flex-grow`、`flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。
- **align-self**：允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。

## Flexbox 的优势

1. **简化布局**：Flexbox 使得布局变得更加简单和直观，特别是在处理复杂布局时。
2. **响应式布局**：Flexbox 布局能够很好地适应不同屏幕尺寸和分辨率，实现响应式设计。
3. **对齐控制**：Flexbox 提供了丰富的对齐选项，可以轻松地实现水平和垂直居中，以及沿主轴和交叉轴的对齐。
4. **灵活性**：Flexbox 布局非常灵活，可以动态地调整项目的大小和位置，以适应不同的布局需求。

## 示例

```css
.container {
  display: flex;
  flex-direction: row; /* 水平方向排列 */
  justify-content: space-between; /* 项目之间平均分布 */
  align-items: center; /* 项目在交叉轴上居中对齐 */
}

.item {
  flex-grow: 1; /* 如果有多余空间，则项目放大 */
  margin: 10px; /* 项目之间的间距 */
}
```

在这个示例中，`.container` 是一个弹性容器，其内的 `.item` 元素是弹性项目。通过设置 `flex-direction`、`justify-content` 和 `align-items` 属性，我们控制了项目的排列方向、主轴上的对齐方式和交叉轴上的对齐方式。同时，通过 `flex-grow` 属性，我们允许项目在有多余空间时放大。
