"use strict";$(".sec-nav-list li").on("click",function(){console.log($(this).attr("ids")),location.href="./liebiao.html?".concat($(this).attr("ids"))});var user_data="";$(".head-right .user");var t=null;$(".user").hover(function(){console.log(1),$(".user-wrapper").show()},function(){console.log(2),setTimeout(function(){$(".user-wrapper").hide()},500)});var ids=location.search.substr(1),pagenum=1;$(".sec-nav-list li").each(function(s,n){$(n).attr("ids")===ids?$(n).addClass("active"):$(n).addClass("")}),$.ajax({url:"http://47.112.249.18/list",dataType:"json",data:{category_id:ids,page:pagenum,sort:"sort",num:20,type:"shop",channel_id:1001}}).then(function(s){function n(c){var i="";$(c).each(function(s,n){var t="";n.skuList.forEach(function(s,n){""!==s.skuColor&&(t+=' \n                <div class="point"><img src='.concat(s.skuColor,' alt=""></div>'))}),i+='   \n            <section class="list-item" ids='.concat(n.spuInfo.spuId,">\n        <figure>\n            <img src = ").concat(c[s].spuInfo.images,'>\n        </figure>\n        <h3 class="text-hide">').concat(c[s].spuInfo.spuTitle,'</h3>\n        <h5 class="text-hide">\n        ').concat(c[s].spuInfo.spuSubTitle,'\n        </h5>\n        <div class="sel-color">').concat(t,'</div>\n                <div class="price">\n            <span class="discount-price">￥').concat(c[s].spuInfo.discountPrice,'</span>\n            <del class="origin-price">').concat(c[s].spuInfo.price===c[s].spuInfo.discountPrice?"":c[s].spuInfo.price,'</del> \n        </div>\n        <div class="active-tag">\n        <span class=').concat("买赠"===n.spuInfo.tagText?"red":"yellow",' style="display: ').concat(""===n.spuInfo.tagText?"none":"block",';">').concat(n.spuInfo.tagText,"</span>\n        </div>\n        </section>\n        ");$(".list-wrap").html('   <ul class="price-sort">\n            <li class="sort active">综合排序</li>\n            <li class="sort">销量排序</li>\n            <li class="sort">价格低到高</li>\n            <li class="sort">价格高到低</li>\n        </ul>\n        '),$(".list-wrap").append(i)})}n(s.data.list),$(".list-item").on("click",function(){location.href="./detail.html?".concat($(this).attr("ids"))}),$(".price-sort").on("click",".sort",function(){($(this).addClass("active").siblings("li").removeClass("active"),2===$(this).index())&&n(s.data.list.sort(function(s,n){return s.spuInfo.price-n.spuInfo.price}));3===$(this).index()&&n(s.data.list.sort(function(s,n){var t=s.spuInfo.price;return n.spuInfo.price-t}))})}),$.ajax({url:"http://47.112.249.18/list",dataType:"json",data:{category_id:ids,page:1,sort:"sort",num:20,type:"shop",channel_id:1001},success:function(s){var n=!0;$(document).on("scroll",function(){$(document).scrollTop()>$(".foot").offset().top-300&&(pagenum++,$.ajax({url:"http://47.112.249.18/list",dataType:"json",data:{category_id:ids,page:pagenum,sort:"sort",num:20,type:"shop",channel_id:1001},success:function(s){if(n){n=!1,c=s.data.list,i="",$(c).each(function(s,n){var t="";n.skuList.forEach(function(s,n){""!==s.skuColor&&(t+=' \n                                    <div class="point"><img src='.concat(s.skuColor,' alt=""></div>'))}),i+='   \n                                <section class="list-item" ids = '.concat(n.spuInfo.spuId,">\n                            <figure>\n                                <img src = ").concat(c[s].spuInfo.images,'>\n                            </figure>\n                            <h3 class="text-hide">').concat(c[s].spuInfo.spuTitle,'</h3>\n                            <h5 class="text-hide">\n                            ').concat(c[s].spuInfo.spuSubTitle,'\n                            </h5>\n                            <div class="sel-color">').concat(t,'</div>\n                                    <div class="price">\n                                <span class="discount-price">￥').concat(c[s].spuInfo.discountPrice,'</span>\n                                <del class="origin-price">').concat(c[s].spuInfo.price===c[s].spuInfo.discountPrice?"":c[s].spuInfo.price,'</del> \n                            </div>\n                            <div class="active-tag">\n                            <span class=').concat("买赠"===n.spuInfo.tagText?"red":"yellow",' style="display: ').concat(""===n.spuInfo.tagText?"none":"block",';">').concat(n.spuInfo.tagText,"</span>\n                            </div>\n                            </section>\n                            "),$(".list-wrap").append(i)})}var c,i;$(".list-item").on("click",function(){location.href="./detail.html?".concat($(this).attr("ids"))})}}))})}});