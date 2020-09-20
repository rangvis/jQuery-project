function Magnifier() {
    // 正方形小盒子
    this.square = document.querySelector(".grayBox");
    // 小盒子容器
    this.small = document.querySelector(".small");
    // 小图 ;
    this.small_img = document.querySelector(".small img");
    // 大盒子容器
    this.big = document.querySelector(".big");
    // 大图片
    this.big_img = document.querySelector(".big img");
    // 找到按钮 
    this.index = 0;
    this.btns = document.querySelectorAll(".choice-btn img");

    this.square_size = {
            width: parseInt(getComputedStyle(this.square).width),
            height: parseInt(getComputedStyle(this.square).height)
        }
        // 获取小盒子宽高;
    this.small_size = {
            width: this.small.offsetWidth,
            height: this.small.offsetHeight,
        }
        // 获取大容器的宽高;
    this.big_size = {
            width: parseInt(getComputedStyle(this.big).width),
            height: parseInt(getComputedStyle(this.big).height)
        }
        // 大图片的宽高;
    this.big_img_size = {
        width: parseInt(getComputedStyle(this.big_img).width),
        height: parseInt(getComputedStyle(this.big_img).height)
    }

    this.bindEvent();
}
Magnifier.prototype.bindEvent = function() {
        var self = this;
        // 元素显示隐藏;
        this.small.onmouseover = function() {
            self.square.style.display = "block";
            self.big.style.display = "block";
        }
        this.small.onmouseout = function() {
                self.square.style.display = "none";
                self.big.style.display = "none";
            }
            // 鼠标运动;
        this.small.onmousemove = function(evt) {
            var e = evt || event;
            // 边界检测 : 先计算再赋值; 
            // 找极值; 判定边界;
            // 数据的预处理 : 
            var _left = e.offsetX - 100;
            var _top = e.offsetY - 100;
            // top 是关键字; 无法作为变量存储数据;
            if (_left < 0) {
                _left = 0;
            }
            if (_top < 0) {
                _top = 0;
            }
            var max_left = self.small_size.width - self.square_size.width;
            // offset 测量家族 : 有性能问题;
            // 会导致页面的重绘;
            // 页面的回流;
            if (_left > max_left) {
                _left = max_left;
            }

            var max_top = self.small_size.height - self.square_size.height;

            if (_top > max_top) {
                _top = max_top;
            }

            self.square.style.left = _left + "px";
            self.square.style.top = _top + "px";

            // 计算位移的百分比;
            var prop_left = (_left / max_left).toFixed(2);
            var prop_top = (_top / max_top).toFixed(2);
            // console.log(prop_left, prop_top)
            // self.big_img_size.width - self.big_size.width
            // 大盒子最大的移动距离;
            var big_box_max_left = self.big_img_size.width - self.big_size.width;
            var big_box_max_top = self.big_img_size.height - self.big_size.height;
            // 计算距离
            self.big_img.style.left = -big_box_max_left * prop_left + "px";
            self.big_img.style.top = -big_box_max_top * prop_top + "px";

        }

        for (var i = 0; i < this.btns.length; i++) {
            this.btns[i].index = i;
            this.btns[i].onmouseover = function() {
                self.index = this.index;
                self.small_img.src = this.src;
                self.big_img.src = this.src;
            }
        }

    }
    // var mf = new Magnifier();