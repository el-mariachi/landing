/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
(function () {

    /**
     * Define Global Variables
     * 
    */
    // class name constants
    const MENU_OPEN = 'menu--open';
    // element references
    const menu = document.querySelector('.menu')
    const menuBody = document.querySelector('.menu__body')
    const menuBurger = document.querySelector('.burger')

    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */
    function toggleMenu(e) {
        menu.classList.toggle(MENU_OPEN);
    }


    /**
     * End Helper Functions
     * Begin Main Functions
     * 
    */

    // build the nav


    // Add class 'active' to section when near top of viewport


    // Scroll to anchor ID using scrollTO event


    /**
     * End Main Functions
     * Begin Events
     * 
    */

    // Build menu 

    // Scroll to section on link click

    // Set sections as active
    menuBurger.addEventListener('click', toggleMenu);
})();

