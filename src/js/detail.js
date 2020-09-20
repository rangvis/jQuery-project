// console.log(location.search)

$.ajax({
    url: `http://47.112.249.18/shangpin?`,
    dataType: 'json',
    data: { ids: location.search.substr(1) }
}).then(function(res) {
    // console.log(res)
    // console.log(detail_data.shop_info.spec_v2[0].spec_values)
    // console.log(res.data.list[0])
    var detail_data = res.data.list[0]
        // console.log(detail_data.sku_info[0].ali_image)
    var color2 = detail_data.shop_info.spec_v2[0].spec_values
        // console.log(detail_data.shop_info.spec_v2[0].spec_values)
    var render_point = ''
    color2.forEach(function(item, index) {
        // console.log(item)
        render_point += `<li>${item.show_name}</li>`

    })

    // console.log(detail_data.shop_info.ali_images)
    var ali_images = detail_data.sku_info[0].ali_image
        // console.log(ali_images)
    var small_img = ''
        // ali_images.forEach(function (item, index) {
        //     // console.log(item)
        //     small_img += ` <li><img src= ${item}></li>`
        // })

    // 根据数据渲染页面
    var html = ''
    html = ` <div class="gallery">
    <!-- 可选择的小图片 -->
    <ul class="small-img choice-btn">
        
    </ul>

    <!-- 左边的商品展示的图片 -->
    <ul class="big-img small">

        <li>
            <img src=${ali_images} alt="">
            <!-- 贴膜 -->
            <div class="wrap"></div>   
        </li>
        
        <!--商品展示里的正方形小盒子 -->
        <span class="grayBox"></span>
    </ul>

    <!-- 右边放大镜效果的图片 -->
    <div class="fangdajing big">
        <img src=${ali_images} alt="">
    </div>
</div>

<div class="item-information">
    <article class="item-title">
        <h1>${detail_data.name}</h1>
        <h2>${detail_data.shop_info.spu_sub_title ? detail_data.shop_info.spu_sub_title : ''}
        </h2>
        <figure class="item-price">
            <span class="now-price">
                <em>¥</em>
                <i>${detail_data.price}</i>

            </span>
        </figure>
    </article>
    <!-- 促销活动 -->
    <article class="sale-active">
        <span>促销活动</span>
        <div class="active-info">
            <figure class="tag tag-yellow">直降</figure>
            <i>自营配件 限时直降</i>
        </div>
    </article>

    <!-- 颜色选择 -->
    <article class="color-sel">
        <span>颜色选择</span>
        <ul class="color-list">
        ${render_point}
        </ul>
    </article>

    <!-- 数量选择 -->
    <article class="num-sel">
        <span>数量选择</span>
        <div class="num-btn">
            <div class="jian-btn"></div>
            <i class="num">1</i>
            <div class="add-btn"></div>
        </div>
    </article>

    <!-- 服务说明 -->
    <article class="baoyou">
        <span>服务说明</span>
        <i>* 满 99 包邮</i>
    </article>
</div>

`
    $('.goods-info').html(html);
    $('.bar-price span').html(parseInt($('.now-price i').html()));

    //产品信息图片渲染
    // console.log(detail_data.shop_info.tpl_content.base.images.ali_mobile.url[0]);
    var product_img = detail_data.shop_info.tpl_content.base.images.ali_mobile.url[0];
    // console.log(product_img)
    var render_img = `<img src=${product_img}>`;
    $('.product').html(render_img);


    var data_count;
    var loc_data = JSON.parse(localStorage.getItem(location.search))
    if (loc_data) {
        data_count = JSON.parse(localStorage.getItem(location.search)).count
            // console.log(data_count)
    } else {
        data_count = 0
            // console.log(data_count)
    }
    // console.log((JSON.parse(localStorage.getItem(location.search)).count) ? (JSON.parse(localStorage.getItem(location.search)).count):0)

    $('.add-btn').on('click', function() {
        var num = parseInt($('.num').html())

        $('.num').html(num)
        $('.bar-price span').html((parseInt($('.now-price i').html()) * num))
        data_count = $('.num').html()
        data_loc = JSON.parse(localStorage.getItem(location.search))
        data_count++
        // console.log(data_count)

        localStorage.setItem(location.search, JSON.stringify(data_loc))
        num++
    })

    $('.jian-btn').on('click', function() {
        var num = parseInt($('.num').html())
        if (num == 1) {
            $(this).css({
                cursor: 'not-allowed'
            })
        } else {
            $(this).css({
                cursor: 'pointer'
            })
        }
        $('.num').html(num)


        $('.bar-price span').html(($('.now-price i').html()) * num)
        data_count = $('.num').html()
        data_loc = JSON.parse(localStorage.getItem(location.search))
        data_count--

        localStorage.setItem(location.search, JSON.stringify(data_loc))
        num--

    })


    var goods_name = $('.choiced-good h2 i').html()

    // console.log($('.item-title h1').html())

    $('.choiced-good h2 i').html($('.item-title h1').html())
    var mf = new Magnifier();

    //产品信息
    // console.log(res.data.list)
    // var goods_info = `<img src=${detail_data.shop_info.tpl_content.base.images.ali.url[0]} alt="">`
    // $('.product').html(goods_info)
    //添加进购物车  
    var add_cart = document.querySelector('.add-cart')
        // console.log(add_cart)
    data_count = $('.num').html()
        // console.log(data_count)
    add_cart.onclick = function() {
        // console.log(1)
        // 如果已经有数据了 那么我们就把json转换成对象 , 如果不存在就建立空的对象结构;
        var id = location.search.indexOf('=')
        var item_id = location.search.substr(id + 1);
        var item_data = res.data.list[0]

        var item_data1 = JSON.parse(localStorage.getItem(location.search)) ? JSON.parse(localStorage.getItem(location.search)) : {}

        // console.log(item_data1)
        // console.log(item_data)

        if (item_data1.count) {
            // console.log(item_data1, 1)
            // console.log(item_id, 1)
            item_data1.count = parseInt(item_data1.count) + parseInt(data_count)
                // console.log(item_data1.count, 1)
        } else {
            item_data1 = res.data.list[0]
                // console.log()
            item_data1.count = parseInt(document.querySelector('.num').innerHTML)
                // console.log(item_id, 2)
                // console.log(item_data.count, 2)

        }
        localStorage.setItem(item_id, JSON.stringify(item_data1))
            // console.log(item_data1)
        alert('加入购物车成功')
    }


    // 现在购买 => 跳转到购物车
    $('.now-buy').on('click', function() {
        location.href = `./cart.html`
    })

    //数量选择的按钮
    // console.log(detail_data.price)
    var add_btn = document.querySelector('.add-btn')
    var num = document.querySelector('.num')
    var jian_btn = document.querySelector('.jian-btn')
    var goods_num = document.querySelector('.choiced-good h2 span')
    var price = document.querySelector('.bar-price span')
        // console.log(goods_num)
        // console.log(add_btn)
    add_btn.onclick = function() {
        num.innerHTML++
            goods_num.innerText = num.innerHTML
        price.innerHTML = detail_data.price * goods_num.innerText
    }
    jian_btn.onclick = function() {
            num.innerHTML--
                goods_num.innerText = num.innerHTML
            price.innerHTML = detail_data.price * goods_num.innerText
            if (num.innerHTML < 1) {
                num.innerHTML = 1
                goods_num.innerText = 1
                price.innerHTML = detail_data.price
                jian_btn.style.cursor = 'not-allowed';
            }
        }
        // console.log(price.innerHTML)
    price.innerHTML = detail_data.price * goods_num.innerText
})



// 返回顶部按钮功能
var ret_top = document.querySelector('.sec-fixed')
ret_top.onclick = function() {
    // console.log(1)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// 函数节流 : 在闭包高级里面讲解的;
function throttling(callback, delay) {
    var t = null;
    return function() {
        if (t !== null) {
            return false;
        }
        t = setTimeout(function() {
            t = null;
            callback();
        }, delay)
    }
}

//加入购物车的固定
var product_fix = document.querySelector('.product-fix-bar')


//元素距离页面的顶部的距离
var ele_offsetTop = product_fix.offsetTop
    // console.log(ele_offsetTop)
    //元素的高度
var ele_height = product_fix.offsetHeight

// 当滚动条滑动到指定位置时隐藏
window.onscroll = throttling(function() {
    if (window.scrollY + innerHeight - ele_height < ele_offsetTop) {
        product_fix.style.position = 'fixed'
        product_fix.style.bottom = '0'
    } else {
        product_fix.style.position = 'static'
    }
}, 100)