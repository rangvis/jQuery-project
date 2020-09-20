//商品列表渲染数据
function render() {
    //获取localstorage里面所有数据
    var html = ''
    for (var i = 0; i < localStorage.length; i++) {
        // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))))
        var cart_data = JSON.parse(localStorage.getItem(localStorage.key(i)))
        if (cart_data === null) {
            continue
        }
        //根据localstorage渲染数据
        html += `<div class="cart-item">
    <div class="choice-btn single-btn" i="true"></div>

    <div class="item-img">
        <img src=${cart_data.shop_info.ali_image ? cart_data.shop_info.ali_image : cart_data.sku_info[0].ali_image}
            alt="">
    </div>

    <div class="item-name">
        <h2>${cart_data.shop_info.title ? cart_data.shop_info.title : cart_data.sku_info[0].title}</h2>
        <h3>${cart_data.product_info.category_id_cn}</h3>
    </div>

    <div class="opertion sel">
        <div class="delete-btn" key=${localStorage.key(i)}>

        </div>
    </div>

    <div class="subtotal sel">
        <i>￥</i>
        <span>${cart_data.price * cart_data.count}</span>
    </div>

    <article class="num-sel">

        <div class="num-btn">
            <div class="jian-btn" key=${localStorage.key(i)}></div>
            <i class="num">${cart_data.count}</i>
            <div class="add-btn" key=${localStorage.key(i)}></div>
        </div>
    </article>

    <div class="price">
        <i>¥</i>
        <span>${cart_data.price}</span>
    </div>
</div>`

    }
    $('.cart-group').html(html)
}
render()


// 结算渲染
function render2() {
    var html3 = ''
    if (localStorage.length === 0) {
        html3 = `<div class="empty-label">
        <h3>您的购物车中还没有商品</h3>
        <a href="./login.html" class="login-btn">登录</a>
                <a href="./index.html" class="index-btn">现在选购</a>
        </div>`
    } else {
        html3 = `   <div class="all-choice">
        <div class="choice-btn all-btn" i="true"></div>
        <span >全选</span>
        <i class="del-choiced">删除选中的商品</i>
        </div>

        <div class="shop-box">
        <div class="shop-num">
            <h4>
                已选择
                <i>1</i>
                件商品
            </h4>
            <h5>
                共计
                <i>1</i>
                件商品
            </h5>
        </div>

        <div class="shop-price">
            <h4>
                应付总额：
                <span>￥</span>
                <i>199.00</i>
            </h4>
        </div>
        </div>

        <div class="now-buy">
        现在结算
        </div>`
    }

    $('.cart-buttom').html(html3)

    rendermoney()


}
render2()


//按钮的操作

var page_cart = document.querySelector('.page-cart')
var num = document.querySelector('.num')


page_cart.addEventListener('click', function(e) {

    // 加按钮
    if (e.target.className === 'add-btn') {

        var data = JSON.parse(localStorage.getItem(e.target.getAttribute('key')))

        data.count++

            localStorage.setItem(e.target.getAttribute('key'), JSON.stringify(data));

        e.target.previousElementSibling.innerHTML = data.count

        rendermoney()
    }


    // 减按钮
    if (e.target.className === 'jian-btn') {
        var data = JSON.parse(localStorage.getItem(e.target.getAttribute('key')))

        data.count--
            // console.log(data.count)
            // console.log(JSON.parse(localStorage.getItem(e.target.getAttribute('key'))))

            localStorage.setItem(e.target.getAttribute('key'), JSON.stringify(data));

        e.target.nextElementSibling.innerHTML = data.count
        if (data.count < 2) {
            e.target.nextElementSibling.innerHTML = 1
            data.count = 1
            e.target.style.cursor = 'not-allowed'

        }
        rendermoney()

    }

    // 单选按钮
    if (e.target.className === "choice-btn single-btn") {

        if (e.target.getAttribute('i') == 'true') {

            e.target.style.background = "url(../images/un-checked.png) no-repeat"
            e.target.style.backgroundSize = 'contain';
            e.target.setAttribute('i', 'false')
        } else {
            e.target.style.background = "url(../images/checked.png) no-repeat"
            e.target.style.backgroundSize = 'contain';
            e.target.setAttribute('i', 'true')
        }
        rendermoney()
    }
    // 全选按钮
    if (e.target.className == 'choice-btn all-btn') {
        var single_btn = document.querySelectorAll('.single-btn')
        if (e.target.getAttribute('i') == 'true') {

            e.target.style.background = "url(../images/un-checked.png) no-repeat"
            e.target.style.backgroundSize = 'contain';
            e.target.setAttribute('i', 'false')
            for (var j = 0; j < single_btn.length; j++) {
                single_btn[j].style.background = "url(../images/un-checked.png) no-repeat"
                single_btn[j].style.backgroundSize = 'contain';
                single_btn[j].setAttribute('i', 'false')
                console.log(single_btn[j])
            }
        } else {
            e.target.style.background = "url(../images/checked.png) no-repeat"
            e.target.style.backgroundSize = 'contain';
            e.target.setAttribute('i', 'true')
            for (var j = 0; j < single_btn.length; j++) {
                single_btn[j].style.background = "url(../images/checked.png) no-repeat"
                single_btn[j].style.backgroundSize = 'contain';
                single_btn[j].setAttribute('i', 'true')
            }
        }
        rendermoney()
    }

    //删除按钮
    if (e.target.className === 'delete-btn') {

        console.log(e.target.getAttribute('key'))
        var key = e.target.getAttribute('key')
        localStorage.getItem(key)
        localStorage.removeItem(key)
        render()
        rendermoney()
        if (localStorage.length === 0) {
            render2()
        }
    }

    //删除选中的商品
    if (e.target.className === 'del-choiced') {
        var single_btn = document.querySelectorAll('.single-btn')
        var del_btn = document.querySelectorAll('.delete-btn')
        for (var j = 0; j < single_btn.length; j++) {
            if (single_btn[j].getAttribute('i') == 'true') {

                var key = del_btn[j].getAttribute('key')

                localStorage.removeItem(key)
            }
        }
        render()
        rendermoney()
    }
})



function rendermoney() {
    var all_total = document.querySelector('.shop-price i')
    var shop_total = document.querySelectorAll('.subtotal span')
    var shop_num = document.querySelectorAll('.num-btn i')
    var all_num = document.querySelector('.shop-num h5 i')
    var price = document.querySelectorAll('.price span')
    var single_btn = document.querySelectorAll('.single-btn')
    var sel_num = document.querySelector('.shop-num h4 i')
    var sum = 0
    var n1 = 0
    var p = 0
    var sel = 0
    for (var i = 0; i < shop_total.length; i++) {
        n1 += parseInt(shop_num[i].innerHTML)
        if (single_btn[i].getAttribute('i') == 'false') {

            continue
        } else {
            sel += parseInt(shop_num[i].innerHTML)
        }
        p = parseInt(price[i].innerHTML) * shop_num[i].innerHTML
        sum += p

        shop_total[i].innerHTML = p
        p = 0
    }

    all_total.innerHTML = sum
    all_num.innerHTML = n1
    sel_num.innerHTML = sel
}