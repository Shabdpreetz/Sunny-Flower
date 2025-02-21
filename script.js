// Closes the sale banner
function closeBanner() {
    document.getElementById("upper-wrap").style.display = "none";
  }
  
  // Toggle the mobile menu and overlay
  function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    mobileMenu.classList.toggle('active');
    overlay.style.display = mobileMenu.classList.contains('active') ? 'block' : 'none';
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    // --- Desktop Mega Menu Functionality ---
    const flowerMenu = document.getElementById("flower-menu");
    const megaMenu = document.querySelector('.mega-menu');
  
    if (flowerMenu && megaMenu) {
      flowerMenu.addEventListener("click", function (event) {
        event.preventDefault();
        megaMenu.classList.toggle("active");
        event.stopPropagation();
      });
    }
  
    document.addEventListener("click", function (event) {
      if (flowerMenu && megaMenu &&
          !flowerMenu.contains(event.target) &&
          !megaMenu.contains(event.target)) {
        megaMenu.classList.remove("active");
      }
    });
  
    if (megaMenu) {
      megaMenu.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }
  
    // --- Mobile Submenu Functionality ---
    // Attach click events to anchors directly inside .has-submenu elements.
    const submenuLinks = document.querySelectorAll('.has-submenu > a');
    submenuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent link navigation
        const parent = this.parentElement;
        parent.classList.toggle('active');
  
        // Optional: close other submenus when one is opened
        document.querySelectorAll('.has-submenu').forEach(item => {
          if (item !== parent) {
            item.classList.remove('active');
          }
        });
      });
    });
  
    // Prevent clicks inside the submenu from bubbling up.
    document.querySelectorAll('.submenu').forEach(submenu => {
      submenu.addEventListener('click', (e) => e.stopPropagation());
    });
  });
  