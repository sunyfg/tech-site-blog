# React hooks 模拟 componentWillMount

```javascript
// React hooks 模拟 componentWillMount
const useComponentWillMount = (cb) => {
  const willMount = useRef(true);
  if (willMount.current) cb();
  willMount.current = false;
};

// React 组件
const MyComponent = () => {
  useComponentWillMount(() => {
    console.log("Component will mount");
  });

  useEffect(() => {
    console.log("Component did mount");
  }, []);

  return <div>My Component</div>;
};
```
