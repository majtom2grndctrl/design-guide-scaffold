(() => {
  'use strict';

  function initResponsiveNav() {
    const breakpoint = window.getComputedStyle(document.querySelector('html'), ':before').content
    const navOpenBtn = document.querySelector('.guide-nav1-container .btn-open')
    const menu = document.querySelector('.guide-nav1')
    console.log(breakpoint)

    if (breakpoint == '"small"' || breakpoint == '"medium"') {
      const expanded = navOpenBtn.getAttribute('aria-expanded')
      if (expanded === null) {
        navOpenBtn.setAttribute('aria-expanded', 'false')
      }
      navOpenBtn.removeAttribute('hidden')
      navOpenBtn.addEventListener('click', toggleNav, false)
      menu.setAttribute('hidden', 'hidden')
    } else {
      navOpenBtn.removeAttribute('aria-expanded')
      navOpenBtn.removeEventListener('click', toggleNav, false)
      navOpenBtn.setAttribute('hidden', 'hidden')
      menu.removeAttribute('hidden')
    }
  }

  function initPage() {
    const navOpenBtn = document.querySelector('.guide-nav1-container .btn-open')
    const navMenu = document.querySelector('.guide-nav1')
    console.log('initPage fired')
    // Initialize responsive navigation on window resize
    window.addEventListener('resize', resizeThrottler, false)

    document.querySelector('html').classList.add('js')
    document.querySelector('html').classList.remove('no-js')

    initResponsiveNav()
  }


  // Adapted from MDN https://developer.mozilla.org/en-US/docs/Web/Events/resize
  let resizeTimeout = false;
  function resizeThrottler(e) {
    // ignore resize events as long as an initResponsiveNav execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout( () => {
        resizeTimeout = null
        initResponsiveNav()
        // initResponsiveNav will execute at a rate of 15hz
       }, 66)
    }
  }

  function toggleNav(e) {
    const navOpenBtn = e.target
    const btnExpanded = navOpenBtn.getAttribute('aria-expanded')
    if ( btnExpanded === 'true' ) {
      console.log('true')
      closeNav(e)
    } else if (btnExpanded === 'false') {
      console.log('false')
      openNav(e)
    } else {
      console.log('Neither true nor false')
    }
  }

  function openNav(e) {
    const navOpenBtn = e.target
    const navMenu = e.target.parentElement.querySelector('.guide-nav1')
    navMenu.removeAttribute('hidden')
    e.stopPropagation()
    document.addEventListener('click', closeNav, false)
    window.setTimeout( () => {
      navOpenBtn.setAttribute('aria-expanded', 'true')
    }, 10)
  }

  function closeNav(e) {
    console.log('closeNav() fired')
    console.log(e.target)

    const navOpenBtn = document.querySelector('.guide-nav1-container .btn-open')
    const navMenu = document.querySelector('.guide-nav1')
    navOpenBtn.setAttribute('aria-expanded', 'false')
    document.removeEventListener('click', closeNav, false)
    window.setTimeout( () => {navMenu.setAttribute('hidden', 'hidden')}, 500)
  }

  // Initialize responsive navigation after HTML has loaded
  //document.addEventListener('DOMContentLoaded', initPage, false);
  if (document.readyState == 'interactive') {
    console.log('Doc already ready')
    return initPage()
  } else {
    console.log('Doc wasn’t ready')
    document.addEventListener('DOMContentLoaded', initPage, true)
  }
})();
