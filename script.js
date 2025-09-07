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
  const maxFont = 4.5;
  const minSpacing = 0.05;
  const maxSpacing = 0.45;
  const progress = Math.min(1, scrollY / 900);
  const fontSize = minFont + (maxFont - minFont) * progress;
  const spacing = minSpacing + (maxSpacing - minSpacing) * progress;

  brandName.style.fontSize = `${fontSize}rem`;
  brandName.style.letterSpacing = `${spacing}em`;

  // Move brand name downward slightly on scroll
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

// --- START: LAZY LOADING LOGIC ---

// Folder where images are stored
const folderPath = 'images';
const totalImages = 938;

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

// Get the gallery container
const gallery = document.getElementById('gallery');

// Create a new Intersection Observer
// This will watch for elements entering the viewport
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // If an element is intersecting (i.e., visible or about to be visible)
    if (entry.isIntersecting) {
      const img = entry.target;
      // Take the image path from the 'data-src' attribute and put it in 'src'
      // This is what actually triggers the image to load
      img.src = img.dataset.src;
      
      // Once loaded, we don't need to watch this image anymore
      observer.unobserve(img);
    }
  });
}, { 
  // Options: Load images when they are 200px away from the bottom of the viewport
  rootMargin: "0px 0px 200px 0px" 
});

// Create and append images to the gallery
imageNames.forEach((imageName) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('img-wrapper');

  const img = document.createElement('img');
  // IMPORTANT: We set 'data-src' instead of 'src' initially.
  // The browser won't load an image from 'data-src'.
  img.dataset.src = `${folderPath}/${imageName}`;
  img.alt = 'Design work';
  img.classList.add('gallery-img');

  wrapper.appendChild(img);
  gallery.appendChild(wrapper);

  // Tell the observer to start watching this new image
  observer.observe(img);
});

// --- END: LAZY LOADING LOGIC ---


// --- START: LIGHTBOX LOGIC ---
// This part remains mostly the same, but it's placed after the image creation.

// We need a small delay to ensure the DOM has the new images before we select them
setTimeout(() => {
    let currentImageIndex = -1;
    const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // Click on any image
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        // This works because by the time you can click an image,
        // the Intersection Observer will have already set its 'src'.
        if (img.src) {
            lightboxImg.src = img.src;
            lightbox.classList.add('show');
            document.querySelector('.gallery').classList.add('dimmed');
            img.classList.add('active-image');
            currentImageIndex = index;
        }
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

    // Helper to update active image class
    function updateActiveImage() {
        galleryImages.forEach(img => img.classList.remove('active-image'));
        if (currentImageIndex >= 0 && galleryImages[currentImageIndex]) {
            galleryImages[currentImageIndex].classList.add('active-image');
        }
    }

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
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        updateActiveImage();
      }

      if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        updateActiveImage();
      }
    });

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

      if (swipeDistance > 50) { // Swipe right → Previous
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        updateActiveImage();
      } else if (swipeDistance < -50) { // Swipe left → Next
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        updateActiveImage();
      }
    }
}, 100); // The 100ms timeout ensures all images are in the DOM before adding listeners.

// --- END: LIGHTBOX LOGIC ---
