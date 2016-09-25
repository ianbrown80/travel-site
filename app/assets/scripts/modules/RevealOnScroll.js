import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints.js';


class RevealOnScroll {
  constructor(element, offset) {
    this.itemsToReveal = $(element);
    this.hideInitially();
    this.createWaypoints(offset);
  }

  hideInitially() {
    this.itemsToReveal.addClass("hide-item");
  }
  createWaypoints(offset) {
    this.itemsToReveal.each(function() {
      var currentItem = this;
      new Waypoint({
        element: currentItem,
        handler: function() {
          $(currentItem).addClass("hide-item--show");
        },
        offset: offset
      });
    });
  }


 }

export default RevealOnScroll;
