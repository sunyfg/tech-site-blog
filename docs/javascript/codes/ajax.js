function ajax(options) {
  var xhr = new XMLHttpRequest();

  // 初始化参数
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  let params = options.data || null;

  // 拼接参数
  if (options.type == "GET" && params) {
    let arr = [];
    for (let key in params) {
      arr.push(key + "=" + params[key]);
    }
    params = arr.join("&");
  } else {
    params = JSON.stringify(params);
  }

  // 监听状态变化
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = xhr.responseText;
      if (options.dataType == "json") {
        response = JSON.parse(response);
      }
      options.success && options.success(response);
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      options.fail && options.fail(xhr.status);
    }
  };

  // 发送请求
  if (options.type == "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("POST", options.url, true);
    xhr.send(params);
  }
}
