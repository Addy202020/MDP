// Reveal brand name on scroll
window.addEventListener('scroll', () => {
  document.querySelector('.landing').classList.add('scrolled');
});

// Folder where images are stored
const folderPath = 'images';
const totalImages = 928;

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

let lastScrollTop = 0;

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
  const maxSpacing = 0.7;
  const progress = Math.min(1, scrollY / 900);
  const fontSize = minFont + (maxFont - minFont) * progress;
  const spacing = minSpacing + (maxSpacing - minSpacing) * progress;

  brandName.style.fontSize = `${fontSize}rem`;
  brandName.style.letterSpacing = `${spacing}em`;
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

  wrapper.appendChild(img);
  gallery.appendChild(wrapper);
});
