document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        setTimeout(() => {
            titleElement.classList.add('visible');
        }, 300); 
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    const pageSection = document.querySelector(".page");
    if (!pageSection) {
        console.error("Page section not found");
        return;
    }
    const imageFolder = pageSection.dataset.folder;
    if (!imageFolder) {
        console.error("Image folder not specified");
        return;
    }

    let imageIndex = 1;
    let foundImage = 0;

    while (true) {
        const imageUrl = `${imageFolder}/${imageIndex}.jpg`;

        try {
            const response = await fetch(imageUrl, { method: 'HEAD' });
            if (!response.ok) {
                break;
            }

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `ページ${imageIndex}`;
            img.classList.add('comic-img');
            pageSection.appendChild(img);

            foundImage++;
            imageIndex++;
        } catch (error) {
            console.error('画像チェックエラー:', error);
            break;
        }
    }

    if (foundImage === 0) {
        pageSection.innerHTML = '<p>画像が見つかりません。</p>';
    }
});

const img = document.getElementById('targetImage');
const fullscreenButton = document.getElementById('fullscreenButton');

fullscreenButton.addEventListener('click', openFullscreen);

function openFullscreen() {
  if (img.requestFullscreen) {
    img.requestFullscreen();
  } else if (img.webkitRequestFullscreen) { 
    img.webkitRequestFullscreen();
  } else if (img.msRequestFullscreen) { 
    img.msRequestFullscreen();
  }
}

document.addEventListener('fullscreenchange', adjustFullscreenStyle);
document.addEventListener('webkitfullscreenchange', adjustFullscreenStyle);
document.addEventListener('msfullscreenchange', adjustFullscreenStyle);

function adjustFullscreenStyle() {
  if (document.fullscreenElement) {
    img.style.objectFit = 'contain';
    img.style.width = '100%';
    img.style.height = '100%';
  } else {
    img.style.objectFit = '';
    img.style.width = '';
    img.style.height = '';
  }
}


