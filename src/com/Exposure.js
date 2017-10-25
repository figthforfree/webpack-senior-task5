define(['jquery'], function () {
  let Lazy = (function () {
    function _Lazy($ct) {
      this.$ct = $ct
      this.isloaded = false
      this.loadImg(10)
      this.init()
    }

    _Lazy.prototype.init = function () {
      let _this = this
      this.$ct.parent().find('a').click(function (e) {
        e.preventDefault()
        if (_this.isloaded) {
          return
        }
        _this.isloaded = true
        _this.loadImg(10)
        _this.isloaded = false
      })
    }

    _Lazy.prototype.getImg = function (num) {
      let src = "";
      for (let i = 0; i < num; i++) {
        let randHeight = Math.floor(Math.random() * (500 - 150 + 1)) + 150;
        let _src = '<li><img src="http://unsplash.it/300/' + randHeight + '/"></li>';
        src += _src
      }
      return $(src)
    }

    _Lazy.prototype.loadImg = function (num) {
      let _this = this,
        $html = this.getImg(num)
      count = 0
      $html.find('img').load(function () {
        count += 1
        _this.$ct.append($html)
        if (count === num) {
          _this.waterfall()
        }
      })
    }

    _Lazy.prototype.waterfall = function () {
      let colSumHeigth = [],
        nodeWidth = this.$ct.find('li').outerWidth(true),
        colnum = parseInt(this.$ct.outerWidth(true) / nodeWidth);
      for (let i = 0; i < colnum; i++) {
        colSumHeigth[i] = 0;
      }
      this.$ct.find('li').each(function () {
        let minValue = Math.min.apply(null, colSumHeigth)
        let minIndex = colSumHeigth.indexOf(minValue)
        $(this).css({
          top: minValue,
          left: nodeWidth * minIndex,
          opacity: 1
        })
        colSumHeigth[minIndex] += $(this).outerHeight(true)
        $(this).parent().height(Math.max.apply(null, colSumHeigth))
      })
    }

    return {
      init: function ($ct) {
        new _Lazy($ct)
      }
    }
  })()

  return Lazy


})