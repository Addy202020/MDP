// Reveal brand name on scroll
window.addEventListener('scroll', () => {
  document.querySelector('.landing').classList.add('scrolled');
});

const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 500;
  const progress = Math.min(1, scrollY / maxScroll);
  const opacity = 1 - progress;
  const translateY = -progress * 40;

  logo.style.opacity = opacity;
  logo.style.transform = `translateY(${translateY}px)`;
});

const brandName = document.querySelector('.brand-name');

let lastScrollY = 0;
let ticking = false;

function updateBrandName(scrollY) {
  // Toggle visibility
  if (scrollY > 80) {
    brandName.classList.add('visible');
  } else {
    brandName.classList.remove('visible');
  }

  // Animate font size & spacing
  const minFont = 2;
  const maxFont = 5;
  const minSpacing = 0.05;
  const maxSpacing = 0.5;
  const progress = Math.min(1, scrollY / 900);
  const fontSize = minFont + (maxFont - minFont) * progress;
  const spacing = minSpacing + (maxSpacing - minSpacing) * progress;

  brandName.style.fontSize = `${fontSize}rem`;
  brandName.style.letterSpacing = `${spacing}em`;

  // ✅ Move brand name downward slightly on scroll
  const moveY = progress * 100;
  brandName.style.transform = `translateY(${moveY}px)`;
}

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateBrandName(lastScrollY);
      ticking = false;
    });

    ticking = true;
  }
});

document.querySelector('.brand-name').addEventListener('click', () => {
  window.location.href = 'about.html';
});

// Folder where images are stored
const folderPath = 'images';
const totalImages = 898;

// Generate image file names
const imageNames = Array.from({ length: totalImages }, (_, i) => `image${i + 1}.webp`);

// Shuffle images randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(imageNames);

// Load and render images inside gallery
const gallery = document.getElementById('gallery');

imageNames.forEach((imageName) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('img-wrapper');

  const img = document.createElement('img');
  img.src = `${folderPath}/${imageName}`;
  img.alt = 'Design work';
  img.loading = 'lazy';
  img.classList.add('gallery-img');

  wrapper.appendChild(img);
  gallery.appendChild(wrapper);
});

// All DOM for images is ready, now select and add listeners
let currentImageIndex = -1;
const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Click on any image
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
    document.querySelector('.gallery').classList.add('dimmed');
    img.classList.add('active-image');
    currentImageIndex = index;
  });
});

// Click outside the image to close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
    document.querySelector('.gallery').classList.remove('dimmed');
    galleryImages.forEach(img => img.classList.remove('active-image'));
    currentImageIndex = -1;
  }
});

// Close popup with Escape key and handle arrow navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;

  if (e.key === 'Escape') {
    lightbox.classList.remove('show');
    document.querySelector('.gallery').classList.remove('dimmed');
    galleryImages.forEach(img => img.classList.remove('active-image'));
    currentImageIndex = -1;
  }

  if (e.key === 'ArrowLeft') {
    // Go to previous image
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    updateActiveImage();
  }

  if (e.key === 'ArrowRight') {
    // Go to next image
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    updateActiveImage();
  }
});

// Helper to update active image class
function updateActiveImage() {
  galleryImages.forEach(img => img.classList.remove('active-image'));
  if (currentImageIndex >= 0 && galleryImages[currentImageIndex]) {
    galleryImages[currentImageIndex].classList.add('active-image');
  }
}

// Touch swipe for lightbox navigation
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
}, false);

function handleSwipeGesture() {
  if (!lightbox.classList.contains('show')) return;

  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > 50) {
    // Swipe right → Previous
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    updateActiveImage();
  } else if (swipeDistance < -50) {
    // Swipe left → Next
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    updateActiveImage();
  }
}
