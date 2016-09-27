import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';


var mobileMenu = new MobileMenu();
var stickyHeader = new StickyHeader();
new RevealOnScroll(".feature-item", "85%");
new RevealOnScroll(".testimonial", "60%");
var modal = new Modal;
