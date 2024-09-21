async function fn1() {
  console.log(1); // 同步代码，立即执行
  await fn2(); // 阻塞下面的代码，加入微任务队列
  console.log(2); // await 后面的代码会等待 fn2 执行完成后再执行
}

async function fn2() {
  console.log("fn2"); // 同步代码，立即执行
}

fn1();
console.log(3);
