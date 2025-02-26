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



// Top selling products css start


 // Product Data Array
 const products = [
  {
    image: "./assests/Paste-image.svg",
    title: "Positively Fresh",
    rating: 5,
    discountedPrice: 143.0,
    originalPrice: 230.0,
    sale: true // Set sale to true for demonstration
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Green Bouquet",
    rating: 4,
    discountedPrice: 99.0,
    originalPrice: 120.0
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Blue Roses",
    rating: 3,
    discountedPrice: 75.0,
    originalPrice: 100.0,
    sale: true
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Roses",
    rating: 2,
    discountedPrice: 65.0,
    originalPrice: 90.0
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Blue Roses",
    rating: 3,
    discountedPrice: 75.0,
    originalPrice: 100.0
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Blue Roses",
    rating: 3,
    discountedPrice: 75.0,
    originalPrice: 100.0
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Blue Roses",
    rating: 3,
    discountedPrice: 75.0,
    originalPrice: 100.0
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Blue Roses",
    rating: 3,
    discountedPrice: 75.0,
    originalPrice: 100.0
  }
];

// Function to generate star ratings
function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += '<span class="black-star">★</span>';
    } else {
      stars += '<span class="gray-star">★</span>';
    }
  }
  return stars;
}

const container = document.getElementById("products-container");

products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  // Create an image container for positioning
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  imageContainer.style.position = "relative";

  // Create the image element
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  imageContainer.appendChild(img);

  // Check for sale property and add the label if true
  if (product.sale) {
    const saleLabel = document.createElement("div");
    
    saleLabel.className = "sale-label";
    saleLabel.textContent = "Sale";
    saleLabel.style.position = "absolute";
    saleLabel.style.top = "10px";
    saleLabel.style.left = "10px";
    saleLabel.style.backgroundColor = "#1BA97F";
    saleLabel.style.color = "white";
    saleLabel.style.padding = "6px 13px";
    saleLabel.style.fontSize = "16px";
    saleLabel.style.borderRadius = "7px";
    saleLabel.style.fontWeight = "600";
    imageContainer.appendChild(saleLabel); 
  }

  function updateSaleLabelResponsiveStyles() {
    const saleLabels = document.querySelectorAll('.sale-label');
    if (window.matchMedia('(max-width: 425px)').matches) {
      saleLabels.forEach(label => {
        label.style.fontSize = "12px";
        label.style.padding = "6px 10px";
      });
    } else {
      saleLabels.forEach(label => {
        label.style.fontSize = "16px";
        label.style.padding = "6px 13px";
      });
    }
  }
  
  // Run on initial load and update on resize
  window.addEventListener('resize', updateSaleLabelResponsiveStyles);
  updateSaleLabelResponsiveStyles();
  

  card.appendChild(imageContainer);

  // Create product info container
  const info = document.createElement("div");
  info.className = "product-info";

  const rating = document.createElement("div");
  rating.className = "rating";
  rating.innerHTML = generateStars(product.rating);

  const title = document.createElement("div");
  title.className = "product-title";
  title.textContent = product.title;

  const price = document.createElement("div");
  price.className = "price";
  price.innerHTML = `
    $${product.discountedPrice.toFixed(2)}
    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
  `;

  const viewBtn = document.createElement("a");
  viewBtn.className = "view-product";
  viewBtn.href = "#";
  viewBtn.textContent = "View Product";

  info.appendChild(rating);
  info.appendChild(title);
  info.appendChild(price);

  card.appendChild(info);
  card.appendChild(viewBtn);

  container.appendChild(card);
});



// Top selling products js end


// Birthday floer product js starts 

// Birthday Products Data Array
const birthdayProducts = [
  {
    image: "./assests/Paste-image.svg",
    title: "Birthday Bouquet",
    rating: 5,
    discountedPrice: 75.00,
    originalPrice: 100.00,
    sale: true // Added sale property to show the label
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Celebration Blooms",
    rating: 4,
    discountedPrice: 65.00,
    originalPrice: 90.00
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Cheerful Petals",
    rating: 3,
    discountedPrice: 55.00,
    originalPrice: 80.00
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Joyful Arrangement",
    rating: 4,
    discountedPrice: 85.00,
    originalPrice: 120.00
  }
];

// Function to generate star ratings (same as before)
function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += '<span class="black-star">★</span>';
    } else {
      stars += '<span class="gray-star">★</span>';
    }
  }
  return stars;
}

// Target the birthday products container by its unique id
const birthdayContainer = document.getElementById("birthday-products-container");

birthdayProducts.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  // Create an image container for positioning the sale label
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  imageContainer.style.position = "relative";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  imageContainer.appendChild(img);

  // Check for sale property and add the label if true
  if (product.sale) {
    const saleLabel = document.createElement("div");
    saleLabel.className = "sale-label";
    saleLabel.textContent = "Sale";
    saleLabel.style.position = "absolute";
    saleLabel.style.top = "10px";
    saleLabel.style.left = "10px";
    saleLabel.style.backgroundColor = "#1BA97F";
    saleLabel.style.color = "white";
    saleLabel.style.padding = "6px 13px";
    saleLabel.style.fontSize = "16px";
    saleLabel.style.borderRadius = "7px";
    saleLabel.style.fontWeight = "600";
    imageContainer.appendChild(saleLabel);
  }

  function updateSaleLabelResponsiveStyles() {
    const saleLabels = document.querySelectorAll('.sale-label');
    if (window.matchMedia('(max-width: 425px)').matches) {
      saleLabels.forEach(label => {
        label.style.fontSize = "12px";
        label.style.padding = "6px 10px";
      });
    } else {
      saleLabels.forEach(label => {
        label.style.fontSize = "16px";
        label.style.padding = "6px 13px";
      });
    }
  }
  
  // Run on initial load and update on resize
  window.addEventListener('resize', updateSaleLabelResponsiveStyles);
  updateSaleLabelResponsiveStyles();
  

  card.appendChild(imageContainer);

  const info = document.createElement("div");
  info.className = "product-info";

  const rating = document.createElement("div");
  rating.className = "rating";
  rating.innerHTML = generateStars(product.rating);

  const title = document.createElement("div");
  title.className = "product-title";
  title.textContent = product.title;

  const price = document.createElement("div");
  price.className = "price";
  price.innerHTML = `
    $${product.discountedPrice.toFixed(2)}
    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
  `;

  const viewBtn = document.createElement("a");
  viewBtn.className = "view-product";
  viewBtn.href = "#";
  viewBtn.textContent = "View Product";

  info.appendChild(rating);
  info.appendChild(title);
  info.appendChild(price);

  card.appendChild(info);
  card.appendChild(viewBtn);

  birthdayContainer.appendChild(card);
});




// Birthday floer product js end



// Funeral flower product js start 


// Funeral Products Data Array
const funeralProducts = [
  {
    image: "./assests/Paste-image.svg",
    title: "Sympathy Wreath",
    rating: 4,
    discountedPrice: 89.00,
    originalPrice: 110.00,
    sale: true // Added sale property to show the label
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Elegant Tribute",
    rating: 5,
    discountedPrice: 120.00,
    originalPrice: 150.00
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Restful Blooms",
    rating: 3,
    discountedPrice: 75.00,
    originalPrice: 95.00
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Sincere Remembrance",
    rating: 4,
    discountedPrice: 100.00,
    originalPrice: 130.00
  }
];

// Reuse the same generateStars function (already defined)
function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += '<span class="black-star">★</span>';
    } else {
      stars += '<span class="gray-star">★</span>';
    }
  }
  return stars;
}

// Target the funeral products container by its unique id
const funeralContainer = document.getElementById("funeral-products-container");

funeralProducts.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  // Create an image container for positioning the sale label
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  imageContainer.style.position = "relative";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  imageContainer.appendChild(img);

  // Check for sale property and add the label if true
  if (product.sale) {
    const saleLabel = document.createElement("div");
    saleLabel.className = "sale-label";
    saleLabel.textContent = "Sale";
    saleLabel.style.position = "absolute";
    saleLabel.style.top = "10px";
    saleLabel.style.left = "10px";
    saleLabel.style.backgroundColor = "#1BA97F";
    saleLabel.style.color = "white";
    saleLabel.style.padding = "6px 13px";
    saleLabel.style.fontSize = "16px";
    saleLabel.style.borderRadius = "7px";
    saleLabel.style.fontWeight = "600";
    imageContainer.appendChild(saleLabel);;
    
  }

  function updateSaleLabelResponsiveStyles() {
    const saleLabels = document.querySelectorAll('.sale-label');
    if (window.matchMedia('(max-width: 425px)').matches) {
      saleLabels.forEach(label => {
        label.style.fontSize = "12px";
        label.style.padding = "6px 10px";
      });
    } else {
      saleLabels.forEach(label => {
        label.style.fontSize = "16px";
        label.style.padding = "6px 13px";
      });
    }
  }
  
  // Run on initial load and update on resize
  window.addEventListener('resize', updateSaleLabelResponsiveStyles);
  updateSaleLabelResponsiveStyles();
  

  card.appendChild(imageContainer);

  const info = document.createElement("div");
  info.className = "product-info";

  const ratingEl = document.createElement("div");
  ratingEl.className = "rating";
  ratingEl.innerHTML = generateStars(product.rating);

  const title = document.createElement("div");
  title.className = "product-title";
  title.textContent = product.title;

  const price = document.createElement("div");
  price.className = "price";
  price.innerHTML = `
    $${product.discountedPrice.toFixed(2)}
    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
  `;

  const viewBtn = document.createElement("a");
  viewBtn.className = "view-product";
  viewBtn.href = "#";
  viewBtn.textContent = "View Product";

  info.appendChild(ratingEl);
  info.appendChild(title);
  info.appendChild(price);

  card.appendChild(info);
  card.appendChild(viewBtn);

  funeralContainer.appendChild(card);
});





// Funeral flower product js end



// Get well soon flower product js start

// Get Well Products Data Array
const getWellProducts = [
  {
    image: "./assests/Paste-image.svg",
    title: "Feel Better Bouquet",
    rating: 4,
    discountedPrice: 65.00,
    originalPrice: 80.00,
    sale: true // Added sale property for demonstration
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Cheer Up Blooms",
    rating: 5,
    discountedPrice: 75.00,
    originalPrice: 95.00
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Recovery Roses",
    rating: 3,
    discountedPrice: 55.00,
    originalPrice: 70.00
  },
  {
    image: "./assests/Paste-image.svg",
    title: "Hopeful Arrangements",
    rating: 4,
    discountedPrice: 85.00,
    originalPrice: 105.00
  }
];

// Reuse the same generateStars function (ensure this function is defined)
function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating
      ? '<span class="black-star">★</span>'
      : '<span class="gray-star">★</span>';
  }
  return stars;
}

// Target the Get Well products container by its unique id
const getWellContainer = document.getElementById("getwell-products-container");

getWellProducts.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  // Create an image container for positioning the sale label
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  imageContainer.style.position = "relative";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  imageContainer.appendChild(img);

  // Check for sale property and add the label if true
  if (product.sale) {
    const saleLabel = document.createElement("div");
    saleLabel.className = "sale-label";
    saleLabel.textContent = "Sale";
    saleLabel.style.position = "absolute";
    saleLabel.style.top = "10px";
    saleLabel.style.left = "10px";
    saleLabel.style.backgroundColor = "#1BA97F";
    saleLabel.style.color = "white";
    saleLabel.style.padding = "6px 13px";
    saleLabel.style.fontSize = "16px";
    saleLabel.style.borderRadius = "7px";
    saleLabel.style.fontWeight = "600";
    imageContainer.appendChild(saleLabel);
  }

  function updateSaleLabelResponsiveStyles() {
    const saleLabels = document.querySelectorAll('.sale-label');
    if (window.matchMedia('(max-width: 425px)').matches) {
      saleLabels.forEach(label => {
        label.style.fontSize = "12px";
        label.style.padding = "6px 10px";
      });
    } else {
      saleLabels.forEach(label => {
        label.style.fontSize = "16px";
        label.style.padding = "6px 13px";
      });
    }
  }
  
  // Run on initial load and update on resize
  window.addEventListener('resize', updateSaleLabelResponsiveStyles);
  updateSaleLabelResponsiveStyles();
  

  card.appendChild(imageContainer);

  const info = document.createElement("div");
  info.className = "product-info";

  const ratingEl = document.createElement("div");
  ratingEl.className = "rating";
  ratingEl.innerHTML = generateStars(product.rating);

  const title = document.createElement("div");
  title.className = "product-title";
  title.textContent = product.title;

  const price = document.createElement("div");
  price.className = "price";
  price.innerHTML = `
    $${product.discountedPrice.toFixed(2)}
    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
  `;

  const viewBtn = document.createElement("a");
  viewBtn.className = "view-product";
  viewBtn.href = "#";
  viewBtn.textContent = "View Product";

  info.appendChild(ratingEl);
  info.appendChild(title);
  info.appendChild(price);

  card.appendChild(info);
  card.appendChild(viewBtn);

  getWellContainer.appendChild(card);
});

// Get well soon flower product js end












});
