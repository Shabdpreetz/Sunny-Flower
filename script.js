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
      submenu.addEventListener('click', (e) => {e.stopPropagation()
        
      });
    });
  });
  




  // swiper section js start

  const categories = [
    { img: 'https://picsum.photos/seed/1/100/100', title: 'Birthday Flowers', link: 'https://example.com/birthday' },
    { img: 'https://picsum.photos/seed/2/100/100', title: 'Get Well Flowers', link: 'https://example.com/getwell' },
    { img: 'https://picsum.photos/seed/3/100/100', title: 'Sympathy', link: 'https://example.com/sympathy' },
    { img: 'https://picsum.photos/seed/4/100/100', title: 'Love & Romance', link: 'https://example.com/love' },
    { img: 'https://picsum.photos/seed/5/100/100', title: 'Anniversary', link: 'https://example.com/anniversary' },
    { img: 'https://picsum.photos/seed/6/100/100', title: 'New Baby', link: 'https://example.com/newbaby' },
    { img: 'https://picsum.photos/seed/7/100/100', title: 'Thank You', link: 'https://example.com/thankyou' },
    { img: 'https://picsum.photos/seed/8/100/100', title: 'Congratulations', link: 'https://example.com/congratulations' },
    { img: 'https://picsum.photos/seed/9/100/100', title: 'Get Well Soon', link: 'https://example.com/getwellsoon' },
    { img: 'https://picsum.photos/seed/10/100/100', title: 'Sorry', link: 'https://example.com/sorry' },
    { img: 'https://picsum.photos/seed/11/100/100', title: 'Miss You', link: 'https://example.com/missyou' },
    { img: 'https://picsum.photos/seed/12/100/100', title: 'Good Luck', link: 'https://example.com/goodluck' }
  ];
  
  const swiperWrapper = document.getElementById('swiper-wrapper');
  // Insert slides dynamically
  categories.forEach(category => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
      <a href="${category.link}" class="category-card">
        <div class="image-container">
          <img src="${category.img}" alt="${category.title}" />
        </div>
        <button class="category-button">${category.title}</button>
      </a>
    `;
    swiperWrapper.appendChild(slide);
  });
  
  /* --- Custom Slider Functionality with Touch Support --- */
  const swiper = document.getElementById('swiper');
  const paginationContainer = document.querySelector('.custom-pagination');
  
  // Force slider to have exactly 3 pages (3 dots)
  const groups = 3;
  let currentGroup = 0;
  
  function snapToGroup() {
    const containerWidth = swiper.clientWidth;
    const translateX = -currentGroup * containerWidth;
    swiperWrapper.style.transition = "transform 0.3s ease";
    swiperWrapper.style.transform = `translateX(${translateX}px)`;
  }
  
  function createPagination() {
    paginationContainer.innerHTML = "";
    for (let i = 0; i < groups; i++) {
      const dot = document.createElement('div');
      dot.classList.add('pagination-dot');
      if(i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentGroup = i;
        snapToGroup();
        updatePagination();
      });
      paginationContainer.appendChild(dot);
    }
  }
  
  function updatePagination() {
    const dots = document.querySelectorAll('.custom-pagination .pagination-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentGroup);
    });
  }
  
  /* Touch (Swipe) Support */
  let startX = 0, currentTranslate = 0, prevTranslate = 0, isDragging = false;
  swiper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    swiperWrapper.style.transition = "none";
  });
  
  swiper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + deltaX;
    swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
  });
  
  swiper.addEventListener('touchend', () => {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    if (Math.abs(movedBy) > 50) {
      if (movedBy < 0 && currentGroup < groups - 1) {
        currentGroup++;
      } else if (movedBy > 0 && currentGroup > 0) {
        currentGroup--;
      }
    }
    snapToGroup();
    prevTranslate = -currentGroup * swiper.clientWidth;
    updatePagination();
  });
  
  window.addEventListener('resize', () => {
    snapToGroup();
    prevTranslate = -currentGroup * swiper.clientWidth;
    // (Optional) Recreate pagination if needed
  });
  
  // Initialize
  createPagination();
  snapToGroup();


  // swiper section js end