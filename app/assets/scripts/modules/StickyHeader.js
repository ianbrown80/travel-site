import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints.js';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.header = $(".header");
    this.trigger = $(".large-hero__title");
    this.createHeaderWaypoint();
    this.pageSections = $(".page-section");
    this.headerLinks = $(".primary-nav a");
    this.createPageSectionWaypoints();
    this.addSmoothScroll();
  }

  addSmoothScroll() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint() {
    var self = this;
    new Waypoint({
      element: this.trigger[0],
      handler: function(direction) {
        if (direction == "down") {
          self.header.addClass("header--dark");
        } else {
          self.header.removeClass("header--dark");
        }
      }
    });
  }

  createPageSectionWaypoints() {
    var that = this;
    this.pageSections.each(function() {
      var currentPageSection = this;
      new Waypoint({
        element : currentPageSection,
        handler : function(direction) {
          if (direction == "down") {
            var headerLink = $(currentPageSection).data("link");
            that.headerLinks.removeClass("current-link");
            $(headerLink).addClass("current-link");
          }
        },
        offset : "18%"
      });
      new Waypoint({
        element : currentPageSection,
        handler : function(direction) {
          if (direction == "up") {
            var headerLink = $(currentPageSection).data("link");
            that.headerLinks.removeClass("current-link");
            $(headerLink).addClass("current-link");
          }
        },
        offset : "-40%"
      })
    })
  }
}

export default StickyHeader;
