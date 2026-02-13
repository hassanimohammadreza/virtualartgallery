document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    
    // Make sure the image is loaded before calculating its dimensions
    img.onload = function () {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const itemWidth = item.offsetWidth;
      const itemHeight = itemWidth / aspectRatio;

      // Adjust the height of the gallery item
      item.style.height = `${itemHeight + 50}px`; // Add 50px for padding and text
    }

    // If the image is already loaded
    if (img.complete) {
      img.onload();
    }
  });

  // Ensure the footer sticks to the bottom if the content is small
  const footer = document.querySelector('footer');
  if (document.body.scrollHeight <= window.innerHeight) {
    footer.style.position = 'absolute';
    footer.style.bottom = '0';
    footer.style.width = '100%';
  }
});
