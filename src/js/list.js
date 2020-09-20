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

// console.log(location.search.substr(1))
var ids = location.search.substr(1)
var pagenum = 1
    // console.log($('.sec-nav-list li'))
$('.sec-nav-list li').each(function(index, item) {
    // console.log($(item).attr('ids'))
    if ($(item).attr('ids') === ids) {
        $(item).addClass('active')
    } else {
        $(item).addClass('')
    }
})



$.ajax({
        url: 'http://47.112.249.18/list',
        dataType: 'json',
        data: {
            category_id: ids,
            page: pagenum,
            sort: 'sort',
            num: 20,
            type: 'shop',
            channel_id: 1001,
        },
    })
    .then(function(res) {
        // console.log(res.data.list[0].spuInfo.spuId)
        var data_list = res.data.list

        function sort(sorts) {
            var html = ''
            $(sorts).each(function(index, item) {
                // console.log(item.spuInfo.spuId)
                var html2 = ''
                item.skuList.forEach(function(item, idx) {
                    // console.log(item)
                    if (item.skuColor !== '')
                        html2 += ` 
                <div class="point"><img src=${item.skuColor} alt=""></div>`
                })

                html += `   
            <section class="list-item" ids=${item.spuInfo.spuId}>
        <figure>
            <img src = ${sorts[index].spuInfo.images}>
        </figure>
        <h3 class="text-hide">${sorts[index].spuInfo.spuTitle}</h3>
        <h5 class="text-hide">
        ${sorts[index].spuInfo.spuSubTitle}
        </h5>
        <div class="sel-color">${html2}</div>
                <div class="price">
            <span class="discount-price">￥${sorts[index].spuInfo.discountPrice}</span>
            <del class="origin-price">${sorts[index].spuInfo.price === sorts[index].spuInfo.discountPrice ? '' : sorts[index].spuInfo.price}</del> 
        </div>
        <div class="active-tag">
        <span class=${item.spuInfo.tagText === '买赠' ? 'red' : 'yellow'} style="display: ${item.spuInfo.tagText === '' ? 'none' : 'block'};">${item.spuInfo.tagText}</span>
        </div>
        </section>
        `
                var html3 = ''
                html3 = `   <ul class="price-sort">
            <li class="sort active">综合排序</li>
            <li class="sort">销量排序</li>
            <li class="sort">价格低到高</li>
            <li class="sort">价格高到低</li>
        </ul>
        `
                    // console.log(html3)
                $('.list-wrap').html(html3)
                $('.list-wrap').append(html)
            })
        }
        sort(data_list)

        //点击商品跳转到详情页
        // console.log($('.list-item'))
        $('.list-item').on('click', function() {
            // console.log(1111)
            // console.log($(this))
            // console.log($(this).attr('ids')) 
            location.href = `./detail.html?${$(this).attr('ids')}`
        })





        $('.price-sort').on('click', '.sort', function() {


            $(this).addClass("active")
                .siblings("li")
                .removeClass("active");

            //价格从低到高排序
            //获取到现价
            // console.log($(this).index())
            if ($(this).index() === 2) {
                // console.log(res.data.list[0].spuInfo.price)
                var di = res.data.list.sort(function(a, b) {
                        var value1 = a.spuInfo.price
                        var value2 = b.spuInfo.price
                        return value1 - value2
                    })
                    // console.log(di)
                sort(di)
            }

            //价格从高到低排序
            //获取到现价
            if ($(this).index() === 3) {

                var gao = res.data.list.sort(function(a, b) {
                        var value1 = a.spuInfo.price
                        var value2 = b.spuInfo.price
                        return value2 - value1
                    })
                    // console.log(gao)
                sort(gao)
            }

        })
    })


$.ajax({
    url: 'http://47.112.249.18/list',
    dataType: 'json',
    data: {
        category_id: ids,
        page: 1,
        sort: 'sort',
        num: 20,
        type: 'shop',
        channel_id: 1001,
    },
    success: function(eee) {
        // console.log(eee)
        // console.log($('.list-wrap').height())
        // console.log($('.foot').offset().top)
        // console.log($('.foot')[0].offsetTop)
        var flag = true
        $(document).on('scroll', function() {
            //  console.log($(document).scrollTop())
            if ($(document).scrollTop() > $('.foot').offset().top - 300) {

                pagenum++

                $.ajax({
                    url: 'http://47.112.249.18/list',
                    dataType: 'json',
                    data: {
                        category_id: ids,
                        page: pagenum,
                        sort: 'sort',
                        num: 20,
                        type: 'shop',
                        channel_id: 1001,
                    },
                    success: function(res) {
                        if (flag) {
                            // console.log(res)
                            flag = false

                            function sort1(sorts) {
                                var html = ''
                                $(sorts).each(function(index, item) {
                                    // console.log(item.spuInfo.tagText)
                                    var html2 = ''
                                    item.skuList.forEach(function(it, idx) {
                                        // console.log(it)
                                        if (it.skuColor !== '')
                                            html2 += ` 
                                    <div class="point"><img src=${it.skuColor} alt=""></div>`
                                    })


                                    html += `   
                                <section class="list-item" ids = ${item.spuInfo.spuId}>
                            <figure>
                                <img src = ${sorts[index].spuInfo.images}>
                            </figure>
                            <h3 class="text-hide">${sorts[index].spuInfo.spuTitle}</h3>
                            <h5 class="text-hide">
                            ${sorts[index].spuInfo.spuSubTitle}
                            </h5>
                            <div class="sel-color">${html2}</div>
                                    <div class="price">
                                <span class="discount-price">￥${sorts[index].spuInfo.discountPrice}</span>
                                <del class="origin-price">${sorts[index].spuInfo.price === sorts[index].spuInfo.discountPrice ? '' : sorts[index].spuInfo.price}</del> 
                            </div>
                            <div class="active-tag">
                            <span class=${item.spuInfo.tagText === '买赠' ? 'red' : 'yellow'} style="display: ${item.spuInfo.tagText === '' ? 'none' : 'block'};">${item.spuInfo.tagText}</span>
                            </div>
                            </section>
                            `

                                    // console.log(html3)
                                    // $('.list-wrap').append(html3)
                                    $('.list-wrap').append(html)
                                })
                            }
                            sort1(res.data.list)
                                // flag = true
                        }
                        //点击商品跳转到详情页
                        // console.log($('.list-item'))
                        $('.list-item').on('click', function() {
                            // console.log(1111)
                            // console.log($(this))
                            // console.log($(this).attr('ids'))
                            location.href = `./detail.html?${$(this).attr('ids')}`
                        })
                    }
                })

            }
        })

    }
})