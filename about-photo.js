window.addEventListener('DOMContentLoaded', () => {
  const photo = document.querySelector('.about-photo.hover-layer');
  const wrapper = document.querySelector('.photo-mask-wrapper');

  if (!photo || !wrapper) return;

  wrapper.addEventListener('mousemove', (e) => {
    const bounds = wrapper.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const radius = 300;

    const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;

    photo.style.webkitMaskImage = mask;
    photo.style.maskImage = mask;
  });

  wrapper.addEventListener('mouseleave', () => {
  const mask = `radial-gradient(circle 0px at -9999px -9999px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;
  photo.style.webkitMaskImage = mask;
  photo.style.maskImage = mask;
});

});
