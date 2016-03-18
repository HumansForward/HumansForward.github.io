/**
 * home.js
 * Handle scrolling and various home page actions
 */

define(["jquery", "lodash", "visualizers/arcs/main", "velocity", "wow", "bootstrap", "ie10fix"], function($, _, Vis) {
  "use strict";

  $(function() {
    new WOW().init();

    // Update navbar links, animate scrolling
    $("body").scrollspy({
      target: "#homeNavbar",
      offset: 90
    });
    $("a.hf-scroll-link").click(function(e) {
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
        $("#homeNavbar").addClass("hf-scrolled");
        $(".hf-cover-link").addClass("hf-scrolled");
      } else {
        $("#homeNavbar").removeClass("hf-scrolled");
        $(".hf-cover-link").removeClass("hf-scrolled");
      }
    });

    // Email link, resist bots
    $("a.hf-email").click(function(e) {
      e.preventDefault();

      window.location.href = "mailto:hel" + "lo@humansf" + "orward.com" + "?subject=Hello";
    });

    // Cover visualizer
    var vis = new Vis($("#mainVisual"), $("#homeCover"));
    vis.start();
    $(window).on("resize", _.debounce(vis.resize.bind(vis), 500));

  });
});
