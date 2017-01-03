(() => {
  'use strict';

  function initLaunchers() {
    // This function is called first, to initialize
    // the click listeners on the menu launchers.
    const dropdowns = document.querySelectorAll('.dropdown');
    for(let i = 0; i < dropdowns.length; i++) {
      let launcher = dropdowns[i].querySelector('.dropdown-launcher');
      let menu = dropdowns[i].querySelector('.dropdown-menu');

      launcher.addEventListener('click', launchDropdown);
      menu.setAttribute('hidden', 'hidden');
    }
  }

  function launchDropdown(e) {
    let launcher = e.target;
    let container = launcher.parentElement;
    let menu = container.querySelector('.dropdown-menu');

    launcher.blur();
    closeDropdowns();
    menu.removeAttribute('hidden');
    window.setTimeout( () => { launcher.setAttribute('aria-expanded', 'true');}, 50);
    document.addEventListener('click', closeDropdowns);
    e.stopPropagation();
    e.preventDefault();
    menu.focus();
  }

  function closeDropdowns() {
    // Select these elements at runtime instead of at startup,
    // so we can select new menus as they are added to the DOM.
    let openLaunchers = document.querySelectorAll('.dropdown-launcher[aria-expanded="true"]');
    let openMenus = document.querySelectorAll('.dropdown-launcher[aria-expanded="true"] + .dropdown-menu');

    for(let i = 0; i < openLaunchers.length; i++) {
      openLaunchers[i].parentElement.focus();
      openLaunchers[i].setAttribute('aria-expanded', 'false');
      hideMenu(openMenus[i]);
    }
    document.removeEventListener('click', closeDropdowns);
  }

  function hideMenu(thisMenu) {
    // This is defined as a specific function, so it can be called
    // multiple times, and multiple instances could run independently
    // of the timeout.
    setTimeout( () => {thisMenu.setAttribute('hidden', 'hidden')}, 300 );
  }

  document.addEventListener('DOMContentLoaded', initLaunchers());
})();
