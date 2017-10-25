define(['jquery'], function () {
let Gotop = (function () {
  function _Gotop($ct) {
    this.$ct = $ct
    this.init()
  }

  _Gotop.prototype.init = function () {
    this.$ct.click(function (e) {
      e.preventDefault()
      $('html,body').animate({ scrollTop: '0px' }, 1000);
    })
  }
      return {
      init: function ($ct) {
        new _Gotop($ct)
      }
    }
})()
return Gotop
})