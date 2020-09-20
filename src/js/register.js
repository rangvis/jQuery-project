$(".btn-wrapper").on('click', function(evt) {
    console.log(1)
    let e = evt || event;
    e.preventDefault();
    // 获取元素的数据;
    let email_value = $("#inputEmail")[0].value;
    let password_value = $("#inputPassword")[0].value;
    console.log(email_value, password_value);
    // 发送POST请求接受后端响应
    $.ajax({
        type: "POST",
        url: 'http://47.112.249.18/smartisan/register.php',
        dataType: 'json',
        data: {
            email: email_value,
            password: password_value
        },
        success: function(res) {
            console.log(res)
            if (res.type === 'success') {

                alert('注册成功')
                location.href = './login.html'
            } else {
                alert('请输入正确的格式')
            }

            if (res.msg === '用户名重名') {
                alert('用户名重名')
            }
        }
    })
})