/* StandardShare main */
// Base function.
"use strict";
var StandardShare = (function() {

  var DEFAULTS = {
    list: ".standard-share",
    closeList: null,
    messages: {
      facebook: "",
      twitter: ""
    }
  };

  var methods = {
    handleShare: function (element, callback) {
      var shareType = $(element).data('standard-share');
      var link = $(element).data('standard-link');
      switch(shareType) {
      case 'facebook':  {
          this.shareFacebook(link);
        }
        break;
      case 'twitter':  {
          this.shareTwitter(link);
        }
        break;
      case 'email':  {
          window.location.href = "mailto:?body=" + encodeURIComponent(link);
        }
        break;
      }

      callback();
    },

    shareFacebook: function (link) {
      var width = 575, height = 400;
      var left = ($(window).width() - width) / 2;
      var top = ($(window).height() - height) / 2;
      var opts = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + left + ",top=" + top + ",screenX=" + left + ",screenY=" + top + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
      var url = 'http://www.facebook.com/sharer.php?u=' + encodeURI(link) + '&t=' + encodeURIComponent(document.title);
      window.open(url, 'sharer', opts);
    },

    shareTwitter: function (link) {
      var width = 575, height = 400;
      var left = ($(window).width() - width) / 2;
      var top = ($(window).height() - height) / 2;
      var opts = 'status=1,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
      var url = "http://twitter.com/share?text=" + DEFAULTS.messages.twitter + "&url=" + encodeURI(link);
      window.open(url, 'twitter', opts);
    }

  };
  return {
    shareList: function () {
      var myArguments = arguments[0] || {};
      var list = myArguments.list || DEFAULTS.list;
      DEFAULTS.list = list; //Sets list
      return this;
    },

    bindEvents: function () {
      $(DEFAULTS.list + ' li').each(function (){
          $(this).on('click', function() {
              methods.handleShare(this, function() {
                if (DEFAULTS.closeList !== null && typeof(DEFAULTS.closeList) === 'function') {
                  DEFAULTS.closeList();
                }
              });
            });
        });

      return this;
    },

    afterComplete: function (closeFunction) {
      if (typeof(closeFunction) === 'function') {
        DEFAULTS.closeList = closeFunction;
      }
    }
  };

})();


// Version.
StandardShare.VERSION = '0.0.0';

