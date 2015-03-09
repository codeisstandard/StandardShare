/* StandardShare main */
// Base function.
"use strict";
var StandardShare = (function() {

  var DEFAULTS = {
    list: ".standard-share",
    closeList: null,
    clipboardClient: null
  };

  var methods = {
    handleShare: function (element, callback) {
      var shareType = $(element).data('standard-share');
      var link = $(element).data('standard-link');
      var message = $(element).data('standard-message');
      switch(shareType) {
      case 'facebook':  {
          this.shareFacebook(link, message);
        }
        break;
      case 'twitter':  {
          this.shareTwitter(link, message);
        }
        break;
      case 'email':  {
          var subject = $(element).data('standard-subject') || '';

          window.location.href = "mailto:?subject="+subject+"&body=" + message +" "+encodeURIComponent(link);
        }
        break;
      case 'copy-link': {
        //We activated the Flash button already. We can use this area for user feedback like a notice saying the link is copied.
        }
      }
      //the callback is a way to close the list if it is a list the closes.
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

    shareTwitter: function (link, message) {
      var width = 575, height = 400;
      var left = ($(window).width() - width) / 2;
      var top = ($(window).height() - height) / 2;
      var opts = 'status=1,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
      var url = "http://twitter.com/share?text=" + message + "&url=" + encodeURI(link);
      window.open(url, 'twitter', opts);
    }

  };
  function prepareZeroClipboard () {
      $(DEFAULTS.list + ' li').each(function (){
        //Test if it is a copy link element
        //We have to activate the flash button here and not on the on click.
        if ($(this).data('standard-share') === 'copy-link') {
          var link = $(this).data('standard-link');
          if (typeof ZeroClipboard !== 'undefined') {
            DEFAULTS.clipboardClient = new ZeroClipboard($(this));
            DEFAULTS.clipboardClient.on( 'ready', function(){

            });
            DEFAULTS.clipboardClient.on( 'copy', function(event) {
              event.clipboardData.setData('text/plain', link);
            });

            DEFAULTS.clipboardClient.on( 'error', function() {
              // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
              ZeroClipboard.destroy();
            });
          }


        }
      });

    }
  return {
    shareList: function () {
      var myArguments = arguments[0] || {};
      var list = myArguments.list || DEFAULTS.list;
      DEFAULTS.list = list; //Sets list
      prepareZeroClipboard();
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


// Export to the root, which is probably `window`.
//root.StandardShare = StandardShare;
