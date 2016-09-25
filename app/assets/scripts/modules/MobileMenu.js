import $ from 'jquery';

class MobileMenu {
  constructor() {
    this.menuIcon = $(".header__menu-icon");
    this.menuContent = $(".header__menu-content");
    this.header = $(".header");
    this.events();
  }

  events() {
    this.menuIcon.click(this.toggleMenu.bind(this));
  }

  toggleMenu() {
    this.menuContent.toggleClass("header__menu-content--visible");
    this.header.toggleClass("header--expanded");
    this.menuIcon.toggleClass("header__menu-icon--cross")
  }
}

export default MobileMenu;
