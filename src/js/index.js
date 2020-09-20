var mySwiper = new Swiper('.swiper-container', {
    initialSlide: 0, // 从第几张开始播放  默认为 0 的时候不用设置
    // direction: 'horizontal', // 垂直切换选项
    autoplay: true, //等同于以下设置
    loop: true, // 无限循环 
    effect: 'fade', // 切换效果
    // 分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 换页按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})


// 外部配置自动播放; 鼠标移入是停止播放
mySwiper.el.onmouseover = function() {
    mySwiper.autoplay.stop();
}

// 鼠标移出时继续播放
mySwiper.el.onmouseout = function() {
    mySwiper.autoplay.start();
}

// const { render } = require("sass")

//第二个导航的显示隐藏
var lis = document.querySelectorAll('.sec-nav-list>li')
    // console.log(lis)
$(".sec-nav").on('mouseover', function(e) {
        var e = e || event
            // console.log(e)
        if (e.target.tagName === 'LI') {

            $('.nav-show').css({
                height: 266,
            })
        }
    })
    //隐藏
$("body").on('mouseout', function(e) {
    var e = e || event

    if (e.target.tagName !== 'LI') {
        $('.nav-show').css({
            height: 0,
        })
    }
})

// 跳转购物车
// var goCart = document.querySelector('.goCart')
// $('.goCart').on('click', function() {
//     location.href = './cart.html'
// })
$.ajax({
    url: 'js/libs/second_nav.json',
    dataType: 'json',
    success: function(res) {
        // console.log(res)
        //移入每一个li，nav-list的内容随之改变
        var down_list = document.querySelectorAll('.sec-nav-list li')
        for (let i = 0; i < down_list.length - 1; i++) {
            down_list[i].onmouseover = function() {

                if (res[i].type === 'goods') {

                    $('.type1').show()
                    $('.type2').hide()
                        // $('.type3').hide()

                    //根据res渲染
                    if (res[i].name === down_list[i].innerHTML) {

                        let html = ''
                            //list里面有多少个数据就创建多少个li
                        res[i].list.forEach(function(item, index) {

                            html += `<li>
                            <img src=${res[i].list[index].ali_image} alt="">
                            <p class="goods-name">${res[i].list[index].sku_name}</p>
                            <p class="now-price">
                                <span >￥${res[i].list[index].sell_price}</span>
                                起
                            </p>
                        </li>`
                        })
                        $('.type1')[0].innerHTML = html

                    }
                } else if (res[i].type === 'category') {
                    $('.type1').hide()
                    $('.type2').show()
                        // $('.type3').hide()
                    if (res[i].name === down_list[i].innerHTML) {

                        let html = ''
                            //list里面有多少个数据就创建多少个li

                        res[i].list.forEach(function(item, index) {
                            // console.log(res[i].list[index].sub)
                            // console.log(item)
                            var self = item.sub
                            var html2 = ''
                            self.forEach(function(it, idx) {
                                // console.log(it.image)
                                html2 += ` <p>
                                <img src=${it.image} alt="">
                                <span>${it.name} </span>
                            </p>`
                            })

                            html += `<li>
                            <h2>${res[i].list[index].title}</h2>
                            <div class="more-list" style="width: ${202 * Math.ceil(res[i].list[index].sub.length / 4)}px;">
                                ${html2}
                            </div>
                        </li>`
                        })
                        $('.type2')[0].innerHTML = html

                    }
                }

            }
        }
        // console.log($('.nav-list ul '))
        $('.nav-list ul').on('mouseover', function() {
            $('.nav-show').css({
                height: 266,
            })
        })
    }
})

//搜索框里的推荐
$('.search-txt').on('focus', function() {
    // console.log(1)
    $('.input-rec').show()
    $('.search-recs').hide()
    $(this).attr('placeholder', '请输入搜索的商品')
})
$('.search-txt').on('blur', function() {
    // console.log(1)
    $('.input-rec').hide()
    $('.search-recs').show()
    $(this).attr('placeholder', '')
})

//输入东西让clearbtn显示
$('.search-txt').on('input', function() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: 'https://shopapi.smartisan.com/v1/search/suggest?keyword=1',
    }).then(function(res) {
        console.log(res)
    })
    if ($('.search-txt')[0].value !== '') {
        $('.clear-btn').show()
    } else {
        $('.clear-btn').hide()
    }
})
$('.clear-btn').on('click', function() {
    $('.search-txt')[0].value = ''
    $(this).hide()
})


//固定第二个导航栏
window.onscroll = function() {
    if (scrollY > 45) {
        $('.sec-nav').css({
            position: 'fixed',
            top: 0,
        })
    } else {
        $('.sec-nav').css({
            position: 'relative',

        })
    }
}

$.ajax({
    type: 'get',
    dataType: 'json',
    url: 'http://47.112.249.18/cz',
}).then(function(rrr) {
    //获取到首页的数据
    // console.log(rrr)
    //热门商品渲染
    var hothot = ''
    var home_hot = rrr.data.home_hot
        // console.log(home_hot )
    home_hot.forEach(function(item, index) {
        // if(item.spu.shop_info.spec_v2)
        // console.log(item.sku_id)
        var color_sel = item.spu.shop_info.spec_v2[0].spec_values
            // 按钮颜色
        var color_point = ''
        color_sel.forEach(function(it, idx) {
            // console.log(it.image)
            if (it.image === '') {
                return false
            }
            color_point += `<div class="point">
            <img src=>
        </div>`
        })
        hothot += `<div class="hot-goods-list " ids=${item.spu_id}>
        <div class="list-img">
            <img src=${item.spu.sku_info[0].ali_image}>
        </div>
        <h3>${item.spu.sku_info[0].title}</h3>
        <h5>
            <span class="text-show"> ${item.spu.sku_info[0].sub_title}</span>
            <span class="text-hide">自营配件 限时直降</span>
        </h5>
        <figure>
        ${color_point}
        </figure>

        <div class="item-price">
            <span class="now-price">￥${item.spu.sku_info[0].price}</span>
            
        </div>
        <div class="price-down">
            直降
        </div>
    </div>`
    })
    $('.home-hot').html(hothot)


    //首页的floor数据渲染
    var home_data = rrr.data.home_floors
    var html_render = ''
    home_data.forEach(function(item, index) {
            // console.log(item.tabs[0].tab_items)

            var home_list = ''
            for (var i = 1; i < (item.tabs[0].tab_items).length; i++) {
                //  console.log(item.tabs[0].tab_items[i].sku_id)

                var color1 = ''
                var color_sel1 = item.tabs[0].tab_items[i].spu.shop_info.spec_v2[0].spec_values
                color_sel1.forEach(function(item, index) {
                    if (item.image === '') {
                        return false
                    }
                    color1 += `<div class="point">
            <img src=${item.image}>
            </div>`
                })

                // console.log(item.tabs[0].tab_items[i].sku_id)
                home_list += ` <div class="hot-goods-list" ids=${item.tabs[0].tab_items[i].spu_id}>
            <div class="list-img">
                <img src = ${item.tabs[0].tab_items[i].spu.sku_info[0].ali_image}>
            </div>
            <h3>${item.tabs[0].tab_items[i].spu.sku_info[0].title}</h3>
            <h5>
                <span class="text-show">${item.tabs[0].tab_items[i].spu.sku_info[0].sub_title}</span>
                <span class="text-hide">自营配件 限时直降</span>
            </h5>
            <figure >
            ${color1}
            </figure>

            <div class="item-price">
                <span class="now-price">￥${item.tabs[0].tab_items[i].spu.sku_info[0].price}</span>
            </div>
            <div class="price-down">
                直降
            </div>
        </div>`
            }

            html_render += `<div class="dalideng hot-good">
        <section class="hot-goods">
            <div class="hot-head">
                <h3 class="fl">${item.title}</h3>
            </div>
            <div class="item-img fl">
                <img src= ${item.tabs[0].tab_items[0].image}>
                <a href="###" class="box-shadow"></a>
            </div>

            ${home_list}
        </section>
    </div>`
        })
        // console.log($('.home-floor'))
    $('.home-floor').html(html_render)
    $('.hot-goods-list').on('click', function() {
        console.log($(this).attr('ids'))
        location.href = `./detail.html?${$(this).attr('ids')}`
            //点击商品跳转到详情页
            // console.log($('.list-item'))

    })

})


//热门商品按钮操作
$('.right-btn').on('click', function() {
    $('.home-hot').css({
        transform: 'translate(-1220px, 0px)',
    })
    $(this).attr('disabled', 'disabled')
    $('.left-btn').removeAttr('disabled')
})

$('.left-btn').on('click', function() {
    $('.home-hot').css({
        transform: 'translate(0px, 0px)',
    })
    $(this).attr('disabled', 'disabled')
    $('.right-btn').removeAttr('disabled')
})


$('.search-txt').on('input', function() {
    console.log($(this)[0].value)
    var input_txt = ''
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://47.112.249.18/kw',
        dataType: "jsonp", //数据格式设置为jsonp
        data: {
            keyword: $(this)[0].value
        },
        success: function(res) {
            console.log(res.data)

            res.data.forEach(function(item, index) {
                console.log(index)
                if (index > 7) {
                    return false
                }
                input_txt += `<p>${item}</p>`
            })


            $('.input-rec').html(input_txt)
                // $('.input-rec').css({
                //     backgroundSize: '100% 98%'
                // })
        }
    })
    if ($(this)[0].value === '') {
        input_txt = ` <p>智能灯</p>
        <p>坚果Pro 3</p>
        <p>学习机器人</p>
        <p>蓝牙耳机</p>
        <p>抖音文创</p>
        <p>移动电源</p>
        <p>旅行箱</p>
        <p>T恤</p>`
    }
})

//头部购物车按钮
// var shop_btn = ''
//     // console.log(localStorage.length)
// if (localStorage.length === 1) {
//     // console.log(1)
//     var shop_btn = `<p class="desc">购物车为空</p>
//     <p class="desc-prompt">您还没有选购任何商品，现在前往商城选购吧！</p>`
// } else {
//     shop_btn = `<ul class="cart-list">
//     <li>
//         <img _ngcontent-c5="" src="https://resource.smartisan.com/resource/1da272761215caa57ee8f5889644371a.png?x-oss-process=image/resize,w_80">
//         <div class="cart-list-info">
//             <h2>
//                 卡夫卡
//             </h2>
//             <h3>白色</h3>
//             <h4>
//                 ￥<span>104.00</span>
//                 <i>× 1</i>
//             </h4>
//         </div>
//     </li>
//     <li>
//         <img _ngcontent-c5="" src="https://resource.smartisan.com/resource/1da272761215caa57ee8f5889644371a.png?x-oss-process=image/resize,w_80">
//         <div class="cart-list-info">
//             <h2>
//                 卡夫卡
//             </h2>
//             <h3>白色</h3>
//             <h4>
//                 ￥<span>104.00</span>
//                 <i>× 1</i>
//             </h4>
//         </div>
//     </li>


// </ul>
// <div class="money-panel">
//     <p>共
//         <strong>3</strong>
//         件商品
//     </p>
//     <h5>
//         合计：
//         <span class="price-icon">￥</span>
//         <span class="price-total">482.00</span>
//     </h5>
//     <h6>
//         去购物车
//     </h6>
// </div>`
//         // console.log(2) 
// }
// $('.shop-empty').html(shop_btn)

//点击sec-nav跳转到列表页
$('.sec-nav-list li').on('click', function() {
    console.log($(this).attr('ids'))
    location.href = `./liebiao.html?${$(this).attr('ids')}`
})

var user_data = ``
$('.head-right .user')
var t = null
$('.user').hover(function() {
    console.log(1)

    $('.user-wrapper').show()
        // return false


}, function() {
    console.log(2)
    setTimeout(function() {
        $('.user-wrapper').hide()

    }, 500)

})