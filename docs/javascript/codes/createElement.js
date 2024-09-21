function createElement(type, config, ...children) {
  if (config) {
    delete config.__self;
    delete config.__source;
  }
  // ! key ref
  const props = {
    ...config,
    children: children.map((child) =>
      typeof child === "object" ? child : createTextNode(child)
    ),
  };
  return {
    type,
    props,
  };
}
const TEXT = "TEXT";
function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text,
    },
  };
}

// 测试
const element = createElement(
  "div",
  {
    id: "container",
    style: {
      color: "red",
    },
  },
  createElement("h1", {}, "hello world"),
  createElement("h2", {}, "hello world"),
  "hello world"
);

console.log(JSON.stringify(element, null, 2));

export default {
  createElement,
};
