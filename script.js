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
  
  document.querySelectorAll('.submenu').forEach(submenu => {
    submenu.addEventListener('click', (e) => { e.stopPropagation(); });
  });
  
  
  // --- Swiper Section JS Start ---
  
  const categories = [
    { img: 'assests/birthdayFlower.svg', mobileImg: 'assests/mobileBirthdayFlower.svg', title: 'Birthday Flowers', link: '#' },
    { img: 'assests/getWellFlower.svg', mobileImg: 'assests/mobileGetWell.svg', title: 'Get Well Flowers', link: '#' },
    { img: 'assests/sympathy.svg', mobileImg: 'assests/mobileSympathy.svg', title: 'Sympathy', link: '#' },
    { img: 'assests/loveAndRomance.svg', mobileImg: 'assests/mobileLove.svg', title: 'Love & Romance', link: '#' },
    { img: 'assests/anniversary.svg', mobileImg: 'assests/birthdayFlower-mobile.svg', title: 'Anniversary', link: '#' },
    { img: 'assests/newBaby.svg', mobileImg: 'assests/birthdayFlower-mobile.svg', title: 'New Baby', link: '#' },
    { img: 'assests/thankYou.svg', mobileImg: 'assests/birthdayFlower-mobile.svg', title: 'Thank You', link: '#' },
    { img: 'assests/congratulations.svg', mobileImg: 'assests/birthdayFlower-mobile.svg', title: 'Congratulations', link: '#' },
    { img: 'assests/getWellSoon.svg', mobileImg: 'assests/birthdayFlower-mobile.svg', title: 'Get Well Soon', link: '#' },
    { img: 'assests/sorry.svg', mobileImg: 'assests/birthdayFlower-mobile.svg', title: 'Sorry', link: '#' },
    { img: 'assests/missYou.svg', mobileImg: 'assests/birthdayFlower-mobile.svg', title: 'Miss You', link: '#' },
    { img: 'assests/goodLuck.svg', mobileImg: 'assests/birthdayFlower-mobile.svg', title: 'Good Luck', link: '#' }
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
        <h3 class="category-button">${category.title}</h3>
      </a>
    `;
    swiperWrapper.appendChild(slide);
  });
  
  // --- Mobile Screen Image Update ---
  function updateImages() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    document.querySelectorAll('.swiper-slide img').forEach((img, index) => {
      img.src = isMobile ? categories[index].mobileImg : categories[index].img;
    });
  }
  updateImages();
  window.addEventListener('resize', updateImages);
  
  // --- Custom Slider Functionality with Touch Support and Pagination ---
  
  const swiper = document.getElementById('swiper'); // Ensure your swiper container has id="swiper"
  const paginationContainer = document.querySelector('.custom-pagination');
  
  // Number of pagination dots (pages)
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
      dot.classList.add('swiper-pagination-bullet');
      if (i === 0) dot.classList.add('swiper-pagination-bullet-active');
      dot.addEventListener('click', () => {
        currentGroup = i;
        snapToGroup();
        updatePagination();
        prevTranslate = -currentGroup * swiper.clientWidth;
      });
      paginationContainer.appendChild(dot);
    }
  }
  
  function updatePagination() {
    const dots = document.querySelectorAll('.custom-pagination .swiper-pagination-bullet');
    dots.forEach((dot, index) => {
      if (index === currentGroup) {
        dot.classList.add('swiper-pagination-bullet-active');
      } else {
        dot.classList.remove('swiper-pagination-bullet-active');
      }
    });
  }
  
  // --- Touch (Swipe) Support ---
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
    // Calculate new translate value and clamp it within boundaries:
    const containerWidth = swiper.clientWidth;
    const maxTranslate = 0; // cannot drag right beyond first slide
    const minTranslate = -((groups - 1) * containerWidth); // cannot drag left beyond last group
    let newTranslate = prevTranslate + deltaX;
    newTranslate = Math.min(maxTranslate, Math.max(minTranslate, newTranslate));
    currentTranslate = newTranslate;
    swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
    e.preventDefault();
  });
  
  swiper.addEventListener('touchend', () => {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    // If swipe exceeds 50px threshold, update currentGroup accordingly
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
  });
  
  // --- Initialize Swiper Slider ---
  createPagination();
  snapToGroup();
});
