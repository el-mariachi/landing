/**
 * 
 * and highlights section in viewport upon scrolling.
 * 
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
(function (global) {

    /**
     * Define Global Variables
     * 
    */
    // class name constants
    const MENU_OPEN = 'menu--open';
    const MENU_ACTIVE = 'menu--active';
    const MENU_STICKY = 'menu--sticky';
    const MENU_ITEM = 'menu__item';
    const MENU_LINK = 'menu__link';
    const SECTION_ACTIVE = 'section--active';
    // element references
    // menu and menuBurger refs are used for burger menu on small screens
    const menu = document.querySelector('.menu');
    const menuBurger = menu.querySelector('.burger');
    // menuBody needs to be global because it's used by two independant evt handlers
    // it's contents is dynamic, but the element itself is a const
    const menuBody = document.querySelector('.menu__body');
    const main = document.querySelector('.content');
    // for sections we'll use an HTMLCollection because it's live
    // to allow adding sections to the DOM
    let sections = main.getElementsByClassName('section');
    // a corresponding menu items collection
    let menuItems = menuBody.getElementsByClassName(MENU_ITEM);
    // scroll to top button
    const goUpBtn = document.querySelector('.goup');

    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */
    const toggleMenu = () => {
        menu.classList.toggle(MENU_OPEN);
    }
    const closeMenu = () => {
        menu.classList.remove(MENU_OPEN);
    }
    const showGoUpButton = () => {
        if (window.scrollY > 250) {
            goUpBtn.style.display = 'block';
        } else {
            goUpBtn.style.display = 'none';
        }
    }
    const stickMenu = () => {
        if (window.scrollY > 136) {
            menu.classList.add(MENU_STICKY);
        } else {
            menu.classList.remove(MENU_STICKY);
        }
    }
    /**
     * End Helper Functions
     * Begin Main Functions
     * 
    */

    // build the nav
    const buildNav = () => {
        const fragment = document.createDocumentFragment();
        Array.prototype.forEach.call(sections, section => {
            const menuItem = document.createElement('li');
            menuItem.className = MENU_ITEM;
            const menuLink = document.createElement('a');
            menuLink.className = MENU_LINK;
            menuLink.href = `#${section.id}`;
            menuLink.textContent = section.dataset.nav;
            menuItem.append(menuLink);
            fragment.append(menuItem);
        });
        menuBody.innerHTML = ''; // reset menu
        menuBody.append(fragment);
    }

    // Add class 'active' to section when near top of viewport
    const activateSection = () => {
        // a section is considered Active if it crosses a line at 25% down the viewport
        const lineAt25 = Math.floor(document.documentElement.clientHeight / 4);
        const sectionsArray = Array.from(sections);
        // in our case the bottom of a section === the top of the next one
        const coordinates = sectionsArray.map(section => section.getBoundingClientRect().top);
        // initially all contents is below that line
        let match = 0; // this is the initial Active item
        for (let i = 0, l = coordinates.length; i < l; i++) {
            if (coordinates[i] > lineAt25) {
                break; // we're done looping, this is our section
            }
            match = i;
        }
        // unset active state from all items
        for (let i = 0, l = sections.length; i < l; i++) {
            sections[i].classList.remove(SECTION_ACTIVE);
            menuItems[i].classList.remove(MENU_ACTIVE);
        }
        // set active state in matched section and menu item
        sectionsArray[match].classList.add(SECTION_ACTIVE);
        menuItems[match].classList.add(MENU_ACTIVE);
    }

    // Scroll to anchor ID using scrollTO event
    const scrollToSection = evt => {
        evt.preventDefault(); // do not follow link
        const link = evt.target;
        if (link.className !== MENU_LINK) {
            return;
        }
        const anchorName = link.href.split('/').pop();
        const targetSection = main.querySelector(anchorName);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        closeMenu();
    }

    // scroll to top
    const goup = () => {
        document.documentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    /**
     * End Main Functions
     * Begin Events
     * 
    */

    // listen to dom modification
    const config = { childList: true };
    const observer = new MutationObserver(buildNav);
    observer.observe(main, config);
    // Scroll to section on link click
    menuBody.addEventListener('click', scrollToSection);
    goUpBtn.addEventListener('click', goup);
    // Set sections as active
    document.addEventListener('scroll', activateSection);
    document.addEventListener('scroll', showGoUpButton);
    document.addEventListener('scroll', stickMenu);
    menuBurger.addEventListener('click', toggleMenu);
    // initialize document upon load
    document.addEventListener('DOMContentLoaded', () => {
        buildNav();
        // document.documentElement.scrollIntoView(true);
        activateSection();
        showGoUpButton();
    });
    // the following restricts the browser from restoring the scroll position upon refresh
    window.addEventListener('unload', () => {
        window.scrollTo(0, 0);
    });
})(window);


// test section

const aSection = document.createElement('section');
aSection.id = 'section6';
aSection.className = 'section';
aSection.dataset.nav = 'TestItem';
const testHeader = document.createElement('h2');
testHeader.className = 'section__heading';
testHeader.textContent = 'Test Section';
aSection.appendChild(testHeader);
document.querySelector('main').appendChild(aSection);