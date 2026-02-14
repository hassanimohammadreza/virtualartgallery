document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById("gallery");

    fetch('./artworks.json')
        .then(response => response.json())
        .then(artworks => {
            artworks.forEach(art => {
                const item = document.createElement("div");
                item.classList.add("gallery-item");

                item.innerHTML = `
                    <a href="${art.page}" target="_blank">
                        <div class="preview" style="position:relative; width:100%; overflow:hidden;">
                            <iframe src="${art.page}" frameborder="0"
                                style="position:absolute; top:0; left:0; border:none;"></iframe>
                        </div>
                        <p>${art.title}</p>
                    </a>
                `;

                gallery.appendChild(item);

                const preview = item.querySelector('.preview');
                const iframe = preview.querySelector('iframe');

                function scaleIframe() {
                    const containerWidth = preview.offsetWidth;
                    const scaleX = containerWidth / art.width;
                    const scaleY = containerWidth / art.width * (art.height / art.width);

                    const scale = scaleX;

                    const scaledHeight = art.height * scale;

                    preview.style.height = `${scaledHeight}px`;
                    iframe.style.width = `${art.width}px`;
                    iframe.style.height = `${art.height}px`;
                    iframe.style.transform = `scale(${scale})`;
                    iframe.style.transformOrigin = 'top left';
                }

                scaleIframe();
                window.addEventListener('resize', scaleIframe);
            });
        })
        .catch(error => {
            console.error('Error loading the artwork data:', error);
        });
});
