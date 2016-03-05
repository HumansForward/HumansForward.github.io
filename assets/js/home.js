
$(function() {
  "use strict";

  $(window).scroll(function() {
    if ($(document).scrollTop() > 100) {
      $('#homeNavbar.navbar').addClass('hf-scrolled');
    } else {
      $('#homeNavbar.navbar').removeClass('hf-scrolled');
    }
  });
});
