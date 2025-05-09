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

  wrapper.appendChild(img);
  gallery.appendChild(wrapper);
});