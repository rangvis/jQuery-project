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
        url: 'http://47.112.249.18/smartisan/login.php',
        dataType: 'json',
        data: {
            email: email_value,
            password: password_value
        },
        success: function(res) {
            console.log(res)
            if (res.type === 'success') {
                document.cookie = "email=" + email_value;
                location.href = './index.html'
            } else {
                alert('账户密码错误')
            }
        }
    })
})

$('.other-more').on('click', function() {
    location.href = `./register.html`
})