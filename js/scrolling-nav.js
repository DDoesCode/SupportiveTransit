(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

      // Get the navbar element
      var navbar = document.getElementById("mainNav");
    
      // Track previous scroll position
      var lastScrollTop = 0;
    
      // Add scroll event listener
      window.addEventListener("scroll", function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        if (scrollTop > lastScrollTop) {
          // Scrolling down, hide the navbar
          navbar.style.top = "-70px"; // Adjust height based on your navbar's height
        } else {
          // Scrolling up, show the navbar
          navbar.style.top = "0";
        }
    
        // Update lastScrollTop with the new position
        lastScrollTop = scrollTop;
      });
    

})(jQuery); // End of use strict
