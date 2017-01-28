(() => {
  'use strict';

  const initResponsiveNav = () => {
    const breakpoint = window.getComputedStyle(document.querySelector('html'), ':before').content;
    const navbar = document.querySelector('.guide-nav1');
    const navOpenBtn = document.querySelector('.guide-header .btn-open');
  }

  const initPage = () => {
    // Initialize responsive navigation on window resize
    window.addEventListener("resize", resizeThrottler(), false);

    document.querySelector('html').classList.add('js');
    document.querySelector('html').classList.remove('no-js');
    initResponsiveNav();
  }


  // Adapted from MDN https://developer.mozilla.org/en-US/docs/Web/Events/resize
  let resizeTimeout = false;
  const resizeThrottler = () => {
    // ignore resize events as long as an initResponsiveNav execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout( () => {
        resizeTimeout = null
        initResponsiveNav();
       // The actualResizeHandler will execute at a rate of 15fps
       }, 66);
    }
  }

  // Initialize responsive navigation after HTML has loaded
  document.addEventListener('DOMContentLoaded', initPage());

})();
