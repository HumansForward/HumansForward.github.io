/**
 * star-trails/main.js
 * Home page cover visualizer adapted from:
 * https://github.com/jfirebaugh/animations/blob/master/posts/2015-01-06-star-trails.html
 */

define(["d3"], function(d3) {
  "use strict";

  function Vis(container) {

  };

  Vis.prototype.resize = function() {

  };

  Vis.prototype.start = function() {
    var width = 2000,
        height = 1000,
        n = 2000;
    var data = d3.range(0, n).map(function() {
        return {
            r: Math.random() * width * 1.5,
            t: Math.random() * Math.PI * 2
        };
    });
    var g = d3.select("#mainVisual").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "#111")
      .append("g")
        .attr("transform", "translate(" + (Math.random() * width / 2) + "," +
                                          (Math.random() * height / 2) + ")");
    g.selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("fill", "none")
        .attr("stroke", "#FFF")
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", function() { return Math.random(); })
        .attr("stroke-width", function() { return Math.random() * 3; })
      .transition()
        .ease("linear")
        .duration(1000000)
        .attrTween("d", pathTween);

    function pathTween(d) {
        function p(t) {
            return [d.r * Math.cos(d.t + t), d.r * Math.sin(d.t + t)];
        }
        return function(t) {
            return "M" + p(0) + " A" + d.r + "," + d.r + " 0 " + (t < 0.5 ? 0 : 1) + " 1 " + p(t * Math.PI * 2);
        }
    }
  };

  return Vis;

});
