// 防抖
function debounce(fn, delay, immediate = false) {
  let timer = null;

  return function () {
    const args = arguments;

    if (timer) clearTimeout(timer);

    // 立即执行
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) fn.apply(this, args);
    } else {
      // 延迟执行
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}
