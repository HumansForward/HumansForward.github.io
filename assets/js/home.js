// Home page helpers

$(function() {
  "use strict";

  var navbar = "#homeNavbar";

  // Update navbar links, animate scrolling
  $('body').scrollspy({
    target: navbar,
    offset: 50
  });
  $(navbar + ' a').click(function(e) {
    e.preventDefault();

    $(this.hash).velocity("scroll", {
      duration: 500,
      easing: "swing",
      offset: -50
    });
  });

  // Adjust nav size and opacity on scroll
  $(window).scroll(function() {
    if ($(document).scrollTop() > 100) {
      $(navbar).addClass('hf-scrolled');
    } else {
      $(navbar).removeClass('hf-scrolled');
    }
  });

  // Resist bots
  $('a.hf-email').click(function(e) {
    e.preventDefault();

    window.location.href = "mailto:hel" + "lo@humansf" + "orward.com" + "?subject=Hello";
  });
});
