/**
 * home.js
 * Handle scrolling and various home page actions
 */

define(["jquery", "lodash", "visualizers/arcs/main", "velocity", "wow", "bootstrap", "ie10fix"], function($, _, Vis) {
  "use strict";

  $(function() {
    new WOW().init();

    var navbar = "#homeNavbar";

    // Update navbar links, animate scrolling
    $("body").scrollspy({
      target: navbar,
      offset: 90
    });
    $(navbar + ' a').click(function(e) {
      e.preventDefault();

      $(this.hash).velocity("scroll", {
        duration: 500,
        easing: "swing",
        offset: -30
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

    // Email link, resist bots
    $('a.hf-email').click(function(e) {
      e.preventDefault();

      window.location.href = "mailto:hel" + "lo@humansf" + "orward.com" + "?subject=Hello";
    });

    // Cover visualizer
    var vis = new Vis($("#mainVisual"), $("#homeCover"));
    vis.start();
    $(window).on("resize", _.debounce(vis.resize.bind(vis), 500));

  });
});
