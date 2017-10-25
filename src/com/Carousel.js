
define(['jquery'], function ($) {
  let Carousel = (function () {
    function _Carousel($ct) {
      this.$ct = $ct;
      this.init();
      this.autoPlay()
      this.bind()
    }
    _Carousel.prototype.init = function () {
      let $imgCt = this.$imgCt = this.$ct.find('.img-ct'),
        $imgs = this.$imgs = this.$ct.find('.img-ct>li'),
        $imgCount = this.$imgCount = this.$ct.find('.img-ct>li').length,
        $imgWidth = this.$imgWidth = $imgs.width();
      this.$preBtn = this.$ct.find('.pre')
      this.$nextBtn = this.$ct.find('.next')
      this.$bullet = this.$ct.find('.bullet>li')
      this.pageIndex = 0
      this.isView = false
      $imgCt.append($imgs.first().clone())
      $imgCt.prepend($imgs.last().clone())
      $imgCt.width(($imgCount + 2) * $imgWidth)
      $imgCt.css({ left: -$imgWidth })
    }
    _Carousel.prototype.bind = function () {
      let _this = this
      this.$preBtn.click(function (e) {
        e.preventDefault();
        _this.playPre(1)
      })
      this.$nextBtn.click(function (e) {
        e.preventDefault();
        _this.playNext(1)
      })
      this.$bullet.click(function () {
        let index = $(this).index()
        if (index > _this.pageIndex) {
          _this.playNext(index - _this.pageIndex)
        } else if (index < _this.pageIndex) {
          _this.playPre(_this.pageIndex - index)
        }
      })
      _Carousel.prototype.playPre = function (len) {
        let _this = this
        if (this.isView) {
          return
        }
        this.isView = true;
        this.$imgCt.animate({
          left: '+=' + this.$imgWidth * len
        }, function () {
          _this.pageIndex -= len;
          if (_this.pageIndex < 0) {
            _this.$imgCt.css({ left: -_this.$imgWidth * _this.$imgCount });
            _this.pageIndex = _this.$imgCount - len
          }
          _this.$bullet.removeClass('active')
          _this.$bullet.eq(_this.pageIndex).addClass('active')
          _this.isView = false;
        })
      }
      _Carousel.prototype.playNext = function (len) {
        let _this = this
        if (this.isView) {
          return
        }
        this.isView = true;
        this.$imgCt.animate({
          left: '-=' + this.$imgWidth * len
        }, function () {
          _this.pageIndex += len;
          _this.$bullet.removeClass('active')
          _this.$bullet.eq(_this.pageIndex).addClass('active')
          if (_this.pageIndex === _this.$imgCount) {
            _this.$imgCt.css({ left: -_this.$imgWidth });
            _this.pageIndex = 0
          }
          _this.$bullet.removeClass('active')
          _this.$bullet.eq(_this.pageIndex).addClass('active')
          _this.isView = false;
        })
      }
    }

    _Carousel.prototype.stopAuto=function () {
      clearInterval(this.clock)
    }
    _Carousel.prototype.autoPlay=function () {
      var _this=this
      clock = setInterval(function () { _this.playNext(1); }, 2000)
    } 




    return {
      init: function ($ct) {
        $ct.each(function (index, node) {
          new _Carousel($(node))
        })
      }
    }
  })()
  return Carousel
})

