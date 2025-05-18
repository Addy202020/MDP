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

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // Toggle visibility class
  if (currentScroll > 80) {
    brandName.classList.add('visible');
  } else {
    brandName.classList.remove('visible');
  }

  // Animate font size from 2rem to 4rem
  const minFont = 2;
  const maxFont = 5;
  const fontSize = Math.min(maxFont, Math.max(minFont, minFont + currentScroll / 150));

  // Animate letter spacing (kerning) from 0.05em to 0.3em
  const minSpacing = 0.05;
  const maxSpacing = 0.52;
  const spacing = Math.min(maxSpacing, Math.max(minSpacing, minSpacing + currentScroll / 500));

  brandName.style.fontSize = `${fontSize}rem`;
  brandName.style.letterSpacing = `${spacing}em`;

  lastScrollY = currentScroll;
});

  wrapper.appendChild(img);
  gallery.appendChild(wrapper);
});
