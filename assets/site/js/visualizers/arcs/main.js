/**
 * arcs/main.js
 * Home page cover visualizer adapted from:
 * https://github.com/jfirebaugh/animations/blob/master/posts/2015-01-05-arcs.html
 */

define(["jquery", "d3"], function($, d3) {
  "use strict";

  function Vis(container, elemToFit) {
    this.container = container;
    this.elemToFit = elemToFit;
    this.unitSize = [100, 100];
  };

  Vis.prototype.resize = function() {
    var self = this;
    var width = self.elemToFit.outerWidth(),
        height = self.elemToFit.outerHeight();
    var scale = Math.max(width/self.unitSize[0], height/self.unitSize[1]);

    self.svg.attr("width", width).attr("height", height);
    self.g.attr("transform",
      "translate(" + width / 2 + "," + height / 2 +
      ") scale(" + scale + "," + scale +
      ") rotate(0)");
  };

  Vis.prototype.start = function() {
    var self = this;
    var n = 10; // number of segments
    var pie = d3.layout.pie()
        .value(Math.random)
        .sort(null);
    var data = pie(d3.range(0, n)).map(function(d) {
        d.innerRadius = Math.random() * self.unitSize[0] / 4;
        d.outerRadius = Math.random() * self.unitSize[0] / 4 + d.innerRadius;
        return d;
    });
    var arc = d3.svg.arc();
    var svg = d3.select(self.container.get(0)).append("svg");
    var g = svg.append("g");

    self.svg = svg;
    self.g = g;
    self.resize(); // initial sizing

    //
    // Primary animation: rotate
    // JSS: Don't rotate since it kills CPU!
    //
    // (function loop1() {
    //     g.transition()
    //         .ease("linear")
    //         .duration(3600000)
    //         .attrTween("transform", function() {
    //             return function(t) {
    //                 return "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 360 * t + ")"
    //             }
    //         })
    //         .each("end", loop1)
    // })();

    //
    // Secondary animation: in-and-out
    //
    var colors = ["#ff7a00", "#ff9900", "#48bb7e", "#3299bb", "#bcbcbc"];
    var fill = function(d, i) {
      return colors[Math.floor(Math.random() * colors.length)];
    };
    var fillOpacity = function(d) { return Math.random(); };
    var path = g.selectAll("path")
        .data(pie(data))
      .enter().append("path")
        .attr("d", arc)
        .attr("fill", fill)
        .attr("fill-opacity", fillOpacity);
    (function loop2() {
        path.transition()
            .duration(2000)
            .attr("fill", fill)
            .attr("fill-opacity", fillOpacity)
            .attrTween("d", tweenArc(function(d, i) {
                var inner = Math.random() * self.unitSize[0] / 4,
                    outer = Math.random() * self.unitSize[0] / 4 + inner;
                return {
                  innerRadius: inner,
                  outerRadius: outer
                };
            }));
        setTimeout(loop2, 10000);
    })();
    function tweenArc(b) {
      return function(a, i) {
        var d = b.call(this, a, i), i = d3.interpolate(a, d);
        for (var k in d) a[k] = d[k]; // update data
        return function(t) { return arc(i(t)); };
      };
    }
  };

  return Vis;

});
