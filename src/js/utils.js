/**
 * formateUrl : 序列化 GET请求的 URL;
 *   
 * formateUrl( url路径 | string , data 数据 | object );
 * 
 * @return url | string ;
 * */

function formateUrl(url, data) {
    var start = true;
    for (var key in data) {
        url += (start ? "?" : "&") + key + "=" + data[key];
        start = false;
    }
    return url;
}
/**
 * formateUrl : 序列化 GET请求的 URL;
 *   
 * formateUrl( [ url | string ] , data | object );
 *   
 * @return 
 * 
 * 1. key=value;
 * 2. url?key=value;
 * 
 * */

function formate(url, data) {
    var type = "GET";
    if (typeof url === "object" && !(url instanceof Array)) {
        data = url;
        type = "POST";
        url = "";
    }
    var start = true;
    for (var key in data) {
        if (type === "GET") {
            url += (start ? "?" : "&") + key + "=" + data[key];
        } else {
            url += (start ? "" : "&") + key + "=" + data[key];
        }
        start = false;
    }
    return url;
}
/**
 * ajax : 发送ajax请求
 *   
 * ajax( method | string  , url | string  , callback | function , data | object );
 *   
 * @return xhr 
 * 
 * */
function ajax(options) {
    return new Promise(function(resolve, reject) {
        // 参数优化为了啥?
        // 增加默认参数;
        // 对象合并;
        options = Object.assign({
            method: "GET",
            callback: function() {},
            url: "",
            data: {},
            // jsonp形式的回调函数名
            jsonpcallback: "callback"
        }, options);

        if (options.method === "jsonp") {
            // 请求发送;
            var script = document.createElement("script");
            script.src = formate(options.url, options.data);
            document.body.appendChild(script);
            window[options.jsonpcallback] = function(data) {
                options.callback(data);
                resolve(data);
            }
            script.onload = function() {
                script.remove();
            }
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open(options.method, options.method.toUpperCase() === "GET" ? formate(options.url, options.data) : options.url);
            if (options.method.toUpperCase() === "POST") {
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            }
            xhr.send(options.method.toUpperCase() === "POST" ? formate(options.data) : null);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
                    options.callback(xhr.responseText)
                    resolve(xhr.responseText)
                }
            }
        }
    })
}

function $(selector) {
    return document.querySelector(selector);
}

function setCookie(name, value, expires) {
    // 核心 : 操作字符串 !;
    var cookie_str = name + "=" + value;
    //判定是否有必要增加过期时间;
    if (typeof expires === "number") {
        var d = new Date();
        d.setDate(d.getDate() + expires);
        cookie_str += ";expires=" + d;
    }
    // 把拼接好的字符串设置到 document.cookie 上;
    // console.log(cookie_str);
    document.cookie = cookie_str;
}
// 获取cookie;
function getCookie(name) {
    // 分割;
    // 一定要以分号加空格的间隔进行分割;
    var cookie_arr = document.cookie.split("; ");
    for (var i = 0; i < cookie_arr.length; i++) {
        // 每一条cookie => key=value;
        var cookie_item = cookie_arr[i]
            // console.log(cookie_item);
        cookie_item = cookie_item.split("=");
        if (cookie_item[0] == name) {
            return cookie_item[1];
        }
    }
    return "";
}
// 删除 cookie ;
function removeCookie(name) {
    setCookie(name, "", -1);
}